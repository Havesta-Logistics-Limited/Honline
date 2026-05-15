export default function ExecutiveSummaryContent() {
  return (
    <div className="exec-summary font-sans text-gray-800 bg-white" style={{fontFamily:'Inter,system-ui,sans-serif'}}>

      {/* Header */}
      <div className="bg-gray-950 text-white p-10 rounded-xl mb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-emerald-500 rounded-lg rotate-45 opacity-80" />
              <div className="absolute inset-1 bg-gray-950 rounded-md rotate-45" />
              <span className="absolute inset-0 flex items-center justify-center text-emerald-400 font-black text-sm">H</span>
            </div>
            <span className="text-white font-bold text-lg">Havesta Logistics Limited</span>
          </div>
          <span className="text-gray-600 text-xs border border-gray-700 px-3 py-1 rounded-full">EXECUTIVE SUMMARY</span>
        </div>
        <h1 className="text-3xl font-black leading-tight mb-3">
          Africa's Cold-Chain Powered<br />
          <span className="text-emerald-400">Food Distribution Infrastructure</span>
        </h1>
        <p className="text-gray-400 text-sm max-w-2xl">
          Havesta is a B2B and B2C technology-enabled agri-logistics and food distribution platform solving Nigeria's $9B annual post-harvest loss crisis through cold-chain infrastructure, digital commerce, and supply-chain intelligence.
        </p>
      </div>

      {/* Key Metrics Banner */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { val: '$1T+', label: 'Africa Food Market 2030' },
          { val: '$1.5M', label: 'Seed Round Target' },
          { val: '40%', label: 'Post-Harvest Loss Rate' },
          { val: '18mo', label: 'Funding Runway' },
        ].map(m => (
          <div key={m.label} className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
            <div className="text-2xl font-black text-emerald-700 mb-1">{m.val}</div>
            <div className="text-xs text-emerald-600/80">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Sections */}
      <div className="space-y-8">

        <section>
          <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-3 pb-2 border-b border-gray-100">Company Overview</h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            <strong>Havesta Logistics Limited</strong> is a Lagos-based technology and logistics company building the cold-chain infrastructure backbone of Africa's food distribution system. We operate at the intersection of physical logistics infrastructure and digital commerce — enabling efficient, data-driven food supply from smallholder farmers across Nigeria to urban businesses and consumers.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            The company operates a vertically integrated platform that combines refrigerated transportation, temperature-controlled warehousing, a dual-sided B2B/B2C digital marketplace, and an AI-powered supply chain intelligence layer. This integrated approach allows Havesta to capture value at every stage of the food supply chain while dramatically reducing post-harvest losses and inefficiency.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-3 pb-2 border-b border-gray-100">The Problem</h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            Nigeria and Sub-Saharan Africa face a severe food supply chain crisis. Despite being home to over 60% of the world's uncultivated arable land and 200+ million smallholder farmers, the continent loses an estimated <strong>$9 billion in food value annually</strong> in Nigeria alone due to inadequate logistics infrastructure and supply chain fragmentation.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { metric: '40%', detail: 'of harvested food in Nigeria is lost before reaching consumers' },
              { metric: '6%', detail: 'cold-chain penetration rate — perishables have minimal protection' },
              { metric: '7+', detail: 'middlemen layers between farmer and consumer, eroding margins' },
              { metric: '35%+', detail: 'food inflation driven entirely by supply chain inefficiency' },
            ].map(p => (
              <div key={p.metric} className="flex gap-3 bg-red-50 border border-red-100 rounded-xl p-4">
                <div className="text-2xl font-black text-red-600 shrink-0 w-14">{p.metric}</div>
                <div className="text-xs text-red-700/80 leading-relaxed">{p.detail}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-3 pb-2 border-b border-gray-100">Our Solution</h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            Havesta operates as the technology and logistics operating layer between agricultural supply and food demand. Our platform integrates four core capabilities that no competitor currently offers in combination:
          </p>
          <div className="space-y-3">
            {[
              { title: 'Cold-Chain Logistics Network', desc: 'Refrigerated fleet and temperature-controlled warehousing across Nigeria\'s key agricultural corridors and urban consumption centres, maintaining perishable integrity from farm gate to final delivery.' },
              { title: 'Digital B2B & B2C Marketplace', desc: 'A technology platform connecting farmers to restaurants, supermarkets, hotels, and institutional buyers (B2B), as well as urban households seeking fresh grocery delivery (B2C).' },
              { title: 'Supply Chain Intelligence', desc: 'AI-powered demand forecasting, dynamic route optimisation, and IoT cold-chain monitoring — providing real-time visibility and predictive intelligence across the entire distribution network.' },
              { title: 'Farmer Operating System', desc: 'A mobile-first platform (app + USSD) enabling smallholder farmers to list produce, track payments, view demand signals, and access Havesta\'s logistics network with minimal friction.' },
            ].map(s => (
              <div key={s.title} className="flex gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="w-1.5 bg-emerald-500 rounded-full shrink-0" />
                <div>
                  <div className="font-semibold text-gray-800 text-sm mb-1">{s.title}</div>
                  <div className="text-gray-600 text-xs leading-relaxed">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-3 pb-2 border-b border-gray-100">Market Opportunity</h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            Africa's food market is projected to exceed <strong>$1 trillion by 2030</strong>, driven by a growing urban middle class, rapid smartphone adoption, and expanding logistics infrastructure investment. Nigeria's food retail and distribution market is valued at over $150 billion — making it one of the largest food consumer markets on the continent.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            Havesta's initial focus is the cold-chain enabled digital food distribution segment within Nigeria's top three cities (Lagos, Abuja, Kano), representing a serviceable obtainable market of approximately <strong>$2.4 billion</strong>. The company plans to expand across West Africa and into East Africa within three years of reaching unit economics in Nigeria.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-3 pb-2 border-b border-gray-100">Business Model</h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            Havesta generates revenue through five complementary streams, creating a diversified and resilient revenue model with margins improving significantly as the network scales:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 border border-gray-100">
                  <th className="text-left p-3 font-semibold text-gray-600">Revenue Stream</th>
                  <th className="p-3 font-semibold text-gray-600">Model</th>
                  <th className="p-3 font-semibold text-gray-600 text-right">Est. Gross Margin</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Delivery Fees', 'Per-order (B2B & B2C)', '35–45%'],
                  ['Storage & Warehousing', 'Monthly SLA contracts', '50–60%'],
                  ['Marketplace Commission', '5–15% GMV take-rate', '75–85%'],
                  ['B2B Supply Contracts', 'Volume-based retainer', '40–55%'],
                  ['Subscription Tiers', 'Monthly recurring revenue', '80–90%'],
                ].map(([s, m, g]) => (
                  <tr key={s} className="border-b border-gray-50">
                    <td className="p-3 text-gray-700 font-medium">{s}</td>
                    <td className="p-3 text-gray-500">{m}</td>
                    <td className="p-3 text-emerald-600 font-bold text-right">{g}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-3 pb-2 border-b border-gray-100">Competitive Advantage</h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            Havesta's competitive moat is built on three reinforcing advantages that become harder to replicate as the network grows:
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { title: 'Physical Infrastructure Scarcity', desc: 'Cold-chain infrastructure is capital-intensive and slow to build — creating high barriers for digital-only competitors to replicate.' },
              { title: 'Network Effects', desc: 'More farmers attract more buyers; more buyers attract more farmers. Each new participant compounds the platform\'s value for all others.' },
              { title: 'Proprietary Data Layer', desc: 'Every transaction, delivery, and sensor reading builds a proprietary dataset for demand forecasting, pricing intelligence, and supply optimisation.' },
            ].map(a => (
              <div key={a.title} className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                <div className="font-bold text-emerald-800 text-xs mb-2">{a.title}</div>
                <div className="text-emerald-700/80 text-xs leading-relaxed">{a.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-3 pb-2 border-b border-gray-100">Founding Team</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'Adewale Okonkwo', role: 'CEO & Co-Founder', bg: 'bg-emerald-700', bio: 'Former operations lead at a Pan-African logistics firm with 8+ years in food supply chain management. MBA from Lagos Business School. Deep operational expertise across Nigeria, Ghana, and Côte d\'Ivoire.' },
              { name: 'Chidinma Eze', role: 'CTO & Co-Founder', bg: 'bg-teal-700', bio: 'Ex-Senior Software Engineer at Flutterwave, where she built scalable marketplace infrastructure. MSc Computer Science, University College London. Full-stack engineer and systems architect.' },
              { name: 'Emeka Nwosu', role: 'VP Growth', bg: 'bg-green-700', bio: 'Built merchant and vendor acquisition networks at two leading Nigerian fintech startups, reaching 50,000+ businesses. Specialist in B2B sales, partnerships, and African market expansion.' },
              { name: 'Amara Osei', role: 'VP Marketing & Brand', bg: 'bg-emerald-800', bio: 'Brand strategist with experience across Jumia, Andela, and Pan-African FMCG brands. Expert in building category-defining consumer technology brands for emerging market audiences.' },
            ].map(m => (
              <div key={m.name} className="flex gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className={`w-10 h-10 rounded-xl ${m.bg} text-white font-black flex items-center justify-center text-sm shrink-0`}>
                  {m.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-sm">{m.name}</div>
                  <div className="text-emerald-600 text-xs mb-1.5">{m.role}</div>
                  <div className="text-gray-500 text-xs leading-relaxed">{m.bio}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-3 pb-2 border-b border-gray-100">Financial Summary & Projections</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-950 text-white">
                  <th className="text-left p-3 font-semibold">Metric</th>
                  {['Year 1', 'Year 2', 'Year 3'].map(y => (
                    <th key={y} className="p-3 font-semibold text-center">{y}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Monthly GMV (EoY)', '$250K', '$2.5M', '$15M'],
                  ['Annual Revenue', '$900K', '$7.2M', '$36M'],
                  ['Gross Margin', '38%', '45%', '52%'],
                  ['EBITDA', '($(650K))', '($(200K))', '$4.5M'],
                  ['Farmers Onboarded', '500', '8,000', '50,000'],
                  ['B2B Clients', '50', '500', '5,000'],
                  ['Cities Operational', '2 (Lagos, Abuja)', '4', '8'],
                ].map(([m, y1, y2, y3]) => (
                  <tr key={m} className="border-b border-gray-100">
                    <td className="p-3 text-gray-600 font-medium">{m}</td>
                    <td className="p-3 text-center text-gray-700">{y1}</td>
                    <td className="p-3 text-center text-gray-700">{y2}</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">{y3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3 italic">Conservative projections based on comparable African logistics/agritech benchmarks. All values in USD.</p>
        </section>

        <section>
          <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-3 pb-2 border-b border-gray-100">Investment Opportunity</h2>
          <div className="bg-gray-950 text-white rounded-xl p-6">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-gray-400 text-xs uppercase tracking-widest mb-3">Round Details</div>
                <div className="space-y-2 text-sm">
                  {[
                    ['Stage', 'Pre-Seed / Seed'],
                    ['Raise', '$1,500,000 USD'],
                    ['Instrument', 'SAFE or Priced Round'],
                    ['Min. Ticket', '$25,000 USD'],
                    ['Runway', '18 months'],
                    ['Close Target', 'Q3 2025'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-white/[0.05] pb-1.5">
                      <span className="text-gray-500">{k}</span>
                      <span className="text-white font-medium">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-gray-400 text-xs uppercase tracking-widest mb-3">Use of Proceeds</div>
                <div className="space-y-2 text-sm">
                  {[
                    ['Cold-Chain Infrastructure', '40%', '$600K'],
                    ['Technology & Product', '25%', '$375K'],
                    ['Team & Hiring', '20%', '$300K'],
                    ['Sales & Market Expansion', '15%', '$225K'],
                  ].map(([label, pct, amt]) => (
                    <div key={label} className="flex justify-between border-b border-white/[0.05] pb-1.5">
                      <span className="text-gray-500">{label}</span>
                      <span className="text-emerald-400 font-medium">{pct} <span className="text-gray-600">({amt})</span></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 text-center">
          <div className="font-bold text-gray-700 mb-1">Havesta Logistics Limited</div>
          <div className="text-emerald-600 text-sm mb-2">urutechenterprise@gmail.com</div>
          <div className="text-gray-500 text-xs">Lagos, Nigeria &nbsp;·&nbsp; CAC Registered &nbsp;·&nbsp; Seed Round 2025</div>
          <div className="text-gray-400 text-[10px] mt-3">
            CONFIDENTIAL. This executive summary contains forward-looking projections based on management estimates. Past performance is no guarantee of future results. Recipients should conduct their own due diligence before making investment decisions.
          </div>
        </div>

      </div>
    </div>
  );
}
