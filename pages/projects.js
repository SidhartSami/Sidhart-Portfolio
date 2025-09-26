import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const SectionHeading = ({ title }) => {
  const { theme } = useTheme();
  
  return (
    <div className="mb-6 sm:mb-8 md:mb-12 flex items-center space-x-4">
      <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        {title}<span className="text-blue-500">.</span>
      </h2>
      <div className="flex-1 h-px bg-zinc-300 dark:bg-zinc-700 opacity-50"></div>
    </div>
  );
};

const Projects = ({ projectsRef }) => {
  const { theme } = useTheme();
  
  const projects = [
    {
      id: 1,
      title: "Ozone – E-Commerce Website",
      description: "A brand-focused e-commerce website for the fictional clothing label 'Ozone', built with HTML and CSS. Features clean modern UI, responsive design, product categories, and promotional banners showcasing front-end design principles.",
      technologies: ["HTML", "CSS"],
      category: "Web Design & UI",
      github: "https://github.com/SidhartSami/Ecommerce-Website_IICT",
      live: "https://sidhartsami.github.io/Ecommerce-Website_IICT/",
      icon: "🛍️",
      accentColor: "blue",
      hasGithub: true,
      hasLive: true,
    },
    {
      id: 2,
      title: "Centipede – Arcade Game",
      description: "A classic arcade-style Centipede game built with C++ and SFML graphics library. Demonstrates procedural programming concepts including game loops, collision detection, entity movement, and real-time input handling.",
      technologies: ["C++", "SFML", "Procedural Programming"],
      category: "Intro to Game Dev",
      github: "https://github.com/SidhartSami/Centipede_PF",
      icon: "👾",
      accentColor: "blue",
       hasGithub: true,
      hasLive: false ,
    },
    {
      id: 3,
      title: "Plants vs Zombies 2",
      description: "A tower-defense strategy game developed in C++ with object-oriented design and SFML rendering, including plant-vs-zombie combat mechanics and level progression.",
      technologies: ["C++", "OOP", "SFML"],
      category: "Game Development",
      icon: "🧟",
      accentColor: "blue",
      hasGithub: false,
      hasLive: false,
    },
    {
      id: 4,
      title: "Library Management System",
      description: "An assembly-level system to manage book records and user operations like issuing and returning, implemented using Irvine32 in x86 Assembly.",
      technologies: ["Assembly", "Irvine32"],
      category: "Low-Level Systems",
      github: "https://github.com/SidhartSami/Library-Management-System",
      icon: "📚",
      accentColor: "blue",
      hasGithub: true,
      hasLive: false,
    },
    {
      id: 5,
      title: "NUCES Timetable Assistant",
      description: "An intelligent web app built with Streamlit and Pandas to generate optimized timetables for NUCES students based on course and time preferences.",
      technologies: ["Python", "Pandas", "Streamlit"],
      category: "Data Automation",
      github: "https://github.com/SidhartSami/FAST-NUCES-TimeTable",
      live: "https://nucestimetable.streamlit.app/",
      icon: "📅",
      accentColor: "blue",
      hasGithub: true,
      hasLive: true,
    },
    {
      id: 6,
      title: "Multi-Docs Editor",
      description: "A low-level text editor supporting concurrent editing of multiple documents, written in C with OS-level file and memory management features.",
      technologies: ["C", "File System", "Multithreading"],
      category: "System Programming",
      icon: "📝",
      accentColor: "blue",
      hasGithub: false,
      hasLive: false,
    },
    {
      id: 7,
      title: "Sudoku Solver",
      description: "A web-based interactive Sudoku solver that visualizes backtracking algorithms in real-time, with a clean UI for entering puzzles and seeing solutions.",
      technologies: ["HTML", "CSS", "JavaScript", "TOC"],
      category: "Algorithm Visualization",
      github: "https://github.com/SidhartSami/SudokoSolver_TOA",
      icon: "🧠",
      accentColor: "blue",
      hasGithub: true,
      hasLive: false,
    },
    {
      id: 8,
      title: "SecureNet-App",
      description: "A real-time Network Intrusion Detection System combining ML and Cybersecurity. Features AI-powered detection with 90+ accuracy, live packet capture, and interactive React dashboard for network attack classification.",
      technologies: ["Python", "FastAPI", "React", "Electron", "scikit-learn", "PyShark", "Tailwind CSS"],
      category: "AI & Cybersecurity",
      github: "https://github.com/SidhartSami/SecureNet-App",
      icon: "🛡️",
      accentColor: "blue",
      hasGithub: true,
      hasLive: false,
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [screenSize, setScreenSize] = useState('mobile');

  // Enhanced screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Auto-rotate functionality
  useEffect(() => {
    if (isPaused) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + (screenSize === 'mobile' ? 1.5 : 2);
      });
    }, screenSize === 'mobile' ? 60 : 40);

    const rotateInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
      setProgress(0);
    }, screenSize === 'mobile' ? 4000 : 3000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(rotateInterval);
    };
  }, [projects.length, isPaused, screenSize]);

  // Touch handlers for mobile swiping
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextProject();
    } else if (isRightSwipe) {
      prevProject();
    }
  };

  // Navigation functions
  const nextProject = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const prevProject = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setProgress(0);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const goToProject = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setProgress(0);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  return (
    <section 
      ref={projectsRef} 
      className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-white'} py-6 sm:py-8 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden relative transition-all duration-700 flex flex-col justify-center`} 
      data-section="projects"
    >
      {/* Professional Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-br from-blue-500/5 to-blue-600/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 sm:w-48 sm:h-48 bg-gradient-to-br from-blue-400/5 to-blue-500/5 rounded-full blur-3xl animate-float-delay"></div>
        <div className="absolute top-1/2 left-1/6 w-20 h-20 sm:w-40 sm:h-40 bg-gradient-to-br from-blue-600/5 to-blue-700/5 rounded-full blur-2xl animate-pulse"></div>
      </div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <SectionHeading title="Projects" />

        {/* Carousel View */}
        <div className="relative">
          {/* Main Project Container */}
          <div 
            className="relative h-auto min-h-[500px] sm:min-h-[400px] md:min-h-[450px] flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Navigation Arrows - Hidden on mobile */}
            {screenSize !== 'mobile' && (
              <>
                <button
                  onClick={prevProject}
                  disabled={isTransitioning}
                  className={`absolute left-2 sm:left-4 z-30 p-3 sm:p-4 rounded-full ${theme === 'dark' ? 'bg-zinc-900/80 border-zinc-700/50' : 'bg-white/90 border-zinc-200/50'} border backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group`}
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextProject}
                  disabled={isTransitioning}
                  className={`absolute right-2 sm:right-4 z-30 p-3 sm:p-4 rounded-full ${theme === 'dark' ? 'bg-zinc-900/80 border-zinc-700/50' : 'bg-white/90 border-zinc-200/50'} border backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group`}
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Projects Display */}
            <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
              {screenSize === 'mobile' ? (
                // Mobile: Single card view
                <div className="flex justify-center">
                  <ProjectCard 
                    project={projects[currentIndex]} 
                    isCenter={true}
                    screenSize={screenSize}
                    theme={theme}
                    hoveredCard={hoveredCard}
                    setHoveredCard={setHoveredCard}
                    setIsPaused={setIsPaused}
                  />
                </div>
              ) : screenSize === 'tablet' ? (
                // Tablet: Current + side previews
                <div className="flex items-center justify-center gap-4">
                  <div className="opacity-40 scale-75 transform -rotate-3">
                    <ProjectCard 
                      project={projects[(currentIndex - 1 + projects.length) % projects.length]} 
                      isCenter={false}
                      screenSize={screenSize}
                      theme={theme}
                      onClick={() => goToProject((currentIndex - 1 + projects.length) % projects.length)}
                    />
                  </div>
                  <div className="z-10">
                    <ProjectCard 
                      project={projects[currentIndex]} 
                      isCenter={true}
                      screenSize={screenSize}
                      theme={theme}
                      hoveredCard={hoveredCard}
                      setHoveredCard={setHoveredCard}
                      setIsPaused={setIsPaused}
                    />
                  </div>
                  <div className="opacity-40 scale-75 transform rotate-3">
                    <ProjectCard 
                      project={projects[(currentIndex + 1) % projects.length]} 
                      isCenter={false}
                      screenSize={screenSize}
                      theme={theme}
                      onClick={() => goToProject((currentIndex + 1) % projects.length)}
                    />
                  </div>
                </div>
              ) : (
                // Desktop: 3 cards with 3D effect
                <div className="flex items-center justify-center gap-6">
                  <div className="opacity-60 scale-90 transform rotate-y-12 -rotate-2">
                    <ProjectCard 
                      project={projects[(currentIndex - 1 + projects.length) % projects.length]} 
                      isCenter={false}
                      screenSize={screenSize}
                      theme={theme}
                      onClick={() => goToProject((currentIndex - 1 + projects.length) % projects.length)}
                    />
                  </div>
                  <div className="z-10 scale-105">
                    <ProjectCard 
                      project={projects[currentIndex]} 
                      isCenter={true}
                      screenSize={screenSize}
                      theme={theme}
                      hoveredCard={hoveredCard}
                      setHoveredCard={setHoveredCard}
                      setIsPaused={setIsPaused}
                    />
                  </div>
                  <div className="opacity-60 scale-90 transform -rotate-y-12 rotate-2">
                    <ProjectCard 
                      project={projects[(currentIndex + 1) % projects.length]} 
                      isCenter={false}
                      screenSize={screenSize}
                      theme={theme}
                      onClick={() => goToProject((currentIndex + 1) % projects.length)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Progress Dots */}
          <div className="flex justify-center mt-8 sm:mt-12 space-x-3">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToProject(index)}
                disabled={isTransitioning}
                className={`relative overflow-hidden transition-all duration-500 ease-out disabled:cursor-not-allowed group
                  ${index === currentIndex
                    ? `w-10 h-3 sm:w-12 sm:h-3 ${theme === 'dark' ? 'bg-zinc-600' : 'bg-zinc-300'} rounded-full`
                    : `w-3 h-3 ${theme === 'dark' ? 'bg-zinc-500' : 'bg-zinc-400'} rounded-full hover:bg-blue-500 hover:scale-125 hover:shadow-lg hover:shadow-blue-500/50`
                  }`}
              >
                {index === currentIndex && (
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-100 ease-linear"
                    style={{ 
                      width: `${progress}%`,
                      transformOrigin: 'left center'
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-blue-500/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
              </button>
            ))}
          </div>

          {/* Mobile Swipe Indicator */}
          {screenSize === 'mobile' && (
            <div className="flex justify-center mt-4">
              <div className={`flex items-center gap-2 text-xs text-zinc-500 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-100'} px-3 py-2 rounded-full`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                <span>Swipe to navigate</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          )}

          {/* Status Indicator */}
          <div className="text-center mt-4">
            <div className={`inline-flex items-center gap-3 ${theme === 'dark' ? 'text-zinc-400 bg-zinc-800/50' : 'text-zinc-600 bg-zinc-100/50'} text-sm px-4 py-2 rounded-full backdrop-blur-sm`}>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isPaused ? 'bg-orange-500' : 'bg-green-500'} animate-pulse`}></div>
                <span className="font-medium">
                  {currentIndex + 1} / {projects.length}
                </span>
              </div>
              <div className="w-px h-4 bg-zinc-400"></div>
              <span className={`${isPaused ? 'text-orange-500' : 'text-green-500'} text-xs`}>
                {isPaused ? 'Paused' : 'Auto'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced ProjectCard Component
const ProjectCard = ({ 
  project, 
  isCenter, 
  screenSize, 
  theme,
  hoveredCard,
  setHoveredCard,
  setIsPaused,
  onClick
}) => {
  const getCardSize = () => {
    if (screenSize === 'mobile') {
      return 'w-full max-w-sm h-[580px]';
    } else if (screenSize === 'tablet') {
      return isCenter ? 'w-[340px] h-[520px]' : 'w-[280px] h-[450px]';
    } else {
      return isCenter ? 'w-[380px] h-[550px]' : 'w-[320px] h-[470px]';
    }
  };

  const getTextSizes = () => {
    if (screenSize === 'mobile') {
      return {
        title: 'text-xl',
        description: 'text-sm',
        tech: 'text-xs',
        button: 'text-sm py-3'
      };
    } else if (screenSize === 'tablet') {
      return {
        title: isCenter ? 'text-lg' : 'text-base',
        description: isCenter ? 'text-sm' : 'text-xs',
        tech: 'text-xs',
        button: isCenter ? 'text-sm py-2.5' : 'text-xs py-2'
      };
    } else {
      return {
        title: isCenter ? 'text-xl' : 'text-lg',
        description: isCenter ? 'text-sm' : 'text-xs',
        tech: 'text-xs',
        button: isCenter ? 'text-sm py-3' : 'text-xs py-2'
      };
    }
  };

  const textSizes = getTextSizes();

  return (
    <div
      className={`group relative ${theme === 'dark' ? 'bg-zinc-900/80 border-zinc-700/50' : 'bg-white/90 border-zinc-200/50'} border backdrop-blur-sm rounded-2xl overflow-hidden 
        shadow-xl transition-all duration-500 transform-gpu cursor-pointer
        ${getCardSize()}
        ${hoveredCard === project.id && isCenter ? 'shadow-2xl scale-105 border-blue-500/50' : ''}
        ${isCenter ? 'hover:shadow-2xl hover:border-blue-500/40' : ''}
        ${!isCenter ? 'hover:scale-105' : ''}`}
      onClick={onClick}
      onMouseEnter={() => {
        setHoveredCard && setHoveredCard(project.id);
        if (isCenter && setIsPaused) setIsPaused(true);
      }}
      onMouseLeave={() => {
        setHoveredCard && setHoveredCard(null);
        if (isCenter && setIsPaused) setIsPaused(false);
      }}
      style={{
        background: hoveredCard === project.id && isCenter ? 
          theme === 'dark' ? 
            'linear-gradient(135deg, rgba(24, 24, 27, 0.95), rgba(39, 39, 42, 0.95))' : 
            'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.95))' : 
          undefined
      }}
    >
      {/* Professional Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 right-4 w-3 h-3 bg-blue-500/20 rounded-full animate-ping"></div>
        <div className="absolute bottom-6 left-6 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-8 w-1.5 h-1.5 bg-blue-300/40 rounded-full animate-bounce"></div>
      </div>
      
      {/* Large Icon */}
      <div className={`absolute top-4 right-4 ${screenSize === 'mobile' ? 'text-4xl' : 'text-3xl'} opacity-20 transition-all duration-500 group-hover:opacity-60 group-hover:scale-110 group-hover:rotate-12`}>
        {project.icon}
      </div>
      
      {/* Content */}
      <div className="relative p-6 h-full flex flex-col">
        {/* Header */}
        <div className="space-y-4 flex-none">
          {/* Category Badge */}
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${theme === 'dark' ? 'bg-blue-900/50 text-blue-300 border border-blue-700/50' : 'bg-blue-50 text-blue-700 border border-blue-200'} shadow-sm group-hover:shadow-md group-hover:bg-blue-600 group-hover:text-white transition-all duration-300`}>
              {project.category}
            </span>
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse delay-75"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-pulse delay-150"></div>
            </div>
          </div>
          
          {/* Title */}
          <div className="relative">
            <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-black'} leading-tight transition-all duration-300 group-hover:text-blue-500 ${textSizes.title}`}>
              {project.title}
            </h3>
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></div>
          </div>
        </div>
        
        {/* Description */}
        <div className="flex-1 flex flex-col justify-between mt-4">
          <p className={`${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} leading-relaxed transition-all duration-300 group-hover:text-current ${textSizes.description} mb-4`}>
            {screenSize === 'mobile' ? 
              project.description.substring(0, 300) + (project.description.length > 300 ? '...' : '') : 
              isCenter ? 
                project.description.substring(0, 350) + (project.description.length > 350 ? '...' : '') : 
                project.description.substring(0, 200) + (project.description.length > 200 ? '...' : '')
            }
          </p>
          
          {/* Technologies */}
          <div className="space-y-4 flex-none">
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, screenSize === 'mobile' ? 4 : isCenter ? 4 : 3).map((tech, i) => (
                <span
                  key={i}
                  className={`px-2.5 py-1 ${textSizes.tech} font-medium rounded-full transition-all duration-300 hover:scale-105
                    ${theme === 'dark' ? 'bg-zinc-800 text-zinc-300 border-zinc-700' : 'bg-zinc-100 text-zinc-700 border-zinc-200'} 
                    border hover:border-blue-300 hover:text-blue-600 ${theme === 'dark' ? 'hover:bg-blue-900/20' : 'hover:bg-blue-50'}`}
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {/* Action Buttons */}
            {/* Action Buttons */}
            {isCenter && (project.hasGithub || project.hasLive) && (
              <div className={`pt-2 transition-all duration-700 ${hoveredCard === project.id || screenSize === 'mobile' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <div className={`flex gap-3 ${!project.hasGithub || !project.hasLive ? 'justify-center' : ''}`}>
                  {project.hasLive && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.live, '_blank');
                      }}
                      className={`${!project.hasGithub ? 'flex-1 max-w-xs' : 'flex-1'} px-4 ${textSizes.button} bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live Demo
                      </span>
                    </button>
                  )}
                  {project.hasGithub && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.github, '_blank');
                      }}
                      className={`${!project.hasLive ? 'flex-1 max-w-xs' : 'flex-1'} px-4 ${textSizes.button} rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95
                        ${theme === 'dark' ? 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700 hover:border-blue-500' : 'bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50 hover:border-blue-500'} border-2`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        GitHub
                      </span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Shimmer Effect */}
      {isCenter && (
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-all duration-1000 ${hoveredCard === project.id ? 'translate-x-full' : '-translate-x-full'} pointer-events-none`}></div>
      )}
      
      {/* Professional Glow Effect */}
      {isCenter && hoveredCard === project.id && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-20 rounded-2xl blur-xl scale-110 -z-10"></div>
      )}
    </div>
  );
};

export default Projects;