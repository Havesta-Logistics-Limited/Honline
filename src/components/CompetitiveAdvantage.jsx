import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, Minus, X } from 'lucide-react';
import { useContent } from '../hooks/useContent';

const DEFAULTS = {
  badge: 'Competitive Moat',
  headlineLine1: 'Why Havesta',
  headlineLine2: 'Wins the Market',
  subheadline: "No competitor has integrated cold-chain, technology, and dual-sided commerce into one platform. Havesta's infrastructure creates deep switching costs and compounding network effects.",
  features: [
    'Cold-chain logistics network',
    'Real-time IoT monitoring',
    'B2B + B2C dual model',
    'Smart warehousing',
    'Digital marketplace',
    'Farmer onboarding',
    'Data intelligence layer',
    'Last-mile delivery',
    'Subscription revenue',
  ],
  moats: [
    { title: 'Cold-Chain Scarcity', desc: 'Physical infrastructure is expensive to replicate — creating high barriers to entry for digital-only competitors.' },
    { title: 'Network Effects', desc: 'More farmers attract more buyers; more buyers attract more farmers — creating compounding value with scale.' },
    { title: 'Data Intelligence', desc: 'Every transaction and delivery builds proprietary data for demand forecasting, route optimization, and supply prediction.' },
  ],
};

const BASE_MATRIX = {
  'Cold-chain logistics network':     ['yes', 'no',  'partial', 'no'],
  'Real-time IoT monitoring':         ['yes', 'no',  'no',      'no'],
  'B2B + B2C dual model':             ['yes', 'no',  'partial', 'partial'],
  'Smart warehousing':                ['yes', 'partial', 'no',  'no'],
  'Digital marketplace':              ['yes', 'no',  'partial', 'yes'],
  'Farmer onboarding':                ['yes', 'partial', 'no',  'yes'],
  'Data intelligence layer':          ['yes', 'no',  'partial', 'no'],
  'Last-mile delivery':               ['yes', 'partial', 'yes', 'no'],
  'Subscription revenue':             ['yes', 'no',  'no',      'partial'],
};

const competitors = [
  { name: 'Havesta', highlight: true },
  { name: 'Traditional Distributors', highlight: false },
  { name: 'Local Delivery Apps', highlight: false },
  { name: 'Agri Marketplaces', highlight: false },
];

function Cell({ val, highlight }) {
  if (val === 'yes') return (
    <div className="flex justify-center">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${highlight ? 'bg-emerald-500/20 border border-emerald-500/40' : 'bg-white/[0.04]'}`}>
        <Check size={12} className={highlight ? 'text-emerald-400' : 'text-gray-600'} />
      </div>
    </div>
  );
  if (val === 'partial') return (
    <div className="flex justify-center">
      <div className="w-6 h-6 rounded-full bg-yellow-900/20 border border-yellow-700/30 flex items-center justify-center">
        <Minus size={12} className="text-yellow-600" />
      </div>
    </div>
  );
  return (
    <div className="flex justify-center">
      <div className="w-6 h-6 rounded-full bg-red-900/10 border border-red-900/20 flex items-center justify-center">
        <X size={12} className="text-red-800" />
      </div>
    </div>
  );
}

export default function CompetitiveAdvantage() {
  const c = useContent('competitive', DEFAULTS);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="competitive" className="relative py-16 md:py-28 px-4 md:px-6 bg-gradient-to-b from-gray-950 to-gray-900/20">
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
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{c.subheadline}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="glass-card rounded-2xl border border-white/[0.07] overflow-hidden"
        >
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-white/[0.07]">
                  <th className="text-left p-5 text-gray-600 text-xs font-medium">CAPABILITY</th>
                  {competitors.map((comp) => (
                    <th key={comp.name} className={`p-5 text-center text-xs font-bold ${comp.highlight ? 'text-emerald-400' : 'text-gray-600'}`}>
                      {comp.highlight && (
                        <div className="inline-block mb-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] px-2 py-0.5 rounded-full">YOU ARE HERE</div>
                      )}
                      <div>{comp.name}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.features.map((f, i) => {
                  const row = BASE_MATRIX[f] || ['yes', 'no', 'no', 'no'];
                  return (
                    <tr key={i} className={`border-b border-white/[0.04] ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}>
                      <td className="p-4 text-gray-400 text-xs">{f}</td>
                      {competitors.map((comp, ci) => (
                        <td key={comp.name} className={`p-4 ${comp.highlight ? 'bg-emerald-950/10' : ''}`}>
                          <Cell val={row[ci]} highlight={comp.highlight} />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {c.moats.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
              className="glass-card rounded-xl p-5 border border-emerald-500/10"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 mb-3" />
              <h4 className="text-white font-semibold text-sm mb-2">{m.title}</h4>
              <p className="text-gray-600 text-xs leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
