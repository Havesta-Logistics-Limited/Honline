import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Leaf, ArrowRight, Building2, ShoppingBag } from 'lucide-react';
import { useContent } from '../hooks/useContent';

const STEP_ICONS = [Leaf, Building2, ShoppingBag, ShoppingBag];
const STEP_STYLES = [
  { color: 'from-green-900/40 to-green-950/20', border: 'border-green-500/20', iconBg: 'bg-green-500/10 border-green-500/20', iconColor: 'text-green-400', highlight: false },
  { color: 'from-emerald-900/40 to-emerald-950/20', border: 'border-emerald-500/20', iconBg: 'bg-emerald-500/10 border-emerald-500/20', iconColor: 'text-emerald-400', highlight: true },
  { color: 'from-teal-900/30 to-teal-950/20', border: 'border-teal-500/20', iconBg: 'bg-teal-500/10 border-teal-500/20', iconColor: 'text-teal-400', highlight: false },
  { color: 'from-cyan-900/30 to-cyan-950/20', border: 'border-cyan-500/20', iconBg: 'bg-cyan-500/10 border-cyan-500/20', iconColor: 'text-cyan-400', highlight: false },
];

const DEFAULTS = {
  badge: 'How It Works',
  headlineLine1: 'From Farm Gate',
  headlineLine2: 'To Final Mile',
  subheadline: 'A seamless, technology-orchestrated flow that eliminates waste and inefficiency at every step.',
  summaryText: "Havesta acts as the operating layer between agricultural supply and food demand — combining physical cold-chain infrastructure with a software-driven marketplace to create Africa's most efficient food distribution network.",
  steps: [
    { step: '01', title: 'Farmer Onboarding', desc: 'Farmers register on the Havesta platform via mobile or agent-assisted onboarding, list their produce, set pricing, and connect to our fulfilment network.' },
    { step: '02', title: 'Havesta Infrastructure', desc: 'Our logistics engine coordinates cold-chain pickup, warehousing, quality grading, smart packaging, and inventory management across regional hubs.' },
    { step: '03', title: 'B2B Order Fulfilment', desc: 'Restaurants, supermarkets, hotels, and FMCG brands place bulk orders via our B2B portal. Havesta fulfils via temperature-controlled fleet delivery.' },
    { step: '04', title: 'B2C Consumer Delivery', desc: 'Urban households and individuals order fresh groceries via the Havesta app and receive same-day or next-day delivery from verified cold-chain stock.' },
  ],
};

export default function HowItWorks() {
  const c = useContent('howItWorks', DEFAULTS);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="how-it-works" className="relative py-16 md:py-28 px-4 md:px-6">
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
          <p className="text-gray-400 text-lg max-w-xl mx-auto">{c.subheadline}</p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {c.steps.map((s, i) => {
              const Icon = STEP_ICONS[i % STEP_ICONS.length];
              const style = STEP_STYLES[i % STEP_STYLES.length];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                  className={`relative glass-card rounded-2xl p-6 border ${style.border} bg-gradient-to-br ${style.color} ${style.highlight ? 'ring-1 ring-emerald-500/30 glow-emerald' : ''}`}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-2.5 rounded-xl border ${style.iconBg}`}>
                      <Icon size={18} className={style.iconColor} />
                    </div>
                    <span className="text-4xl font-black text-white/[0.06]">{s.step}</span>
                  </div>
                  <h3 className="text-white font-bold text-base mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>

                  {i < c.steps.length - 1 && (
                    <div className="lg:hidden flex justify-center mt-5">
                      <ArrowRight size={16} className="text-emerald-500/40" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-12 glass-card rounded-2xl p-8 border border-emerald-500/10 text-center"
        >
          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            {c.summaryText.split('operating layer').length > 1 ? (
              <>
                {c.summaryText.split('operating layer')[0]}
                <span className="text-emerald-400 font-semibold">operating layer</span>
                {c.summaryText.split('operating layer')[1]}
              </>
            ) : c.summaryText}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
