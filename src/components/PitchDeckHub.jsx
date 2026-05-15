import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { X, Maximize2, Presentation, FileText, Download } from 'lucide-react';

// ── Slide previews for v2 deck ────────────────────────────────
const SLIDE_PREVIEWS = [
  { id: 1,  label: 'Cover',          emoji: '🌍', color: 'bg-[#15402A]' },
  { id: 2,  label: 'Problem',        emoji: '⚠️', color: 'bg-[#F4EEDF]' },
  { id: 3,  label: 'Why Now',        emoji: '⚡', color: 'bg-[#F4EEDF]' },
  { id: 4,  label: 'Solution',       emoji: '🧩', color: 'bg-[#F4EEDF]' },
  { id: 5,  label: 'How It Works',   emoji: '⚙️', color: 'bg-[#F4EEDF]' },
  { id: 6,  label: 'Market',         emoji: '📈', color: 'bg-[#F4EEDF]' },
  { id: 7,  label: 'Business Model', emoji: '💰', color: 'bg-[#F4EEDF]' },
  { id: 8,  label: 'GTM',            emoji: '🗺️', color: 'bg-[#F4EEDF]' },
  { id: 9,  label: 'Competition',    emoji: '🛡️', color: 'bg-[#F4EEDF]' },
  { id: 10, label: 'Roadmap',        emoji: '🚀', color: 'bg-[#F4EEDF]' },
  { id: 11, label: 'Team',           emoji: '👥', color: 'bg-[#F4EEDF]' },
  { id: 12, label: 'Financials',     emoji: '📊', color: 'bg-[#F4EEDF]' },
  { id: 13, label: 'The Ask',        emoji: '💼', color: 'bg-[#15402A]' },
  { id: 14, label: 'Closing',        emoji: '🤝', color: 'bg-[#F4EEDF]' },
];

// placeholder that never runs but satisfies the old reference — replaced below
const slides = [
  {
    id: 1,
    title: 'Cover',
    thumb: '🌍',
    content: (
      <div className="h-full bg-gray-950 text-white flex flex-col justify-between p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(16,185,129,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="relative flex items-center gap-3">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-emerald-500 rounded-lg rotate-45 opacity-80" />
            <div className="absolute inset-1 bg-gray-950 rounded-md rotate-45" />
            <span className="absolute inset-0 flex items-center justify-center text-emerald-400 font-black text-sm">H</span>
          </div>
          <span className="text-white font-bold">Havesta Logistics Limited</span>
        </div>
        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
            Building Africa's<br />
            <span className="text-emerald-400">Cold-Chain Powered</span><br />
            Food Infrastructure
          </h1>
          <p className="text-gray-400 text-base">Technology-enabled food distribution · Pre-Seed Round 2025 · $50,000</p>
        </div>
        <div className="relative text-gray-700 text-xs">CONFIDENTIAL — FOR INVESTOR USE ONLY</div>
      </div>
    ),
  },
  {
    id: 2,
    title: 'The Problem',
    thumb: '🚨',
    content: (
      <div className="h-full bg-white flex flex-col p-8 overflow-y-auto">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">02 / The Problem</div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Africa's Food System Is Broken</h2>
        <p className="text-gray-500 text-sm mb-5">Nigeria and Sub-Saharan Africa face a compounding food crisis costing billions annually.</p>
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { v: '$9B', l: 'Annual wastage in Nigeria', c: 'text-red-600 bg-red-50 border-red-100' },
            { v: '40%', l: 'Post-harvest food loss rate', c: 'text-orange-600 bg-orange-50 border-orange-100' },
            { v: '6%', l: 'Cold-chain penetration', c: 'text-yellow-700 bg-yellow-50 border-yellow-100' },
          ].map(s => (
            <div key={s.v} className={`rounded-xl border p-4 ${s.c}`}>
              <div className="text-3xl font-black mb-1">{s.v}</div>
              <div className="text-xs">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            '7+ middlemen layers crush farmer margins to ~20%',
            'No reliable cold-chain from farm to consumer',
            '35%+ annual food inflation driven by logistics gaps',
            '200M+ farmers with no digital market access',
          ].map(p => (
            <div key={p} className="flex items-start gap-2 text-xs text-gray-600 bg-gray-50 rounded-lg p-3">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
              {p}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: 'The Solution',
    thumb: '⚡',
    content: (
      <div className="h-full bg-gray-950 text-white flex flex-col p-8 overflow-y-auto">
        <div className="text-xs font-semibold text-emerald-500 uppercase tracking-widest mb-2">03 / The Solution</div>
        <h2 className="text-2xl font-black text-white mb-2">One Integrated Food Infrastructure Platform</h2>
        <p className="text-gray-400 text-sm mb-6">Havesta combines cold-chain logistics, digital commerce, and supply-chain intelligence.</p>
        <div className="grid grid-cols-3 gap-4 mb-5">
          {[
            { icon: '❄️', t: 'Cold-Chain Network', d: 'Refrigerated fleet + temp-controlled warehouses across Nigeria' },
            { icon: '🛒', t: 'Digital Marketplace', d: 'B2B procurement + B2C grocery app for all supply chain actors' },
            { icon: '🧠', t: 'Logistics Intelligence', d: 'AI routing, IoT monitoring, demand forecasting' },
          ].map(s => (
            <div key={s.t} className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-white font-bold text-sm mb-1">{s.t}</div>
              <div className="text-gray-500 text-xs">{s.d}</div>
            </div>
          ))}
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center justify-around text-center">
          {['🌾 Farmers', '⚡ Havesta', '🏢 Businesses', '🏠 Consumers'].map((n, i) => (
            <div key={n} className="flex items-center gap-2">
              <span className="text-sm text-gray-300">{n}</span>
              {i < 3 && <span className="text-emerald-700">›</span>}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: 'Market',
    thumb: '📈',
    content: (
      <div className="h-full bg-white flex flex-col p-8 overflow-y-auto">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">04 / Market Opportunity</div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">A Trillion-Dollar Structural Gap</h2>
        <p className="text-gray-500 text-sm mb-5">Entering at the inflection point of African digital food infrastructure.</p>
        <div className="grid grid-cols-3 gap-4 mb-5">
          {[
            { l: 'TAM', s: 'Africa Food 2030', v: '$1T+', c: 'from-emerald-50 border-emerald-200 text-emerald-700' },
            { l: 'SAM', s: 'Nigeria Distribution', v: '$150B', c: 'from-teal-50 border-teal-200 text-teal-700' },
            { l: 'SOM', s: 'Cold-Chain Digital', v: '$2.4B', c: 'from-cyan-50 border-cyan-200 text-cyan-700' },
          ].map(m => (
            <div key={m.l} className={`rounded-xl border bg-gradient-to-br ${m.c} to-white p-5 text-center`}>
              <div className="text-xs font-black uppercase opacity-50 mb-1">{m.l}</div>
              <div className="text-sm opacity-60 mb-2">{m.s}</div>
              <div className="text-3xl font-black">{m.v}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            '53% urban population in Nigeria by 2035',
            '3× online grocery growth next 5 years',
            '$4.8B African cold-chain market by 2027',
            '220M+ consumers — largest African market',
          ].map(t => (
            <div key={t} className="flex items-start gap-2 text-xs text-gray-600 bg-gray-50 rounded-lg p-3">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: 'Business Model',
    thumb: '💰',
    content: (
      <div className="h-full bg-white flex flex-col p-8 overflow-y-auto">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">05 / Business Model</div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Diversified Revenue Streams</h2>
        <p className="text-gray-500 text-sm mb-5">Revenue captured at every layer of the supply chain.</p>
        <div className="space-y-2.5">
          {[
            { s: 'Delivery Fees', m: 'Per-order', g: '35–45%' },
            { s: 'Storage & Warehousing', m: 'Monthly SLA', g: '50–60%' },
            { s: 'Marketplace Commission', m: '5–15% GMV', g: '75–85%' },
            { s: 'B2B Supply Contracts', m: 'Retainer + volume', g: '40–55%' },
            { s: 'Subscription Tiers', m: 'Monthly recurring', g: '80–90%' },
          ].map((r, i) => (
            <div key={r.s} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black flex items-center justify-center shrink-0">{i + 1}</div>
              <div className="flex-1 font-medium text-gray-800 text-sm">{r.s}</div>
              <div className="text-xs text-gray-400 bg-white border border-gray-100 px-2 py-0.5 rounded-full">{r.m}</div>
              <div className="text-xs font-bold text-emerald-600 w-16 text-right">{r.g} GM</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: 'Financials',
    thumb: '📊',
    content: (
      <div className="h-full bg-gray-950 text-white flex flex-col p-8 overflow-y-auto">
        <div className="text-xs font-semibold text-emerald-500 uppercase tracking-widest mb-2">06 / Financial Projections</div>
        <h2 className="text-2xl font-black text-white mb-5">Path to Profitability</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.08]">
              <th className="text-left pb-3 text-gray-500 font-medium text-xs">Metric</th>
              {['Year 1', 'Year 2', 'Year 3'].map(y => (
                <th key={y} className="pb-3 text-gray-400 font-semibold text-xs text-center">{y}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Monthly GMV', '$15K', '$250K', '$2M'],
              ['Annual Revenue', '$50K', '$600K', '$8M'],
              ['Gross Margin', '38%', '45%', '52%'],
              ['EBITDA', '($45K)', '($100K)', '$1.2M'],
              ['Farmers', '20–50', '500+', '5K+'],
              ['B2B Clients', '5–10', '80+', '500+'],
              ['Cities', '1 (Lagos)', '2', '4+'],
            ].map(([m, y1, y2, y3]) => (
              <tr key={m} className="border-b border-white/[0.04]">
                <td className="py-2.5 text-gray-400 text-xs">{m}</td>
                <td className="py-2.5 text-center text-gray-500 text-xs font-mono">{y1}</td>
                <td className="py-2.5 text-center text-gray-400 text-xs font-mono">{y2}</td>
                <td className="py-2.5 text-center text-emerald-400 text-xs font-mono font-bold">{y3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: 7,
    title: 'Competitive Moat',
    thumb: '🛡️',
    content: (
      <div className="h-full bg-white flex flex-col p-8 overflow-y-auto">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">07 / Competitive Moat</div>
        <h2 className="text-2xl font-black text-gray-900 mb-5">Why Havesta Wins</h2>
        <table className="w-full text-xs mb-4">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left pb-2 text-gray-500 font-medium">Capability</th>
              <th className="pb-2 text-emerald-600 font-black">Havesta</th>
              <th className="pb-2 text-gray-400 font-medium">Traditional</th>
              <th className="pb-2 text-gray-400 font-medium">Delivery Apps</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Cold-chain logistics', '✅', '❌', '⚡'],
              ['Digital marketplace', '✅', '❌', '⚡'],
              ['B2B + B2C dual model', '✅', '❌', '⚡'],
              ['IoT monitoring', '✅', '❌', '❌'],
              ['Smart warehousing', '✅', '⚡', '❌'],
              ['Data intelligence', '✅', '❌', '⚡'],
            ].map(([c, ...vs]) => (
              <tr key={c} className="border-b border-gray-50">
                <td className="py-2 text-gray-600">{c}</td>
                {vs.map((v, i) => (
                  <td key={i} className={`py-2 text-center text-base ${i === 0 ? 'bg-emerald-50' : ''}`}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="grid grid-cols-3 gap-2">
          {[
            { t: 'Physical Scarcity', d: 'Cold-chain is expensive to replicate' },
            { t: 'Network Effects', d: 'Value grows with every new participant' },
            { t: 'Data Moat', d: 'Proprietary demand & supply intelligence' },
          ].map(a => (
            <div key={a.t} className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
              <div className="font-bold text-emerald-800 text-xs mb-1">{a.t}</div>
              <div className="text-emerald-700/70 text-[10px]">{a.d}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 8,
    title: 'Team',
    thumb: '👥',
    content: (
      <div className="h-full bg-white flex flex-col p-8 overflow-y-auto">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">08 / Founding Team</div>
        <h2 className="text-2xl font-black text-gray-900 mb-5">Operators Who Know This Market</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { n: 'Adewale Okonkwo', r: 'CEO & Co-Founder', bg: 'from-emerald-600 to-emerald-900', b: '8+ yrs Pan-African logistics ops · MBA Lagos Business School' },
            { n: 'Chidinma Eze', r: 'CTO & Co-Founder', bg: 'from-teal-600 to-teal-900', b: 'Ex-Senior Engineer Flutterwave · MSc Computer Science, UCL' },
            { n: 'Emeka Nwosu', r: 'VP Growth', bg: 'from-green-600 to-green-900', b: 'Built merchant networks at 2 leading Nigerian fintechs' },
            { n: 'Amara Osei', r: 'VP Marketing & Brand', bg: 'from-emerald-700 to-gray-900', b: 'Brand strategy · Jumia, Andela, Pan-African FMCG' },
          ].map(m => (
            <div key={m.n} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.bg} text-white font-black flex items-center justify-center text-sm shrink-0`}>
                {m.n.split(' ').map(s => s[0]).join('')}
              </div>
              <div>
                <div className="font-bold text-gray-800 text-sm">{m.n}</div>
                <div className="text-emerald-600 text-xs mb-1">{m.r}</div>
                <div className="text-gray-500 text-xs">{m.b}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 9,
    title: 'Technology',
    thumb: '💡',
    content: (
      <div className="h-full bg-gray-950 text-white flex flex-col p-8 overflow-y-auto">
        <div className="text-xs font-semibold text-emerald-500 uppercase tracking-widest mb-2">09 / Technology</div>
        <h2 className="text-2xl font-black text-white mb-2">Software-Defined Food Logistics</h2>
        <p className="text-gray-400 text-sm mb-5">A technology company that operates physical infrastructure.</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { i: '🧠', t: 'AI Route Optimization', d: '-40% transit time' },
            { i: '📡', t: 'IoT Cold-Chain', d: 'Real-time temp & humidity' },
            { i: '🗺️', t: 'Geo Intelligence', d: 'Street-level demand mapping' },
            { i: '📊', t: 'Demand Forecasting ML', d: 'Predictive supply planning' },
            { i: '📱', t: 'Farmer Mobile OS', d: 'USSD + app for all farmers' },
            { i: '🏭', t: 'Supply Chain Data', d: 'SKU-level intelligence' },
          ].map(p => (
            <div key={p.t} className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-4">
              <div className="text-2xl mb-2">{p.i}</div>
              <div className="text-white font-semibold text-xs mb-1">{p.t}</div>
              <div className="text-gray-600 text-[10px]">{p.d}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 10,
    title: 'Traction',
    thumb: '🚀',
    content: (
      <div className="h-full bg-white flex flex-col p-8 overflow-y-auto">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">10 / Traction & Roadmap</div>
        <h2 className="text-2xl font-black text-gray-900 mb-5">From Seed to Continental Scale</h2>
        <div className="space-y-2 mb-5">
          {[
            { q: 'Q1 2025', t: 'MVP Platform Launch — Lagos', done: true },
            { q: 'Q2 2025', t: 'First 10 B2B contracts signed', done: true },
            { q: 'Q3 2025', t: 'Pre-Seed Close ($50K)', done: false },
            { q: 'Q4 2025', t: 'Abuja market expansion', done: false },
            { q: 'Q2 2026', t: 'Kano + Port Harcourt launch', done: false },
            { q: '2027', t: 'West Africa expansion + Series A', done: false },
          ].map(m => (
            <div key={m.q} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
              <div className={`w-2 h-2 rounded-full shrink-0 ${m.done ? 'bg-emerald-500' : 'bg-gray-300'}`} />
              <span className={`text-xs font-bold w-14 ${m.done ? 'text-emerald-600' : 'text-gray-400'}`}>{m.q}</span>
              <span className="text-sm text-gray-700">{m.t}</span>
              {m.done && <span className="ml-auto text-emerald-500 text-[10px] font-semibold">✓ Done</span>}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 11,
    title: 'Investment Ask',
    thumb: '💼',
    content: (
      <div className="h-full bg-gray-950 text-white flex flex-col p-8 overflow-y-auto">
        <div className="text-xs font-semibold text-emerald-500 uppercase tracking-widest mb-2">11 / Investment Opportunity</div>
        <h2 className="text-2xl font-black text-white mb-5">Pre-Seed Round: $50,000</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-gray-500 text-xs uppercase tracking-widest mb-3">Deal Terms</div>
            {[
              ['Round', 'Pre-Seed'],
              ['Target', '$50,000 USD'],
              ['Instrument', 'SAFE'],
              ['Valuation Cap', '$1,500,000'],
              ['Min Ticket', '$5,000'],
              ['Runway', '~10 months'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-white/[0.05] py-2 text-sm">
                <span className="text-gray-500">{k}</span>
                <span className="text-white font-semibold">{v}</span>
              </div>
            ))}
          </div>
          <div>
            <div className="text-gray-500 text-xs uppercase tracking-widest mb-3">Use of Funds</div>
            {[
              ['Cold-Chain Infra', 40],
              ['Technology', 25],
              ['Team', 20],
              ['Sales & Expansion', 15],
            ].map(([l, p]) => (
              <div key={l} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">{l}</span>
                  <span className="text-emerald-400 font-bold">{p}%</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${p}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 12,
    title: 'Contact',
    thumb: '📬',
    content: (
      <div className="h-full bg-gray-950 text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)]" />
        <div className="relative text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-emerald-500 rounded-xl rotate-45 opacity-80" />
              <div className="absolute inset-1 bg-gray-950 rounded-lg rotate-45" />
              <span className="absolute inset-0 flex items-center justify-center text-emerald-400 font-black">H</span>
            </div>
          </div>
          <h2 className="text-3xl font-black text-white mb-3">
            Let's Build Africa's<br /><span className="text-emerald-400">Food Future Together</span>
          </h2>
          <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto">Actively closing our $50,000 pre-seed round. We welcome aligned angel investors, AgriTech funds, and early backers.</p>
          <div className="space-y-2">
            <div className="text-white font-semibold">Havesta Logistics Limited</div>
            <div className="text-emerald-400 text-sm">urutechenterprise@gmail.com</div>
            <div className="text-gray-600 text-sm">Lagos, Nigeria</div>
          </div>
        </div>
      </div>
    ),
  },
];

// ── Deck Modal (HTML iframe or uploaded PDF) ──────────────────
function DeckModal({ src, isPDF, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-black">
      <div className="flex items-center justify-between px-5 py-3 bg-gray-900 border-b border-white/[0.06] shrink-0">
        <div className="flex items-center gap-2">
          <Presentation size={15} className="text-emerald-400" />
          <span className="text-white font-semibold text-sm">Havesta — Investor Pitch Deck</span>
          {!isPDF && (
            <span className="text-gray-600 text-xs ml-2">Use ← → arrow keys to navigate</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isPDF && (
            <a
              href={src}
              download="Havesta-PitchDeck.pdf"
              className="flex items-center gap-1.5 text-gray-400 hover:text-white text-xs px-3 py-1.5 glass rounded-lg border border-white/[0.08] hover:border-white/20 transition-all"
            >
              <Download size={13} />
              Download
            </a>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white glass rounded-lg border border-white/[0.08] hover:border-red-500/30 transition-all"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <iframe
          src={src}
          title="Havesta Pitch Deck"
          className="w-full h-full border-0"
          allow="fullscreen"
        />
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────
export default function PitchDeckHub() {
  const [open, setOpen] = useState(false);
  const [uploadedPDF, setUploadedPDF] = useState(() => localStorage.getItem('havesta_pitchdeck'));
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    const handler = () => setUploadedPDF(localStorage.getItem('havesta_pitchdeck'));
    window.addEventListener('havesta:pitchdeck', handler);
    return () => window.removeEventListener('havesta:pitchdeck', handler);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <section id="pitch-deck" className="relative py-16 md:py-28 px-4 md:px-6 bg-gradient-to-b from-gray-950 to-gray-900/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(16,185,129,0.06),transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-semibold text-emerald-400 tracking-widest uppercase mb-4 glass px-3 py-1.5 rounded-full border border-emerald-500/20">
              Investor Pitch Deck
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-5">
              View Our Full
              <br />
              <span className="text-gradient">{uploadedPDF ? 'Custom Deck' : '14-Slide Deck'}</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
              Explore our investor pitch deck — cold-chain thesis, market opportunity, business model, team, financials, and the pre-seed ask.
            </p>
            <motion.button
              onClick={() => setOpen(true)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="group inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-10 py-4 rounded-xl text-base transition-all duration-200 shadow-lg shadow-emerald-900/40"
            >
              <Presentation size={20} />
              Open Pitch Deck
              <Maximize2 size={16} className="group-hover:scale-110 transition-transform" />
            </motion.button>
          </motion.div>

          {/* 14-slide preview grid */}
          <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
            {SLIDE_PREVIEWS.map((s, i) => (
              <motion.button
                key={s.id}
                onClick={() => setOpen(true)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1 + i * 0.04, duration: 0.4 }}
                className="group glass-card rounded-xl border border-white/[0.07] hover:border-emerald-500/30 p-4 text-center transition-all duration-200 hover:scale-105"
              >
                <div className={`w-full aspect-video rounded-lg mb-2 flex items-center justify-center text-xl ${s.color}`}>
                  {s.emoji}
                </div>
                <div className="text-[10px] text-gray-600 group-hover:text-emerald-400 transition-colors">{String(s.id).padStart(2, '0')}</div>
                <div className="text-xs text-gray-500 group-hover:text-white transition-colors leading-tight truncate">{s.label}</div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <DeckModal
              src={uploadedPDF || '/pitch-deck-v2.html'}
              isPDF={!!uploadedPDF}
              onClose={() => setOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
