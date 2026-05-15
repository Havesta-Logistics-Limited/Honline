import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp } from 'lucide-react';
import { useContent } from '../hooks/useContent';

const DEFAULTS = {
  badge: 'Traction & Roadmap',
  headlineLine1: 'Building Towards',
  headlineLine2: 'Continental Scale',
  subheadline: 'Havesta is at pre-seed stage — platform built, first pilots underway, and a clear path from $50K validation round through seed to Series A and continental scale.',
  milestones: [
    { phase: 'Q1 2025', title: 'Concept & Validation', desc: 'Business model validated, founding team formed, initial farmer and B2B interviews completed in Lagos.', done: true },
    { phase: 'Q2 2025', title: 'MVP Development', desc: 'Core marketplace and logistics platform MVP built. First pilot conversations with Lagos restaurants and food retailers.', done: true },
    { phase: 'Q3 2025', title: 'Pre-Seed Close ($50K)', desc: 'Close $50,000 pre-seed. Deploy cold-chain pilot unit, onboard first 20 farmers, sign 5 B2B clients.', done: false },
    { phase: 'Q4 2025', title: 'Lagos Pilot Launch', desc: 'Live operations in Lagos — cold-chain delivery, marketplace transactions, and B2B supply contracts activated.', done: false },
    { phase: 'Q2 2026', title: 'Seed Round ($500K)', desc: 'Raise seed round on proven unit economics. Expand to Abuja, grow farmer network to 500+, 50+ B2B clients.', done: false },
    { phase: '2027', title: 'Series A & Pan-Africa', desc: 'Raise Series A. Expand into Ghana, Kenya, and additional Nigerian cities with proven cold-chain model.', done: false },
  ],
  projections: [
    { label: 'Farmers Onboarded', year1: '20–50', year3: '5,000+' },
    { label: 'B2B Clients', year1: '5–10', year3: '500+' },
    { label: 'Monthly GMV', year1: '$10K–$20K', year3: '$2M+' },
    { label: 'Cities Covered', year1: '1 (Lagos)', year3: '4+' },
  ],
};

export default function Traction() {
  const c = useContent('traction', DEFAULTS);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="traction" className="relative py-16 md:py-28 px-4 md:px-6 bg-gradient-to-b from-gray-900/10 to-gray-950">
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

        <div className="relative mb-14">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/20 via-emerald-500/10 to-transparent" />
          <div className="space-y-6">
            {c.milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                className={`relative flex items-start gap-5 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="flex-1 pl-10 md:pl-0">
                  <div className={`glass-card rounded-xl p-5 border ${m.done ? 'border-emerald-500/25 bg-emerald-950/10' : 'border-white/[0.06]'} max-w-sm ${i % 2 !== 0 ? 'md:ml-auto' : ''}`}>
                    <div className={`text-xs font-bold mb-1 ${m.done ? 'text-emerald-400' : 'text-gray-600'}`}>{m.phase} {m.done && '✓'}</div>
                    <div className="text-white font-semibold text-sm mb-1">{m.title}</div>
                    <div className="text-gray-600 text-xs leading-relaxed">{m.desc}</div>
                  </div>
                </div>
                <div className="absolute left-4 md:left-1/2 top-5 -translate-x-1/2">
                  <div className={`w-3 h-3 rounded-full border-2 ${m.done ? 'bg-emerald-500 border-emerald-400' : 'bg-gray-800 border-gray-700'}`} />
                </div>
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="glass-card rounded-2xl border border-white/[0.07] overflow-hidden"
        >
          <div className="p-6 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-emerald-400" />
              <span className="text-white font-semibold text-sm">3-Year Growth Projections</span>
              <span className="text-[10px] text-gray-600 glass px-2 py-0.5 rounded-full border border-white/[0.05] ml-2">Conservative estimates</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 [&>*]:border-b [&>*]:border-white/[0.06] md:[&>*]:border-b-0 md:[&>*:not(:last-child)]:border-r [&>*:nth-child(odd)]:border-r [&>*:nth-child(odd)]:border-white/[0.06] md:[&>*:nth-child(3)]:border-r md:[&>*:nth-child(odd)]:border-r-0">
            {c.projections.map((p, i) => (
              <div key={i} className="p-6 text-center">
                <div className="text-gray-600 text-[10px] mb-3 uppercase tracking-wider">{p.label}</div>
                <div className="flex items-end justify-center gap-3">
                  <div>
                    <div className="text-gray-500 text-xs mb-0.5">Year 1</div>
                    <div className="text-xl font-bold text-white">{p.year1}</div>
                  </div>
                  <div className="text-emerald-600 text-lg mb-0.5">→</div>
                  <div>
                    <div className="text-gray-500 text-xs mb-0.5">Year 3</div>
                    <div className="text-xl font-bold text-gradient">{p.year3}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
