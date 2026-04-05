'use client';

import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, XCircle, AlertTriangle, Briefcase, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface MatchResult {
  matchScore: number;
  summary: string;
  matchingSkills: string[];
  missingSkills: string[];
  experienceMatch: string;
  educationMatch: string;
  salaryEstimate: string;
  competitivenessScore: number;
  recommendations: string[];
}

export default function JobMatchReport({ result, onReset }: { result: MatchResult, onReset: () => void }) {
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
    { name: 'Score', value: result.matchScore },
    { name: 'Remaining', value: 100 - result.matchScore }
  ];
  const COLORS = [result.matchScore >= 80 ? '#10B981' : result.matchScore >= 60 ? '#F59E0B' : '#EF4444', '#E2E8F0'];

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
          New Comparison
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Match Score Card */}
        <div className="md:col-span-1 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-center shadow-sm">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">Job Match Score</h3>
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
              <span className={`text-4xl font-bold ${getScoreColor(result.matchScore)}`}>
                {result.matchScore}%
              </span>
            </div>
          </div>
          <p className="text-center text-sm text-slate-600 mt-4">
            {result.matchScore >= 80 ? 'Strong match! You should definitely apply.' : 
             result.matchScore >= 60 ? 'Moderate match. Tailor your resume before applying.' : 
             'Low match. Consider gaining missing skills or looking for other roles.'}
          </p>
        </div>

        {/* Summary & Insights */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Match Summary</h3>
            <p className="text-slate-600 leading-relaxed">{result.summary}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-500 mb-1">Estimated Salary</h4>
                <p className="text-lg font-bold text-slate-900">{result.salaryEstimate}</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="w-full">
                <h4 className="text-sm font-medium text-slate-500 mb-1">Competitiveness</h4>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-bold ${getScoreColor(result.competitivenessScore)}`}>{result.competitivenessScore}/100</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full ${getScoreBg(result.competitivenessScore)}`} style={{ width: `${result.competitivenessScore}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            Matching Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.matchingSkills.length > 0 ? (
              result.matchingSkills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm border border-green-200">
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-slate-500">No matching skills found.</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-500" />
            Missing Skills (Add these!)
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.missingSkills.length > 0 ? (
              result.missingSkills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm border border-red-200">
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-slate-500">You have all the required skills!</p>
            )}
          </div>
        </div>
      </div>

      {/* Experience & Education */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Experience Match</h3>
          <p className="text-slate-700">{result.experienceMatch}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Education Match</h3>
          <p className="text-slate-700">{result.educationMatch}</p>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          How to improve your chances
        </h3>
        <div className="space-y-3">
          {result.recommendations.map((rec, i) => (
            <div key={i} className="flex items-start gap-3 text-slate-700">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
              <span className="text-sm leading-relaxed">{rec}</span>
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
}
