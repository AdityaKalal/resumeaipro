'use client';

import { motion } from 'motion/react';
import { CheckCircle2, AlertTriangle, XCircle, ArrowLeft, Download, Briefcase, GraduationCap, Code } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface AnalysisResult {
  atsScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  skills: {
    technical: string[];
    soft: string[];
  };
  formattingScore: number;
  impactScore: number;
  recommendations: string[];
}

export default function AnalysisReport({ result, onReset }: { result: AnalysisResult, onReset: () => void }) {
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const scoreData = [
    { name: 'Score', value: result.atsScore },
    { name: 'Remaining', value: 100 - result.atsScore }
  ];
  const COLORS = [result.atsScore >= 80 ? '#10B981' : result.atsScore >= 60 ? '#F59E0B' : '#EF4444', '#E2E8F0'];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full text-left"
    >
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onReset}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to upload
        </button>
        <button className="flex items-center gap-2 text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg transition-colors">
          <Download className="w-4 h-4" />
          Export PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Overall Score Card */}
        <div className="md:col-span-1 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-center shadow-sm">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">Overall ATS Score</h3>
          <div className="w-48 h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={scoreData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  {scoreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-bold ${getScoreColor(result.atsScore)}`}>
                {result.atsScore}
              </span>
              <span className="text-sm text-slate-500">/ 100</span>
            </div>
          </div>
          <p className="text-center text-sm text-slate-600 mt-4">
            {result.atsScore >= 80 ? 'Excellent! Your resume is highly optimized.' : 
             result.atsScore >= 60 ? 'Good, but there is room for improvement.' : 
             'Needs significant improvements to pass ATS.'}
          </p>
        </div>

        {/* Summary & Metrics */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">AI Executive Summary</h3>
            <p className="text-slate-600 leading-relaxed">{result.summary}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-500">Formatting</span>
                <span className={`text-sm font-bold ${getScoreColor(result.formattingScore)}`}>{result.formattingScore}/100</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className={`h-2 rounded-full ${getScoreBg(result.formattingScore)}`} style={{ width: `${result.formattingScore}%` }}></div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-500">Impact & Metrics</span>
                <span className={`text-sm font-bold ${getScoreColor(result.impactScore)}`}>{result.impactScore}/100</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className={`h-2 rounded-full ${getScoreBg(result.impactScore)}`} style={{ width: `${result.impactScore}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            Strengths
          </h3>
          <ul className="space-y-3">
            {result.strengths.map((strength, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-600">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                <span className="text-sm leading-relaxed">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            Areas for Improvement
          </h3>
          <ul className="space-y-3">
            {result.weaknesses.map((weakness, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-600">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 shrink-0" />
                <span className="text-sm leading-relaxed">{weakness}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Actionable Recommendations */}
      <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6 mb-8">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Action Plan</h3>
        <div className="space-y-4">
          {result.recommendations.map((rec, i) => (
            <div key={i} className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm border border-blue-50">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">
                {i + 1}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed mt-1">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Extracted Skills */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Extracted Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-medium text-slate-500 mb-3 flex items-center gap-2">
              <Code className="w-4 h-4" /> Technical Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {result.skills.technical.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm border border-slate-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-slate-500 mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Soft Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {result.skills.soft.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm border border-slate-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </motion.div>
  );
}
