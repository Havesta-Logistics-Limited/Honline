import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Thermometer, AlertTriangle, GitBranch, TrendingDown, Users, Package } from 'lucide-react';
import { useContent } from '../hooks/useContent';

const ICONS = [Package, Thermometer, GitBranch, TrendingDown, AlertTriangle, Users];
const STYLES = [
  { color: 'from-red-900/40 to-red-950/20', border: 'border-red-500/20', iconColor: 'text-red-400' },
  { color: 'from-orange-900/40 to-orange-950/20', border: 'border-orange-500/20', iconColor: 'text-orange-400' },
  { color: 'from-yellow-900/30 to-yellow-950/20', border: 'border-yellow-500/20', iconColor: 'text-yellow-400' },
  { color: 'from-rose-900/30 to-rose-950/20', border: 'border-rose-500/20', iconColor: 'text-rose-400' },
  { color: 'from-red-900/30 to-red-950/20', border: 'border-red-500/20', iconColor: 'text-red-400' },
  { color: 'from-amber-900/30 to-amber-950/20', border: 'border-amber-500/20', iconColor: 'text-amber-400' },
];

const DEFAULTS = {
  badge: 'The Problem',
  headlineLine1: "Africa's Food System",
  headlineLine2: 'Is Broken',
  subheadline: "Nigeria and Africa are sitting on the world's largest agricultural opportunity — yet food wastage, broken logistics, and absent cold-chain infrastructure are costing the continent billions every year.",
  bannerStat: '$9,000,000,000',
  bannerDesc: 'lost in food wastage across Nigeria every single year',
  cards: [
    { stat: '40%', title: 'Post-Harvest Loss', desc: 'Nearly 40% of all harvested food in Nigeria is lost before reaching consumers — a $9 billion annual crisis.' },
    { stat: '6%', title: 'Cold-Chain Penetration', desc: "Only 6% of Nigeria's food supply chain is cold-chain enabled, leaving perishables vulnerable at every touchpoint." },
    { stat: '7+', title: 'Middlemen Layers', desc: 'Farmers receive as little as 20% of final retail price due to deeply fragmented and exploitative distribution chains.' },
    { stat: '35%', title: 'Price Inflation', desc: 'Food inflation exceeds 35% annually in Nigeria — driven entirely by supply chain inefficiency, not supply scarcity.' },
    { stat: '$9B', title: 'Annual Wastage Cost', desc: 'Nigeria loses over $9 billion in food value annually — one of the highest food wastage rates on the continent.' },
    { stat: '200M+', title: 'Underserved Farmers', desc: 'Over 200 million smallholder farmers across Africa have no reliable market access, price visibility, or logistics support.' },
  ],
};

function Card({ card, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = ICONS[index % ICONS.length];
  const style = STYLES[index % STYLES.length];
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative glass-card rounded-2xl p-6 border ${style.border} bg-gradient-to-br ${style.color} group hover:scale-[1.02] transition-transform duration-300`}
    >
      <div className="inline-flex p-2.5 rounded-xl bg-gray-900/60 mb-4">
        <Icon size={20} className={style.iconColor} />
      </div>
      <div className={`text-3xl font-black ${style.iconColor} mb-2`}>{card.stat}</div>
      <h3 className="text-white font-semibold text-base mb-2">{card.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
    </motion.div>
  );
}

export default function Problem() {
  const c = useContent('problem', DEFAULTS);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="problem" className="relative py-16 md:py-28 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold text-red-400 tracking-widest uppercase mb-4 glass px-3 py-1.5 rounded-full border border-red-500/20">
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-card rounded-3xl p-8 md:p-12 border border-red-500/10 bg-gradient-to-br from-red-950/30 to-gray-950 mb-12 text-center"
        >
          <div className="text-3xl sm:text-5xl md:text-7xl font-black text-red-400 mb-3 break-all">{c.bannerStat}</div>
          <div className="text-gray-400 text-lg">{c.bannerDesc.replace(' every single year', '')} <span className="text-white font-semibold">every single year</span></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {c.cards.map((card, i) => (
            <Card key={i} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
