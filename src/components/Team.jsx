import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Globe } from 'lucide-react';
import { useContent } from '../hooks/useContent';

const MEMBER_GRADS = [
  'from-emerald-800/60 to-emerald-950',
  'from-teal-800/60 to-teal-950',
  'from-green-800/60 to-green-950',
  'from-emerald-800/50 to-gray-950',
];

const DEFAULTS = {
  badge: 'The Team',
  headlineLine1: 'Operators Who',
  headlineLine2: 'Know This Market',
  subheadline: 'Our team combines deep African logistics and operations expertise with world-class technology experience — built to execute, not just pitch.',
  members: [
    { name: 'Adewale Okonkwo', role: 'CEO & Co-Founder', bio: 'Former operations lead at a Pan-African logistics firm. 8+ years in supply chain and food distribution across West Africa. MBA, Lagos Business School.', initials: 'AO', tag: 'Operations · Strategy' },
    { name: 'Chidinma Eze', role: 'CTO & Co-Founder', bio: 'Ex-Senior Engineer at Flutterwave. Built marketplace and payments infrastructure at scale. MSc Computer Science, UCL. Full-stack and systems architecture.', initials: 'CE', tag: 'Engineering · Architecture' },
    { name: 'Emeka Nwosu', role: 'VP Growth', bio: 'Built merchant networks for two leading Nigerian fintech startups. Specialist in B2B sales, partnership development, and market expansion across Nigeria.', initials: 'EN', tag: 'Growth · BD' },
    { name: 'Amara Osei', role: 'VP Marketing & Brand', bio: 'Brand strategist with experience across Jumia, Andela, and Pan-African FMCG brands. Builds category-defining go-to-market strategies for tech startups.', initials: 'AO', tag: 'Brand · GTM' },
  ],
  advisors: [
    { name: 'Dr. Fatima Bello', role: 'AgriTech Policy Advisor', org: 'Former Director, NAFDAC' },
    { name: 'James Kariuki', role: 'Logistics Infrastructure', org: 'Ex-VP, DHL Africa' },
    { name: 'Ngozi Adichie-Obi', role: 'Africa VC Networks', org: 'Partner, TLCom Capital' },
  ],
};

export default function Team() {
  const c = useContent('team', DEFAULTS);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="team" className="relative py-16 md:py-28 px-4 md:px-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {c.members.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
              className="glass-card rounded-2xl border border-white/[0.07] overflow-hidden group hover:border-emerald-500/20 transition-all duration-300"
            >
              <div className={`relative h-36 bg-gradient-to-br ${MEMBER_GRADS[i % MEMBER_GRADS.length]} flex items-center justify-center`}>
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15),transparent)]" />
                <div className="relative w-16 h-16 rounded-2xl glass flex items-center justify-center border border-white/10">
                  <span className="text-2xl font-black text-white/80">{member.initials}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="text-[10px] text-emerald-500/60 font-semibold tracking-wider mb-1">{member.tag}</div>
                <h3 className="text-white font-bold text-base mb-0.5">{member.name}</h3>
                <div className="text-emerald-400 text-xs mb-3">{member.role}</div>
                <p className="text-gray-500 text-xs leading-relaxed mb-4">{member.bio}</p>
                <div className="flex gap-2">
                  <button className="p-1.5 glass rounded-lg border border-white/[0.06] hover:border-emerald-500/20 transition-colors">
                    <ExternalLink size={12} className="text-gray-500 hover:text-emerald-400" />
                  </button>
                  <button className="p-1.5 glass rounded-lg border border-white/[0.06] hover:border-emerald-500/20 transition-colors">
                    <Globe size={12} className="text-gray-500 hover:text-emerald-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {c.advisors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="glass-card rounded-2xl border border-white/[0.07] p-7"
          >
            <div className="text-gray-600 text-xs uppercase tracking-widest mb-5">Strategic Advisors</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {c.advisors.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-950/50 border border-emerald-500/15 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-black text-emerald-500">{a.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{a.name}</div>
                    <div className="text-emerald-400 text-xs">{a.role}</div>
                    <div className="text-gray-600 text-xs">{a.org}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
