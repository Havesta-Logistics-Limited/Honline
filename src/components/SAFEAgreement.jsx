import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FileText, ChevronDown, ChevronUp, Info, Download, Shield } from 'lucide-react';
import { useContent } from '../hooks/useContent';

const DEFAULTS = {
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
};

const safeDate = 'effective upon countersignature';

const sections = [
  {
    id: 'parties',
    title: '1. Parties',
    content: `This Simple Agreement for Future Equity ("SAFE") is entered into on ${safeDate}, between:

INVESTOR: _________________________ ("Investor"), whose principal address is _________________________.

COMPANY: Havesta Logistics Limited, a company duly incorporated under the laws of the Federal Republic of Nigeria, with registered offices at Lagos, Nigeria ("Company"), represented herein by its authorised signatory.`,
  },
  {
    id: 'definitions',
    title: '2. Definitions',
    content: `"Valuation Cap" means $1,500,000 USD, the maximum Company valuation used to determine the Conversion Price under this SAFE.

"Discount Rate" means 80% (i.e., a 20% discount to the price per share sold in the Equity Financing).

"Conversion Price" means the lesser of: (a) the Valuation Cap divided by the Company Capitalisation; or (b) the Discount Rate multiplied by the price per share sold in the applicable Equity Financing.

"Equity Financing" means a bona fide transaction or series of transactions with the principal purpose of raising capital, in which the Company issues and sells preferred shares with an aggregate sales price of not less than $200,000 USD, excluding the conversion of any instruments (including this SAFE).

"Liquidity Event" means a Change of Control or an IPO.

"Company Capitalisation" means the number of shares outstanding, calculated on a fully-diluted basis immediately prior to the Equity Financing.

"Purchase Amount" means the amount of USD paid by the Investor for this SAFE, as set forth in Section 3.`,
  },
  {
    id: 'investment',
    title: '3. Investment Amount',
    content: `The Investor agrees to purchase this SAFE for an aggregate investment amount of:

Purchase Amount: $_________________________ USD

Payment shall be made by wire transfer to the Company's designated bank account within five (5) business days of execution of this agreement. This SAFE shall not bear interest and shall not have a maturity date.`,
  },
  {
    id: 'conversion',
    title: '4. Events — Conversion & Liquidity',
    content: `4.1 EQUITY FINANCING. Upon an Equity Financing, the Company will issue to the Investor a number of shares of the same class of shares sold in the Equity Financing equal to the Purchase Amount divided by the Conversion Price.

4.2 LIQUIDITY EVENT. In the event of a Liquidity Event prior to an Equity Financing, the Investor will receive a cash payment equal to the greater of: (i) the Purchase Amount, or (ii) the amount payable on the number of ordinary shares equal to the Purchase Amount divided by the Liquidity Price.

4.3 DISSOLUTION. In the event of a dissolution or winding up of the Company prior to an Equity Financing, after satisfaction of all creditors, the Investor shall be entitled to receive, in preference to holders of ordinary shares, a cash payment equal to the Purchase Amount, to the extent of available assets.

4.4 CONVERSION MECHANICS. Conversion shall be automatic upon the closing of an Equity Financing and shall not require further action by the Investor. The Company shall provide written notice to Investor at least five (5) business days prior to conversion.`,
  },
  {
    id: 'representations',
    title: '5. Company Representations',
    content: `The Company represents and warrants to the Investor as of the date of this SAFE:

(a) INCORPORATION & STANDING. The Company is duly incorporated, validly existing, and in good standing under the laws of the Federal Republic of Nigeria.

(b) AUTHORISATION. The execution, delivery, and performance of this SAFE have been duly authorised by all necessary corporate action of the Company.

(c) NO CONFLICTS. Neither the execution nor the performance of this SAFE will conflict with any applicable law, order, or other obligation to which the Company is subject.

(d) NO LITIGATION. There is no pending or threatened action, suit, or proceeding before any court or governmental authority that would materially and adversely affect the Company's ability to perform its obligations under this SAFE.

(e) INTELLECTUAL PROPERTY. The Company owns or possesses sufficient rights to all material intellectual property necessary to carry on its business as currently conducted.`,
  },
  {
    id: 'investor-rep',
    title: '6. Investor Representations',
    content: `The Investor represents and warrants:

(a) ACCREDITED INVESTOR. The Investor is an accredited investor as defined under applicable securities laws and has such knowledge and experience in financial and business matters to be capable of evaluating the merits and risks of the investment.

(b) INVESTMENT RISK. The Investor understands that an investment in the Company involves a high degree of risk, including the possible loss of the entire Purchase Amount.

(c) LIQUIDITY. The Investor understands that this SAFE is illiquid and there is no established trading market for this instrument or any shares issuable upon conversion.

(d) OWN ANALYSIS. The Investor has had the opportunity to review the Company's documents and conduct its own due diligence and has not relied on any representations other than those contained herein.

(e) NOT A LOAN. This SAFE is not a debt instrument. No interest will accrue and no repayment is owed unless triggered by the events described in Section 4.`,
  },
  {
    id: 'miscellaneous',
    title: '7. Miscellaneous',
    content: `7.1 GOVERNING LAW. This SAFE shall be governed by the laws of the Federal Republic of Nigeria. Any disputes shall be resolved by arbitration in Lagos, Nigeria under the Arbitration and Conciliation Act.

7.2 ENTIRE AGREEMENT. This SAFE constitutes the entire agreement between the Investor and the Company with respect to its subject matter and supersedes all prior agreements.

7.3 AMENDMENTS. No amendment, modification or waiver of any provision of this SAFE will be effective unless in writing and signed by both the Company and the Investor.

7.4 ASSIGNMENT. The Company may not assign this SAFE without the prior written consent of the Investor. The Investor may assign this SAFE subject to applicable securities laws.

7.5 NOTICES. All notices shall be sent to the addresses set forth in Section 1 by email with return receipt requested or by nationally recognised courier.

7.6 PRO-RATA RIGHTS. The Investor shall have the right to purchase its Pro Rata Share of any subsequent Equity Financing for so long as this SAFE is outstanding. "Pro Rata Share" means the ratio of the Purchase Amount to the Company's fully-diluted capitalisation at the time of conversion.

7.7 MOST FAVOURED NATION. If the Company issues any subsequent SAFE with terms more favourable to a subsequent investor, the Investor shall have the right to exchange this SAFE for one with those more favourable terms, upon written request within 30 days of notice.`,
  },
  {
    id: 'signatures',
    title: '8. Signatures',
    content: `IN WITNESS WHEREOF, the parties have executed this SAFE as of the date first written above.

HAVESTA LOGISTICS LIMITED

Authorised Signatory: _________________________
Name: _________________________
Title: _________________________
Date: _________________________


INVESTOR

Signature: _________________________
Name: _________________________
Title (if entity): _________________________
Entity (if applicable): _________________________
Date: _________________________
Purchase Amount: $_________________________
Wire Instructions Provided: ☐ Yes`,
  },
];

function Clause({ section, index }) {
  const [open, setOpen] = useState(index < 3);
  return (
    <div className="border border-white/[0.07] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-white font-semibold text-sm">{section.title}</span>
        {open
          ? <ChevronUp size={15} className="text-emerald-400 shrink-0" />
          : <ChevronDown size={15} className="text-gray-500 shrink-0" />
        }
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-white/[0.06]">
          <pre className="text-gray-400 text-xs leading-relaxed whitespace-pre-wrap font-sans mt-4">{section.content}</pre>
        </div>
      )}
    </div>
  );
}

export default function SAFEAgreement() {
  const c = useContent('safeAgreement', DEFAULTS);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="safe-agreement" className="relative py-16 md:py-28 px-4 md:px-6">
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
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {c.subheadline}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Term summary sidebar — shows below document on mobile, left on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4 order-2 lg:order-1"
          >
            {/* Key terms card */}
            <div className="glass-card rounded-2xl border border-emerald-500/15 p-6 bg-gradient-to-br from-emerald-950/20 to-transparent">
              <div className="flex items-center gap-2 mb-5">
                <Shield size={15} className="text-emerald-400" />
                <span className="text-white font-semibold text-sm">Standard Terms</span>
              </div>
              <div className="space-y-3">
                {c.standardTerms.map(({ k, v }) => (
                  <div key={k} className="flex justify-between border-b border-white/[0.05] pb-2">
                    <span className="text-gray-500 text-xs">{k}</span>
                    <span className="text-white text-xs font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What is a SAFE */}
            <div className="glass-card rounded-2xl border border-white/[0.07] p-5">
              <div className="flex items-center gap-2 mb-3">
                <Info size={13} className="text-blue-400" />
                <span className="text-white font-semibold text-xs">What is a SAFE?</span>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed mb-3">
                A Simple Agreement for Future Equity (SAFE) is a lightweight investment instrument that converts to equity at a future priced round. It carries no interest, no maturity date, and no repayment obligation — making it ideal for early-stage startups.
              </p>
              <p className="text-gray-600 text-xs leading-relaxed">
                Pioneered by Y Combinator in 2013, SAFEs are now the most common seed-stage investment vehicle globally. Havesta's SAFE is adapted for Nigerian corporate law.
              </p>
            </div>

            {/* Legal notice */}
            <div className="glass-card rounded-2xl border border-yellow-500/10 p-5 bg-yellow-950/10">
              <p className="text-yellow-600/80 text-xs leading-relaxed">
                <strong className="text-yellow-500">Legal Notice:</strong> This template is provided for informational purposes only and does not constitute legal advice. All parties should seek independent legal counsel before executing any investment agreement.
              </p>
            </div>

            {/* Download CTA */}
            <a
              href="#invest"
              className="flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/15 text-emerald-400 rounded-xl p-4 text-sm font-semibold transition-all duration-200"
            >
              <Download size={15} />
              Request Executed Template
            </a>
          </motion.div>

          {/* Agreement clauses */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-2 space-y-3 order-1 lg:order-2"
          >
            {/* Document header */}
            <div className="glass-card rounded-2xl border border-white/[0.07] p-6 mb-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={16} className="text-emerald-400" />
                    <span className="text-white font-black text-lg">Simple Agreement for Future Equity</span>
                  </div>
                  <div className="text-gray-500 text-sm">Havesta Logistics Limited &nbsp;·&nbsp; Seed Round 2025</div>
                  <div className="text-gray-600 text-xs mt-1">Based on YC SAFE (Post-Money) — adapted for Nigerian Law</div>
                </div>
                <div className="glass px-3 py-1.5 rounded-full border border-emerald-500/20 text-emerald-400 text-[10px] font-semibold uppercase tracking-wider shrink-0">
                  Template
                </div>
              </div>
            </div>

            {/* Clauses */}
            <div className="space-y-2">
              {sections.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.07, duration: 0.5 }}
                >
                  <Clause section={s} index={i} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
