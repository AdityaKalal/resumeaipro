'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Loader2, AlertCircle, ArrowRight, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import JobMatchReport from './JobMatchReport';

export default function JobMatcher() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchResult, setMatchResult] = useState<any | null>(null);
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
    if (!file || !jobDescription.trim()) {
      setError('Please provide both a resume and a job description.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Data = reader.result?.toString().split(',')[1];
        const mimeType = file.type;

        if (!base64Data) {
          throw new Error("Failed to read file");
        }

        const response = await fetch('/api/match', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileData: base64Data,
            mimeType: mimeType,
            jobDescription: jobDescription,
          }),
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || 'Failed to analyze match');
        }

        const data = await response.json();
        setMatchResult(data);
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

  if (matchResult) {
    return <JobMatchReport result={matchResult} onReset={() => {
      setMatchResult(null);
      // Keep the file and JD for easy re-testing
    }} />;
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Step 1: Resume */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">1</div>
          <h2 className="text-xl font-bold text-slate-900">Upload Resume</h2>
        </div>
        
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors h-64 flex flex-col items-center justify-center
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
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-slate-700 mb-1">
                  Drag & drop your resume
                </p>
                <p className="text-xs text-slate-500">PDF or TXT up to 5MB</p>
              </motion.div>
            ) : (
              <motion.div
                key="file-selected"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
                  <FileText className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-slate-900 mb-1 truncate max-w-[200px]">
                  {file.name}
                </p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="text-xs text-red-500 hover:text-red-700 font-medium mt-2"
                >
                  Remove file
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Step 2: Job Description */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">2</div>
          <h2 className="text-xl font-bold text-slate-900">Job Description</h2>
        </div>
        
        <div className="h-64">
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            className="w-full h-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
          />
        </div>
      </div>

      {/* Action Area */}
      <div className="md:col-span-2 flex flex-col items-center mt-4">
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-start gap-3 w-full max-w-2xl">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <button
          onClick={handleAnalyze}
          disabled={!file || !jobDescription.trim() || isAnalyzing}
          className={`w-full max-w-md py-4 rounded-xl text-lg font-bold text-white transition-all shadow-lg flex items-center justify-center gap-2
            ${!file || !jobDescription.trim() || isAnalyzing 
              ? 'bg-slate-300 cursor-not-allowed shadow-none' 
              : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/25'
            }
          `}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Calculating Match Score...
            </>
          ) : (
            <>
              Generate Match Report
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
