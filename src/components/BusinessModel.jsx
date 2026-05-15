import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Repeat, Package, PercentSquare, Handshake, Star } from 'lucide-react';
import { useContent } from '../hooks/useContent';

const STREAM_ICONS = [Repeat, Package, PercentSquare, Handshake, Star];
const STREAM_STYLES = [
  { color: 'from-emerald-900/30', border: 'border-emerald-500/15', iconColor: 'text-emerald-400' },
  { color: 'from-teal-900/30', border: 'border-teal-500/15', iconColor: 'text-teal-400' },
  { color: 'from-cyan-900/30', border: 'border-cyan-500/15', iconColor: 'text-cyan-400' },
  { color: 'from-green-900/30', border: 'border-green-500/15', iconColor: 'text-green-400' },
  { color: 'from-emerald-900/30', border: 'border-emerald-500/15', iconColor: 'text-emerald-400' },
];

const DEFAULTS = {
  badge: 'Business Model',
  headlineLine1: 'Multiple Diversified',
  headlineLine2: 'Revenue Streams',
  subheadline: 'Havesta captures value across the supply chain — from logistics to storage to marketplace commerce — creating a resilient, multi-revenue infrastructure business.',
  streams: [
    { title: 'Delivery Revenue', model: 'Per-order', margin: '35–45%', desc: 'Revenue generated from B2B and B2C delivery of perishables and grocery items via our cold-chain fleet.' },
    { title: 'Storage & Warehousing', model: 'Monthly SLA', margin: '50–60%', desc: 'Recurring revenue from cold-storage rental contracts with FMCG brands, food processors, and agricultural cooperatives.' },
    { title: 'Marketplace Commission', model: '5–15% GMV take-rate', margin: '75–85%', desc: 'Commission earned on every transaction facilitated through the Havesta B2B procurement and B2C grocery marketplace.' },
    { title: 'B2B Contracts', model: 'Retainer + volume', margin: '40–55%', desc: 'Long-term supply agreements with hotels, hospitals, restaurant chains, and institutional food buyers requiring guaranteed supply.' },
    { title: 'Subscription Tiers', model: 'Monthly recurring', margin: '80–90%', desc: 'Premium membership tiers for both B2B buyers (priority supply, analytics dashboards) and B2C consumers (free delivery, discounts).' },
  ],
};

export default function BusinessModel() {
  const c = useContent('businessModel', DEFAULTS);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const renderCard = (s, i, delay) => {
    const Icon = STREAM_ICONS[i % STREAM_ICONS.length];
    const style = STREAM_STYLES[i % STREAM_STYLES.length];
    return (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay }}
        className={`glass-card rounded-2xl p-6 border ${style.border} bg-gradient-to-br ${style.color} to-transparent group hover:border-emerald-500/30 transition-all duration-300`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="p-2.5 rounded-xl bg-gray-900/60 border border-white/[0.06]">
            <Icon size={18} className={style.iconColor} />
          </div>
          <span className="text-[10px] text-gray-600 glass px-2 py-1 rounded-full border border-white/[0.05]">{s.model}</span>
        </div>
        <h3 className="text-white font-bold text-base mb-2">{s.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600">Est. gross margin:</span>
          <span className={`text-xs font-bold ${style.iconColor}`}>{s.margin}</span>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="business-model" className="relative py-16 md:py-28 px-4 md:px-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {c.streams.slice(0, 3).map((s, i) => renderCard(s, i, 0.2 + i * 0.1))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {c.streams.slice(3).map((s, i) => renderCard(s, i + 3, 0.5 + i * 0.1))}
        </div>
      </div>
    </section>
  );
}
