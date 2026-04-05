'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AnalysisReport from './AnalysisReport';

export default function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
    },
    maxFiles: 1,
  });

  const handleAnalyze = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Data = reader.result?.toString().split(',')[1];
        const mimeType = file.type;

        if (!base64Data) {
          throw new Error("Failed to read file");
        }

        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileData: base64Data,
            mimeType: mimeType,
          }),
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || 'Failed to analyze resume');
        }

        const data = await response.json();
        setAnalysisResult(data);
        setIsAnalyzing(false);
      };
      
      reader.onerror = () => {
        throw new Error("Failed to read file");
      };

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      setIsAnalyzing(false);
    }
  };

  if (analysisResult) {
    return <AnalysisReport result={analysisResult} onReset={() => {
      setAnalysisResult(null);
      setFile(null);
    }} />;
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Upload your resume</h2>
      <p className="text-slate-500 mb-6">We accept PDF and TXT files up to 5MB.</p>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'}
          ${file ? 'bg-blue-50 border-blue-300' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div
              key="upload-prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <Upload className="w-8 h-8" />
              </div>
              <p className="text-lg font-medium text-slate-700 mb-1">
                Drag & drop your resume here
              </p>
              <p className="text-sm text-slate-500">or click to browse files</p>
            </motion.div>
          ) : (
            <motion.div
              key="file-selected"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8" />
              </div>
              <p className="text-lg font-medium text-slate-900 mb-1 truncate max-w-xs">
                {file.name}
              </p>
              <p className="text-sm text-slate-500 mb-4">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
                className="text-sm text-red-500 hover:text-red-700 font-medium"
              >
                Remove file
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-start gap-3 text-left">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="mt-8">
        <button
          onClick={handleAnalyze}
          disabled={!file || isAnalyzing}
          className={`w-full py-4 rounded-xl text-lg font-bold text-white transition-all shadow-lg flex items-center justify-center gap-2
            ${!file || isAnalyzing 
              ? 'bg-slate-300 cursor-not-allowed shadow-none' 
              : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/25'
            }
          `}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Analyzing with AI...
            </>
          ) : (
            <>
              Analyze My Resume
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
      
      {isAnalyzing && (
        <div className="mt-6 space-y-3">
          <LoadingStep text="Parsing document structure..." delay={0} />
          <LoadingStep text="Extracting skills and experience..." delay={1.5} />
          <LoadingStep text="Evaluating ATS compatibility..." delay={3} />
          <LoadingStep text="Generating actionable feedback..." delay={4.5} />
        </div>
      )}
    </div>
  );
}

function LoadingStep({ text, delay }: { text: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="flex items-center gap-3 text-sm text-slate-600"
    >
      <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
      <span>{text}</span>
    </motion.div>
  );
}

// ArrowRight icon was missing from imports, let's add it
import { ArrowRight } from 'lucide-react';
