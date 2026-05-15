import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Globe, Target, Crosshair, TrendingUp } from 'lucide-react';
import { useContent } from '../hooks/useContent';

const MARKET_ICONS = [Globe, Target, Crosshair];
const MARKET_STYLES = [
  { color: 'from-emerald-900/30 to-gray-950', ring: 'border-emerald-500/20', iconColor: 'text-emerald-400' },
  { color: 'from-teal-900/30 to-gray-950', ring: 'border-teal-500/20', iconColor: 'text-teal-400' },
  { color: 'from-cyan-900/30 to-gray-950', ring: 'border-cyan-500/20', iconColor: 'text-cyan-400' },
];

const DEFAULTS = {
  badge: 'Market Opportunity',
  headlineLine1: 'A Trillion-Dollar',
  headlineLine2: 'Structural Gap',
  subheadline: "Africa's food market is one of the world's fastest-growing. Havesta is entering at the inflection point — where digital infrastructure meets physical supply chain.",
  markets: [
    { label: 'TAM', sublabel: 'Total Addressable Market', value: '$1T+', desc: "Africa's total food market by 2030, driven by population growth, urbanization, and rising middle-class consumption." },
    { label: 'SAM', sublabel: 'Serviceable Addressable Market', value: '$150B', desc: "Nigeria's food retail and distribution market — one of Africa's largest, with ~220M consumers and $50B+ grocery spend annually." },
    { label: 'SOM', sublabel: 'Serviceable Obtainable Market', value: '$2.4B', desc: "Target cold-chain and digital food distribution segment across Lagos, Abuja, and Kano — Havesta's initial operational zones." },
  ],
  tailwinds: [
    { stat: '6.5%', label: 'Nigeria GDP growth driven by agriculture' },
    { stat: '53%', label: 'Urban population by 2035' },
    { stat: '3×', label: 'Online grocery growth forecast' },
    { stat: '$4.8B', label: 'African cold-chain market by 2027' },
  ],
};

export default function Market() {
  const c = useContent('market', DEFAULTS);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="market" className="relative py-16 md:py-28 px-4 md:px-6 bg-gradient-to-b from-gray-900/20 to-gray-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {c.markets.map((m, i) => {
            const Icon = MARKET_ICONS[i % MARKET_ICONS.length];
            const style = MARKET_STYLES[i % MARKET_STYLES.length];
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className={`glass-card rounded-2xl p-7 border ${style.ring} bg-gradient-to-br ${style.color}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gray-900/60 border border-white/[0.06]">
                    <Icon size={16} className={style.iconColor} />
                  </div>
                  <div>
                    <div className="text-white font-black text-sm">{m.label}</div>
                    <div className="text-gray-600 text-[10px]">{m.sublabel}</div>
                  </div>
                </div>
                <div className="text-4xl font-black text-gradient mb-3">{m.value}</div>
                <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="glass-card rounded-2xl p-8 border border-white/[0.07]"
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp size={16} className="text-emerald-400" />
            <span className="text-white font-semibold text-sm">Market Tailwinds</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {c.tailwinds.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-3xl font-black text-emerald-400 mb-1">{t.stat}</div>
                <div className="text-gray-500 text-xs">{t.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
