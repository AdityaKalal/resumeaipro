'use client';

import { useState } from 'react';
import { Upload, FileText, CheckCircle, BarChart3, Briefcase, Star, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import ResumeAnalyzer from '@/components/ResumeAnalyzer';

export default function HomePage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-blue-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
              ✨ Powered by Google Gemini 1.5 Pro
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              Get Hired <span className="text-blue-600">3x Faster</span> with AI-Powered Resume Analysis
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto">
              Upload your resume and get instant, actionable feedback. Optimize for ATS, match with job descriptions, and land your dream job.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-10 max-w-3xl mx-auto"
          >
            <ResumeAnalyzer />
          </motion.div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-slate-500 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Free instant analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span>4.9/5 from 10,000+ users</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to land the interview</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Our AI-powered platform provides comprehensive tools to optimize your job search process from start to finish.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">ATS Optimization</h3>
              <p className="text-slate-600">Ensure your resume passes through Applicant Tracking Systems with our 50+ system compatibility check and keyword density analysis.</p>
            </div>
            
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-6">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Job Matching</h3>
              <p className="text-slate-600">Paste a job description and get a detailed match score, missing skills highlight, and tailored recommendations to improve your chances.</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-8 border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-6">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Career Tools</h3>
              <p className="text-slate-600">Generate custom cover letters, prepare for interviews with AI-generated questions, and optimize your LinkedIn profile effortlessly.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
