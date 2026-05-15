import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, DollarSign, Cpu, Users, Building2, CheckCircle } from 'lucide-react';
import { useContent } from '../hooks/useContent';

const FUND_ICONS = [Building2, Cpu, Users, DollarSign];

const DEFAULTS = {
  badge: 'Investment Opportunity',
  headlineLine1: 'Join Us in Building',
  headlineLine2: "Africa's Food Future",
  subheadline: 'Havesta is raising a $50,000 pre-seed round to validate cold-chain logistics, complete the MVP platform, and onboard the first batch of farmers and B2B clients in Lagos.',
  terms: [
    { label: 'Round Type', val: 'Pre-Seed' },
    { label: 'Raise Target', val: '$50,000 USD' },
    { label: 'Instrument', val: 'SAFE' },
    { label: 'Valuation Cap', val: '$1,500,000' },
    { label: 'Min. Ticket', val: '$5,000 USD' },
    { label: 'Runway', val: '~10 months' },
  ],
  useOfFunds: [
    { label: 'Cold-Chain Pilot Infrastructure', pct: 40, desc: 'Initial fleet deposit, cold-storage pilot unit, IoT sensors ($20,000)' },
    { label: 'Technology & Product', pct: 25, desc: 'Platform development, MVP completion, mobile apps ($12,500)' },
    { label: 'Team & Operations', pct: 20, desc: 'Key early hires, operations setup, contractor costs ($10,000)' },
    { label: 'Sales & Market Testing', pct: 15, desc: 'B2B outreach, farmer onboarding, early marketing ($7,500)' },
  ],
  formTitle: 'Request Investor Materials',
  formButtonLabel: 'Request Investor Deck',
  formNote: 'We respond within 24 hours. No spam, ever.',
};

export default function Investment() {
  const c = useContent('investment', DEFAULTS);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', org: '', amount: '', message: '' });

  function handleSubmit(e) {
    e.preventDefault();
    const leads = JSON.parse(localStorage.getItem('havesta_leads') || '[]');
    leads.unshift({ ...form, submittedAt: new Date().toISOString() });
    localStorage.setItem('havesta_leads', JSON.stringify(leads));
    window.dispatchEvent(new CustomEvent('havesta:lead'));
    setSubmitted(true);
  }

  return (
    <section id="invest" className="relative py-16 md:py-28 px-4 md:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(16,185,129,0.07),transparent_60%)]" />

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5"
          >
            <div className="glass-card rounded-2xl border border-emerald-500/15 p-7 bg-gradient-to-br from-emerald-950/20 to-transparent">
              <div className="text-gray-400 text-xs uppercase tracking-widest mb-5 flex items-center gap-2">
                <DollarSign size={12} className="text-emerald-400" />
                Deal Terms
              </div>
              <div className="space-y-3">
                {c.terms.map((t, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-white/[0.05]">
                    <span className="text-gray-500 text-sm">{t.label}</span>
                    <span className="text-white font-semibold text-sm">{t.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl border border-white/[0.07] p-7">
              <div className="text-gray-400 text-xs uppercase tracking-widest mb-5">Use of Funds</div>
              <div className="space-y-4">
                {c.useOfFunds.map((u, i) => {
                  const Icon = FUND_ICONS[i % FUND_ICONS.length];
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <Icon size={13} className="text-emerald-400" />
                          <span className="text-gray-300 text-sm">{u.label}</span>
                        </div>
                        <span className="text-emerald-400 font-bold text-sm">{u.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-800 rounded-full">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${u.pct}%` } : {}}
                          transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                          className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
                        />
                      </div>
                      <div className="text-gray-600 text-xs mt-1">{u.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="glass-card rounded-2xl border border-white/[0.07] p-7 h-full">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-5">
                    <CheckCircle size={24} className="text-emerald-400" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Message Received</h3>
                  <p className="text-gray-400 text-sm max-w-xs">Thank you for your interest in Havesta. Our team will be in touch within 24 hours.</p>
                </div>
              ) : (
                <>
                  <div className="text-gray-400 text-xs uppercase tracking-widest mb-6">{c.formTitle}</div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-500 text-xs mb-1.5">Full Name</label>
                        <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full bg-gray-900/60 border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-emerald-500/40 transition-colors" placeholder="Your full name" />
                      </div>
                      <div>
                        <label className="block text-gray-500 text-xs mb-1.5">Phone Number</label>
                        <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="w-full bg-gray-900/60 border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-emerald-500/40 transition-colors" placeholder="+1 234 567 8900" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-500 text-xs mb-1.5">Email Address</label>
                      <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full bg-gray-900/60 border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-emerald-500/40 transition-colors" placeholder="investor@firm.com" />
                    </div>
                    <div>
                      <label className="block text-gray-500 text-xs mb-1.5">Organization / Fund</label>
                      <input value={form.org} onChange={e => setForm(f => ({ ...f, org: e.target.value }))} className="w-full bg-gray-900/60 border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-emerald-500/40 transition-colors" placeholder="VC Fund, Angel, Strategic partner" />
                    </div>
                    <div>
                      <label className="block text-gray-500 text-xs mb-1.5">Investment Amount (USD)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 font-bold text-sm">$</span>
                        <input type="number" min="0" step="1000" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} className="w-full bg-gray-900/60 border border-white/[0.08] rounded-xl pl-8 pr-4 py-3 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-emerald-500/40 transition-colors" placeholder="5,000" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-500 text-xs mb-1.5">Message</label>
                      <textarea rows={3} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} className="w-full bg-gray-900/60 border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-emerald-500/40 transition-colors resize-none" placeholder="Tell us about your investment interest..." />
                    </div>
                    <button type="submit" className="w-full group flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3.5 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-emerald-900/40">
                      {c.formButtonLabel}
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-gray-700 text-xs text-center">{c.formNote}</p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
