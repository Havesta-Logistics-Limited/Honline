import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp } from 'lucide-react';
import { useContent } from '../hooks/useContent';

const DEFAULTS = {
  badge: 'Executive Summary',
  headlineLine1: 'The Investment',
  headlineLine2: 'Case for Havesta',
  subheadline: "A structured overview of our business, market, model, and opportunity for investors evaluating Havesta's seed round.",
  keyMetrics: [
    { label: 'Pre-Seed Round', value: '$50K' },
    { label: 'TAM by 2030', value: '$1T+' },
    { label: 'Annual Food Wastage (NG)', value: '$9B' },
    { label: 'Valuation Cap', value: '$1.5M' },
    { label: 'Runway', value: '~10 months' },
    { label: 'Target Close', value: 'Q3 2025' },
  ],
  financialRows: [
    { metric: 'Monthly GMV (EoY)', y1: '$15K', y2: '$250K', y3: '$2M' },
    { metric: 'Annual Revenue', y1: '$50K', y2: '$600K', y3: '$8M' },
    { metric: 'Gross Margin', y1: '28%', y2: '38%', y3: '50%' },
    { metric: 'EBITDA', y1: '($45K)', y2: '($100K)', y3: '$1.2M' },
    { metric: 'Farmers Onboarded', y1: '20–50', y2: '500+', y3: '5,000+' },
    { metric: 'B2B Clients', y1: '5–10', y2: '80+', y3: '500+' },
    { metric: 'Cities Operational', y1: '1 (Lagos)', y2: '2', y3: '4+' },
  ],
};

export default function ExecutiveSummary() {
  const c = useContent('executiveSummary', DEFAULTS);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="executive-summary" className="relative py-16 md:py-28 px-4 md:px-6 bg-gradient-to-b from-gray-900/10 to-gray-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold text-emerald-400 tracking-widest uppercase mb-4 glass px-3 py-1.5 rounded-full border border-emerald-500/20">
            {c.badge}
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-5">
            {c.headlineLine1}
            <br />
            <span className="text-gradient">{c.headlineLine2}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{c.subheadline}</p>
        </motion.div>

        {/* Key metrics strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-card rounded-2xl border border-emerald-500/10 overflow-hidden mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-y md:divide-y-0 divide-white/[0.05]">
            {c.keyMetrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="p-5 text-center"
              >
                <div className="text-xl font-black text-gradient mb-1">{m.value}</div>
                <div className="text-gray-600 text-[10px] uppercase tracking-wider">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Financial projection table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="glass-card rounded-2xl border border-white/[0.07] overflow-hidden mb-10"
        >
          <div className="p-5 border-b border-white/[0.06] flex items-center gap-2">
            <TrendingUp size={15} className="text-emerald-400" />
            <span className="text-white font-semibold text-sm">3-Year Financial Summary</span>
            <span className="ml-auto text-[10px] text-gray-600 glass px-2 py-0.5 rounded-full border border-white/[0.05]">Conservative estimates · USD</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th className="text-left p-4 text-gray-600 text-xs font-medium">METRIC</th>
                  {['Year 1', 'Year 2', 'Year 3'].map(y => (
                    <th key={y} className="p-4 text-gray-400 text-xs font-semibold text-center">{y}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.financialRows.map((row, i) => (
                  <tr key={i} className={`border-b border-white/[0.04] ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}>
                    <td className="p-4 text-gray-400 text-xs font-medium">{row.metric}</td>
                    <td className="p-4 text-gray-500 text-xs text-center font-mono">{row.y1}</td>
                    <td className="p-4 text-gray-400 text-xs text-center font-mono">{row.y2}</td>
                    <td className="p-4 text-emerald-400 text-xs text-center font-mono font-bold">{row.y3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="text-center text-gray-700 text-xs"
        >
          CONFIDENTIAL — This executive summary contains forward-looking projections based on management estimates. Recipients should conduct independent due diligence before making investment decisions.
        </motion.div>
      </div>
    </section>
  );
}
