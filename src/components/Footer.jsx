import { useContent } from '../hooks/useContent';

const DEFAULTS = {
  companyName: 'Havesta Logistics Limited',
  copyrightYear: '2025',
  address: 'Lagos, Nigeria',
  badge: 'CAC Registered',
  email: 'urutechenterprise@gmail.com',
  phone: '',
};

export default function Footer() {
  const c = useContent('footer', DEFAULTS);

  return (
    <footer className="border-t border-white/[0.04] px-6 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <LogoMark />
          <span className="text-gray-600 text-sm">
            © {c.copyrightYear} {c.companyName}. All rights reserved.
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-700">
          <span>{c.address}</span>
          <span>·</span>
          <span>{c.badge}</span>
          <span>·</span>
          <a href={`mailto:${c.email}`} className="hover:text-emerald-400 transition-colors">
            {c.email}
          </a>
          {c.phone && (
            <>
              <span>·</span>
              <a href={`tel:${c.phone}`} className="hover:text-emerald-400 transition-colors">
                {c.phone}
              </a>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}

function LogoMark() {
  const logo = localStorage.getItem('havesta_logo');
  if (logo) return <img src={logo} alt="Logo" className="w-6 h-6 object-contain rounded-md" />;
  return null;
}
