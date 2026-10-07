import React from 'react';
import { BrandLogo } from './BrandLogo';
import { Mail, Phone, MapPin, ArrowUpRight, Shield, Heart } from 'lucide-react';
import { InstagramIcon } from './SocialIcons';

export const Footer = ({ setActivePage, settings = {} }) => {
  const email = settings.official_email || 'branddigix@gmail.com';
  const instagram = settings.instagram || '@branddigix.in';
  const phone = settings.phone || '+91 80158 10518';
  const address = settings.address || 'Chennai & Coimbatore, Tamil Nadu, India';

  const navigateTo = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#030611] border-t border-slate-800/80 text-slate-300 pt-16 pb-12 overflow-hidden">
      {/* Background Neon Ambient Glows */}
      <div className="glow-orb w-96 h-96 bg-cyan-600/10 top-0 left-1/4" />
      <div className="glow-orb w-96 h-96 bg-blue-700/10 bottom-0 right-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="default" />
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed pt-2">
              We help ambitious businesses build an unforgettable digital identity, high-conversion modern websites, and scalable digital solutions.
            </p>
            <div className="pt-2">
              <span className="inline-block text-xs uppercase tracking-widest text-cyan-400 font-semibold px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30">
                Let's Build Something Great
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 font-heading text-cyan-400">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-cyan-400 transition flex items-center gap-1">
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-cyan-400 transition flex items-center gap-1">
                  <span>Our Services</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('portfolio')} className="hover:text-cyan-400 transition flex items-center gap-1">
                  <span>Our Work (Portfolio)</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('gallery')} className="hover:text-cyan-400 transition flex items-center gap-1">
                  <span>Visual Gallery</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('process')} className="hover:text-cyan-400 transition flex items-center gap-1">
                  <span>Development Process</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Trust */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 font-heading text-cyan-400">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-cyan-400 transition">
                  About Us & Story
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-cyan-400 transition">
                  Leadership & Team
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('testimonials')} className="hover:text-cyan-400 transition">
                  Client Reviews
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-cyan-400 transition">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="text-slate-400 hover:text-cyan-300 transition flex items-center gap-1.5 pt-1">
                  <Shield className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Official Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 font-heading text-cyan-400">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-start gap-2.5 hover:text-cyan-400 transition group"
                >
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="group-hover:underline break-all">{email}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/branddigix.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-cyan-400 transition group"
                >
                  <InstagramIcon className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="group-hover:underline">{instagram}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2.5 hover:text-cyan-400 transition group"
                >
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="group-hover:underline">{phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} BRANDDIGIX. All Rights Reserved. We Build Digital Brands.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('privacy')} className="hover:text-slate-400 transition">Privacy Policy</button>
            <button onClick={() => navigateTo('terms')} className="hover:text-slate-400 transition">Terms of Service</button>
            <button onClick={() => navigateTo('admin')} className="text-cyan-400/80 hover:text-cyan-300 transition flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <span>Staff Login</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
