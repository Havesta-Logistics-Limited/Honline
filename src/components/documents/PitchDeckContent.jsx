export default function PitchDeckContent() {
  return (
    <div className="pitch-deck-doc font-sans text-gray-900 bg-white">

      {/* Slide 1 — Cover */}
      <div className="slide cover-slide min-h-[540px] bg-gray-950 text-white flex flex-col justify-between p-12 relative overflow-hidden rounded-xl mb-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(16,185,129,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-12">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-emerald-500 rounded-lg rotate-45 opacity-80" />
              <div className="absolute inset-1 bg-gray-950 rounded-md rotate-45" />
              <span className="absolute inset-0 flex items-center justify-center text-emerald-400 font-black text-sm">H</span>
            </div>
            <span className="text-white font-bold text-lg">Havesta Logistics Limited</span>
          </div>
          <h1 className="text-5xl font-black leading-tight mb-4" style={{fontFamily:'Inter,system-ui,sans-serif'}}>
            Building Africa's<br />
            <span className="text-emerald-400">Cold-Chain Powered</span><br />
            Food Infrastructure
          </h1>
          <p className="text-gray-400 text-lg max-w-lg">Technology-enabled food distribution across Nigeria and Africa — seed round 2025</p>
        </div>
        <div className="relative flex items-center justify-between">
          <div className="text-gray-600 text-sm">CONFIDENTIAL — FOR INVESTOR USE ONLY</div>
          <div className="text-gray-600 text-sm">Slide 1 of 12</div>
        </div>
      </div>

      {/* Slide 2 — The Problem */}
      <div className="slide bg-white border border-gray-100 rounded-xl p-10 mb-8 shadow-sm">
        <div className="flex items-center gap-2 mb-8">
          <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 text-xs font-black flex items-center justify-center">02</span>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">The Problem</span>
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">Africa's Food System Is Broken</h2>
        <p className="text-gray-500 mb-8">Nigeria and Sub-Saharan Africa face a compounding food infrastructure crisis that costs billions annually.</p>
        <div className="grid grid-cols-3 gap-6 mb-8">
          {[
            { stat: '$9B', label: 'Annual food wastage in Nigeria alone', color: 'bg-red-50 border-red-100 text-red-600' },
            { stat: '40%', label: 'Of all harvested food lost post-harvest', color: 'bg-orange-50 border-orange-100 text-orange-600' },
            { stat: '6%', label: 'Cold-chain penetration rate', color: 'bg-yellow-50 border-yellow-100 text-yellow-600' },
          ].map(s => (
            <div key={s.stat} className={`rounded-xl border p-5 ${s.color}`}>
              <div className="text-4xl font-black mb-1">{s.stat}</div>
              <div className="text-sm opacity-80">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            'Fragmented distribution with 7+ middlemen layers',
            'No reliable cold-chain from farm to consumer',
            '35%+ annual food price inflation driven by inefficiency',
            '200M+ farmers with no reliable market access',
          ].map(p => (
            <div key={p} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
              {p}
            </div>
          ))}
        </div>
      </div>

      {/* Slide 3 — The Solution */}
      <div className="slide bg-gray-950 text-white border border-emerald-900/30 rounded-xl p-10 mb-8">
        <div className="flex items-center gap-2 mb-8">
          <span className="w-6 h-6 rounded-full bg-emerald-900 text-emerald-400 text-xs font-black flex items-center justify-center">03</span>
          <span className="text-xs font-semibold text-emerald-500 uppercase tracking-widest">The Solution</span>
        </div>
        <h2 className="text-3xl font-black text-white mb-2">One Integrated Food Infrastructure Platform</h2>
        <p className="text-gray-400 mb-8">Havesta combines cold-chain logistics, digital commerce, and supply-chain intelligence into a single operating layer for African food distribution.</p>
        <div className="grid grid-cols-3 gap-5">
          {[
            { icon: '❄️', title: 'Cold-Chain Network', desc: 'Refrigerated fleet + temperature-controlled warehouses across Nigeria' },
            { icon: '🛒', title: 'Digital Marketplace', desc: 'B2B procurement portal + B2C grocery app connecting all supply chain actors' },
            { icon: '⚡', title: 'Logistics Intelligence', desc: 'AI routing, IoT monitoring, demand forecasting, real-time tracking' },
          ].map(s => (
            <div key={s.title} className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-5">
              <div className="text-3xl mb-3">{s.icon}</div>
              <div className="text-white font-bold text-sm mb-2">{s.title}</div>
              <div className="text-gray-500 text-xs leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5">
          <div className="text-emerald-400 font-semibold text-sm mb-1">Value Proposition</div>
          <p className="text-gray-300 text-sm">Farmers get fair prices and guaranteed market access. Businesses get reliable, quality-assured supply. Consumers get fresh groceries at their door. Havesta earns at every layer.</p>
        </div>
      </div>

      {/* Slide 4 — Market Opportunity */}
      <div className="slide bg-white border border-gray-100 rounded-xl p-10 mb-8 shadow-sm">
        <div className="flex items-center gap-2 mb-8">
          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-black flex items-center justify-center">04</span>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Market Opportunity</span>
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">A Trillion-Dollar Structural Gap</h2>
        <p className="text-gray-500 mb-8">Havesta enters at the inflection point — where digital infrastructure meets Africa's agricultural supply chain.</p>
        <div className="grid grid-cols-3 gap-5 mb-8">
          {[
            { label: 'TAM', sub: 'Africa Food Market 2030', val: '$1T+', color: 'from-emerald-50 to-teal-50 border-emerald-200 text-emerald-700' },
            { label: 'SAM', sub: 'Nigeria Food Distribution', val: '$150B', color: 'from-teal-50 to-cyan-50 border-teal-200 text-teal-700' },
            { label: 'SOM', sub: 'Cold-Chain Digital Segment', val: '$2.4B', color: 'from-cyan-50 to-blue-50 border-cyan-200 text-cyan-700' },
          ].map(m => (
            <div key={m.label} className={`rounded-xl border bg-gradient-to-br ${m.color} p-6 text-center`}>
              <div className="text-xs font-black tracking-widest uppercase mb-1 opacity-60">{m.label}</div>
              <div className="text-sm opacity-70 mb-2">{m.sub}</div>
              <div className="text-4xl font-black">{m.val}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {[
            '53% of Nigeria population urban by 2035',
            '3× online grocery growth forecast next 5 years',
            '$4.8B African cold-chain market by 2027',
            'Nigeria population exceeds 220M — largest consumer market',
          ].map(t => (
            <div key={t} className="flex items-start gap-2 text-gray-600">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* Slide 5 — Business Model */}
      <div className="slide bg-white border border-gray-100 rounded-xl p-10 mb-8 shadow-sm">
        <div className="flex items-center gap-2 mb-8">
          <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black flex items-center justify-center">05</span>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Business Model</span>
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">Multiple Diversified Revenue Streams</h2>
        <p className="text-gray-500 mb-8">Havesta captures value at every layer of the supply chain with resilient, recurring revenue.</p>
        <div className="space-y-3">
          {[
            { stream: 'Delivery Revenue', model: 'Per-order fee', margin: '35–45%', note: 'B2B and B2C cold-chain delivery fees' },
            { stream: 'Storage & Warehousing', model: 'Monthly SLA', margin: '50–60%', note: 'Cold-storage rental for FMCG, processors, cooperatives' },
            { stream: 'Marketplace Commission', model: '5–15% GMV', margin: '75–85%', note: 'Take-rate on all marketplace transactions' },
            { stream: 'B2B Supply Contracts', model: 'Retainer + volume', margin: '40–55%', note: 'Long-term supply agreements with institutional buyers' },
            { stream: 'Subscription Tiers', model: 'Monthly recurring', margin: '80–90%', note: 'Premium features for B2B buyers and B2C consumers' },
          ].map((r, i) => (
            <div key={r.stream} className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black flex items-center justify-center shrink-0">{i + 1}</div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800 text-sm">{r.stream}</div>
                <div className="text-gray-500 text-xs">{r.note}</div>
              </div>
              <div className="text-xs text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded-full shrink-0">{r.model}</div>
              <div className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full shrink-0 w-20 text-center">{r.margin} GM</div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide 6 — Traction & Roadmap */}
      <div className="slide bg-gray-950 text-white border border-white/[0.06] rounded-xl p-10 mb-8">
        <div className="flex items-center gap-2 mb-8">
          <span className="w-6 h-6 rounded-full bg-emerald-900 text-emerald-400 text-xs font-black flex items-center justify-center">06</span>
          <span className="text-xs font-semibold text-emerald-500 uppercase tracking-widest">Traction & Roadmap</span>
        </div>
        <h2 className="text-3xl font-black text-white mb-8">From Seed to Continental Scale</h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="text-gray-400 text-xs uppercase tracking-widest mb-4">18-Month Milestones</div>
            <div className="space-y-3">
              {[
                { q: 'Q1 2025', t: 'MVP Platform Launch', done: true },
                { q: 'Q2 2025', t: 'First 10 B2B Contracts', done: true },
                { q: 'Q3 2025', t: 'Seed Round Close', done: false },
                { q: 'Q4 2025', t: 'Abuja Market Expansion', done: false },
                { q: 'Q2 2026', t: 'Kano + Port Harcourt Launch', done: false },
              ].map(m => (
                <div key={m.q} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${m.done ? 'bg-emerald-400' : 'bg-gray-700'}`} />
                  <span className={`text-xs font-bold w-16 ${m.done ? 'text-emerald-400' : 'text-gray-600'}`}>{m.q}</span>
                  <span className="text-sm text-gray-300">{m.t}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-gray-400 text-xs uppercase tracking-widest mb-4">3-Year Projections</div>
            <div className="space-y-4">
              {[
                { metric: 'Monthly GMV', y1: '$250K', y3: '$15M+' },
                { metric: 'Farmers Onboarded', y1: '500+', y3: '50,000+' },
                { metric: 'B2B Clients', y1: '50+', y3: '5,000+' },
                { metric: 'Cities', y1: '2', y3: '8+' },
              ].map(p => (
                <div key={p.metric} className="flex items-center justify-between">
                  <span className="text-gray-500 text-xs">{p.metric}</span>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-400">{p.y1}</span>
                    <span className="text-gray-700">→</span>
                    <span className="text-emerald-400 font-bold">{p.y3}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slide 7 — Competitive Moat */}
      <div className="slide bg-white border border-gray-100 rounded-xl p-10 mb-8 shadow-sm">
        <div className="flex items-center gap-2 mb-8">
          <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-black flex items-center justify-center">07</span>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Competitive Moat</span>
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-8">Why Havesta Wins the Market</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left pb-3 text-gray-500 font-medium text-xs">CAPABILITY</th>
                <th className="pb-3 text-emerald-600 font-black text-xs">HAVESTA</th>
                <th className="pb-3 text-gray-400 font-medium text-xs">Traditional</th>
                <th className="pb-3 text-gray-400 font-medium text-xs">Delivery Apps</th>
                <th className="pb-3 text-gray-400 font-medium text-xs">Agri Marketplaces</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Cold-chain logistics', '✅', '❌', '⚡', '❌'],
                ['Digital marketplace', '✅', '❌', '⚡', '✅'],
                ['B2B + B2C dual model', '✅', '❌', '⚡', '⚡'],
                ['IoT real-time monitoring', '✅', '❌', '❌', '❌'],
                ['Smart warehousing', '✅', '⚡', '❌', '❌'],
                ['Farmer onboarding', '✅', '⚡', '❌', '✅'],
              ].map(([cap, ...vals]) => (
                <tr key={cap} className="border-b border-gray-50">
                  <td className="py-2.5 text-gray-600 text-xs">{cap}</td>
                  {vals.map((v, i) => (
                    <td key={i} className={`py-2.5 text-center ${i === 0 ? 'bg-emerald-50' : ''}`}>
                      <span className="text-base">{v}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">⚡ = Partial capability &nbsp; ✅ = Full capability &nbsp; ❌ = Not available</p>
      </div>

      {/* Slide 8 — Team */}
      <div className="slide bg-white border border-gray-100 rounded-xl p-10 mb-8 shadow-sm">
        <div className="flex items-center gap-2 mb-8">
          <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center">08</span>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Founding Team</span>
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-8">Operators Who Know This Market</h2>
        <div className="grid grid-cols-2 gap-5">
          {[
            { name: 'Adewale Okonkwo', role: 'CEO & Co-Founder', bg: 'from-emerald-700 to-emerald-900', note: '8+ yrs Pan-African logistics operations, MBA Lagos Business School' },
            { name: 'Chidinma Eze', role: 'CTO & Co-Founder', bg: 'from-teal-700 to-teal-900', note: 'Ex-Senior Engineer Flutterwave, MSc Computer Science UCL' },
            { name: 'Emeka Nwosu', role: 'VP Growth', bg: 'from-green-700 to-green-900', note: 'Built merchant networks at 2 leading Nigerian fintechs' },
            { name: 'Amara Osei', role: 'VP Marketing & Brand', bg: 'from-emerald-800 to-gray-900', note: 'Brand strategy — Jumia, Andela, Pan-African FMCG brands' },
          ].map(m => (
            <div key={m.name} className="flex items-start gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.bg} flex items-center justify-center text-white font-black text-base shrink-0`}>
                {m.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="font-bold text-gray-800 text-sm">{m.name}</div>
                <div className="text-emerald-600 text-xs mb-1">{m.role}</div>
                <div className="text-gray-500 text-xs">{m.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide 9 — Technology */}
      <div className="slide bg-gray-950 text-white border border-white/[0.06] rounded-xl p-10 mb-8">
        <div className="flex items-center gap-2 mb-8">
          <span className="w-6 h-6 rounded-full bg-emerald-900 text-emerald-400 text-xs font-black flex items-center justify-center">09</span>
          <span className="text-xs font-semibold text-emerald-500 uppercase tracking-widest">Technology Stack</span>
        </div>
        <h2 className="text-3xl font-black text-white mb-2">Software-Defined Food Logistics</h2>
        <p className="text-gray-400 mb-8">We are a technology company that operates physical infrastructure — not a logistics company that uses software.</p>
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: '🧠', t: 'AI Route Optimization', d: 'Reduces transit time 40%, improves fleet utilisation' },
            { icon: '📡', t: 'IoT Cold-Chain Sensors', d: 'Continuous temperature, humidity & location tracking' },
            { icon: '🗺️', t: 'Geospatial Intelligence', d: 'Demand mapping, warehouse positioning, street-level ETA' },
            { icon: '📊', t: 'Demand Forecasting ML', d: 'Predicts demand to reduce waste & pre-position stock' },
            { icon: '📱', t: 'Farmer Mobile OS', d: 'USSD + app for inventory, pricing & payment management' },
            { icon: '🏭', t: 'Supply Chain Data', d: 'Centralised SKU-level intelligence across the whole network' },
          ].map(p => (
            <div key={p.t} className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-4">
              <div className="text-2xl mb-2">{p.icon}</div>
              <div className="text-white font-semibold text-xs mb-1">{p.t}</div>
              <div className="text-gray-600 text-xs leading-relaxed">{p.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide 10 — Financials */}
      <div className="slide bg-white border border-gray-100 rounded-xl p-10 mb-8 shadow-sm">
        <div className="flex items-center gap-2 mb-8">
          <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs font-black flex items-center justify-center">10</span>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Financial Projections</span>
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-8">Path to Profitability</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 text-gray-500 font-medium text-xs border border-gray-100">Metric</th>
                {['Year 1', 'Year 2', 'Year 3'].map(y => (
                  <th key={y} className="p-3 text-gray-700 font-bold text-xs border border-gray-100 text-center">{y}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Monthly GMV', '$250K', '$2.5M', '$15M'],
                ['Annual Revenue', '$900K', '$7.2M', '$36M'],
                ['Gross Margin', '38%', '45%', '52%'],
                ['Operating EBITDA', '($(650K))', '($200K)', '$4.5M'],
                ['Farmers Onboarded', '500', '8,000', '50,000'],
                ['B2B Clients', '50', '500', '5,000'],
                ['Cities', '2', '4', '8'],
              ].map(([metric, ...vals]) => (
                <tr key={metric} className="border-b border-gray-50">
                  <td className="p-3 text-gray-600 font-medium text-xs">{metric}</td>
                  {vals.map((v, i) => (
                    <td key={i} className={`p-3 text-center text-xs font-mono ${i === 2 ? 'text-emerald-600 font-bold' : 'text-gray-700'}`}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Conservative projections based on comparable African logistics/agritech benchmarks. All figures in USD.</p>
      </div>

      {/* Slide 11 — Investment Ask */}
      <div className="slide bg-gray-950 text-white border border-emerald-900/30 rounded-xl p-10 mb-8">
        <div className="flex items-center gap-2 mb-8">
          <span className="w-6 h-6 rounded-full bg-emerald-900 text-emerald-400 text-xs font-black flex items-center justify-center">11</span>
          <span className="text-xs font-semibold text-emerald-500 uppercase tracking-widest">Investment Opportunity</span>
        </div>
        <h2 className="text-3xl font-black text-white mb-8">Seed Round: $1.5M</h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="text-gray-400 text-xs uppercase tracking-widest mb-4">Deal Terms</div>
            <div className="space-y-3">
              {[
                ['Round Type', 'Pre-Seed / Seed'],
                ['Target Raise', '$1,500,000 USD'],
                ['Instrument', 'SAFE or Equity'],
                ['Min Ticket', '$25,000'],
                ['Runway', '18 months'],
                ['Lead Investor', 'Open'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-white/[0.05] pb-2">
                  <span className="text-gray-500 text-sm">{k}</span>
                  <span className="text-white font-semibold text-sm">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-gray-400 text-xs uppercase tracking-widest mb-4">Use of Funds</div>
            <div className="space-y-3">
              {[
                ['Cold-Chain Infrastructure', 40],
                ['Technology & Product', 25],
                ['Team & Hiring', 20],
                ['Sales & Market Expansion', 15],
              ].map(([label, pct]) => (
                <div key={label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">{label}</span>
                    <span className="text-emerald-400 font-bold">{pct}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slide 12 — Contact */}
      <div className="slide bg-gray-950 text-white rounded-xl p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)]" />
        <div className="relative text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-emerald-500 rounded-xl rotate-45 opacity-80" />
              <div className="absolute inset-1 bg-gray-950 rounded-lg rotate-45" />
              <span className="absolute inset-0 flex items-center justify-center text-emerald-400 font-black">H</span>
            </div>
          </div>
          <h2 className="text-4xl font-black text-white mb-4">Let's Build Africa's<br /><span className="text-emerald-400">Food Future Together</span></h2>
          <p className="text-gray-400 mb-10 max-w-lg mx-auto">We are actively closing our seed round and would love to connect with aligned investors, strategic partners, and AgriTech funds.</p>
          <div className="flex flex-col items-center gap-3">
            <div className="text-white font-semibold">Havesta Logistics Limited</div>
            <div className="text-emerald-400">urutechenterprise@gmail.com</div>
            <div className="text-gray-500 text-sm">Lagos, Nigeria</div>
          </div>
          <div className="mt-10 text-gray-700 text-xs">CONFIDENTIAL — This document contains forward-looking statements and projections. Past performance is not indicative of future results.</div>
        </div>
      </div>

    </div>
  );
}
