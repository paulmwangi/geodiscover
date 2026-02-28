import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaComments, FaClock, FaChevronDown, FaCheckCircle, FaExclamationCircle, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const faqs = [
  { q: 'How do I discover events near me?', a: 'Head to the Explore page where you can browse events by category, search by keyword, and see event locations on an interactive map. The map also auto-detects your location to show nearby events.' },
  { q: 'Can I add my own events?', a: 'Absolutely! On the Explore page, click anywhere on the map to pick a location, fill out the event form with the details, and your event will appear on the map instantly.' },
  { q: 'Is GeoDiscover free to use?', a: 'Yes, GeoDiscover is completely free for discovering and sharing events. We believe everyone should have access to exciting experiences in their community.' },
  { q: 'How long does it take to get a response?', a: 'We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.' },
  { q: 'Do you support international events?', a: 'Yes! GeoDiscover supports events worldwide. You can explore events in any location by panning the map or searching by city name.' },
];

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  if (!phone) return true; // optional
  return /^[+]?[\d\s()-]{7,}$/.test(phone);
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'message') setCharCount(value.length);
    // Clear error for the field being edited
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!formData.name.trim()) errs.name = 'Name is required.';
    if (!formData.email.trim()) errs.email = 'Email is required.';
    else if (!validateEmail(formData.email)) errs.email = 'Please enter a valid email address.';
    if (formData.phone && !validatePhone(formData.phone)) errs.phone = 'Please enter a valid phone number.';
    if (!formData.subject.trim()) errs.subject = 'Subject is required.';
    if (!formData.message.trim()) errs.message = 'Message is required.';
    else if (formData.message.trim().length < 10) errs.message = 'Message must be at least 10 characters.';
    return errs;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to send');
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setCharCount(0);
      setErrors({});
    } catch {
      setStatus('error');
    }
  };

  const inputClasses = (field: keyof FormErrors) =>
    `mt-1 block w-full bg-gray-50 dark:bg-gray-900 border ${
      errors[field] ? 'border-red-400 dark:border-red-500' : 'border-gray-200 dark:border-gray-700'
    } rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition duration-300 text-sm`;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 dark:from-primary-800 dark:via-primary-900 dark:to-gray-950 text-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-accent-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center py-20 px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto">
            Have questions, feedback, or want to partner with us? We&apos;d love to hear from you.
          </p>
        </div>
      </header>

      {/* Contact info cards */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 -mt-10 relative z-20">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-xl hover:border-primary-200 dark:hover:border-primary-700 transition-all text-center">
          <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
            <FaEnvelope className="text-xl text-primary-500" />
          </div>
          <h2 className="text-base font-bold mb-1 text-gray-900 dark:text-white">Email Us</h2>
          <a href="mailto:hello@geodiscover.com" className="text-sm text-primary-500 hover:underline block">hello@geodiscover.com</a>
          <a href="mailto:support@geodiscover.com" className="text-sm text-gray-500 dark:text-gray-400 hover:underline block">support@geodiscover.com</a>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-xl hover:border-primary-200 dark:hover:border-primary-700 transition-all text-center">
          <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
            <FaPhone className="text-xl text-primary-500" />
          </div>
          <h2 className="text-base font-bold mb-1 text-gray-900 dark:text-white">Call Us</h2>
          <a href="tel:+11800567890" className="text-sm text-gray-600 dark:text-gray-400 hover:underline block">+1 (800) 567-8990</a>
          <a href="tel:+11523567974" className="text-sm text-gray-600 dark:text-gray-400 hover:underline block">+1 (523) 567-9874</a>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-xl hover:border-primary-200 dark:hover:border-primary-700 transition-all text-center">
          <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
            <FaMapMarkerAlt className="text-xl text-primary-500" />
          </div>
          <h2 className="text-base font-bold mb-1 text-gray-900 dark:text-white">Visit Us</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">123 Western Road<br />Melbourne, VIC 3000, Australia</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-xl hover:border-primary-200 dark:hover:border-primary-700 transition-all text-center">
          <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
            <FaClock className="text-xl text-primary-500" />
          </div>
          <h2 className="text-base font-bold mb-1 text-gray-900 dark:text-white">Office Hours</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Mon – Fri: 9 AM – 6 PM<br />Sat – Sun: Closed</p>
        </div>
      </main>

      {/* Form + Map section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact form */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 dark:border-gray-700/50">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Send us a Message</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              Fill out the form and our team will get back to you within 24 hours.
            </p>

            {status === 'success' && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-start gap-3">
                <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-800 dark:text-green-300">Message sent successfully!</p>
                  <p className="text-sm text-green-600 dark:text-green-400">Thank you for reaching out. We&apos;ll respond within 24 hours.</p>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3">
                <FaExclamationCircle className="text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-red-800 dark:text-red-300">Something went wrong</p>
                  <p className="text-sm text-red-600 dark:text-red-400">Please try again or email us directly.</p>
                </div>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={inputClasses('name')}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={inputClasses('email')}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className={inputClasses('phone')}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={inputClasses('subject')}
                  >
                    <option value="">Select a topic</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Bug Report">Bug Report</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Event Support">Event Support</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  maxLength={2000}
                  className={inputClasses('message')}
                />
                <div className="flex justify-between mt-1">
                  {errors.message ? (
                    <p className="text-xs text-red-500">{errors.message}</p>
                  ) : (
                    <span />
                  )}
                  <p className="text-xs text-gray-400">{charCount}/2000</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all text-sm shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                {status === 'submitting' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    Sending…
                  </span>
                ) : (
                  '📨 Send Message'
                )}
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700/50 flex flex-col">
            <div className="p-6 pb-0">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Our Location</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Come visit us at our office in Melbourne.</p>
            </div>
            <div className="flex-1 min-h-[350px]">
              <iframe
                title="GeoDiscover Office Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=144.94%2C-37.83%2C144.98%2C-37.80&layer=mapnik&marker=-37.8136%2C144.9631"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '350px' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Quick answers to common questions about GeoDiscover.
          </p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
                aria-expanded={openFaq === i}
              >
                <span className="font-medium text-gray-900 dark:text-white text-sm">{faq.q}</span>
                <FaChevronDown
                  className={`text-gray-400 flex-shrink-0 ml-4 transition-transform duration-200 ${
                    openFaq === i ? 'rotate-180' : ''
                  }`}
                  size={12}
                />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Social links */}
      <section className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-10 text-center">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Follow Us</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Stay connected for the latest updates and events.</p>
          <div className="flex items-center justify-center gap-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all">
              <FaTwitter size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all">
              <FaLinkedin size={18} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all">
              <FaGithub size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
