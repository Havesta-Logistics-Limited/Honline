import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, Lock } from 'lucide-react';
import { useContent, fetchContentJson } from '../hooks/useContent';

const DEFAULTS = {
  siteLabel: 'Investor Portal · Confidential',
  accessBadge: 'Access Required',
  headline: 'Enter your email to access the Havesta investor deck.',
  description: 'This site is intended for investors and partners. Enter your email below — we may follow up with updates.',
  placeholder: 'your@email.com',
  buttonLabel: 'Access the Investor Site',
  disclaimer: 'By continuing you confirm you are an accredited investor or authorised recipient. Your email will not be shared with third parties.',
  footerNote: '© 2025 Havesta Logistics Limited · Lagos, Nigeria · CAC Registered',
};

function LogoMark() {
  const [logo, setLogo] = useState(() => localStorage.getItem('havesta_logo'));
  useEffect(() => {
    if (!localStorage.getItem('havesta_logo')) {
      fetchContentJson().then(json => {
        if (json['havesta_logo']) setLogo(json['havesta_logo']);
      });
    }
    const refresh = () => setLogo(localStorage.getItem('havesta_logo') || '');
    window.addEventListener('havesta:logo', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('havesta:logo', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);
  if (logo) return <img src={logo} alt="Logo" className="w-40 h-40 object-contain" />;
  return null;
}

export default function EmailGate({ onPass }) {
  const c = useContent('emailGate', DEFAULTS);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const isValid = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitting(true);

    const captures = JSON.parse(localStorage.getItem('havesta_email_captures') || '[]');
    const alreadyCaptured = captures.some(c => c.email.toLowerCase() === email.trim().toLowerCase());
    if (!alreadyCaptured) {
      captures.unshift({ email: email.trim(), capturedAt: new Date().toISOString() });
      localStorage.setItem('havesta_email_captures', JSON.stringify(captures));
      window.dispatchEvent(new CustomEvent('havesta:email_capture'));
    }
    localStorage.setItem('havesta_gate_passed', JSON.stringify({ passedAt: new Date().toISOString() }));

    setDone(true);
    setTimeout(() => onPass(), 900);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-emerald-900/15 blur-[120px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-md"
          >
            {/* Logo */}
            <div className="flex flex-col items-center mb-2">
              <LogoMark />
              <p className="text-gray-500 text-sm mt-2">{c.siteLabel}</p>
            </div>

            {/* Card */}
            <div className="glass-card rounded-2xl border border-white/[0.08] p-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Lock size={14} className="text-emerald-400" />
                <span className="text-gray-400 text-xs uppercase tracking-widest">{c.accessBadge}</span>
              </div>

              <h2 className="text-white font-black text-2xl mb-2 leading-tight">
                {c.headline}
              </h2>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                {c.description}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="relative">
                    <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                    <input
                      type="email"
                      autoFocus
                      value={email}
                      onChange={e => { setEmail(e.target.value); setError(''); }}
                      placeholder={c.placeholder}
                      className={`w-full bg-gray-900/80 border ${error ? 'border-red-500/50' : 'border-white/[0.08]'} rounded-xl pl-11 pr-4 py-3.5 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-emerald-500/50 transition-colors`}
                    />
                  </div>
                  {error && (
                    <p className="text-red-400 text-xs mt-2 text-center">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full group flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-black font-bold py-3.5 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-emerald-900/40"
                >
                  {submitting ? 'Granting access…' : c.buttonLabel}
                  {!submitting && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>

              <p className="text-gray-700 text-xs text-center mt-5 leading-relaxed">
                {c.disclaimer}
              </p>
            </div>

            <p className="text-gray-800 text-xs text-center mt-6">
              {c.footerNote}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <p className="text-white font-bold text-lg">Access granted</p>
            <p className="text-gray-500 text-sm">Loading the investor site…</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
