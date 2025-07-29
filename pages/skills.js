import { useState, useEffect, useRef } from 'react';

const SectionHeading = ({ title, themeClasses }) => {
  return (
    <div className="mb-5 sm:mb-6 md:mb-9 flex items-center space-x-4">
      <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${themeClasses.text}`}>
        {title}<span className="text-blue-500">.</span>
      </h2>
      
      {/* Horizontal line after the title */}
      <div className="flex-1 h-px bg-zinc-300 dark:bg-zinc-700 opacity-50"></div>
    </div>
  );
};

// Enhanced Circular Progress Component
const CircularProgress = ({ percentage, size = 100, strokeWidth = 6, color = '#3b82f6', delay = 0 }) => {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  // Responsive sizing - reduced by ~15%
  const responsiveSize = typeof window !== 'undefined' && window.innerWidth < 768 ? Math.min(size, 68) : size;
  const responsiveStroke = typeof window !== 'undefined' && window.innerWidth < 768 ? Math.min(strokeWidth, 5) : strokeWidth;
  
  const radius = (responsiveSize - responsiveStroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, delay);
    return () => clearTimeout(timer);
  }, [percentage, delay]);

  if (!mounted) return null;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={responsiveSize} height={responsiveSize} className="transform -rotate-90">
        <circle
          cx={responsiveSize / 2}
          cy={responsiveSize / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={responsiveStroke}
          fill="none"
          className="opacity-20"
        />
        <circle
          cx={responsiveSize / 2}
          cy={responsiveSize / 2}
          r={radius}
          stroke={color}
          strokeWidth={responsiveStroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{ transitionDelay: `${delay}ms` }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs md:text-base font-bold">{Math.round(progress)}%</span>
      </div>
    </div>
  );
};

// Enhanced Mobile Linear Progress with Animated Background
const LinearProgress = ({ percentage, color = '#3b82f6', delay = 0, name }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage);
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [percentage, delay]);

  return (
    <div className={`w-full transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold">{name}</span>
        <span className="text-sm font-bold text-blue-500">{Math.round(progress)}%</span>
      </div>
      <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/20 animate-pulse"></div>
        <div 
          className="relative h-2.5 rounded-full transition-all duration-1000 ease-out shadow-sm"
          style={{ 
            width: `${progress}%`, 
            background: `linear-gradient(90deg, ${color}, ${color}dd)`,
            transitionDelay: `${delay}ms`,
            boxShadow: `0 0 10px ${color}40`
          }}
        />
      </div>
    </div>
  );
};

// Enhanced Logo Skill Component with Floating Animation - reduced sizes
const LogoSkill = ({ name, imageSrc, isDarkMode, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div 
      className={`group relative transform transition-all duration-500 hover:scale-105 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`relative rounded-lg p-2 md:p-3 transition-all duration-300 backdrop-blur-sm border ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-gray-700/50 hover:border-blue-500/50' 
          : 'bg-gradient-to-br from-white/70 to-gray-50/70 border-gray-200/50 hover:border-blue-500/50'
      } hover:shadow-lg hover:shadow-blue-500/20`}>
        <div className="flex flex-col items-center space-y-1.5">
          <div className="relative w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 transition-all duration-300 group-hover:scale-110">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <img 
              src={imageSrc} 
              alt={name}
              className={`relative w-full h-full object-contain transition-all duration-300 rounded-lg ${
                isHovered ? 'filter-none' : 'filter grayscale hover:grayscale-0'
              }`}
            />
          </div>
          <h4 className={`text-xs font-medium text-center transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300 group-hover:text-blue-400' : 'text-gray-700 group-hover:text-blue-600'
          }`}>
            {name}
          </h4>
        </div>
      </div>
    </div>
  );
};

// Dynamic grid class function
const getDynamicGridClass = (itemCount, type = 'default') => {
  if (type === 'languages') {
    if (itemCount <= 3) return 'grid-cols-3';
    return 'grid-cols-2';
  }
  
  if (itemCount <= 2) return 'grid-cols-2';
  if (itemCount <= 4) return 'grid-cols-2';
  if (itemCount <= 6) return 'grid-cols-3';
  return 'grid-cols-3';
};

// Enhanced Mobile Skill Card with Glassmorphism and Animations - reduced padding
const MobileSkillCard = ({ title, items, type, isDarkMode, themeClasses, isExpanded, onToggle }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onToggle();
      setIsAnimating(false);
    }, 150);
  };

  // Get the appropriate icon based on type
  const getIcon = () => {
    switch(type) {
      case 'languages':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'libraries':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      case 'tools':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-xl backdrop-blur-md border transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-gray-700/50' 
        : 'bg-gradient-to-br from-white/70 to-gray-50/70 border-gray-200/50'
    } hover:shadow-xl hover:shadow-blue-500/10`}>
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Header - reduced padding */}
      <div 
        className="relative z-10 p-3 cursor-pointer"
        onClick={handleToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
              {getIcon()}
            </div>
            <h3 className={`text-base font-bold ${themeClasses.text}`}>{title}</h3>
          </div>
          <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`relative z-10 overflow-hidden transition-all duration-500 ${
        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="p-3 pt-0">
          {type === 'languages' ? (
            <div className="space-y-3">
              {items.map((item, index) => (
                <LinearProgress
                  key={item.name}
                  percentage={item.level}
                  color={item.color}
                  delay={index * 100}
                  name={item.name}
                />
              ))}
            </div>
          ) : items.length > 0 ? (
            <div className={`grid gap-2.5 ${getDynamicGridClass(items.length)}`}>
              {items.map((item, index) => (
                <LogoSkill
                  key={item.name}
                  name={item.name}
                  imageSrc={item.imageSrc}
                  isDarkMode={isDarkMode}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className={`text-center py-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <p className="text-sm">No items to display</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Enhanced Tablet Card Component with Parallax Effect - reduced sizes
const TabletSkillCard = ({ title, items, type, isDarkMode, themeClasses, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  // Get the appropriate icon based on type
  const getIcon = () => {
    switch(type) {
      case 'languages':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'libraries':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      case 'tools':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-xl transition-all duration-700 transform ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    } hover:scale-105 group`}>
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className={`relative z-10 backdrop-blur-md border ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700/50' 
          : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200/50'
      } rounded-xl p-5 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300`}>
        
        {/* Header - reduced sizes */}
        <div className="text-center mb-5">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2.5 group-hover:scale-110 transition-transform duration-300 text-white">
            {getIcon()}
          </div>
          <h3 className={`text-lg font-bold ${themeClasses.text} mb-1.5`}>{title}</h3>
          <div className="w-14 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto"></div>
        </div>

        {/* Content */}
        {type === 'languages' ? (
          <div className={`grid gap-3 ${getDynamicGridClass(items.length, 'languages')}`}>
            {items.map((lang, index) => (
              <div key={lang.name} className="flex flex-col items-center space-y-1.5">
                <CircularProgress
                  percentage={lang.level}
                  size={75}
                  strokeWidth={5}
                  color={lang.color}
                  delay={index * 150}
                />
                <h4 className={`text-xs font-semibold ${themeClasses.text}`}>{lang.name}</h4>
              </div>
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className={`grid gap-3 ${getDynamicGridClass(items.length)}`}>
            {items.map((item, index) => (
              <LogoSkill
                key={item.name}
                name={item.name}
                imageSrc={item.imageSrc}
                isDarkMode={isDarkMode}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className={`text-center py-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <p className="text-sm">No items to display</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Skills data
const skillsData = {
  'Data Science/ML': {
    icon: (
      <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    description: "Advanced analytics, machine learning, and data visualization",
    languages: [
      { name: 'Python', level: 95, color: '#3776ab' },
      { name: 'R', level: 85, color: '#276dc3' },
      { name: 'SQL', level: 90, color: '#f29111' },
    ],
    libraries: [
      { name: 'TensorFlow', imageSrc: '/tensorflow-original.svg' },
      { name: 'Seaborn', imageSrc: '/seaborn-original.svg' },
      { name: 'Scikit-learn', imageSrc: '/scikitlearn-original.svg' },
      { name: 'Pandas', imageSrc: '/pandas-original.svg' },
      { name: 'NumPy', imageSrc: '/numpy-original.svg' },
      { name: 'Matplotlib', imageSrc: '/matplotlib-original.svg' }
    ],
    tools: [
      { name: 'Jupyter', imageSrc: '/jupyter-original.svg' },
      { name: 'Git', imageSrc: '/git-original.svg' },
      { name: 'Docker', imageSrc: '/docker-original.svg' },
      { name: 'Tableau', imageSrc: '/tableau-original.svg' },
    ]
  },
  'Web Development': {
    icon: (
      <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    description: "Full-stack web applications and modern frontend frameworks",
    languages: [
      { name: 'JavaScript', level: 95, color: '#f7df1e' },
      { name: 'Python', level: 85, color: '#3178c6' },
      { name: 'HTML', level: 95, color: '#e34c26' },
      { name: 'CSS', level: 80, color: '#777bb4' }
    ],
    libraries: [
      { name: 'React', imageSrc: '/react-original.svg' },
      { name: 'Next.js', imageSrc: '/nextjs-original.svg' },
      { name: 'Tailwind', imageSrc: 'tailwindcss-original.svg' },
    ],
    tools: [
      { name: 'VS Code', imageSrc: '/vscode-original.svg' },
      { name: 'Git', imageSrc: '/git-original.svg' },
      { name: 'Figma', imageSrc: '/figma-original.svg' },
    ]
  },
  'Game Development': {
    icon: (
      <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
    description: "Interactive games and immersive experiences",
    languages: [
      { name: 'C++', level: 90, color: '#f7df1e' },
        { name: 'C++', level: 70, color: '#f7df1e' },
      { name: 'Python', level: 80, color: '#3776ab' },
      { name: 'JavaScript', level: 75, color: '#3776ab' }
    ],
    libraries: [
      { name: 'SFML', imageSrc: '/sfml.svg' },
      { name: 'PyGame', imageSrc: '/pygame.svg' },
    ],
    tools: [
      { name: 'Unity', imageSrc: '/unity-original.svg' },
      { name: 'Unreal', imageSrc: '/unrealengine-original.svg' },
    ]
  }
};

const Skill = ({ skillsRef, themeClasses = { background: 'bg-white', text: 'text-gray-900', secondaryText: 'text-gray-600', cardBackground: 'bg-white' } }) => {
  const [selectedSector, setSelectedSector] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');
  const [expandedCards, setExpandedCards] = useState(new Set());

  // Theme detection
  const isDarkMode = themeClasses.background === 'bg-black';

  // Responsive detection with iPad orientation handling
  useEffect(() => {
    let timeoutId;
    const checkScreenSize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const isIpad = /iPad|Macintosh/.test(navigator.userAgent) && 'ontouchend' in document;
        const isTabletSize = width >= 768 && width <= 1024;
        
        if (width < 640) {
          setScreenSize('mobile');
        } else if (isIpad || isTabletSize) {
          // iPad in portrait or small tablets should use mobile layout
          if (height > width || width < 900) {
            setScreenSize('mobile');
          } else {
            // iPad in landscape uses desktop layout
            setScreenSize('desktop');
          }
        } else if (width < 1024) {
          setScreenSize('tablet');
        } else {
          setScreenSize('desktop');
        }
      }, 100);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    window.addEventListener('orientationchange', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
      window.removeEventListener('orientationchange', checkScreenSize);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleSectorClick = (sector) => {
    if (selectedSector === sector) {
      setSelectedSector(null);
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedSector(sector);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleBackClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedSector(null);
      setIsAnimating(false);
    }, 300);
  };

  const toggleCard = (cardType) => {
    setExpandedCards(prev => {
      const newSet = new Set();
      // If the clicked card is not expanded, expand it and close others
      if (!prev.has(cardType)) {
        newSet.add(cardType);
      }
      // If the clicked card is already expanded, close it (newSet remains empty)
      return newSet;
    });
  };

  return (
    <section 
      ref={skillsRef} 
      className={`min-h-screen ${themeClasses.background} py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8 overflow-hidden relative transition-all duration-700 flex items-center`} 
      data-section="skills"
    >
      {/* Enhanced Background Effects - slightly reduced */}
      <div className="absolute top-0 right-0 w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 bg-gradient-to-bl from-blue-500/20 via-blue-400/10 to-transparent rounded-full blur-3xl opacity-80 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 bg-gradient-to-tr from-blue-400/30 via-blue-300/15 to-transparent rounded-full blur-2xl opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-transparent rounded-full blur-xl opacity-60 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {!selectedSector ? (
          // Enhanced Sector Selection View - reduced card sizes
          <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <SectionHeading title="My Skills" themeClasses={themeClasses} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {Object.entries(skillsData).map(([sector, data], index) => (
                <div
                  key={sector}
                  onClick={() => handleSectorClick(sector)}
                  className={`relative overflow-hidden backdrop-blur-md border rounded-lg md:rounded-xl p-3 sm:p-4 md:p-5 transition-all duration-500 cursor-pointer group hover:scale-105 active:scale-95 ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700/50 hover:border-blue-500/50' 
                      : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200/50 hover:border-blue-500/50'
                  } hover:shadow-xl hover:shadow-blue-500/20`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Floating Background Animation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-blue-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-2.5 sm:mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30`}>
                      <div className="text-white">
                        {data.icon}
                      </div>
                    </div>
                    <h3 className={`text-sm sm:text-base md:text-lg font-bold ${themeClasses.text} mb-1.5 group-hover:text-blue-500 transition-colors duration-300`}>
                      {sector}
                    </h3>
                    <p className={`${themeClasses.secondaryText} text-xs sm:text-sm mb-2.5 sm:mb-3 leading-relaxed`}>
                      {data.description}
                    </p>
                    
                    {/* Mobile: Arrow icon instead of button */}
                    {screenSize === 'mobile' ? (
                      <div className="flex justify-end">
                        <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          isDarkMode 
                            ? 'border-gray-600 group-hover:border-blue-500 group-hover:bg-blue-500/10' 
                            : 'border-gray-300 group-hover:border-blue-500 group-hover:bg-blue-500/10'
                        }`}>
                          <svg className="w-3.5 h-3.5 transition-all duration-300 group-hover:text-blue-500 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      // Tablet/Desktop: Show explore button
                      <div className="flex justify-center">
                        <div className={`px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border-2 transition-all duration-300 ${
                          isDarkMode 
                            ? 'border-gray-600 group-hover:border-blue-500 group-hover:bg-blue-500/10' 
                            : 'border-gray-300 group-hover:border-blue-500 group-hover:bg-blue-500/10'
                        }`}>
                          <span className={`text-xs md:text-sm font-medium ${themeClasses.secondaryText} group-hover:text-blue-500 transition-colors duration-300`}>
                            Explore Skills
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Enhanced Detailed Skills View
          <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            {/* Enhanced Header with Centered Title and Lower Back Button */}
            <div className="mb-5 sm:mb-6">
              {/* Centered Title Section */}
              <div className="text-center mb-5">
                <div className="flex items-center justify-center mb-2.5 sm:mb-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <div className="text-white">
                      {skillsData[selectedSector].icon}
                    </div>
                  </div>
                </div>
                <h2 className={`text-lg sm:text-xl md:text-2xl font-bold ${themeClasses.text} mb-1.5`}>
                  {selectedSector}
                </h2>
                <div className="w-14 sm:w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto"></div>
              </div>

              {/* Back Button - Positioned Lower */}
              <div className="flex justify-start">
                <button
                  onClick={handleBackClick}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg backdrop-blur-md border transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-800/80 border-gray-700/50 hover:bg-blue-500 hover:border-blue-500' 
                      : 'bg-white/80 border-gray-200/50 hover:bg-blue-500 hover:border-blue-500'
                  } hover:text-white hover:shadow-lg hover:shadow-blue-500/30 active:scale-95`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="text-xs font-medium">
                    {screenSize === 'mobile' ? 'Back' : 'Back to Skills'}
                  </span>
                </button>
              </div>
            </div>

            {/* Responsive Layouts */}
            {screenSize === 'mobile' ? (
              // Enhanced Mobile Layout with Accordion
              <div className="space-y-2.5 sm:space-y-3">
                <MobileSkillCard
                  title="Languages"
                  items={skillsData[selectedSector].languages}
                  type="languages"
                  isDarkMode={isDarkMode}
                  themeClasses={themeClasses}
                  isExpanded={expandedCards.has('languages')}
                  onToggle={() => toggleCard('languages')}
                />
                <MobileSkillCard
                  title="Libraries"
                  items={skillsData[selectedSector].libraries}
                  type="libraries"
                  isDarkMode={isDarkMode}
                  themeClasses={themeClasses}
                  isExpanded={expandedCards.has('libraries')}
                  onToggle={() => toggleCard('libraries')}
                />
                {skillsData[selectedSector].tools && skillsData[selectedSector].tools.length > 0 && (
                  <MobileSkillCard
                    title="Tools"
                    items={skillsData[selectedSector].tools}
                    type="tools"
                    isDarkMode={isDarkMode}
                    themeClasses={themeClasses}
                    isExpanded={expandedCards.has('tools')}
                    onToggle={() => toggleCard('tools')}
                  />
                )}
              </div>
            ) : screenSize === 'tablet' ? (
              // Enhanced Tablet Layout with Better Spacing
              <div className="space-y-4 sm:space-y-5">
                <TabletSkillCard
                  title="Languages"
                  items={skillsData[selectedSector].languages}
                  type="languages"
                  isDarkMode={isDarkMode}
                  themeClasses={themeClasses}
                  delay={0}
                />
                <TabletSkillCard
                  title="Libraries"
                  items={skillsData[selectedSector].libraries}
                  type="libraries"
                  isDarkMode={isDarkMode}
                  themeClasses={themeClasses}
                  delay={200}
                />
                {skillsData[selectedSector].tools && skillsData[selectedSector].tools.length > 0 && (
                  <TabletSkillCard
                    title="Tools"
                    items={skillsData[selectedSector].tools}
                    type="tools"
                    isDarkMode={isDarkMode}
                    themeClasses={themeClasses}
                    delay={400}
                  />
                )}
              </div>
            ) : (
              // Enhanced Desktop Layout with Better Grid
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-6">
                {/* Languages */}
                <div className={`relative overflow-hidden backdrop-blur-md border rounded-xl p-5 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700/50' 
                    : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200/50'
                } group`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-center mb-5">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2.5 group-hover:scale-110 transition-transform duration-300 text-white">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className={`text-lg font-bold ${themeClasses.text} mb-1.5`}>Languages</h3>
                      <div className="w-10 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto"></div>
                    </div>
                    <div className={`grid gap-3 ${getDynamicGridClass(skillsData[selectedSector].languages.length, 'languages')}`}>
                      {skillsData[selectedSector].languages.map((lang, index) => (
                        <div key={lang.name} className="flex flex-col items-center">
                          <CircularProgress
                            percentage={lang.level}
                            size={68}
                            strokeWidth={4}
                            color={lang.color}
                            delay={index * 150}
                          />
                          <h4 className={`mt-1.5 text-xs font-semibold ${themeClasses.text}`}>{lang.name}</h4>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Libraries */}
                <div className={`relative overflow-hidden backdrop-blur-md border rounded-xl p-5 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700/50' 
                    : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200/50'
                } group`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-center mb-5">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2.5 group-hover:scale-110 transition-transform duration-300 text-white">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <h3 className={`text-lg font-bold ${themeClasses.text} mb-1.5`}>Libraries</h3>
                      <div className="w-10 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto"></div>
                    </div>
                    {skillsData[selectedSector].libraries.length > 0 ? (
                      <div className={`grid gap-2.5 ${getDynamicGridClass(skillsData[selectedSector].libraries.length)}`}>
                        {skillsData[selectedSector].libraries.map((lib, index) => (
                          <LogoSkill
                            key={lib.name}
                            name={lib.name}
                            imageSrc={lib.imageSrc}
                            isDarkMode={isDarkMode}
                            index={index}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <p className="text-sm">No libraries to display</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tools */}
                <div className={`relative overflow-hidden backdrop-blur-md border rounded-xl p-5 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700/50' 
                    : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200/50'
                } group`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-center mb-5">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2.5 group-hover:scale-110 transition-transform duration-300 text-white">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h3 className={`text-lg font-bold ${themeClasses.text} mb-1.5`}>Tools</h3>
                      <div className="w-10 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto"></div>
                    </div>
                    {skillsData[selectedSector].tools && skillsData[selectedSector].tools.length > 0 ? (
                      <div className={`grid gap-2.5 ${getDynamicGridClass(skillsData[selectedSector].tools.length)}`}>
                        {skillsData[selectedSector].tools.map((tool, index) => (
                          <LogoSkill
                            key={tool.name}
                            name={tool.name}
                            imageSrc={tool.imageSrc}
                            isDarkMode={isDarkMode}
                            index={index}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-sm">No tools to display</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skill;