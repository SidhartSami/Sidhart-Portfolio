import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { socialLinks } from '../../data/portfolio';

const SectionHeading = ({ title }) => {
  return (
    <div className="relative mb-16 text-left">
      <span className="heading-background-text left-[-20px] translate-x-0 uppercase">Contact</span>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold relative z-10 leading-tight tracking-tight section-heading-teal-bar"
      >
        {title}<span style={{ color: 'var(--color-primary)' }}>.</span>
      </motion.h2>
    </div>
  );
};

const Contact = ({ contactRef }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && resolvedTheme === 'dark';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const EMAILJS_SERVICE_ID = 'service_5hjguek';
  const EMAILJS_TEMPLATE_ID = 'template_9uq1dbd';
  const EMAILJS_PUBLIC_KEY = '_zPSEModKbOHFLSDH';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: 'sidhart.samir.punjabi@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          reply_to: formData.email
        },
        EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 5000);

    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
    <section 
      ref={contactRef} 
      className="py-12 px-6 overflow-hidden relative"
      style={{ backgroundColor: 'var(--color-bg)' }}
      data-section="contact"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <SectionHeading title="Let's Connect" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-12">
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-[var(--color-text-muted)]">
              Have a project in mind or just want to chat about data and development? I&apos;m always open to new opportunities.
            </p>

            <div className="space-y-6">
              {socialLinks && socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-6 group"
                >
                  <div className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] group-hover:border-[var(--color-primary)]/30 transition-all duration-300">
                    <link.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] block mb-1">
                      {link.label}
                    </span>
                    <span className="text-xl font-medium text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                      {link.href.replace('mailto:', '').replace('https://', '')}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 relative">
            <form 
              onSubmit={handleSubmit}
              className="relative p-8 md:p-12 rounded-[3rem] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] ml-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-8 py-5 rounded-2xl bg-[var(--color-surface-2)] border border-transparent focus:border-[var(--color-primary)]/30 text-[var(--color-text)] outline-none transition-all placeholder:text-[var(--color-text-muted)]/50"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] ml-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-8 py-5 rounded-2xl bg-[var(--color-surface-2)] border border-transparent focus:border-[var(--color-primary)]/30 text-[var(--color-text)] outline-none transition-all placeholder:text-[var(--color-text-muted)]/50"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] ml-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell me about your project..."
                  rows="6"
                  className="w-full px-8 py-5 rounded-2xl bg-[var(--color-surface-2)] border border-transparent focus:border-[var(--color-primary)]/30 text-[var(--color-text)] outline-none transition-all resize-none placeholder:text-[var(--color-text-muted)]/50"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 rounded-2xl bg-[var(--color-primary)] text-black font-bold text-xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus && (
                <p className={`text-center text-sm font-bold ${submitStatus === 'success' ? 'text-[var(--color-primary)]' : 'text-red-500'}`}>
                  {submitStatus === 'success' ? 'Message sent successfully!' : 'Failed to send message. Please try again.'}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
