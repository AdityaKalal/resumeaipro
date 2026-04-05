'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import JobMatcher from '@/components/JobMatcher';

export default function JobMatchPage() {
  return (
    <div className="flex flex-col items-center w-full">
      <section className="w-full bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Smart Job <span className="text-blue-600">Matcher</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Compare your resume against any job description. Discover your match score, identify missing skills, and tailor your application.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <JobMatcher />
        </div>
      </section>
    </div>
  );
}
