import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { PieChart, TrendingUp, Info } from 'lucide-react';
import { useContent } from '../hooks/useContent';

const ROUND_HOLDERS = {
  'pre-seed': [
    { name: 'Adewale Okonkwo (CEO)', role: 'Founder & Sole Shareholder', shares: 10_000_000, pct: 100.0, type: 'Common', color: 'bg-emerald-500' },
  ],
  'seed': [
    { name: 'Adewale Okonkwo (CEO)', role: 'Founder', shares: 10_000_000, pct: 96.8, type: 'Common', color: 'bg-emerald-500' },
    { name: 'Pre-Seed Investors (SAFE)', role: 'Angel / Early Backers', shares: 333_333, pct: 3.2, type: 'Preferred', color: 'bg-blue-500' },
  ],
};

const ROUND_TOTALS = { 'pre-seed': 10_000_000, 'seed': 10_333_333 };

const DEFAULTS = {
  badge: 'Cap Table',
  headlineLine1: 'Equity & Ownership',
  headlineLine2: 'Projections',
  subheadline: 'Projected cap table across funding stages — currently 100% founder-owned, showing how investor allocation grows from pre-seed SAFE through a projected seed round.',
  rounds: [
    { id: 'pre-seed', label: 'Pre-Investment (Now)', valuation: '$1.5M', raised: '—', note: '' },
    { id: 'seed', label: 'Post-Pre-Seed SAFE ($50K)', valuation: '$1.5M cap', raised: '$50,000', note: 'SAFE converts at $1.5M valuation cap at the next priced round. Dilution shown at conversion ($0.15/share implied). $50K ÷ $0.15 = 333,333 new shares issued to investors.' },
  ],
};

function PieVisual({ holders }) {
  let cumulative = 0;
  const radius = 80;
  const cx = 100;
  const cy = 100;

  const colorMap = {
    'bg-emerald-500': '#10b981',
    'bg-teal-500': '#14b8a6',
    'bg-green-500': '#22c55e',
    'bg-cyan-500': '#06b6d4',
    'bg-gray-600': '#4b5563',
    'bg-blue-500': '#3b82f6',
    'bg-purple-500': '#a855f7',
  };

  const slices = holders.map(h => {
    const startAngle = cumulative * 360;
    cumulative += h.pct / 100;
    const endAngle = cumulative * 360;
    const start = startAngle * (Math.PI / 180);
    const end = endAngle * (Math.PI / 180);
    const x1 = cx + radius * Math.sin(start);
    const y1 = cy - radius * Math.cos(start);
    const x2 = cx + radius * Math.sin(end);
    const y2 = cy - radius * Math.cos(end);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return {
      path: `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`,
      color: colorMap[h.color] || '#10b981',
      label: h.name,
    };
  });

  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[200px]">
      {slices.map((s, i) => (
        <path key={i} d={s.path} fill={s.color} opacity={0.85} stroke="#030712" strokeWidth="1.5" />
      ))}
      <circle cx={cx} cy={cy} r="40" fill="#030712" />
      <text x={cx} y={cy - 4} textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="900">CAP</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="900">TABLE</text>
    </svg>
  );
}

export default function CapTable() {
  const c = useContent('capTable', DEFAULTS);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeRound, setActiveRound] = useState('pre-seed');

  const rounds = c.rounds.map(r => ({
    ...r,
    holders: ROUND_HOLDERS[r.id] || [],
    total: ROUND_TOTALS[r.id] || 0,
  }));

  const round = rounds.find(r => r.id === activeRound) || rounds[0];

  return (
    <section id="cap-table" className="relative py-16 md:py-28 px-4 md:px-6 bg-gradient-to-b from-gray-950 to-gray-900/20">
      <div className="max-w-7xl mx-auto">
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
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {c.subheadline}
          </p>
        </motion.div>

        {/* Round selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {rounds.map(r => (
            <button
              key={r.id}
              onClick={() => setActiveRound(r.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                activeRound === r.id
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                  : 'glass border-white/[0.07] text-gray-500 hover:text-gray-300 hover:border-white/15'
              }`}
            >
              {r.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          key={activeRound}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Round meta */}
          <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8">
            {[
              { label: 'Valuation', value: round.valuation },
              { label: 'Round Size', value: round.raised },
              { label: 'Total Shares (FD)', value: round.total.toLocaleString() },
            ].map(m => (
              <div key={m.label} className="glass-card rounded-xl p-3 md:p-4 border border-white/[0.07] text-center">
                <div className="text-gray-600 text-[9px] md:text-[10px] uppercase tracking-wider mb-1">{m.label}</div>
                <div className="text-white font-black text-sm md:text-xl break-all">{m.value}</div>
              </div>
            ))}
          </div>

          {round.note && (
            <div className="flex items-start gap-2 glass-card rounded-xl p-3 border border-yellow-500/10 bg-yellow-950/10 mb-6">
              <Info size={13} className="text-yellow-500 shrink-0 mt-0.5" />
              <p className="text-yellow-600/80 text-xs">{round.note}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Pie chart */}
            <div className="flex flex-col items-center justify-start gap-4">
              <div className="glass-card rounded-2xl border border-white/[0.07] p-6 w-full flex flex-col items-center">
                <div className="text-gray-500 text-xs uppercase tracking-widest mb-4">Ownership Distribution</div>
                <PieVisual holders={round.holders} />
                <div className="mt-4 space-y-2 w-full">
                  {round.holders.map(h => (
                    <div key={h.name} className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${h.color} shrink-0`} />
                      <span className="text-gray-500 text-[10px] flex-1 truncate">{h.name.split('(')[0].trim()}</span>
                      <span className="text-white text-[10px] font-bold">{h.pct.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="lg:col-span-2 glass-card rounded-2xl border border-white/[0.07] overflow-hidden">
              <div className="p-4 border-b border-white/[0.06] flex items-center gap-2">
                <PieChart size={14} className="text-emerald-400" />
                <span className="text-white font-semibold text-sm">{round.label}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                      <th className="text-left p-4 text-gray-600 text-[10px] font-medium uppercase tracking-wider">Holder</th>
                      <th className="p-4 text-gray-600 text-[10px] font-medium uppercase tracking-wider text-center">Type</th>
                      <th className="p-4 text-gray-600 text-[10px] font-medium uppercase tracking-wider text-right">Shares</th>
                      <th className="p-4 text-gray-600 text-[10px] font-medium uppercase tracking-wider text-right">Ownership %</th>
                      <th className="p-4 text-gray-600 text-[10px] font-medium uppercase tracking-wider text-right hidden md:table-cell">Value @ Cap</th>
                    </tr>
                  </thead>
                  <tbody>
                    {round.holders.map((h, i) => {
                      const valuationNum = round.id === 'pre-seed' ? 1_500_000
                        : round.id === 'seed' ? 1_550_000 : 3_500_000;
                      const impliedValue = (h.pct / 100) * valuationNum;
                      return (
                        <tr key={h.name} className={`border-b border-white/[0.04] ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}>
                          <td className="p-4">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-2 h-2 rounded-full ${h.color} shrink-0`} />
                              <div>
                                <div className="text-white text-xs font-medium">{h.name}</div>
                                <div className="text-gray-600 text-[10px]">{h.role}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                              h.type === 'Common' ? 'bg-emerald-900/30 text-emerald-500' :
                              h.type === 'Options' ? 'bg-gray-800 text-gray-500' :
                              h.type.includes('Preferred') ? 'bg-blue-900/30 text-blue-400' :
                              'bg-purple-900/30 text-purple-400'
                            }`}>{h.type}</span>
                          </td>
                          <td className="p-4 text-right text-gray-400 text-xs font-mono">{h.shares.toLocaleString()}</td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${h.pct}%` }}
                                  transition={{ duration: 0.8, delay: 0.3 + i * 0.05 }}
                                  className={`h-full ${h.color} opacity-70 rounded-full`}
                                />
                              </div>
                              <span className="text-white text-xs font-bold w-10 text-right">{h.pct.toFixed(1)}%</span>
                            </div>
                          </td>
                          <td className="p-4 text-right text-gray-500 text-xs font-mono hidden md:table-cell">
                            ${(impliedValue / 1_000_000).toFixed(1)}M
                          </td>
                        </tr>
                      );
                    })}
                    {/* Total row */}
                    <tr className="bg-white/[0.03]">
                      <td className="p-4 text-white font-bold text-xs" colSpan={2}>Total</td>
                      <td className="p-4 text-right text-emerald-400 text-xs font-bold font-mono">{round.total.toLocaleString()}</td>
                      <td className="p-4 text-right text-emerald-400 text-xs font-bold">100.0%</td>
                      <td className="p-4 text-right text-emerald-400 text-xs font-bold hidden md:table-cell">{round.valuation}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Dilution insight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 glass-card rounded-xl p-5 border border-white/[0.07]"
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={14} className="text-emerald-400" />
              <span className="text-white font-semibold text-xs">Founder Dilution Analysis</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { label: 'Founder Ownership', pre: '100.0%', post: round.id === 'pre-seed' ? '100.0%' : '96.8%' },
                { label: 'Total Shares (FD)', pre: '10,000,000', post: round.id === 'pre-seed' ? '10,000,000' : '10,333,333' },
                { label: 'Investor Allocation', pre: '0%', post: round.id === 'pre-seed' ? '0%' : '3.2%' },
                { label: 'Implied Price/Share', pre: '$0.15', post: round.id === 'pre-seed' ? '$0.15' : '$0.15 cap' },
              ].map(m => (
                <div key={m.label} className="glass rounded-xl p-3 border border-white/[0.05]">
                  <div className="text-gray-600 text-[10px] mb-2">{m.label}</div>
                  <div className="text-xl font-black text-gradient">{m.post}</div>
                  {m.pre !== m.post && <div className="text-gray-700 text-[10px] mt-0.5">was {m.pre}</div>}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="text-center text-gray-700 text-xs mt-10"
        >
          Cap table projections are illustrative and based on management estimates. Actual ownership percentages may vary depending on final investment terms, anti-dilution provisions, and option pool adjustments. Not to be relied upon for investment decisions without legal review.
        </motion.div>
      </div>
    </section>
  );
}
