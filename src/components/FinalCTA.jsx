import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Mail, Calendar } from 'lucide-react';
import { useContent } from '../hooks/useContent';

const DEFAULTS = {
  badge: 'Pre-Seed Round Open · $50,000',
  headlineLine1: 'The Infrastructure',
  headlineLine2: "Africa Has Been Waiting For",
  subheadline: "Havesta is not building another food delivery app. We are building the cold-chain backbone that will move Africa's agricultural economy from fragmented and wasteful to integrated and intelligent.",
  cta1Label: 'Request Investor Deck',
  cta2Label: 'Schedule a Call',
  contactInfo: ['urutechenterprise@gmail.com', 'havesta.co', 'Lagos, Nigeria'],
};

export default function FinalCTA() {
  const c = useContent('finalCTA', DEFAULTS);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-16 md:py-28 px-4 md:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(16,185,129,0.12),transparent_70%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 text-sm text-emerald-400 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {c.badge}
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight leading-[0.95] mb-6">
            {c.headlineLine1}
            <br />
            <span className="text-gradient">{c.headlineLine2}</span>
          </h2>

          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            {c.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="#invest" className="group inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 shadow-lg shadow-emerald-900/50">
              <Mail size={18} />
              {c.cta1Label}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#invest" className="inline-flex items-center gap-2 glass border border-white/10 hover:border-emerald-500/30 text-white font-medium px-8 py-4 rounded-xl text-base transition-all duration-200">
              <Calendar size={16} className="text-emerald-400" />
              {c.cta2Label}
            </a>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
            {c.contactInfo.map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-600" />
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
