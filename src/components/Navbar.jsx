import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useContent, fetchContentJson } from '../hooks/useContent';

const DEFAULTS = {
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
};

function LogoMark() {
  const [logo, setLogo] = useState(() => localStorage.getItem('havesta_logo'));
  useEffect(() => {
    if (!localStorage.getItem('havesta_logo')) {
      fetchContentJson().then(json => {
        if (json['havesta_logo']) setLogo(json['havesta_logo']);
      });
    }
    const handler = () => setLogo(localStorage.getItem('havesta_logo') || '');
    window.addEventListener('havesta:logo', handler);
    return () => window.removeEventListener('havesta:logo', handler);
  }, []);
  if (logo) {
    return <img src={logo} alt="Logo" className="w-10 h-10 md:w-24 md:h-24 object-contain rounded-xl md:rounded-2xl" />;
  }
  return null;
}

export default function Navbar() {
  const c = useContent('navbar', DEFAULTS);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-white/[0.06] py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <LogoMark />
          <span className="text-white font-black text-2xl tracking-tight">
            {c.brandName}
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {c.navLinks.map((l) => (
            <a key={l.label} href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200 font-medium">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="#invest" className="text-sm text-gray-300 hover:text-white px-4 py-2 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-200">
            {c.cta1Label}
          </a>
          <a href="#invest" className="text-sm font-semibold text-black bg-emerald-400 hover:bg-emerald-300 px-5 py-2 rounded-lg transition-all duration-200">
            {c.cta2Label}
          </a>
        </div>

        <button className="md:hidden text-gray-300" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/[0.06] px-6 pb-4"
          >
            {c.navLinks.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="block py-3 text-gray-400 hover:text-white text-sm border-b border-white/[0.04]">
                {l.label}
              </a>
            ))}
            <a href="#invest" onClick={() => setOpen(false)} className="block mt-4 text-center text-sm font-semibold text-black bg-emerald-400 px-5 py-2.5 rounded-lg">
              {c.cta2Label}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
