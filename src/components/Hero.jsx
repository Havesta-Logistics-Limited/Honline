import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

import { ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react';
import { useContent } from '../hooks/useContent';

const DEFAULTS = {
  badge: 'Seed Round Open · AgriTech Infrastructure · Nigeria & Africa',
  headlineLine1: "Building Africa's",
  headlineLine2: 'Cold-Chain Powered',
  headlineLine3: 'Food Infrastructure',
  subheadline: 'Havesta is a technology-enabled food distribution platform connecting farmers to businesses and consumers through cold-chain logistics, smart warehousing, and digital marketplace infrastructure.',
  cta1Label: 'Request Investor Deck',
  cta2Label: 'Explore the Platform',
  trustPills: ['Cold-Chain Certified', 'B2B + B2C Model', 'Real-Time Tracking'],
  stats: [
    { value: '$1T+', label: 'Africa Food Market by 2030' },
    { value: '40%', label: 'Post-Harvest Loss Rate' },
    { value: '200M+', label: 'Smallholder Farmers' },
    { value: '6%', label: 'Cold-Chain Penetration' },
  ],
};

const PILL_ICONS = [Shield, TrendingUp, Zap];

function CountUp({ target, duration = 2000 }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      observer.disconnect();
      const isPercent = target.includes('%');
      const isDollar = target.includes('$');
      const isPlus = target.includes('+');
      const raw = parseFloat(target.replace(/[^0-9.]/g, ''));
      const start = performance.now();
      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const cur = raw * eased;
        const formatted = cur >= 1000 ? `${(cur / 1000).toFixed(0)}K` : raw % 1 !== 0 ? cur.toFixed(1) : Math.floor(cur).toString();
        setDisplay(`${isDollar ? '$' : ''}${formatted}${isPercent ? '%' : ''}${isPlus ? '+' : ''}`);
        if (progress < 1) requestAnimationFrame(tick);
        else setDisplay(target);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{display}</span>;
}

export default function Hero() {
  const c = useContent('hero', DEFAULTS);

  return (
    <section className="relative py-20 pt-28 md:py-32 md:pt-36 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emerald-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-emerald-800/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 text-sm text-emerald-400 border border-emerald-500/20"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {c.badge}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-6"
        >
          <span className="text-white">{c.headlineLine1}</span>
          <br />
          <span className="text-gradient">{c.headlineLine2}</span>
          <br />
          <span className="text-white">{c.headlineLine3}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {c.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#invest"
            className="group inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 shadow-lg shadow-emerald-900/40"
          >
            {c.cta1Label}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          <a
            href="#solution"
            className="inline-flex items-center gap-2 glass border border-white/10 hover:border-emerald-500/30 text-white font-medium px-8 py-4 rounded-xl text-base transition-all duration-200"
          >
            {c.cta2Label}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-20"
        >
          {c.trustPills.map((text, idx) => {
            const Icon = PILL_ICONS[idx % PILL_ICONS.length];
            return (
              <div key={text} className="flex items-center gap-2 glass px-4 py-2 rounded-full text-xs text-gray-300 border border-white/[0.06]">
                <Icon size={13} className="text-emerald-400" />
                {text}
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {c.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
              className="glass-card rounded-2xl p-5 border border-white/[0.07] text-center"
            >
              <div className="text-3xl md:text-4xl font-black text-gradient mb-1">
                <CountUp target={s.value} />
              </div>
              <div className="text-xs text-gray-500 leading-snug">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none" />
    </section>
  );
}
