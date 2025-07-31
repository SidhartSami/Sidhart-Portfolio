import { Inter } from 'next/font/google';
import Head from 'next/head';
import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import Contact from './contact';
import Projects from './projects';
import Skills from './skills';
import AboutSection from './about';
import CertificationsSection from './certifications';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700'] });

export default function Details() {
  const [activeSection, setActiveSection] = useState('landing');
  const [showHeaderLogo, setShowHeaderLogo] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { section } = router.query;
  const { theme, setTheme } = useTheme();

  // Section refs for scrolling
  const landingRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const certificationsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const sections = useMemo(() => [
    { id: 'landing', ref: landingRef },
    { id: 'about', ref: aboutRef },
    { id: 'skills', ref: skillsRef },
    { id: 'certifications', ref: certificationsRef },
    { id: 'projects', ref: projectsRef },
    { id: 'contact', ref: contactRef },
  ], [landingRef, aboutRef, skillsRef, certificationsRef, projectsRef, contactRef]);


  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll to section on initial load
  // Replace the existing scroll detection useEffect in details.js with this improved version:

useEffect(() => {
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // If we're at the very top, always show landing
    if (scrollPosition < 100) {
      setActiveSection('landing');
      setShowHeaderLogo(false);
      return;
    }
    
    // If we're near the bottom, show contact
    if (scrollPosition + windowHeight >= documentHeight - 100) {
      setActiveSection('contact');
      setShowHeaderLogo(true);
      return;
    }
    
    let currentSection = 'landing';
    let minDistance = Infinity;
    
    sections.forEach(({ id, ref }) => {
      if (ref.current) {
        const element = ref.current;
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollPosition;
        const elementBottom = elementTop + rect.height;
        const elementCenter = elementTop + (rect.height / 2);
        
        // Check if section is currently visible in viewport
        const isVisible = rect.top < windowHeight && rect.bottom > 0;
        
        if (isVisible) {
          // Calculate how much of the section is visible
          const visibleTop = Math.max(0, -rect.top);
          const visibleBottom = Math.min(rect.height, windowHeight - rect.top);
          const visibleHeight = visibleBottom - visibleTop;
          const visibilityRatio = visibleHeight / rect.height;
          
          // If more than 50% of the section is visible, or it's the most visible section
          if (visibilityRatio > 0.5) {
            currentSection = id;
          } else {
            // Otherwise, find the section whose center is closest to the center of viewport
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
    setShowHeaderLogo(currentSection !== 'landing');
  };

  // Initial check
  handleScroll();
  
  // Add scroll listener with throttling for better performance
  let ticking = false;
  const scrollListener = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', scrollListener, { passive: true });
  window.addEventListener('resize', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', scrollListener);
    window.removeEventListener('resize', handleScroll);
  };
}, [sections]);
  useEffect(() => {
    if (mounted) {
      // Check both URL params and sessionStorage
      const targetSection = section || sessionStorage.getItem('scrollToSection');
      
      if (targetSection) {
        const sectionRefs = {
          landing: landingRef,
          about: aboutRef,
          skills: skillsRef,
          certifications: certificationsRef,
          projects: projectsRef,
          contact: contactRef,
        };
        
        const targetRef = sectionRefs[targetSection];
        if (targetRef?.current) {
          // Add a small delay to ensure the page is fully loaded
          setTimeout(() => {
            const element = targetRef.current;
            
            // Device-specific scroll offset calculations (same as your navigation)
            const getScrollOffset = () => {
              const width = window.innerWidth;
              const height = window.innerHeight;
              
              if (targetSection === 'landing') return 0;
              
              if (width < 768) {
                if (height <= 667) {
                  if (targetSection === 'about') return 40;
                  return 10;
                } else if (height <= 844) {
                  if (targetSection === 'contact') return 60;
                  return 30;
                } else {
                  if (targetSection === 'about' || targetSection === 'projects') return 50;
                  if (targetSection === 'skills') return 60;
                  if (targetSection === 'certifications') return 40;
                  if (targetSection === 'contact') return 80;
                  return 50;
                }
              } else if (width >= 768 && width < 1024) {
                if (width <= 820) {
                  if (targetSection === 'certifications' || targetSection === 'projects') return -20;
                  return 0;
                } else {
                  if (targetSection === 'certifications' || targetSection === 'projects') return -120;
                  return -100;
                }
              } else {
                return 70;
              }
            };
            
            const scrollOffset = getScrollOffset();
            const elementPosition = element.offsetTop + scrollOffset;
            
            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth'
            });
            
            // Clear the sessionStorage after successful scroll
            sessionStorage.removeItem('scrollToSection');
          }, 100);
        }
      }
    }
  }, [section, mounted]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) return null;

  const navItems = [
    { id: 'landing', label: 'Home', ref: landingRef, icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'about', label: 'About', ref: aboutRef, icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'skills', label: 'Skills', ref: skillsRef, icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
    { id: 'certifications', label: 'Certifications', ref: certificationsRef, icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
    { id: 'projects', label: 'Projects', ref: projectsRef, icon: 'M19 11H5m14-4H3a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z' },
    { id: 'contact', label: 'Contact', ref: contactRef, icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  ];

  const contactLinks = [
    { platform: 'E-Mail', link: 'mailto:sidhart.samir.punjabi@gmail.com', icon: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' },
    { platform: 'LinkedIn', link: 'https://www.linkedin.com/in/sidhart-sami/', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
    { platform: 'GitHub', link: 'https://github.com/SidhartSami', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
  ];

  return (
    <>
      <Head>
        <title>Sidhart - Portfolio</title>
        <meta name="description" content="Detailed portfolio of Sidhart, a Computer Science student showcasing skills, projects, certifications, and contact information" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
         <link rel="icon" href="/icon.png" />
      </Head>

      <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-white'} ${theme === 'dark' ? 'text-white' : 'text-black'} ${inter.className} transition-colors duration-300 flex flex-col`}>
        {/* Fixed Header Elements - Mobile: Theme Toggle, Logo (center), Resume Button | Desktop: Logo, Resume Button */}
        <div className="fixed top-0 left-0 right-0 z-30 p-4 md:p-6">
          {/* Desktop Layout */}
          <div className="hidden md:flex justify-between items-center">
            {/* Left side - Logo */}
            <Link href="/">
              <div className={`${theme === 'dark' ? 'bg-black/30' : 'bg-white/30'} backdrop-blur-xl border ${theme === 'dark' ? 'border-gray-700/30' : 'border-gray-200/30'} p-2 rounded-full hover:shadow-lg transition-all duration-300`}>
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image 
                    src="/logo.jpg" 
                    alt="Sidhart Logo" 
                    width={40} 
                    height={40} 
                    className="w-full h-full object-cover"
                    priority
                    quality={100}
                  />
                </div>
              </div>
            </Link>

            {/* Right side - Resume Button */}
            <a
              href="/resume.pdf"
              download="Sidhart_Resume.pdf"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download Resume</span>
            </a>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden flex justify-between items-center">
            {/* Left side - Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`${theme === 'dark' ? 'bg-black/70 border-gray-700/50' : 'bg-white/70 border-gray-200/50'} backdrop-blur-lg border p-2 rounded-full transition-all duration-300 hover:bg-blue-500/70 hover:shadow-xl`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* Center - Logo with conditional visibility and animation */}
            <div className={`transition-all duration-500 ease-in-out ${
              showHeaderLogo 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }`}>
              <Link href="/">
                <div className={`${theme === 'dark' ? 'bg-black/30' : 'bg-white/30'} backdrop-blur-xl border ${theme === 'dark' ? 'border-gray-700/30' : 'border-gray-200/30'} p-2 rounded-full hover:shadow-lg transition-all duration-300`}>
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image 
                      src="/logo.jpg" 
                      alt="Sidhart Logo" 
                      width={40} 
                      height={40} 
                      className="w-full h-full object-cover"
                      priority
                      quality={100}
                    />
                  </div>
                </div>
              </Link>
            </div>

            {/* Right side - Resume Button */}
            <a
              href="/resume.pdf"
              download="Sidhart_Resume.pdf"
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full text-xs font-medium transition-colors flex items-center justify-center shadow-lg hover:shadow-xl w-10 h-10"
              aria-label="Download Resume"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Contact Links - Desktop: Always visible on left | Mobile: Only visible on contact section */}
        <aside className="hidden lg:flex fixed top-1/2 left-4 transform -translate-y-1/2 flex-col space-y-4 z-20">
          {contactLinks.map((contact, index) => (
            <a
              key={index}
              href={contact.link}
              className={`${theme === 'dark' ? 'bg-black/70 border-gray-700/50' : 'bg-white/70 border-gray-200/50'} backdrop-blur-lg border p-3 rounded-full transition-all duration-300 hover:bg-blue-500/70 ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'} group shadow-lg hover:shadow-xl`}
              aria-label={contact.platform}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d={contact.icon} />
              </svg>
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className={`${theme === 'dark' ? 'bg-black/70 border-gray-700/50' : 'bg-white/70 border-gray-200/50'} backdrop-blur-lg border p-3 rounded-full transition-all duration-300 hover:bg-blue-500/70 hover:shadow-xl`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full">
          <section 
            ref={landingRef} 
            className={`${theme === 'dark' ? 'bg-black' : 'bg-white'} min-h-screen flex items-center justify-center px-4 md:px-8 py-16 md:py-20 relative overflow-hidden`} 
            data-section="landing"
          >
            {/* Subtle Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-gray-500/8 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/3 right-1/4 w-48 md:w-80 h-48 md:h-80 bg-gray-400/6 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[300px] md:h-[600px] bg-gradient-to-br from-gray-500/4 via-transparent to-gray-600/4 rounded-full blur-3xl"></div>
              
              {/* Floating geometric elements */}
              <div className="absolute top-20 left-20 w-1 h-16 bg-gray-400/20 rotate-45 blur-sm"></div>
              <div className="absolute top-32 right-32 w-1 h-12 bg-gray-300/25 rotate-12 blur-sm"></div>
              <div className="absolute bottom-40 left-40 w-1 h-20 bg-gray-500/15 -rotate-30 blur-sm"></div>
              <div className="absolute bottom-20 right-20 w-1 h-14 bg-gray-400/20 rotate-75 blur-sm"></div>
              
              {/* Subtle dots */}
              <div className="absolute top-1/3 left-1/5 w-1 h-1 bg-gray-400/40 rounded-full"></div>
              <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-gray-300/30 rounded-full"></div>
              <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-gray-500/35 rounded-full"></div>
            </div>

            <div className="max-w-6xl mx-auto text-center relative z-10 -mt-8 md:-mt-12 pb-24 md:pb-32">
              <div className="space-y-6 md:space-y-8">
                {/* Profile Image */}
                <div className="flex justify-center mb-6">
                  <div className={`relative p-1 rounded-full ${theme === 'dark' ? 'bg-black/70 border-gray-700/50' : 'bg-white/70 border-gray-200/50'} backdrop-blur-lg border shadow-2xl`}>
                    <div className="w-25 h-25 rounded-full overflow-hidden">
                      <Image 
                        src="/logo.jpg" 
                        alt="Sidhart Sami" 
                        width={100} 
                        height={100} 
                        className="w-full h-full object-cover"
                        priority
                        quality={100}
                      />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-400/20 to-transparent"></div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="space-y-4 md:space-y-6">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-wide leading-tight">
                    Hello, I&apos;m{' '}
                    <span className="font-semibold text-blue-500">Sidhart Sami</span>
                    <br />
                    <span className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} font-light`}>
                      and this is my story
                    </span>
                  </h1>
                  
                  <div className="max-w-4xl mx-auto space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                      <div className={`${theme === 'dark' ? 'bg-black/70 border-gray-700/50' : 'bg-white/70 border-gray-200/50'} backdrop-blur-lg border p-4 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                        <div className="text-blue-500 mb-2">
                          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <h3 className="font-medium text-sm mb-1">Data Science/ML</h3>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          AI & Machine Learning
                        </p>
                      </div>
                      
                      <div className={`${theme === 'dark' ? 'bg-black/70 border-gray-700/50' : 'bg-white/70 border-gray-200/50'} backdrop-blur-lg border p-4 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                        <div className="text-blue-500 mb-2">
                          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                          </svg>
                        </div>
                        <h3 className="font-medium text-sm mb-1">Web Dev</h3>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          Full-stack Development
                        </p>
                      </div>
                      
                      <div className={`${theme === 'dark' ? 'bg-black/70 border-gray-700/50' : 'bg-white/70 border-gray-200/50'} backdrop-blur-lg border p-4 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                        <div className="text-blue-500 mb-2">
                          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
                          </svg>
                        </div>
                        <h3 className="font-medium text-sm mb-1">Game Dev</h3>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          Interactive Experiences
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Mouse Scroll Indicator - Placed after boxes */}
                <div className="flex flex-col items-center mt-12 md:mt-16 space-y-4">
                  <span className={`text-xs md:text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} font-light tracking-wide`}>
                    Scroll to explore
                  </span>
                  
                  {/* Mouse Animation */}
                  <div className="relative">
                    {/* Mouse Body */}
                    <div className={`w-6 h-10 md:w-7 md:h-12 border-2 ${theme === 'dark' ? 'border-gray-400' : 'border-gray-600'} rounded-full relative bg-transparent`}>
                      {/* Mouse Wheel - Animated */}
                      <div className={`absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-2 md:h-3 ${theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'} rounded-full animate-bounce`}
                           style={{animationDuration: '2s', animationIterationCount: 'infinite'}}></div>
                    </div>
                    
                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-full bg-gray-400/10 animate-pulse blur-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About Section - Reduced height and padding */}
          <section 
            ref={aboutRef} 
            className={`${theme === 'dark' ? 'bg-black' : 'bg-white'} px-4 md:px-8 py-12 md:py-16`} 
            data-section="about"
          >
            <div className="max-w-7xl mx-auto w-full">
              <AboutSection aboutRef={aboutRef} />
            </div>
          </section>
          
          {/* Skills Section - Reduced height and padding */}
          <section 
            ref={skillsRef} 
            className={`${theme === 'dark' ? 'bg-black' : 'bg-white'} px-4 md:px-8 py-12 md:py-16`} 
            data-section="skills"
          >
            <div className="max-w-7xl mx-auto w-full">
              <Skills skillsRef={skillsRef} themeClasses={{ background: theme === 'dark' ? 'bg-black' : 'bg-white', text: theme === 'dark' ? 'text-white' : 'text-black', secondaryText: theme === 'dark' ? 'text-gray-300' : 'text-gray-600' }} />
            </div>
          </section>
          
          {/* Certifications Section - Reduced height and padding */}
          <section 
            ref={certificationsRef} 
            className={`${theme === 'dark' ? 'bg-black' : 'bg-white'} px-4 md:px-8 py-12 md:py-16`} 
            data-section="certifications"
          >
            <div className="max-w-7xl mx-auto w-full">
              <CertificationsSection certificationsRef={certificationsRef} />
            </div>
          </section>

          {/* Projects Section - Reduced height and padding */}
          <section 
            ref={projectsRef} 
            className={`${theme === 'dark' ? 'bg-black' : 'bg-white'} px-4 md:px-8 py-12 md:py-16`} 
            data-section="projects"
          >
            <div className="max-w-7xl mx-auto w-full">
              <Projects projectsRef={projectsRef} />
            </div>
          </section>

          {/* Contact Section - Reduced height and padding */}
          <section 
            ref={contactRef} 
            className={`${theme === 'dark' ? 'bg-black' : 'bg-white'} px-4 md:px-8 py-12 md:py-16`} 
            data-section="contact"
          >
            <div className="max-w-7xl mx-auto w-full">
              <Contact contactRef={contactRef} />
            </div>
          </section>
        </main>

        {/* Dynamic Island Navigation */}
        <nav className={`fixed bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex items-center justify-center space-x-2 md:space-x-4 p-2 ${theme === 'dark' ? 'bg-black/30 border-gray-700/30' : 'bg-white/30 border-gray-200/30'} backdrop-blur-xl border rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                const element = item.ref.current;
                if (element) {
                  // Device-specific scroll offset calculations
                  const getScrollOffset = () => {
                    const width = window.innerWidth;
                    const height = window.innerHeight;
                    
                    if (item.id === 'landing') return 0;
                    
                    if (width < 768) {
                      if (height <= 667) {
                        if (item.id === 'about') return 40;
                        return 10;
                      } else if (height <= 844) {
                        if (item.id === 'contact') return 60;
                        return 30;
                      } else {
                        if (item.id === 'about' || item.id === 'projects') return 50;
                        if (item.id === 'skills') return 60;
                        if (item.id === 'certifications') return 40;
                        if (item.id === 'contact') return 80;
                        return 50;
                      }
                    } else if (width >= 768 && width < 1024) {
                      if (width <= 820) {
                        if (item.id === 'certifications' || item.id === 'projects') return -20;
                        return 0;
                      } else {
                        if (item.id === 'certifications' || item.id === 'projects') return -120;
                        return -100;
                      }
                    } else {
                      return 70;
                    }
                  };
                  
                  const scrollOffset = getScrollOffset();
                  const elementPosition = element.offsetTop + scrollOffset;
                  
                  window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                  });
                }
              }}
              className={`p-2 rounded-full transition-all duration-300 ${
                activeSection === item.id 
                  ? 'bg-blue-500/70 text-white' 
                  : `${theme === 'dark' ? 'hover:bg-gray-700/70 text-gray-300' : 'hover:bg-gray-200/70 text-gray-600'} hover:text-blue-400`
              }`}
              aria-label={item.label}
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}