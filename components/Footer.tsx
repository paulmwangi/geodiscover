import Link from "next/link";
import { useState, FormEvent } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaLinkedin, FaMapMarkerAlt, FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import { footerLinks } from "../constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      if (!res.ok) throw new Error('Failed');
      setNewsletterStatus('success');
      setNewsletterEmail('');
      setTimeout(() => setNewsletterStatus('idle'), 4000);
    } catch {
      setNewsletterStatus('error');
      setTimeout(() => setNewsletterStatus('idle'), 3000);
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main footer content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-8">
        {/* Top section: Brand + Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-14">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <FaMapMarkerAlt className="text-white text-lg" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">GeoDiscover</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your gateway to unforgettable experiences. Discover concerts, sports, theatre, and community events happening near you.
            </p>
          </div>

          {/* Newsletter */}
          <div className="w-full lg:w-auto lg:min-w-[380px]">
            <h3 className="text-white font-semibold text-lg mb-2">Stay in the loop</h3>
            <p className="text-gray-400 text-sm mb-4">Get the latest events and updates delivered to your inbox.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" aria-hidden="true" />
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  aria-label="Email address for newsletter"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={newsletterStatus === 'loading'}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:opacity-60 text-white text-sm font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/25 whitespace-nowrap"
              >
                {newsletterStatus === 'loading' ? '...' : 'Subscribe'}
              </button>
            </form>
            {newsletterStatus === 'success' && (
              <p className="mt-2 text-sm text-green-400 flex items-center gap-1"><FaCheckCircle size={12} /> Subscribed successfully!</p>
            )}
            {newsletterStatus === 'error' && (
              <p className="mt-2 text-sm text-red-400">Something went wrong. Try again.</p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-12" />

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {footerLinks.map((item) => (
            <div key={item.title}>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{item.title}</h3>
              <ul className="space-y-3">
                {item.links.map((link) => (
                  <li key={link.title}>
                    <a
                      href={link.url}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Extra column: Quick contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Get in Touch</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Latest News
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} GeoDiscover. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
            <span>·</span>
            <Link href="/" className="hover:text-white transition-colors duration-200">Terms of Service</Link>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary-500/20 flex items-center justify-center text-gray-400 hover:text-primary-400 transition-all duration-200">
              <FaFacebook size={16} />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
              className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary-500/20 flex items-center justify-center text-gray-400 hover:text-primary-400 transition-all duration-200">
              <FaTwitter size={16} />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="w-9 h-9 rounded-lg bg-white/5 hover:bg-accent-500/20 flex items-center justify-center text-gray-400 hover:text-accent-400 transition-all duration-200">
              <FaInstagram size={16} />
            </a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200">
              <FaGithub size={16} />
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary-500/20 flex items-center justify-center text-gray-400 hover:text-primary-400 transition-all duration-200">
              <FaLinkedin size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
