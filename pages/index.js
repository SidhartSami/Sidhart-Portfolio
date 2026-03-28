import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { ChevronDown, Github, Linkedin, Mail, FileText, Home as HomeIcon, User, Lightbulb, GraduationCap, Briefcase, Send } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from "@/lib/utils";
import Contact from '../components/sections/contact';
import Projects from '../components/sections/projects';
import Skills from '../components/sections/skills';
import AboutSection from '../components/sections/about';
import CertificationsSection from '../components/sections/certifications';
import { AnimatedThemeToggler } from '../components/ui/animated-theme-toggler';
import { InteractiveHoverButton } from '../components/ui/interactive-hover-button';
import { Loader } from '../components/ui/loader';
import AnimatedGridHero from '../components/AnimatedGridHero';
import { SmoothCursor } from '../components/ui/smooth-cursor';

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
  const [loading, setLoading] = useState(true);
  const { theme, setTheme, resolvedTheme } = useTheme();

  const landingRef = useRef(null);
  const aboutRef = useRef(null);
  const certificationsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    // Simulate initial load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const isDarkMode = resolvedTheme === 'dark';

  useEffect(() => {
    const refs = [
      { id: 'landing', ref: landingRef },
      { id: 'about', ref: aboutRef },
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

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-bg)]">
        <Loader />
      </div>
    );
  }

  const navItems = [
    { id: 'landing', label: 'Home', ref: landingRef, icon: HomeIcon },
    { id: 'about', label: 'About', ref: aboutRef, icon: User },
    { id: 'certifications', label: 'Certifications', ref: certificationsRef, icon: GraduationCap },
    { id: 'projects', label: 'Projects', ref: projectsRef, icon: Briefcase },
    { id: 'contact', label: 'Contact', ref: contactRef, icon: Send },
  ];

  const contactLinks = [
    { platform: 'GitHub', link: 'https://github.com/SidhartSami', icon: Github },
    { platform: 'LinkedIn', link: 'https://www.linkedin.com/in/sidhart-sami/', icon: Linkedin },
    { platform: 'E-Mail', link: 'mailto:sidhart.samir.punjabi@gmail.com', icon: Mail },
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
        <title>Sidhart Sami | Software Developer</title>
        <meta name="description" content="Portfolio of Sidhart Sami - CS Student at FAST NUCES. Specializing in Machine Learning, Web Development, and Mobile Apps. Open to Job & Internships." />
        <meta name="keywords" content="Sidhart Sami, CS Student, Software Engineer Intern, Machine Learning, Next.js, Flutter, FAST NUCES, Data Science" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </Head>

      <SmoothCursor />

      <div className="min-h-screen transition-colors duration-300 flex flex-col" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
        {/* Top Left Logo/Icon */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="fixed top-8 left-8 z-50 hidden md:flex items-center gap-3 cursor-pointer group"
          onClick={() => scrollToSection(landingRef)}
        >
          <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-[var(--color-border)] group-hover:border-[var(--color-primary)]/50 transition-all duration-500 shadow-2xl">
            <Image 
              src="/icon.png" 
              alt="Sidhart Sami" 
              fill
              priority
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        </motion.div>

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
        </motion.nav>

        {/* Floating Top Right Resume Button */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
          className="fixed top-8 right-8 z-50 hidden md:block"
        >
          <a href="/Sidhart_Resume.pdf" download className="block">
            <InteractiveHoverButton className="text-[10px] uppercase tracking-[0.2em] font-black h-[54px] min-w-[160px] shadow-2xl border-white/10">
              Resume
            </InteractiveHoverButton>
          </a>
        </motion.div>

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
          <div className="w-px h-6 bg-white/10 mx-1"></div>
          <AnimatedThemeToggler className="p-2" />
        </nav>

        {/* Floating Socials & Theme Toggle */}
        <aside className="fixed left-10 bottom-0 z-40 hidden xl:flex flex-col gap-8 after:content-[''] after:w-px after:h-32 after:bg-[var(--color-border)] after:mx-auto">
          <AnimatedThemeToggler className="hover:scale-125 transition-transform mb-4 order-first bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl" />
          {contactLinks.map((contact, index) => (
            <a
              key={index}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:-translate-y-2 hover:bg-[var(--color-surface)] hover:shadow-lg transition-all duration-300"
              aria-label={contact.platform}
            >
              <contact.icon className="w-6 h-6" />
            </a>
          ))}
        </aside>

        <main className="flex-1 w-full">
          {/* Hero Section */}
          <section 
            ref={landingRef} 
            className="relative"
            data-section="landing"
          >
            <AnimatedGridHero scrollToProjects={() => scrollToSection(projectsRef)} />
          </section>

          <AboutSection aboutRef={aboutRef} />
          
          {/* Repositioned Skills Marquee */}
          <div className="py-4 bg-[var(--color-bg)]">
            <Skills />
          </div>

          <CertificationsSection certificationsRef={certificationsRef} />
          <Projects projectsRef={projectsRef} />
          <Contact contactRef={contactRef} />
        </main>
      </div>
    </>
  );
}
