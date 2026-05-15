import { useState, useRef, useEffect } from 'react';
import { saveContent, resetContent, getStoredContent } from '../hooks/useContent';

const DEFAULT_ACCOUNT = { username: 'admin', password: 'havesta2025' };

function getAccounts() {
  try {
    const stored = JSON.parse(localStorage.getItem('havesta_admin_accounts') || 'null');
    return Array.isArray(stored) && stored.length > 0 ? stored : [DEFAULT_ACCOUNT];
  } catch { return [DEFAULT_ACCOUNT]; }
}
function saveAccounts(accounts) {
  localStorage.setItem('havesta_admin_accounts', JSON.stringify(accounts));
}

const SECTION_DEFAULTS = {
  navbar: {
    brandName: 'Havesta',
    cta1Label: 'Investor Deck',
    cta2Label: 'Contact Us',
    navLinks: [
      { label: 'Problem', href: '#problem' },
      { label: 'Solution', href: '#solution' },
      { label: 'Market', href: '#market' },
      { label: 'Technology', href: '#technology' },
      { label: 'Team', href: '#team' },
      { label: 'Pitch Deck', href: '#pitch-deck' },
      { label: 'Invest', href: '#invest' },
    ],
  },
  hero: {
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
  },
  problem: {
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
  },
  solution: {
    badge: 'The Solution',
    headlineLine1: 'One Integrated',
    headlineLine2: 'Food Infrastructure',
    subheadline: 'Havesta integrates cold-chain logistics, digital commerce, and supply chain technology into a single operating system for food distribution across Africa.',
    pillars: [
      { title: 'Cold-Chain Logistics', badge: 'Core Infrastructure', desc: "Refrigerated transportation and last-mile delivery across Nigeria's key agricultural corridors, maintaining product integrity from farm gate to consumer." },
      { title: 'Smart Warehousing', badge: 'Storage Layer', desc: 'Temperature-controlled storage facilities with IoT monitoring, inventory management, and real-time reporting for B2B clients and marketplaces.' },
      { title: 'Digital Marketplace', badge: 'Commerce Layer', desc: 'A dual-sided B2B and B2C marketplace connecting farmers, wholesalers, retailers, and consumers — with transparent pricing and quality guarantees.' },
      { title: 'Supply Chain Intelligence', badge: 'Intelligence Layer', desc: 'Data-driven demand forecasting, route optimization, and supply-demand matching tools that reduce waste and improve margins across the network.' },
      { title: 'Last-Mile Delivery', badge: 'Fulfillment Layer', desc: 'Hyper-local fulfillment networks for B2C grocery delivery and B2B food supply — with same-day and scheduled delivery windows across urban hubs.' },
      { title: 'IoT Monitoring', badge: 'Tech Layer', desc: 'Real-time temperature, humidity, and geolocation sensors embedded throughout the cold-chain ensuring product quality at every step.' },
    ],
  },
  howItWorks: {
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
  },
  market: {
    badge: 'Market Opportunity',
    headlineLine1: 'A Trillion-Dollar',
    headlineLine2: 'Structural Gap',
    subheadline: "Africa's food market is one of the world's fastest-growing. Havesta is entering at the inflection point — where digital infrastructure meets physical supply chain.",
    markets: [
      { label: 'TAM', sublabel: 'Total Addressable Market', value: '$1T+', desc: "Africa's total food market by 2030, driven by population growth, urbanization, and rising middle-class consumption." },
      { label: 'SAM', sublabel: 'Serviceable Addressable Market', value: '$150B', desc: "Nigeria's food retail and distribution market — one of Africa's largest, with ~220M consumers and $50B+ grocery spend annually." },
      { label: 'SOM', sublabel: 'Serviceable Obtainable Market', value: '$2.4B', desc: "Target cold-chain and digital food distribution segment across Lagos, Abuja, and Kano — Havesta's initial operational zones." },
    ],
    tailwinds: [
      { stat: '6.5%', label: 'Nigeria GDP growth driven by agriculture' },
      { stat: '53%', label: 'Urban population by 2035' },
      { stat: '3×', label: 'Online grocery growth forecast' },
      { stat: '$4.8B', label: 'African cold-chain market by 2027' },
    ],
  },
  businessModel: {
    badge: 'Business Model',
    headlineLine1: 'Multiple Diversified',
    headlineLine2: 'Revenue Streams',
    subheadline: 'Havesta captures value across the supply chain — from logistics to storage to marketplace commerce — creating a resilient, multi-revenue infrastructure business.',
    streams: [
      { title: 'Delivery Revenue', model: 'Per-order', margin: '35–45%', desc: 'Revenue generated from B2B and B2C delivery of perishables and grocery items via our cold-chain fleet.' },
      { title: 'Storage & Warehousing', model: 'Monthly SLA', margin: '50–60%', desc: 'Recurring revenue from cold-storage rental contracts with FMCG brands, food processors, and agricultural cooperatives.' },
      { title: 'Marketplace Commission', model: '5–15% GMV take-rate', margin: '75–85%', desc: 'Commission earned on every transaction facilitated through the Havesta B2B procurement and B2C grocery marketplace.' },
      { title: 'B2B Contracts', model: 'Retainer + volume', margin: '40–55%', desc: 'Long-term supply agreements with hotels, hospitals, restaurant chains, and institutional food buyers requiring guaranteed supply.' },
      { title: 'Subscription Tiers', model: 'Monthly recurring', margin: '80–90%', desc: 'Premium membership tiers for both B2B buyers (priority supply, analytics dashboards) and B2C consumers (free delivery, discounts).' },
    ],
  },
  competitive: {
    badge: 'Competitive Moat',
    headlineLine1: 'Why Havesta',
    headlineLine2: 'Wins the Market',
    subheadline: "No competitor has integrated cold-chain, technology, and dual-sided commerce into one platform. Havesta's infrastructure creates deep switching costs and compounding network effects.",
    features: ['Cold-chain logistics network', 'Real-time IoT monitoring', 'B2B + B2C dual model', 'Smart warehousing', 'Digital marketplace', 'Farmer onboarding', 'Data intelligence layer', 'Last-mile delivery', 'Subscription revenue'],
    moats: [
      { title: 'Cold-Chain Scarcity', desc: 'Physical infrastructure is expensive to replicate — creating high barriers to entry for digital-only competitors.' },
      { title: 'Network Effects', desc: 'More farmers attract more buyers; more buyers attract more farmers — creating compounding value with scale.' },
      { title: 'Data Intelligence', desc: 'Every transaction and delivery builds proprietary data for demand forecasting, route optimization, and supply prediction.' },
    ],
  },
  technology: {
    badge: 'Technology & Infrastructure',
    headlineLine1: 'Software-Defined',
    headlineLine2: 'Food Logistics',
    subheadline: 'Havesta is a technology company that operates physical infrastructure — not a logistics company that uses software. The distinction defines our scalability and margin profile.',
    pillars: [
      { title: 'Real-Time Logistics Engine', tag: 'Logistics AI', desc: 'AI-powered route optimization and dynamic dispatch system that coordinates fleet movements, reduces transit time by 40%, and ensures on-time cold-chain delivery.' },
      { title: 'IoT Cold-Chain Monitoring', tag: 'IoT Infrastructure', desc: 'Hardware sensors embedded throughout storage facilities and delivery vehicles continuously monitor temperature, humidity, and product integrity in real-time.' },
      { title: 'Geospatial Intelligence', tag: 'Geo-Intelligence', desc: 'Proprietary mapping and geo-data layer that identifies demand clusters, optimizes warehouse positioning, and predicts last-mile delivery windows at street level.' },
      { title: 'Supply Chain Data Platform', tag: 'Data Platform', desc: 'Centralized data warehouse collecting SKU-level inventory, pricing, delivery, and farmer data — enabling actionable intelligence across the entire supply chain.' },
      { title: 'Demand Forecasting', tag: 'ML / Forecasting', desc: 'Machine learning models trained on historical order data, seasonal patterns, and market signals to predict demand and reduce food waste through proactive supply planning.' },
      { title: 'Vendor & Farmer OS', tag: 'Mobile-First', desc: 'Mobile-first dashboard for farmers and vendors to manage inventory, track payments, view demand forecasts, and receive smart logistics alerts — accessible on USSD and app.' },
    ],
  },
  traction: {
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
  },
  team: {
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
  },
  investment: {
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
      { label: 'Cold-Chain Pilot Infrastructure', pct: '40', desc: 'Initial fleet deposit, cold-storage pilot unit, IoT sensors ($20,000)' },
      { label: 'Technology & Product', pct: '25', desc: 'Platform development, MVP completion, mobile apps ($12,500)' },
      { label: 'Team & Operations', pct: '20', desc: 'Key early hires, operations setup, contractor costs ($10,000)' },
      { label: 'Sales & Market Testing', pct: '15', desc: 'B2B outreach, farmer onboarding, early marketing ($7,500)' },
    ],
    formTitle: 'Request Investor Materials',
    formButtonLabel: 'Request Investor Deck',
    formNote: 'We respond within 24 hours. No spam, ever.',
  },
  executiveSummary: {
    badge: 'Executive Summary',
    headlineLine1: 'The Investment',
    headlineLine2: 'Case for Havesta',
    subheadline: "A structured overview of our business, market, model, and opportunity for investors evaluating Havesta's seed round.",
    keyMetrics: [
      { label: 'Pre-Seed Round', value: '$50K' },
      { label: 'TAM by 2030', value: '$1T+' },
      { label: 'Annual Food Wastage (NG)', value: '$9B' },
      { label: 'Valuation Cap', value: '$1.5M' },
      { label: 'Runway', value: '~10 months' },
      { label: 'Target Close', value: 'Q3 2025' },
    ],
    financialRows: [
      { metric: 'Monthly GMV (EoY)', y1: '$15K', y2: '$250K', y3: '$2M' },
      { metric: 'Annual Revenue', y1: '$50K', y2: '$600K', y3: '$8M' },
      { metric: 'Gross Margin', y1: '28%', y2: '38%', y3: '50%' },
      { metric: 'EBITDA', y1: '($45K)', y2: '($100K)', y3: '$1.2M' },
      { metric: 'Farmers Onboarded', y1: '20–50', y2: '500+', y3: '5,000+' },
      { metric: 'B2B Clients', y1: '5–10', y2: '80+', y3: '500+' },
      { metric: 'Cities Operational', y1: '1 (Lagos)', y2: '2', y3: '4+' },
    ],
  },
  safeAgreement: {
    badge: 'Legal Documents',
    headlineLine1: 'SAFE Agreement',
    headlineLine2: 'Template',
    subheadline: 'Our standard Simple Agreement for Future Equity — modelled on the Y Combinator SAFE framework, adapted for Nigerian law. Investors may execute a customised version at their preferred terms.',
    standardTerms: [
      { k: 'Instrument', v: 'SAFE (Post-Money)' },
      { k: 'Round', v: 'Pre-Seed' },
      { k: 'Raise Target', v: '$50,000' },
      { k: 'Valuation Cap', v: '$1,500,000' },
      { k: 'Discount Rate', v: '20%' },
      { k: 'Min. Ticket', v: '$5,000' },
      { k: 'Pro-Rata Rights', v: 'Included' },
      { k: 'MFN Clause', v: 'Included' },
      { k: 'Interest', v: 'None' },
      { k: 'Maturity Date', v: 'None' },
      { k: 'Governing Law', v: 'Nigeria' },
    ],
  },
  finalCTA: {
    badge: 'Pre-Seed Round Open · $50,000',
    headlineLine1: 'The Infrastructure',
    headlineLine2: 'Africa Has Been Waiting For',
    subheadline: "Havesta is not building another food delivery app. We are building the cold-chain backbone that will move Africa's agricultural economy from fragmented and wasteful to integrated and intelligent.",
    cta1Label: 'Request Investor Deck',
    cta2Label: 'Schedule a Call',
    contactInfo: ['urutechenterprise@gmail.com', 'havesta.co', 'Lagos, Nigeria'],
  },
  footer: {
    companyName: 'Havesta Logistics Limited',
    copyrightYear: '2025',
    address: 'Lagos, Nigeria',
    badge: 'CAC Registered',
    email: 'urutechenterprise@gmail.com',
    phone: '',
  },
  emailGate: {
    siteLabel: 'Investor Portal · Confidential',
    accessBadge: 'Access Required',
    headline: 'Enter your email to access the Havesta investor deck.',
    description: 'This site is intended for investors and partners. Enter your email below — we may follow up with updates.',
    placeholder: 'your@email.com',
    buttonLabel: 'Access the Investor Site',
    disclaimer: 'By continuing you confirm you are an accredited investor or authorised recipient. Your email will not be shared with third parties.',
    footerNote: '© 2025 Havesta Logistics Limited · Lagos, Nigeria · CAC Registered',
  },
};

const SECTIONS = [
  { key: 'navbar', label: 'Navbar' },
  { key: 'hero', label: 'Hero' },
  { key: 'problem', label: 'Problem' },
  { key: 'solution', label: 'Solution' },
  { key: 'howItWorks', label: 'How It Works' },
  { key: 'market', label: 'Market' },
  { key: 'businessModel', label: 'Business Model' },
  { key: 'competitive', label: 'Competitive Advantage' },
  { key: 'technology', label: 'Technology' },
  { key: 'traction', label: 'Traction & Roadmap' },
  { key: 'team', label: 'Team' },
  { key: 'investment', label: 'Investment' },
  { key: 'executiveSummary', label: 'Executive Summary' },
  { key: 'safeAgreement', label: 'SAFE Agreement' },
  { key: 'finalCTA', label: 'Final CTA' },
  { key: 'footer', label: 'Footer' },
  { key: 'emailGate', label: 'Email Gate' },
];

const SECTION_SCHEMA = {
  navbar: [
    { key: 'brandName', label: 'Brand Name', type: 'text' },
    { key: 'cta1Label', label: 'Nav CTA 1 (ghost button)', type: 'text' },
    { key: 'cta2Label', label: 'Nav CTA 2 (solid button)', type: 'text' },
    { key: 'navLinks', label: 'Navigation Links', type: 'array<object>', itemFields: [
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'href', label: 'Link (e.g. #section)', type: 'text' },
    ], defaultItem: { label: '', href: '#' } },
  ],
  hero: [
    { key: 'badge', label: 'Badge Text', type: 'text' },
    { key: 'headlineLine1', label: 'Headline — Line 1', type: 'text' },
    { key: 'headlineLine2', label: 'Headline — Line 2 (gradient)', type: 'text' },
    { key: 'headlineLine3', label: 'Headline — Line 3', type: 'text' },
    { key: 'subheadline', label: 'Subheadline', type: 'textarea' },
    { key: 'cta1Label', label: 'Primary CTA Label', type: 'text' },
    { key: 'cta2Label', label: 'Secondary CTA Label', type: 'text' },
    { key: 'trustPills', label: 'Trust Pills', type: 'array<string>' },
    { key: 'stats', label: 'Hero Statistics', type: 'array<object>', itemFields: [
      { key: 'value', label: 'Value', type: 'text' },
      { key: 'label', label: 'Label', type: 'text' },
    ], defaultItem: { value: '', label: '' } },
  ],
  problem: [
    { key: 'badge', label: 'Badge Text', type: 'text' },
    { key: 'headlineLine1', label: 'Headline — Line 1', type: 'text' },
    { key: 'headlineLine2', label: 'Headline — Line 2 (gradient)', type: 'text' },
    { key: 'subheadline', label: 'Subheadline', type: 'textarea' },
    { key: 'bannerStat', label: 'Banner Statistic', type: 'text' },
    { key: 'bannerDesc', label: 'Banner Description', type: 'text' },
    { key: 'cards', label: 'Problem Cards', type: 'array<object>', itemFields: [
      { key: 'stat', label: 'Statistic', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'desc', label: 'Description', type: 'textarea' },
    ], defaultItem: { stat: '', title: '', desc: '' } },
  ],
  solution: [
    { key: 'badge', label: 'Badge Text', type: 'text' },
    { key: 'headlineLine1', label: 'Headline — Line 1', type: 'text' },
    { key: 'headlineLine2', label: 'Headline — Line 2 (gradient)', type: 'text' },
    { key: 'subheadline', label: 'Subheadline', type: 'textarea' },
    { key: 'pillars', label: 'Solution Pillars', type: 'array<object>', itemFields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'badge', label: 'Badge Tag', type: 'text' },
      { key: 'desc', label: 'Description', type: 'textarea' },
    ], defaultItem: { title: '', badge: '', desc: '' } },
  ],
  howItWorks: [
    { key: 'badge', label: 'Badge Text', type: 'text' },
    { key: 'headlineLine1', label: 'Headline — Line 1', type: 'text' },
    { key: 'headlineLine2', label: 'Headline — Line 2 (gradient)', type: 'text' },
    { key: 'subheadline', label: 'Subheadline', type: 'textarea' },
    { key: 'summaryText', label: 'Summary Callout Text', type: 'textarea' },
    { key: 'steps', label: 'Steps', type: 'array<object>', itemFields: [
      { key: 'step', label: 'Step Number (e.g. 01)', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'desc', label: 'Description', type: 'textarea' },
    ], defaultItem: { step: '01', title: '', desc: '' } },
  ],
  market: [
    { key: 'badge', label: 'Badge Text', type: 'text' },
    { key: 'headlineLine1', label: 'Headline — Line 1', type: 'text' },
    { key: 'headlineLine2', label: 'Headline — Line 2 (gradient)', type: 'text' },
    { key: 'subheadline', label: 'Subheadline', type: 'textarea' },
    { key: 'markets', label: 'TAM / SAM / SOM', type: 'array<object>', itemFields: [
      { key: 'label', label: 'Label (TAM/SAM/SOM)', type: 'text' },
      { key: 'sublabel', label: 'Sub-label', type: 'text' },
      { key: 'value', label: 'Value', type: 'text' },
      { key: 'desc', label: 'Description', type: 'textarea' },
    ], defaultItem: { label: '', sublabel: '', value: '', desc: '' } },
    { key: 'tailwinds', label: 'Market Tailwinds', type: 'array<object>', itemFields: [
      { key: 'stat', label: 'Statistic', type: 'text' },
      { key: 'label', label: 'Label', type: 'text' },
    ], defaultItem: { stat: '', label: '' } },
  ],
  businessModel: [
    { key: 'badge', label: 'Badge Text', type: 'text' },
    { key: 'headlineLine1', label: 'Headline — Line 1', type: 'text' },
    { key: 'headlineLine2', label: 'Headline — Line 2 (gradient)', type: 'text' },
    { key: 'subheadline', label: 'Subheadline', type: 'textarea' },
    { key: 'streams', label: 'Revenue Streams', type: 'array<object>', itemFields: [
      { key: 'title', label: 'Stream Name', type: 'text' },
      { key: 'model', label: 'Model Tag', type: 'text' },
      { key: 'margin', label: 'Gross Margin', type: 'text' },
      { key: 'desc', label: 'Description', type: 'textarea' },
    ], defaultItem: { title: '', model: '', margin: '', desc: '' } },
  ],
  competitive: [
    { key: 'badge', label: 'Badge Text', type: 'text' },
    { key: 'headlineLine1', label: 'Headline — Line 1', type: 'text' },
    { key: 'headlineLine2', label: 'Headline — Line 2 (gradient)', type: 'text' },
    { key: 'subheadline', label: 'Subheadline', type: 'textarea' },
    { key: 'features', label: 'Comparison Feature Rows', type: 'array<string>' },
    { key: 'moats', label: 'Moat Cards', type: 'array<object>', itemFields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'desc', label: 'Description', type: 'textarea' },
    ], defaultItem: { title: '', desc: '' } },
  ],
  technology: [
    { key: 'badge', label: 'Badge Text', type: 'text' },
    { key: 'headlineLine1', label: 'Headline — Line 1', type: 'text' },
    { key: 'headlineLine2', label: 'Headline — Line 2 (gradient)', type: 'text' },
    { key: 'subheadline', label: 'Subheadline', type: 'textarea' },
    { key: 'pillars', label: 'Tech Pillars', type: 'array<object>', itemFields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'tag', label: 'Tag Label', type: 'text' },
      { key: 'desc', label: 'Description', type: 'textarea' },
    ], defaultItem: { title: '', tag: '', desc: '' } },
  ],
  traction: [
    { key: 'badge', label: 'Badge Text', type: 'text' },
    { key: 'headlineLine1', label: 'Headline — Line 1', type: 'text' },
    { key: 'headlineLine2', label: 'Headline — Line 2 (gradient)', type: 'text' },
    { key: 'subheadline', label: 'Subheadline', type: 'textarea' },
    { key: 'milestones', label: 'Roadmap Milestones', type: 'array<object>', itemFields: [
      { key: 'phase', label: 'Phase (e.g. Q1 2025)', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'desc', label: 'Description', type: 'textarea' },
      { key: 'done', label: 'Mark as completed', type: 'checkbox' },
    ], defaultItem: { phase: '', title: '', desc: '', done: false } },
    { key: 'projections', label: '3-Year Projections', type: 'array<object>', itemFields: [
      { key: 'label', label: 'Metric Label', type: 'text' },
      { key: 'year1', label: 'Year 1', type: 'text' },
      { key: 'year3', label: 'Year 3', type: 'text' },
    ], defaultItem: { label: '', year1: '', year3: '' } },
  ],
  team: [
    { key: 'badge', label: 'Badge Text', type: 'text' },
    { key: 'headlineLine1', label: 'Headline — Line 1', type: 'text' },
    { key: 'headlineLine2', label: 'Headline — Line 2 (gradient)', type: 'text' },
    { key: 'subheadline', label: 'Subheadline', type: 'textarea' },
    { key: 'members', label: 'Team Members', type: 'array<object>', itemFields: [
      { key: 'name', label: 'Full Name', type: 'text' },
      { key: 'role', label: 'Role / Title', type: 'text' },
      { key: 'initials', label: 'Initials (2 chars)', type: 'text' },
      { key: 'tag', label: 'Tags (e.g. Ops · Strategy)', type: 'text' },
      { key: 'bio', label: 'Bio', type: 'textarea' },
    ], defaultItem: { name: '', role: '', initials: '', tag: '', bio: '' } },
    { key: 'advisors', label: 'Strategic Advisors', type: 'array<object>', itemFields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'org', label: 'Organization', type: 'text' },
    ], defaultItem: { name: '', role: '', org: '' } },
  ],
  investment: [
    { key: 'badge', label: 'Badge Text', type: 'text' },
    { key: 'headlineLine1', label: 'Headline — Line 1', type: 'text' },
    { key: 'headlineLine2', label: 'Headline — Line 2 (gradient)', type: 'text' },
    { key: 'subheadline', label: 'Subheadline', type: 'textarea' },
    { key: 'terms', label: 'Deal Terms', type: 'array<object>', itemFields: [
      { key: 'label', label: 'Term Label', type: 'text' },
      { key: 'val', label: 'Value', type: 'text' },
    ], defaultItem: { label: '', val: '' } },
    { key: 'useOfFunds', label: 'Use of Funds', type: 'array<object>', itemFields: [
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'pct', label: 'Percentage (number only)', type: 'text' },
      { key: 'desc', label: 'Description', type: 'textarea' },
    ], defaultItem: { label: '', pct: '', desc: '' } },
    { key: 'formTitle', label: 'Contact Form — Title', type: 'text' },
    { key: 'formButtonLabel', label: 'Contact Form — Button Label', type: 'text' },
    { key: 'formNote', label: 'Contact Form — Note (below button)', type: 'text' },
  ],
  executiveSummary: [
    { key: 'badge', label: 'Badge Text', type: 'text' },
    { key: 'headlineLine1', label: 'Headline — Line 1', type: 'text' },
    { key: 'headlineLine2', label: 'Headline — Line 2 (gradient)', type: 'text' },
    { key: 'subheadline', label: 'Subheadline', type: 'textarea' },
    { key: 'keyMetrics', label: 'Key Metrics Strip', type: 'array<object>', itemFields: [
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'value', label: 'Value', type: 'text' },
    ], defaultItem: { label: '', value: '' } },
    { key: 'financialRows', label: '3-Year Financial Table Rows', type: 'array<object>', itemFields: [
      { key: 'metric', label: 'Metric', type: 'text' },
      { key: 'y1', label: 'Year 1', type: 'text' },
      { key: 'y2', label: 'Year 2', type: 'text' },
      { key: 'y3', label: 'Year 3', type: 'text' },
    ], defaultItem: { metric: '', y1: '', y2: '', y3: '' } },
  ],
  safeAgreement: [
    { key: 'badge', label: 'Badge Text', type: 'text' },
    { key: 'headlineLine1', label: 'Headline — Line 1', type: 'text' },
    { key: 'headlineLine2', label: 'Headline — Line 2 (gradient)', type: 'text' },
    { key: 'subheadline', label: 'Subheadline', type: 'textarea' },
    { key: 'standardTerms', label: 'Standard Terms (sidebar)', type: 'array<object>', itemFields: [
      { key: 'k', label: 'Term', type: 'text' },
      { key: 'v', label: 'Value', type: 'text' },
    ], defaultItem: { k: '', v: '' } },
  ],
  finalCTA: [
    { key: 'badge', label: 'Badge Text', type: 'text' },
    { key: 'headlineLine1', label: 'Headline — Line 1', type: 'text' },
    { key: 'headlineLine2', label: 'Headline — Line 2 (gradient)', type: 'text' },
    { key: 'subheadline', label: 'Subheadline', type: 'textarea' },
    { key: 'cta1Label', label: 'Primary CTA Label', type: 'text' },
    { key: 'cta2Label', label: 'Secondary CTA Label', type: 'text' },
    { key: 'contactInfo', label: 'Contact Info Items', type: 'array<string>' },
  ],
  footer: [
    { key: 'companyName', label: 'Company Name', type: 'text' },
    { key: 'copyrightYear', label: 'Copyright Year', type: 'text' },
    { key: 'address', label: 'Address', type: 'text' },
    { key: 'badge', label: 'Certification Badge', type: 'text' },
    { key: 'email', label: 'Contact Email', type: 'text' },
    { key: 'phone', label: 'Phone Number (optional)', type: 'text' },
  ],
  emailGate: [
    { key: 'siteLabel', label: 'Site Label (below logo)', type: 'text' },
    { key: 'accessBadge', label: 'Badge Text', type: 'text' },
    { key: 'headline', label: 'Headline', type: 'textarea' },
    { key: 'description', label: 'Description Paragraph', type: 'textarea' },
    { key: 'placeholder', label: 'Email Input Placeholder', type: 'text' },
    { key: 'buttonLabel', label: 'Button Label', type: 'text' },
    { key: 'disclaimer', label: 'Disclaimer (below button)', type: 'textarea' },
    { key: 'footerNote', label: 'Footer Note', type: 'text' },
  ],
};

// ─── Field renderers ──────────────────────────────────────────────────────────
function TF({ label, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-[11px] text-gray-400 mb-1">{label}</label>
      <input type="text" value={value ?? ''} onChange={e => onChange(e.target.value)}
        className="w-full bg-gray-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/40 transition-colors" />
    </div>
  );
}

function TA({ label, value, onChange, rows = 3 }) {
  return (
    <div className="mb-4">
      <label className="block text-[11px] text-gray-400 mb-1">{label}</label>
      <textarea rows={rows} value={value ?? ''} onChange={e => onChange(e.target.value)}
        className="w-full bg-gray-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/40 transition-colors resize-y" />
    </div>
  );
}

function ArrayStr({ label, value = [], onChange }) {
  const add = () => onChange([...value, '']);
  const remove = i => onChange(value.filter((_, idx) => idx !== i));
  const upd = (i, v) => onChange(value.map((item, idx) => idx === i ? v : item));
  return (
    <div className="mb-4">
      <label className="block text-[11px] text-gray-400 mb-2">{label}</label>
      <div className="space-y-2">
        {value.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input type="text" value={item} onChange={e => upd(i, e.target.value)}
              className="flex-1 bg-gray-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/40" />
            <button onClick={() => remove(i)} className="text-gray-600 hover:text-red-400 text-sm px-2 transition-colors">×</button>
          </div>
        ))}
      </div>
      <button onClick={add} className="mt-2 text-xs text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 px-3 py-1 rounded-lg transition-colors">+ Add</button>
    </div>
  );
}

function ArrayObj({ label, value = [], onChange, itemFields, defaultItem }) {
  const add = () => onChange([...value, { ...defaultItem }]);
  const remove = i => onChange(value.filter((_, idx) => idx !== i));
  const upd = (i, k, v) => onChange(value.map((item, idx) => idx === i ? { ...item, [k]: v } : item));
  const move = (i, dir) => {
    const a = [...value];
    const j = i + dir;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]];
    onChange(a);
  };
  return (
    <div className="mb-5">
      <label className="block text-[11px] text-gray-400 mb-2">{label}</label>
      <div className="space-y-3">
        {value.map((item, i) => (
          <div key={i} className="bg-gray-900/80 border border-white/[0.07] rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] text-gray-600 uppercase tracking-widest">#{i + 1}</span>
              <div className="flex gap-1">
                <button onClick={() => move(i, -1)} className="text-gray-600 hover:text-gray-300 text-xs w-5 h-5 flex items-center justify-center transition-colors">↑</button>
                <button onClick={() => move(i, 1)} className="text-gray-600 hover:text-gray-300 text-xs w-5 h-5 flex items-center justify-center transition-colors">↓</button>
                <button onClick={() => remove(i)} className="text-red-700 hover:text-red-400 text-xs w-5 h-5 flex items-center justify-center transition-colors">✕</button>
              </div>
            </div>
            {itemFields.map(f => {
              if (f.type === 'checkbox') return (
                <div key={f.key} className="mb-3 flex items-center gap-2">
                  <input type="checkbox" checked={!!item[f.key]} onChange={e => upd(i, f.key, e.target.checked)} className="accent-emerald-500" />
                  <label className="text-xs text-gray-400">{f.label}</label>
                </div>
              );
              if (f.type === 'textarea') return <TA key={f.key} label={f.label} value={item[f.key]} onChange={v => upd(i, f.key, v)} rows={f.rows || 2} />;
              return <TF key={f.key} label={f.label} value={item[f.key]} onChange={v => upd(i, f.key, v)} />;
            })}
          </div>
        ))}
      </div>
      <button onClick={add} className="mt-2 text-xs text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 px-3 py-1 rounded-lg transition-colors">+ Add item</button>
    </div>
  );
}

// ─── Section editor ───────────────────────────────────────────────────────────
function SectionEditor({ sectionKey }) {
  const defaults = SECTION_DEFAULTS[sectionKey] || {};
  const schema = SECTION_SCHEMA[sectionKey] || [];
  const [data, setData] = useState(() => getStoredContent(sectionKey, defaults));
  const [saved, setSaved] = useState(false);

  const set = (key, val) => setData(prev => ({ ...prev, [key]: val }));

  const handleSave = () => {
    saveContent(sectionKey, data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (!window.confirm('Reset this section to defaults? All edits will be lost.')) return;
    resetContent(sectionKey);
    setData({ ...defaults });
  };

  return (
    <div>
      {schema.map(f => {
        if (f.type === 'text') return <TF key={f.key} label={f.label} value={data[f.key]} onChange={v => set(f.key, v)} />;
        if (f.type === 'textarea') return <TA key={f.key} label={f.label} value={data[f.key]} onChange={v => set(f.key, v)} />;
        if (f.type === 'array<string>') return <ArrayStr key={f.key} label={f.label} value={data[f.key]} onChange={v => set(f.key, v)} />;
        if (f.type === 'array<object>') return <ArrayObj key={f.key} label={f.label} value={data[f.key]} onChange={v => set(f.key, v)} itemFields={f.itemFields} defaultItem={f.defaultItem} />;
        return null;
      })}
      <div className="mt-6 pt-4 border-t border-white/[0.07] flex gap-3">
        <button onClick={handleSave}
          className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${saved ? 'bg-emerald-600 text-white' : 'bg-emerald-500 hover:bg-emerald-400 text-black'}`}>
          {saved ? '✓ Saved!' : 'Save Changes'}
        </button>
        <button onClick={handleReset}
          className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-red-400 border border-white/[0.07] hover:border-red-500/20 transition-all">
          Reset
        </button>
      </div>
    </div>
  );
}

// ─── Media upload (logo + pitch deck) ────────────────────────────────────────
function MediaUpload() {
  const logoRef = useRef(null);
  const deckRef = useRef(null);
  const [logoName, setLogoName] = useState(() => localStorage.getItem('havesta_logo') ? 'Custom logo active' : null);
  const [deckName, setDeckName] = useState(() => localStorage.getItem('havesta_pitchdeck') ? 'Custom pitch deck active' : null);
  const [logoSaved, setLogoSaved] = useState(false);
  const [deckSaved, setDeckSaved] = useState(false);

  const handleLogo = e => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert('Logo image must be under 2 MB.'); return; }
    new Promise((res) => {
      const r = new FileReader();
      r.onload = ev => res(ev.target.result);
      r.readAsDataURL(file);
    }).then(b64 => {
      try {
        localStorage.setItem('havesta_logo', b64);
        window.dispatchEvent(new CustomEvent('havesta:logo'));
        setLogoName(file.name);
        setLogoSaved(true);
        setTimeout(() => setLogoSaved(false), 2500);
      } catch {
        alert('Failed to save logo — storage quota exceeded. Try a smaller image.');
      }
    });
  };

  const handleDeck = e => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 25 * 1024 * 1024) { alert('PDF must be under 25 MB'); return; }
    new Promise((res) => {
      const r = new FileReader();
      r.onload = ev => res(ev.target.result);
      r.readAsDataURL(file);
    }).then(b64 => {
      localStorage.setItem('havesta_pitchdeck', b64);
      window.dispatchEvent(new CustomEvent('havesta:pitchdeck'));
      setDeckName(file.name);
      setDeckSaved(true);
      setTimeout(() => setDeckSaved(false), 2500);
    });
  };

  const removeLogo = () => { localStorage.removeItem('havesta_logo'); window.dispatchEvent(new CustomEvent('havesta:logo')); setLogoName(null); };
  const removeDeck = () => { localStorage.removeItem('havesta_pitchdeck'); window.dispatchEvent(new CustomEvent('havesta:pitchdeck')); setDeckName(null); };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900/60 border border-white/[0.07] rounded-xl p-5">
        <h3 className="text-white font-semibold text-sm mb-1">Site Logo</h3>
        <p className="text-gray-500 text-xs mb-4">Upload PNG, JPG, or SVG. Shown in the navbar and footer. Recommended: square image, min 64×64px.</p>
        {logoName && (
          <div className="flex items-center gap-3 mb-4 p-3 bg-emerald-950/20 border border-emerald-500/15 rounded-lg">
            {localStorage.getItem('havesta_logo') && (
              <img src={localStorage.getItem('havesta_logo')} alt="logo" className="w-10 h-10 object-contain rounded-md bg-gray-800" />
            )}
            <div className="flex-1 min-w-0">
              <div className={`text-xs font-semibold truncate ${logoSaved ? 'text-emerald-400' : 'text-white'}`}>
                {logoSaved ? '✓ Saved!' : logoName}
              </div>
            </div>
            <button onClick={removeLogo} className="text-red-600 hover:text-red-400 text-xs transition-colors shrink-0">Remove</button>
          </div>
        )}
        <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={handleLogo} />
        <button onClick={() => logoRef.current?.click()}
          className="w-full border border-dashed border-white/20 hover:border-emerald-500/30 rounded-xl py-3 text-sm text-gray-500 hover:text-emerald-400 transition-colors">
          {logoName ? 'Replace Logo' : '+ Upload Logo Image'}
        </button>
      </div>

      <div className="bg-gray-900/60 border border-white/[0.07] rounded-xl p-5">
        <h3 className="text-white font-semibold text-sm mb-1">Investor Pitch Deck (PDF)</h3>
        <p className="text-gray-500 text-xs mb-4">Upload your own PDF. It replaces the generated slide deck in the Pitch Deck section. Max 25 MB.</p>
        {deckName && (
          <div className="flex items-center gap-3 mb-4 p-3 bg-emerald-950/20 border border-emerald-500/15 rounded-lg">
            <div className="w-10 h-10 bg-red-950/40 border border-red-500/20 rounded-md flex items-center justify-center text-red-400 text-xs font-black">PDF</div>
            <div className="flex-1 min-w-0">
              <div className={`text-xs font-semibold truncate ${deckSaved ? 'text-emerald-400' : 'text-white'}`}>
                {deckSaved ? '✓ Saved!' : deckName}
              </div>
            </div>
            <button onClick={removeDeck} className="text-red-600 hover:text-red-400 text-xs transition-colors shrink-0">Remove</button>
          </div>
        )}
        <input ref={deckRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={handleDeck} />
        <button onClick={() => deckRef.current?.click()}
          className="w-full border border-dashed border-white/20 hover:border-emerald-500/30 rounded-xl py-3 text-sm text-gray-500 hover:text-emerald-400 transition-colors">
          {deckName ? 'Replace PDF' : '+ Upload PDF Pitch Deck'}
        </button>
      </div>
    </div>
  );
}

// ─── Leads panel ─────────────────────────────────────────────────────────────
function LeadsPanel() {
  const [leads, setLeads] = useState(() => JSON.parse(localStorage.getItem('havesta_leads') || '[]'));
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const handler = () => setLeads(JSON.parse(localStorage.getItem('havesta_leads') || '[]'));
    window.addEventListener('havesta:lead', handler);
    return () => window.removeEventListener('havesta:lead', handler);
  }, []);

  const deleteLead = (i) => {
    const updated = leads.filter((_, idx) => idx !== i);
    localStorage.setItem('havesta_leads', JSON.stringify(updated));
    setLeads(updated);
    if (expanded === i) setExpanded(null);
  };

  const clearAll = () => {
    if (!window.confirm('Delete all leads? This cannot be undone.')) return;
    localStorage.removeItem('havesta_leads');
    setLeads([]);
    setExpanded(null);
  };

  const fmt = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) +
      ' · ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-sm">{leads.length} lead{leads.length !== 1 ? 's' : ''}</span>
          {leads.length > 0 && (
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">Live</span>
          )}
        </div>
        {leads.length > 0 && (
          <button onClick={clearAll} className="text-xs text-gray-600 hover:text-red-400 border border-white/[0.07] hover:border-red-500/20 px-3 py-1.5 rounded-lg transition-all">
            Clear All
          </button>
        )}
      </div>

      {leads.length === 0 ? (
        <div className="text-center py-16 bg-gray-900/40 rounded-2xl border border-white/[0.06]">
          <div className="text-4xl mb-3">📭</div>
          <div className="text-gray-500 text-sm">No leads yet.</div>
          <div className="text-gray-700 text-xs mt-1">Submissions from the investment form will appear here.</div>
        </div>
      ) : (
        <div className="space-y-2">
          {leads.map((lead, i) => (
            <div key={i} className="bg-gray-900/60 border border-white/[0.07] rounded-xl overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full flex items-center gap-4 px-4 py-3 text-left hover:bg-white/[0.02] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-black text-xs shrink-0">
                  {(lead.name || '?')[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-semibold truncate">{lead.name || '—'}</div>
                  <div className="text-gray-500 text-xs truncate">{lead.email || '—'}</div>
                </div>
                {lead.amount && (
                  <span className="text-emerald-400 text-xs font-bold shrink-0">${Number(lead.amount).toLocaleString()}</span>
                )}
                <div className="text-gray-700 text-[10px] shrink-0 hidden sm:block">{fmt(lead.submittedAt)}</div>
                <span className="text-gray-600 text-xs shrink-0">{expanded === i ? '▲' : '▼'}</span>
              </button>

              {expanded === i && (
                <div className="px-4 pb-4 border-t border-white/[0.05] pt-3 space-y-2">
                  {[
                    { label: 'Full Name', val: lead.name },
                    { label: 'Email', val: lead.email },
                    { label: 'Phone', val: lead.phone },
                    { label: 'Organization / Fund', val: lead.org },
                    { label: 'Investment Amount', val: lead.amount ? `$${Number(lead.amount).toLocaleString()}` : null },
                    { label: 'Submitted', val: fmt(lead.submittedAt) },
                  ].map(({ label, val }) => val ? (
                    <div key={label} className="flex gap-3 text-xs">
                      <span className="text-gray-600 w-36 shrink-0">{label}</span>
                      <span className="text-gray-300">{val}</span>
                    </div>
                  ) : null)}
                  {lead.message && (
                    <div className="mt-2 pt-2 border-t border-white/[0.05]">
                      <div className="text-gray-600 text-xs mb-1">Message</div>
                      <div className="text-gray-300 text-xs leading-relaxed">{lead.message}</div>
                    </div>
                  )}
                  <div className="pt-2">
                    <button onClick={() => deleteLead(i)} className="text-xs text-red-600 hover:text-red-400 transition-colors">
                      Delete this lead
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Email Captures panel ────────────────────────────────────────────────────
function EmailCapturesPanel() {
  const [captures, setCaptures] = useState(() => JSON.parse(localStorage.getItem('havesta_email_captures') || '[]'));

  useEffect(() => {
    const handler = () => setCaptures(JSON.parse(localStorage.getItem('havesta_email_captures') || '[]'));
    window.addEventListener('havesta:email_capture', handler);
    return () => window.removeEventListener('havesta:email_capture', handler);
  }, []);

  const deleteCapture = (i) => {
    const updated = captures.filter((_, idx) => idx !== i);
    localStorage.setItem('havesta_email_captures', JSON.stringify(updated));
    setCaptures(updated);
  };

  const clearAll = () => {
    if (!window.confirm('Delete all email captures? This cannot be undone.')) return;
    localStorage.removeItem('havesta_email_captures');
    setCaptures([]);
  };

  const resetGate = () => {
    if (!window.confirm('Reset the access gate? All visitors will be asked for their email again on next visit.')) return;
    localStorage.removeItem('havesta_gate_passed');
    alert('Gate reset. Visitors will see the email form on their next visit.');
  };

  const copyAll = () => {
    const text = captures.map(c => c.email).join('\n');
    navigator.clipboard.writeText(text).then(() => alert(`Copied ${captures.length} email(s) to clipboard.`));
  };

  const fmt = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) +
      ' · ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div>
      {/* Stats bar */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-sm">{captures.length} email{captures.length !== 1 ? 's' : ''} captured</span>
          {captures.length > 0 && (
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">Live</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {captures.length > 0 && (
            <>
              <button onClick={copyAll} className="text-xs text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 px-3 py-1.5 rounded-lg transition-all">
                Copy All Emails
              </button>
              <button onClick={clearAll} className="text-xs text-gray-600 hover:text-red-400 border border-white/[0.07] hover:border-red-500/20 px-3 py-1.5 rounded-lg transition-all">
                Clear All
              </button>
            </>
          )}
        </div>
      </div>

      {/* Gate controls */}
      <div className="mb-5 p-4 bg-gray-900/50 border border-white/[0.06] rounded-xl flex items-center justify-between">
        <div>
          <div className="text-white text-xs font-semibold mb-0.5">Email Gate</div>
          <div className="text-gray-600 text-xs">New visitors must enter their email to access the site.</div>
        </div>
        <button onClick={resetGate} className="text-xs text-gray-500 hover:text-amber-400 border border-white/[0.07] px-3 py-1.5 rounded-lg transition-all shrink-0 ml-4">
          Reset Gate
        </button>
      </div>

      {captures.length === 0 ? (
        <div className="text-center py-16 bg-gray-900/40 rounded-2xl border border-white/[0.06]">
          <div className="text-4xl mb-3">📧</div>
          <div className="text-gray-500 text-sm">No emails captured yet.</div>
          <div className="text-gray-700 text-xs mt-1">Email addresses entered at the site gate will appear here.</div>
        </div>
      ) : (
        <div className="bg-gray-900/40 rounded-2xl border border-white/[0.06] overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto] text-[10px] text-gray-600 uppercase tracking-widest px-4 py-2.5 border-b border-white/[0.05]">
            <span>Email</span>
            <span className="text-right pr-8">Captured</span>
            <span></span>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {captures.map((c, i) => (
              <div key={i} className="grid grid-cols-[1fr_auto_auto] items-center px-4 py-3 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs shrink-0">
                    {c.email[0].toUpperCase()}
                  </div>
                  <span className="text-gray-200 text-sm truncate">{c.email}</span>
                </div>
                <span className="text-gray-600 text-xs pr-6 shrink-0">{fmt(c.capturedAt)}</span>
                <button onClick={() => deleteCapture(i)} className="text-gray-700 hover:text-red-400 text-xs transition-colors shrink-0">
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Export / Import / Push to Live panel ────────────────────────────────────
const GITHUB_REPO = 'Havesta-Logistics-Limited/Honline';
const GITHUB_FILE = 'public/content.json';
const GITHUB_BRANCH = 'main';

function ExportImportPanel() {
  const importRef = useRef(null);
  const [status, setStatus] = useState('');
  const [importing, setImporting] = useState(false);
  const [pushing, setPushing] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem('havesta_github_token') || '');
  const [showToken, setShowToken] = useState(false);

  const flash = (msg, ok = true) => {
    setStatus({ msg, ok });
    setTimeout(() => setStatus(''), 5000);
  };

  const buildBundle = () => {
    const bundle = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key === 'havesta_logo') {
        bundle[key] = localStorage.getItem(key);
      } else if (key.startsWith('havesta_content_')) {
        try { bundle[key] = JSON.parse(localStorage.getItem(key)); }
        catch { bundle[key] = localStorage.getItem(key); }
      }
    }
    return bundle;
  };

  const handleExport = () => {
    const bundle = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('havesta_content_') || key === 'havesta_logo') {
        bundle[key] = localStorage.getItem(key);
      }
    }
    const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `havesta-content-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    flash('Export downloaded.', true);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImporting(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const bundle = JSON.parse(ev.target.result);
        let count = 0;
        for (const [key, value] of Object.entries(bundle)) {
          if (key.startsWith('havesta_content_') || key === 'havesta_logo') {
            localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
            count++;
          }
        }
        window.dispatchEvent(new CustomEvent('havesta:logo'));
        window.dispatchEvent(new CustomEvent('havesta:content', { detail: { key: '__reload__' } }));
        flash(`✓ Imported ${count} item${count !== 1 ? 's' : ''}. Content updated.`, true);
      } catch {
        flash('Import failed — invalid file.', false);
      }
      setImporting(false);
      e.target.value = '';
    };
    reader.readAsText(file);
  };

  const saveToken = () => {
    localStorage.setItem('havesta_github_token', token.trim());
    flash('✓ Token saved.', true);
  };

  const handlePushToLive = async () => {
    const t = (token || localStorage.getItem('havesta_github_token') || '').trim();
    if (!t) { flash('Enter your GitHub Personal Access Token first.', false); return; }

    setPushing(true);
    try {
      const bundle = buildBundle();
      const jsonStr = JSON.stringify(bundle, null, 2);

      // Base64-encode for GitHub API (handles UTF-8)
      const encoded = btoa(unescape(encodeURIComponent(jsonStr)));

      // Get current file SHA (required for updates)
      const getRes = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE}`,
        { headers: { Authorization: `Bearer ${t}`, Accept: 'application/vnd.github+json' } }
      );
      const current = getRes.ok ? await getRes.json() : null;

      // Push updated content.json to GitHub
      const putRes = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${t}`,
            'Content-Type': 'application/json',
            Accept: 'application/vnd.github+json',
          },
          body: JSON.stringify({
            message: 'Update site content from admin portal',
            content: encoded,
            branch: GITHUB_BRANCH,
            ...(current?.sha ? { sha: current.sha } : {}),
          }),
        }
      );

      if (putRes.ok) {
        flash('✓ Pushed! Havesta.online will update in ~30 seconds.', true);
      } else {
        const err = await putRes.json().catch(() => ({}));
        flash(`Push failed: ${err.message || `HTTP ${putRes.status}`}`, false);
      }
    } catch (e) {
      flash(`Push failed: ${e.message}`, false);
    }
    setPushing(false);
  };

  return (
    <div className="space-y-5">
      {/* Push to Live — primary action */}
      <div className="bg-emerald-950/25 border border-emerald-500/25 rounded-xl p-5">
        <h3 className="text-white font-semibold text-sm mb-1 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Push to Live Site
        </h3>
        <p className="text-gray-500 text-xs mb-4">
          Sends all your content edits and logo directly to GitHub — Netlify auto-deploys to havesta.online within ~30 seconds. One-click, no manual steps.
        </p>

        <div className="mb-3">
          <label className="block text-[11px] text-gray-400 mb-1">GitHub Personal Access Token</label>
          <div className="flex gap-2 items-center">
            <input
              type={showToken ? 'text' : 'password'}
              value={token}
              onChange={e => setToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              className="flex-1 bg-gray-900 border border-white/10 rounded-lg px-3 py-2 text-white text-xs font-mono focus:outline-none focus:border-emerald-500/40 transition-colors"
            />
            <button onClick={() => setShowToken(v => !v)} className="text-gray-600 hover:text-gray-300 text-xs transition-colors shrink-0">
              {showToken ? 'Hide' : 'Show'}
            </button>
            <button onClick={saveToken} className="bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors shrink-0">
              Save
            </button>
          </div>
          <p className="text-gray-700 text-[10px] mt-1.5 leading-relaxed">
            Create at: github.com → Settings → Developer settings → Personal access tokens → Tokens (classic). Choose "repo" scope. Paste it above and click Save — only needs to be done once.
          </p>
        </div>

        <button
          onClick={handlePushToLive}
          disabled={pushing || !token.trim()}
          className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-bold text-sm py-3 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          {pushing ? (
            <>
              <span className="w-3 h-3 rounded-full border-2 border-black/30 border-t-black animate-spin" />
              Pushing to havesta.online…
            </>
          ) : (
            '→ Push All Content to Live Site'
          )}
        </button>
      </div>

      {status && (
        <p className={`text-sm font-medium ${status.ok ? 'text-emerald-400' : 'text-red-400'}`}>
          {status.msg}
        </p>
      )}

      {/* Export (backup) */}
      <div className="bg-gray-900/60 border border-white/[0.07] rounded-xl p-5">
        <h3 className="text-white font-semibold text-sm mb-1">Export Content (Backup)</h3>
        <p className="text-gray-500 text-xs mb-4">Downloads all your content edits and logo as a JSON file — useful as a backup or to move between devices.</p>
        <button onClick={handleExport}
          className="bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-white font-bold text-sm px-4 py-2.5 rounded-lg transition-colors">
          ↓ Download Content Bundle
        </button>
      </div>

      {/* Import */}
      <div className="bg-gray-900/60 border border-white/[0.07] rounded-xl p-5">
        <h3 className="text-white font-semibold text-sm mb-1">Import Content</h3>
        <p className="text-gray-500 text-xs mb-4">Upload a previously exported JSON file to restore content on this device.</p>
        <button onClick={() => importRef.current?.click()} disabled={importing}
          className="bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-white font-bold text-sm px-4 py-2.5 rounded-lg transition-colors disabled:opacity-50">
          {importing ? 'Importing…' : '↑ Upload Content Bundle'}
        </button>
        <input ref={importRef} type="file" accept=".json,application/json" className="hidden" onChange={handleImport} />
      </div>
    </div>
  );
}

// ─── Accounts panel ───────────────────────────────────────────────────────────
function AccountsPanel({ currentUser }) {
  const [accounts, setAccounts] = useState(getAccounts);
  const [newUser, setNewUser] = useState('');
  const [newPass, setNewPass] = useState('');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState('');
  const [changingPass, setChangingPass] = useState({});

  const flash = (msg) => { setSaved(msg); setTimeout(() => setSaved(''), 2500); };

  const addAccount = (e) => {
    e.preventDefault();
    if (!newUser.trim() || !newPass.trim()) { setError('Both username and password are required.'); return; }
    if (accounts.find(a => a.username.toLowerCase() === newUser.trim().toLowerCase())) {
      setError('That username already exists.'); return;
    }
    const updated = [...accounts, { username: newUser.trim(), password: newPass.trim() }];
    saveAccounts(updated);
    setAccounts(updated);
    setNewUser('');
    setNewPass('');
    setError('');
    flash('Account created.');
  };

  const deleteAccount = (username) => {
    if (accounts.length === 1) { setError("Can't delete the last account."); return; }
    if (username === currentUser) { setError("You can't delete your own active account."); return; }
    const updated = accounts.filter(a => a.username !== username);
    saveAccounts(updated);
    setAccounts(updated);
    flash('Account deleted.');
  };

  const updatePassword = (username, newPassword) => {
    if (!newPassword.trim()) return;
    const updated = accounts.map(a => a.username === username ? { ...a, password: newPassword.trim() } : a);
    saveAccounts(updated);
    setAccounts(updated);
    setChangingPass(p => ({ ...p, [username]: '' }));
    flash('Password updated.');
  };

  return (
    <div className="space-y-6">
      {/* Account list */}
      <div className="bg-gray-900/60 border border-white/[0.07] rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-white/[0.06]">
          <span className="text-white text-sm font-semibold">Current Accounts</span>
          <span className="text-gray-600 text-xs ml-2">({accounts.length})</span>
        </div>
        {accounts.map((a) => (
          <div key={a.username} className="px-5 py-4 border-b border-white/[0.04] last:border-0">
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="text-white text-sm font-semibold">{a.username}</span>
                {a.username === currentUser && (
                  <span className="ml-2 text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded-full">you</span>
                )}
                <div className="text-gray-600 text-xs mt-0.5 font-mono">{'●'.repeat(Math.min(a.password.length, 12))}</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setChangingPass(p => ({ ...p, [a.username]: p[a.username] === undefined ? '' : undefined }))}
                  className="text-xs text-gray-500 hover:text-emerald-400 transition-colors">
                  Change Password
                </button>
                <button
                  onClick={() => deleteAccount(a.username)}
                  className="text-xs text-gray-700 hover:text-red-400 transition-colors">
                  Delete
                </button>
              </div>
            </div>
            {changingPass[a.username] !== undefined && (
              <div className="mt-3 flex gap-2">
                <input
                  type="password"
                  value={changingPass[a.username]}
                  onChange={e => setChangingPass(p => ({ ...p, [a.username]: e.target.value }))}
                  placeholder="New password"
                  className="flex-1 bg-gray-900 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500/40"
                />
                <button
                  onClick={() => updatePassword(a.username, changingPass[a.username])}
                  className="bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold px-3 py-2 rounded-lg transition-colors">
                  Save
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add account */}
      <div className="bg-gray-900/60 border border-white/[0.07] rounded-xl p-5">
        <h3 className="text-white font-semibold text-sm mb-4">Add New Account</h3>
        <form onSubmit={addAccount} className="space-y-3">
          <input
            type="text"
            value={newUser}
            onChange={e => { setNewUser(e.target.value); setError(''); }}
            placeholder="Username"
            className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/40 transition-colors"
          />
          <input
            type="password"
            value={newPass}
            onChange={e => { setNewPass(e.target.value); setError(''); }}
            placeholder="Password"
            className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/40 transition-colors"
          />
          {error && <p className="text-red-400 text-xs">{error}</p>}
          {saved && <p className="text-emerald-400 text-xs">✓ {saved}</p>}
          <button type="submit"
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm px-4 py-2.5 rounded-lg transition-colors">
            + Add Account
          </button>
        </form>
      </div>

      <p className="text-gray-700 text-xs">Accounts are stored in this browser's local storage. Share credentials directly — do not store sensitive passwords here.</p>
    </div>
  );
}

// ─── Password gate ────────────────────────────────────────────────────────────
function PasswordGate({ onAuth }) {
  const [username, setUsername] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);
  const submit = e => {
    e.preventDefault();
    const match = getAccounts().find(
      a => a.username.toLowerCase() === username.trim().toLowerCase() && a.password === pw
    );
    if (match) onAuth(match.username);
    else { setErr(true); setTimeout(() => setErr(false), 1500); }
  };
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <span className="text-white font-bold text-lg">Havesta Admin</span>
        </div>
        <form onSubmit={submit} className="bg-gray-900/60 border border-white/[0.07] rounded-2xl p-8">
          <h2 className="text-white font-bold text-lg mb-1 text-center">Admin Portal</h2>
          <p className="text-gray-500 text-sm text-center mb-6">Enter your credentials to access the portal</p>
          <input type="text" autoFocus value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"
            className={`w-full bg-gray-900 border ${err ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500/40 mb-3 transition-colors`} />
          <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Password"
            className={`w-full bg-gray-900 border ${err ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500/40 mb-4 transition-colors`} />
          {err && <p className="text-red-400 text-xs text-center mb-3">Incorrect credentials — try again</p>}
          <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-xl text-sm transition-all">
            Enter Admin
          </button>
        </form>
        <p className="text-gray-700 text-xs text-center mt-4">Default password: havesta2025</p>
      </div>
    </div>
  );
}

// ─── Main admin portal ────────────────────────────────────────────────────────
export default function AdminPortal() {
  const [currentUser, setCurrentUser] = useState(null);
  const [active, setActive] = useState('hero');

  if (!currentUser) return <PasswordGate onAuth={(u) => setCurrentUser(u)} />;

  const activeSection = SECTIONS.find(s => s.key === active);

  return (
    <div className="min-h-screen bg-gray-950 flex text-white">
      {/* Sidebar */}
      <aside className="w-52 shrink-0 border-r border-white/[0.06] flex flex-col bg-[#080b0f] sticky top-0 h-screen overflow-y-auto">
        <div className="p-4 border-b border-white/[0.06] flex items-center gap-2.5">
          <span className="text-white font-bold text-sm">Admin Portal</span>
        </div>

        <nav className="flex-1 p-2.5 space-y-0.5 overflow-y-auto">
          <button onClick={() => setActive('_emails')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${active === '_emails' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]'}`}>
            <span>Email Captures</span>
            {JSON.parse(localStorage.getItem('havesta_email_captures') || '[]').length > 0 && (
              <span className="text-[9px] bg-emerald-500 text-black font-black px-1.5 py-0.5 rounded-full">
                {JSON.parse(localStorage.getItem('havesta_email_captures') || '[]').length}
              </span>
            )}
          </button>
          <button onClick={() => setActive('_leads')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${active === '_leads' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]'}`}>
            <span>Leads / Inquiries</span>
            {JSON.parse(localStorage.getItem('havesta_leads') || '[]').length > 0 && (
              <span className="text-[9px] bg-emerald-500 text-black font-black px-1.5 py-0.5 rounded-full">
                {JSON.parse(localStorage.getItem('havesta_leads') || '[]').length}
              </span>
            )}
          </button>
          <button onClick={() => setActive('_media')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${active === '_media' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]'}`}>
            Logo & Pitch Deck
          </button>
          <button onClick={() => setActive('_accounts')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${active === '_accounts' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]'}`}>
            Admin Accounts
          </button>
          <button onClick={() => setActive('_export')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${active === '_export' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]'}`}>
            Export / Import
          </button>
          <div className="pt-3 pb-1 px-3">
            <div className="text-[9px] text-gray-700 uppercase tracking-widest">Page Sections</div>
          </div>
          {SECTIONS.map(s => (
            <button key={s.key} onClick={() => setActive(s.key)}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${active === s.key ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]'}`}>
              {s.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/[0.06] space-y-1.5">
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="block w-full text-center text-xs text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/10 py-2 rounded-lg transition-colors">
            View Live Site ↗
          </a>
          <div className="text-[10px] text-gray-700 text-center pb-0.5">Logged in as <span className="text-gray-500">{currentUser}</span></div>
          <button onClick={() => setCurrentUser(null)}
            className="block w-full text-center text-xs text-gray-700 hover:text-gray-400 py-1 transition-colors">
            Logout
          </button>
        </div>
      </aside>

      {/* Main panel */}
      <main className="flex-1 overflow-y-auto bg-gray-950">
        <div className="max-w-2xl mx-auto px-8 py-10">
          <div className="mb-8">
            <h1 className="text-white font-black text-xl mb-1">
              {active === '_media' ? 'Logo & Pitch Deck'
                : active === '_leads' ? 'Leads & Inquiries'
                : active === '_emails' ? 'Email Captures'
                : active === '_accounts' ? 'Admin Accounts'
                : active === '_export' ? 'Export / Import Content'
                : (activeSection?.label ?? active)}
            </h1>
            <p className="text-gray-500 text-xs">
              {active === '_media'
                ? 'Upload your custom logo image and replace the generated pitch deck with your own PDF.'
                : active === '_leads'
                ? 'Every form submission from the investment section is recorded here. Click a lead to expand details.'
                : active === '_emails'
                ? 'Every email entered at the site gate is recorded here. Use "Copy All Emails" to export.'
                : active === '_accounts'
                ? 'Create and manage admin accounts. Each account needs a username and password to log in.'
                : active === '_export'
                ? 'Push all content edits and your logo directly to havesta.online in one click using the GitHub token you set below.'
                : 'Edit content for this section. Click "Save Changes" — updates take effect instantly on the live site.'}
            </p>
          </div>

          {active === '_media' ? (
            <MediaUpload />
          ) : active === '_leads' ? (
            <LeadsPanel />
          ) : active === '_emails' ? (
            <EmailCapturesPanel />
          ) : active === '_accounts' ? (
            <AccountsPanel currentUser={currentUser} />
          ) : active === '_export' ? (
            <ExportImportPanel />
          ) : (
            <SectionEditor key={active} sectionKey={active} />
          )}
        </div>
      </main>
    </div>
  );
}
