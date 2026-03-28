import { useState } from 'react';
import { useTheme } from 'next-themes';
import emailjs from '@emailjs/browser';

const SectionHeading = ({ title }) => {
  return (
    <div className="relative mb-20">
      <span className="heading-background-text uppercase">Contact</span>
      <h2 className="text-4xl md:text-6xl font-bold relative z-10 section-heading-teal-bar">
        {title}<span style={{ color: 'var(--color-primary)' }}>.</span>
      </h2>
    </div>
  );
};

const Contact = ({ contactRef }) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

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
      const result = await emailjs.send(
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

      console.log('Email sent successfully:', result.text);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);

    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const bgClass = isDarkMode ? 'bg-black' : 'bg-white';
  const textClass = isDarkMode ? 'text-white' : 'text-black';
  const secondaryTextClass = isDarkMode ? 'text-zinc-300' : 'text-zinc-600';
  const cardBgClass = isDarkMode ? 'bg-zinc-900' : 'bg-white';
  const borderClass = isDarkMode ? 'border-zinc-700' : 'border-zinc-200';
  const inputBgClass = isDarkMode ? 'bg-zinc-800' : 'bg-zinc-50';
  const inputFocusClass = isDarkMode ? 'focus:bg-zinc-700' : 'focus:bg-white';

  return (
    <section 
      ref={contactRef} 
      className={`py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden relative transition-all duration-700`} 
      style={{ backgroundColor: 'var(--color-bg)' }}
      data-section="contact"
    >
      <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-full blur-3xl opacity-40 animate-pulse" style={{ background: 'linear-gradient(to bottom right, var(--color-glow), transparent)' }}></div>
      <div className="absolute bottom-1/3 right-1/3 w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-full blur-3xl opacity-45 animate-pulse" style={{ animationDelay: '1.5s', background: 'linear-gradient(to top left, var(--color-glow), transparent)' }}></div>
      
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <SectionHeading title="Let's Connect" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start lg:items-center">
          <div className="space-y-4 sm:space-y-5 order-2 lg:order-1 hidden lg:block">
            <div>
              <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4`} style={{ color: 'var(--color-text)' }}>Get In Touch</h3>
              <p className={`text-sm sm:text-base lg:text-lg leading-relaxed`} style={{ color: 'var(--color-text-muted)' }}>
                I&apos;d love to hear about opportunities at your company, discuss how I can contribute to your team, 
                or give suggestions on areas I should focus on to improve my skills.
              </p>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="lg:hidden mb-4 sm:mb-6">
              <h3 className={`text-xl sm:text-2xl font-bold mb-3`} style={{ color: 'var(--color-text)' }}>Get In Touch</h3>
            </div>
            
            <div className={`relative rounded-lg sm:rounded-xl overflow-hidden shadow-lg border backdrop-blur-sm`} style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              <div className="absolute inset-0 opacity-5" style={{ background: 'linear-gradient(to bottom right, var(--color-primary), var(--color-secondary))' }}></div>
              
              <div className="relative p-4 sm:p-5 lg:p-6">
                {submitStatus === 'success' && (
                  <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-green-600 dark:text-green-400">Message sent successfully! I&apos;ll get back to you soon.</p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-red-600 dark:text-red-400">Failed to send message. Please try again or email me directly.</p>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="relative group">
                      <label 
                        htmlFor="name" 
                        className={`block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 transition-all duration-300 ${
                          focusedField === 'name' || formData.name ? '' : ''
                        }`}
                        style={{ color: focusedField === 'name' || formData.name ? 'var(--color-primary)' : 'var(--color-text-muted)' }}
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg 
                          placeholder-zinc-400 transition-all duration-300 focus:outline-none focus:ring-0
                          focus:shadow-md text-sm sm:text-base`}
                        style={{ 
                          backgroundColor: 'var(--color-bg)', 
                          color: 'var(--color-text)', 
                          borderColor: focusedField === 'name' ? 'var(--color-primary)' : 'var(--color-border)',
                          boxShadow: focusedField === 'name' ? '0 0 15px var(--color-glow)' : ''
                        }}
                        placeholder="Your name"
                      />
                    </div>

                    <div className="relative group">
                      <label 
                        htmlFor="email" 
                        className={`block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 transition-all duration-300 ${
                          focusedField === 'email' || formData.email ? '' : ''
                        }`}
                        style={{ color: focusedField === 'email' || formData.email ? 'var(--color-primary)' : 'var(--color-text-muted)' }}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg 
                          placeholder-zinc-400 transition-all duration-300 focus:outline-none focus:ring-0
                          focus:shadow-md text-sm sm:text-base`}
                        style={{ 
                          backgroundColor: 'var(--color-bg)', 
                          color: 'var(--color-text)', 
                          borderColor: focusedField === 'email' ? 'var(--color-primary)' : 'var(--color-border)',
                          boxShadow: focusedField === 'email' ? '0 0 15px var(--color-glow)' : ''
                        }}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <label 
                      htmlFor="message" 
                      className={`block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 transition-all duration-300 ${
                        focusedField === 'message' || formData.message ? '' : ''
                      }`}
                      style={{ color: focusedField === 'message' || formData.message ? 'var(--color-primary)' : 'var(--color-text-muted)' }}
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={4}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg 
                        placeholder-zinc-400 transition-all duration-300 focus:outline-none focus:ring-0
                        focus:shadow-md resize-none text-sm sm:text-base`}
                      style={{ 
                        backgroundColor: 'var(--color-bg)', 
                        color: 'var(--color-text)', 
                        borderColor: focusedField === 'message' ? 'var(--color-primary)' : 'var(--color-border)',
                        boxShadow: focusedField === 'message' ? '0 0 15px var(--color-glow)' : ''
                      }}
                      placeholder="Tell me about opportunities, or I'd love to hear any suggestions on skills I should develop further!"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full relative overflow-hidden text-white 
                      font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg shadow-lg transition-all duration-300 transform
                      hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-4
                      disabled:cursor-not-allowed disabled:opacity-70 disabled:transform-none group text-sm sm:text-base
                      active:scale-[0.98] touch-manipulation`}
                    style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-bg)' }}
                  >
                    <span className={`flex items-center justify-center gap-2 transition-all duration-300 ${
                      isSubmitting ? 'opacity-0' : 'opacity-100'
                    }`}>
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Message
                    </span>
                    
                    {isSubmitting && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span className="text-white font-medium text-xs sm:text-sm">Sending...</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-all duration-1000 group-hover:translate-x-full -translate-x-full"></div>
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:hidden mt-6 flex justify-center">
              <div className="flex items-center gap-4 sm:gap-5">
                <a 
                  href="mailto:sidhart.samir.punjabi@gmail.com" 
                  className={`group relative p-2.5 sm:p-3 border rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105`}
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-secondary)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
                  aria-label="Send Email"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg sm:rounded-xl" style={{ background: 'linear-gradient(to bottom right, var(--color-glow), transparent)' }}></div>
                  <svg className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 relative z-10`} style={{ color: 'var(--color-text)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>

                <a 
                  href="https://www.linkedin.com/in/sidhart-sami/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`group relative p-2.5 sm:p-3 border rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105`}
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-secondary)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
                  aria-label="LinkedIn Profile"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg sm:rounded-xl" style={{ background: 'linear-gradient(to bottom right, var(--color-glow), transparent)' }}></div>
                  <svg className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 relative z-10`} style={{ color: 'var(--color-text)' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>

                <a 
                  href="https://github.com/SidhartSami" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`group relative p-2.5 sm:p-3 border rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105`}
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-secondary)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
                  aria-label="GitHub Profile"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg sm:rounded-xl" style={{ background: 'linear-gradient(to bottom right, var(--color-glow), transparent)' }}></div>
                  <svg className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 relative z-10`} style={{ color: 'var(--color-text)' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
