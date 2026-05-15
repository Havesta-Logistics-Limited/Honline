import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Truck, Warehouse, ShoppingCart, BarChart2, Wifi, MapPin } from 'lucide-react';
import { useContent } from '../hooks/useContent';

const PILLAR_ICONS = [Truck, Warehouse, ShoppingCart, BarChart2, MapPin, Wifi];

const DEFAULTS = {
  badge: 'The Solution',
  headlineLine1: 'One Integrated',
  headlineLine2: 'Food Infrastructure',
  subheadline: 'Havesta integrates cold-chain logistics, digital commerce, and supply chain technology into a single operating system for food distribution across Africa.',
  pillars: [
    { title: 'Cold-Chain Logistics', badge: 'Core Infrastructure', desc: "Refrigerated transportation and last-mile delivery across Nigeria's key agricultural corridors, maintaining product integrity from farm gate to consumer." },
    { title: 'Smart Warehousing', badge: 'Storage Layer', desc: 'Temperature-controlled storage facilities with IoT monitoring, inventory management, and real-time reporting for B2B clients and marketplaces.' },
    { title: 'Digital Marketplace', badge: 'Commerce Layer', desc: 'A dual-sided B2B and B2C marketplace connecting farmers, wholesalers, retailers, and consumers — with transparent pricing and quality guarantees.' },
    { title: 'Supply Chain Intelligence', badge: 'Intelligence Layer', desc: 'Data-driven demand forecasting, route optimization, and supply-demand matching tools that reduce waste and improve margins across the network.' },
    { title: 'Last-Mile Delivery', badge: 'Fulfillment Layer', desc: 'Hyper-local fulfillment networks for B2C grocery delivery and B2B food supply — with same-day and scheduled delivery windows across urban hubs.' },
    { title: 'IoT Monitoring', badge: 'Tech Layer', desc: 'Real-time temperature, humidity, and geolocation sensors embedded throughout the cold-chain ensuring product quality at every step.' },
  ],
};

function Pillar({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = PILLAR_ICONS[index % PILLAR_ICONS.length];
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group glass-card rounded-2xl p-6 border border-white/[0.07] hover:border-emerald-500/20 transition-all duration-300 hover:bg-emerald-950/10"
    >
      <div className="flex items-start justify-between mb-5">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <Icon size={20} className="text-emerald-400" />
        </div>
        <span className="text-[10px] font-semibold text-emerald-500/70 tracking-widest uppercase glass px-2 py-1 rounded-full border border-emerald-500/10">
          {item.badge}
        </span>
      </div>
      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-emerald-300 transition-colors">{item.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
    </motion.div>
  );
}

export default function Solution() {
  const c = useContent('solution', DEFAULTS);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="solution" className="relative py-16 md:py-28 px-4 md:px-6 bg-gradient-to-b from-gray-950 to-gray-900/30">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-900/10 blur-[120px] pointer-events-none" />

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
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">{c.subheadline}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass-card rounded-3xl p-8 border border-emerald-500/10 mb-14 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 to-transparent pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 text-center">
            {[
              { label: 'FARMERS', sub: '200M+ across Nigeria & Africa', icon: '🌾' },
              { label: 'HAVESTA', sub: 'Cold-chain · Marketplace · Fulfillment', icon: '⚡', highlight: true },
              { label: 'BUSINESSES', sub: 'Restaurants, retailers, FMCG brands', icon: '🏢' },
              { label: 'CONSUMERS', sub: 'Urban households & communities', icon: '🏠' },
            ].map((node, i) => (
              <div key={node.label} className="flex items-center gap-4 flex-1">
                <div className={`flex-1 ${node.highlight ? 'scale-110' : ''}`}>
                  <div className={`inline-flex flex-col items-center p-5 rounded-2xl ${
                    node.highlight
                      ? 'bg-emerald-500/15 border border-emerald-500/30 glow-emerald'
                      : 'bg-white/[0.03] border border-white/[0.07]'
                  }`}>
                    <span className="text-3xl mb-2">{node.icon}</span>
                    <div className={`text-xs font-black tracking-widest uppercase ${node.highlight ? 'text-emerald-400' : 'text-gray-300'}`}>{node.label}</div>
                    <div className="text-[10px] text-gray-500 mt-1 max-w-[120px]">{node.sub}</div>
                  </div>
                </div>
                {i < 3 && (
                  <div className="hidden md:flex flex-col items-center gap-1">
                    <div className="w-8 h-px bg-gradient-to-r from-emerald-500/50 to-emerald-500/10" />
                    <div className="text-emerald-500/30 text-xs">▶</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {c.pillars.map((p, i) => <Pillar key={i} item={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
