'use client';

import { CheckCircle2 } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-16">
          Choose the plan that best fits your career goals. Upgrade anytime.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
          {/* Free Tier */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Free</h3>
            <p className="text-slate-500 text-sm mb-6">Perfect for trying out the platform.</p>
            <div className="text-4xl font-extrabold text-slate-900 mb-6">
              $0<span className="text-lg font-medium text-slate-500">/mo</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-slate-600 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                3 resume analyses per month
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                Basic ATS scoring
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                1 job match comparison
              </li>
            </ul>
            <button className="w-full py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-bold hover:border-slate-300 hover:bg-slate-50 transition-colors">
              Get Started Free
            </button>
          </div>

          {/* Pro Tier */}
          <div className="bg-blue-600 rounded-2xl border border-blue-500 p-8 shadow-xl flex flex-col relative transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-400 to-blue-300 text-blue-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Most Popular
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
            <p className="text-blue-100 text-sm mb-6">For serious job seekers.</p>
            <div className="text-4xl font-extrabold text-white mb-6">
              $19<span className="text-lg font-medium text-blue-200">/mo</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-white text-sm">
                <CheckCircle2 className="w-5 h-5 text-blue-300 shrink-0" />
                Unlimited resume analyses
              </li>
              <li className="flex items-start gap-3 text-white text-sm">
                <CheckCircle2 className="w-5 h-5 text-blue-300 shrink-0" />
                Unlimited job matches
              </li>
              <li className="flex items-start gap-3 text-white text-sm">
                <CheckCircle2 className="w-5 h-5 text-blue-300 shrink-0" />
                PDF report exports
              </li>
              <li className="flex items-start gap-3 text-white text-sm">
                <CheckCircle2 className="w-5 h-5 text-blue-300 shrink-0" />
                Priority AI processing
              </li>
              <li className="flex items-start gap-3 text-white text-sm">
                <CheckCircle2 className="w-5 h-5 text-blue-300 shrink-0" />
                Cover letter generator
              </li>
            </ul>
            <button className="w-full py-3 rounded-xl bg-white text-blue-600 font-bold hover:bg-blue-50 transition-colors shadow-lg">
              Upgrade to Pro
            </button>
          </div>

          {/* Enterprise Tier */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Enterprise</h3>
            <p className="text-slate-500 text-sm mb-6">For career coaches and teams.</p>
            <div className="text-4xl font-extrabold text-slate-900 mb-6">
              $99<span className="text-lg font-medium text-slate-500">/mo</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-slate-600 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                Everything in Pro
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                Team accounts (up to 5)
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                White-label reports
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                API access
              </li>
            </ul>
            <button className="w-full py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-bold hover:border-slate-300 hover:bg-slate-50 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
