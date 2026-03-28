import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { ChevronDown, Github, Linkedin, Mail, FileText, Home as HomeIcon, User, Lightbulb, GraduationCap, Briefcase, Send } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Contact from './contact';
import Projects from './projects';
import Skills from './skills';
import AboutSection from './about';
import CertificationsSection from './certifications';

const Typewriter = ({ texts }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = texts[currentTextIndex];
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTextIndex, texts, typingSpeed]);

  return (
    <span className="inline-block min-w-[20px] border-r-2 border-[var(--color-primary)] pr-1">
      {currentText}
    </span>
  );
};

export default function Home() {
  const [activeSection, setActiveSection] = useState('landing');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  const landingRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const certificationsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = resolvedTheme === 'dark';

  useEffect(() => {
    const refs = [
      { id: 'landing', ref: landingRef },
      { id: 'about', ref: aboutRef },
      { id: 'skills', ref: skillsRef },
      { id: 'certifications', ref: certificationsRef },
      { id: 'projects', ref: projectsRef },
      { id: 'contact', ref: contactRef },
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition < 100) {
        setActiveSection('landing');
        return;
      }

      if (scrollPosition + windowHeight >= documentHeight - 100) {
        setActiveSection('contact');
        return;
      }

      let currentSection = 'landing';
      let minDistance = Infinity;

      refs.forEach(({ id, ref }) => {
        if (ref.current) {
          const element = ref.current;
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollPosition;
          const elementCenter = elementTop + (rect.height / 2);
          const isVisible = rect.top < windowHeight && rect.bottom > 0;

          if (isVisible) {
            const visibleTop = Math.max(0, -rect.top);
            const visibleBottom = Math.min(rect.height, windowHeight - rect.top);
            const visibleHeight = visibleBottom - visibleTop;
            const visibilityRatio = visibleHeight / rect.height;

            if (visibilityRatio > 0.5) {
              currentSection = id;
            } else {
              const viewportCenter = scrollPosition + (windowHeight / 2);
              const distance = Math.abs(elementCenter - viewportCenter);

              if (distance < minDistance) {
                minDistance = distance;
                currentSection = id;
              }
            }
          }
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!mounted) return null;

  const navItems = [
    { id: 'landing', label: 'Home', ref: landingRef, icon: HomeIcon },
    { id: 'about', label: 'About', ref: aboutRef, icon: User },
    { id: 'skills', label: 'Skills', ref: skillsRef, icon: Lightbulb },
    { id: 'certifications', label: 'Certs', ref: certificationsRef, icon: GraduationCap },
    { id: 'projects', label: 'Projects', ref: projectsRef, icon: Briefcase },
    { id: 'contact', label: 'Contact', ref: contactRef, icon: Send },
  ];

  const contactLinks = [
    { platform: 'E-Mail', link: 'mailto:sidhart.samir.punjabi@gmail.com', icon: Mail },
    { platform: 'LinkedIn', link: 'https://www.linkedin.com/in/sidhart-sami/', icon: Linkedin },
    { platform: 'GitHub', link: 'https://github.com/SidhartSami', icon: Github },
  ];

  const typewriterTexts = [
    "Machine Learning Engineer",
    "Full-stack Developer",
    "Game Systems Designer",
    "Data Science Student"
  ];

  return (
    <>
      <Head>
        <title>Sidhart Sami | Data & Development</title>
        <meta name="description" content="Portfolio of Sidhart Sami - Machine Learning, Web Development, and Game Systems" />
      </Head>

      <div className="min-h-screen transition-colors duration-300 flex flex-col" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
        {/* Dynamic Island Pill Navbar */}
        <motion.nav 
          initial={{ y: -100, x: '-50%', opacity: 0 }}
          animate={{ y: 0, x: '-50%', opacity: 1 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="pill-nav hidden md:flex"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.ref)}
              className={`pill-nav-item ${activeSection === item.id ? 'active' : ''}`}
            >
              <div className="flex items-center gap-2">
                <item.icon className="w-3 h-3" />
                <span>{item.label}</span>
              </div>
            </button>
          ))}
          <div className="h-4 w-px bg-white/10 mx-2"></div>
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Lightbulb className="w-4 h-4" /> : <HomeIcon className="w-4 h-4" />}
          </button>
        </motion.nav>

        {/* Mobile Nav */}
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden flex items-center gap-2 p-2 bg-[rgba(20,20,20,0.8)] backdrop-blur-xl border border-[var(--color-border)] rounded-full shadow-2xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.ref)}
              className={`p-3 rounded-full transition-all duration-300 ${activeSection === item.id ? 'bg-[var(--color-primary)] text-[var(--color-bg)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-primary)]'}`}
              aria-label={item.label}
            >
              <item.icon className="w-5 h-5" />
            </button>
          ))}
        </nav>

        {/* Floating Socials */}
        <aside className="fixed left-6 bottom-0 z-40 hidden xl:flex flex-col gap-6 after:content-[''] after:w-px after:h-24 after:bg-[var(--color-border)] after:mx-auto">
          {contactLinks.map((contact, index) => (
            <a
              key={index}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] hover:-translate-y-1 transition-all duration-300"
              aria-label={contact.platform}
            >
              <contact.icon className="w-5 h-5" />
            </a>
          ))}
        </aside>

        <main className="flex-1 w-full">
          {/* Hero Section */}
          <section 
            ref={landingRef} 
            className="h-screen flex items-center justify-center relative overflow-hidden"
            data-section="landing"
          >
            <div className="spotlight"></div>
            
            <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-10"
              >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] text-[var(--color-text)]">
                  Turning <span style={{ color: 'var(--color-primary)' }}>complexity</span> into<br />
                  <span className="opacity-90">elegant solutions.</span>
                </h1>
                
                <div className="text-lg md:text-xl font-medium tracking-wide h-8" style={{ color: 'var(--color-text-muted)' }}>
                  I am a <Typewriter texts={typewriterTexts} />
                </div>

                <div className="pt-8">
                  <button 
                    onClick={() => scrollToSection(projectsRef)}
                    className="px-10 py-4 bg-[var(--color-primary)] text-black font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 pulse-primary shadow-xl shadow-[rgba(29,185,160,0.2)]"
                  >
                    View My Work
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.button 
              onClick={() => scrollToSection(aboutRef)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors cursor-pointer"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Explore</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            </motion.button>
          </section>

          {/* About Section */}
          <div className="section-spacing">
            <AboutSection aboutRef={aboutRef} />
          </div>

          {/* Skills Section */}
          <div className="section-spacing bg-[var(--color-surface)] py-32">
            <Skills skillsRef={skillsRef} />
          </div>

          {/* Certifications Section */}
          <div className="section-spacing">
            <CertificationsSection certificationsRef={certificationsRef} />
          </div>

          {/* Projects Section */}
          <div className="section-spacing bg-[var(--color-surface)] py-32">
            <Projects projectsRef={projectsRef} />
          </div>

          {/* Contact Section */}
          <div className="section-spacing">
            <Contact contactRef={contactRef} />
          </div>
        </main>

        {/* Mobile Nav */}
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden flex items-center gap-2 p-2 bg-[rgba(20,20,20,0.8)] backdrop-blur-xl border border-[var(--color-border)] rounded-full shadow-2xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.ref)}
              className={`p-3 rounded-full transition-all duration-300 ${activeSection === item.id ? 'bg-[var(--color-primary)] text-[var(--color-bg)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-primary)]'}`}
              aria-label={item.label}
            >
              <item.icon className="w-5 h-5" />
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
