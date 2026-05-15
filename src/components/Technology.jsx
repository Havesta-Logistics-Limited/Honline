import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Activity, Cpu, Map, Database, BarChart3, Lock } from 'lucide-react';
import { useContent } from '../hooks/useContent';

const PILLAR_ICONS = [Activity, Cpu, Map, Database, BarChart3, Lock];

const DEFAULTS = {
  badge: 'Technology & Infrastructure',
  headlineLine1: 'Software-Defined',
  headlineLine2: 'Food Logistics',
  subheadline: 'Havesta is a technology company that operates physical infrastructure — not a logistics company that uses software. The distinction defines our scalability and margin profile.',
  pillars: [
    { title: 'Real-Time Logistics Engine', tag: 'Logistics AI', desc: 'AI-powered route optimization and dynamic dispatch system that coordinates fleet movements, reduces transit time by 40%, and ensures on-time cold-chain delivery.' },
    { title: 'IoT Cold-Chain Monitoring', tag: 'IoT Infrastructure', desc: 'Hardware sensors embedded throughout storage facilities and delivery vehicles continuously monitor temperature, humidity, and product integrity in real-time.' },
    { title: 'Geospatial Intelligence', tag: 'Geo-Intelligence', desc: 'Proprietary mapping and geo-data layer that identifies demand clusters, optimizes warehouse positioning, and predicts last-mile delivery windows at street level.' },
    { title: 'Supply Chain Data Platform', tag: 'Data Platform', desc: 'Centralized data warehouse collecting SKU-level inventory, pricing, delivery, and farmer data — enabling actionable intelligence across the entire supply chain.' },
    { title: 'Demand Forecasting', tag: 'ML / Forecasting', desc: 'Machine learning models trained on historical order data, seasonal patterns, and market signals to predict demand and reduce food waste through proactive supply planning.' },
    { title: 'Vendor & Farmer OS', tag: 'Mobile-First', desc: 'Mobile-first dashboard for farmers and vendors to manage inventory, track payments, view demand forecasts, and receive smart logistics alerts — accessible on USSD and app.' },
  ],
};

export default function Technology() {
  const c = useContent('technology', DEFAULTS);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="technology" className="relative py-16 md:py-28 px-4 md:px-6">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-emerald-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-teal-900/10 blur-[100px] pointer-events-none" />

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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card rounded-3xl border border-white/[0.07] overflow-hidden mb-14"
        >
          <div className="bg-gray-900/60 border-b border-white/[0.06] px-6 py-3 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <span className="text-gray-600 text-xs">havesta.logistics — Operations Dashboard</span>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-[10px]">LIVE</span>
            </div>
          </div>
          <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Active Deliveries', val: '142', sub: '+12% vs yesterday', color: 'text-emerald-400' },
              { label: 'Avg. Cold Temp', val: '4.2°C', sub: 'Within spec ✓', color: 'text-teal-400' },
              { label: 'Orders Processed', val: '2,847', sub: 'Today', color: 'text-emerald-400' },
              { label: 'On-Time Rate', val: '96.4%', sub: '↑ 2.1% this week', color: 'text-green-400' },
            ].map((m) => (
              <div key={m.label} className="glass-card rounded-xl p-4 border border-white/[0.06]">
                <div className="text-gray-600 text-[10px] mb-1">{m.label}</div>
                <div className={`text-2xl font-black ${m.color} mb-1`}>{m.val}</div>
                <div className="text-gray-600 text-[10px]">{m.sub}</div>
              </div>
            ))}
          </div>
          <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 glass-card rounded-xl p-4 border border-white/[0.06]">
              <div className="text-gray-600 text-[10px] mb-3">Fleet Temperature Map — Lagos Operations Zone</div>
              <div className="relative h-28 bg-gray-900/40 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full opacity-30 bg-[radial-gradient(ellipse_at_30%_50%,rgba(16,185,129,0.4),transparent_60%),radial-gradient(ellipse_at_70%_30%,rgba(20,184,166,0.3),transparent_50%)]" />
                </div>
                {[
                  { top: '30%', left: '20%', label: 'VEH-017', temp: '3.8°C' },
                  { top: '50%', left: '55%', label: 'VEH-042', temp: '4.1°C' },
                  { top: '25%', left: '75%', label: 'VEH-009', temp: '3.9°C' },
                ].map((v) => (
                  <div key={v.label} className="absolute" style={{ top: v.top, left: v.left }}>
                    <div className="glass px-2 py-1 rounded-lg border border-emerald-500/20 text-[9px] text-emerald-400 whitespace-nowrap">
                      {v.label} · {v.temp}
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mx-auto mt-0.5 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card rounded-xl p-4 border border-white/[0.06]">
              <div className="text-gray-600 text-[10px] mb-3">Supply Chain Health</div>
              {[
                { label: 'Cold Chain Integrity', pct: 98 },
                { label: 'Route Efficiency', pct: 94 },
                { label: 'Farmer Network', pct: 87 },
              ].map((b) => (
                <div key={b.label} className="mb-3">
                  <div className="flex justify-between text-[10px] text-gray-600 mb-1">
                    <span>{b.label}</span><span className="text-emerald-400">{b.pct}%</span>
                  </div>
                  <div className="h-1 bg-gray-800 rounded-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${b.pct}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {c.pillars.map((p, i) => {
            const Icon = PILLAR_ICONS[i % PILLAR_ICONS.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                className="glass-card rounded-2xl p-6 border border-white/[0.07] group hover:border-emerald-500/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <Icon size={18} className="text-emerald-400" />
                  </div>
                  <span className="text-[10px] text-emerald-500/60 font-semibold glass px-2 py-1 rounded-full border border-emerald-500/10">
                    {p.tag}
                  </span>
                </div>
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-emerald-300 transition-colors">{p.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
