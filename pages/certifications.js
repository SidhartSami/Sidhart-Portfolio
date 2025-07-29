import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

const SectionHeading = ({ title }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="mb-8 sm:mb-12 flex items-center space-x-4">
      <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${mounted && resolvedTheme === 'dark' ? 'text-white' : 'text-black'}`}>
        {title}<span className="text-blue-500">.</span>
      </h2>
      
      {/* Horizontal line after the title */}
      <div className={`flex-1 h-px ${mounted && resolvedTheme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-300'} opacity-50`}></div>
    </div>
  );
};

const CertificationsSection = ({ certificationsRef }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const certificateSections = {
    'data-analytics': {
      title: 'Google Advance Data Analytics',
      icon: '🌐',
      color: 'from-blue-500 to-cyan-500',
      courses: [
        { id: 26, title: "Foundations of Data Science", issuer: "Google", date: "2025", icon: "🏗️", level: "Beginner" },
        { id: 27, title: "Get Started with Python", issuer: "Google", date: "2025", icon: "🚀", level: "Beginner" },
        { id: 28, title: "Go Beyond the Numbers: Translate Data into Insights", issuer: "Google", date: "2025", icon: "🔄", level: "Intermediate" },
        { id: 29, title: "The Power of Statistics", issuer: "Google", date: "2025", icon: "📊", level: "Intermediate" },
        { id: 30, title: "Regression Analysis: Simplify Complex Data Relationships", issuer: "Google", date: "2025", icon: "📉", level: "Advanced" },
        { id: 31, title: "The Nuts and Bolts of Machine Learning", issuer: "Google", date: "2025", icon: "🧠", level: "Advanced" },
        { id: 32, title: "Advanced Data Analytics Capstone", issuer: "Google", date: "2025", icon: "🏆", level: "Advanced" },
        { id: 33, title: "Accelerate Job Search with AI", issuer: "Google", date: "2025", icon: "🔍", level: "Intermediate" }
      ],
      professional: {
        id: 34, title: "Google Advance Data Analytics Professional Certificate", issuer: "Google", date: "2025", icon: "🎖️",
        description: "Professional Certificate - Complete 8-course series covering data science methodology, Python programming, machine learning, and real-world capstone projects"
      }
    },
    'data-science': {
      title: 'IBM Data Science',
      icon: '📊',
      color: 'from-green-500 to-teal-500',
      courses: [
        { id: 1, title: "What is Data Science?", issuer: "IBM", date: "2025", icon: "❓", level: "Beginner" },
        { id: 2, title: "Tools for Data Science", issuer: "IBM", date: "2025", icon: "🔧", level: "Beginner" },
        { id: 3, title: "Data Science Methodology", issuer: "IBM", date: "2025", icon: "📋", level: "Intermediate" },
        { id: 4, title: "Python for Data Science, AI & Development", issuer: "IBM", date: "2025", icon: "🐍", level: "Intermediate" },
        { id: 5, title: "Python Project for Data Science", issuer: "IBM", date: "2025", icon: "💻", level: "Intermediate" },
        { id: 6, title: "Databases and SQL for Data Science", issuer: "IBM", date: "2025", icon: "🗃️", level: "Intermediate" },
        { id: 7, title: "Data Analysis with Python", issuer: "IBM", date: "2025", icon: "📊", level: "Advanced" },
        { id: 8, title: "Data Visualization with Python", issuer: "IBM", date: "2025", icon: "📈", level: "Advanced" },
        { id: 9, title: "Machine Learning with Python", issuer: "IBM", date: "2025", icon: "🤖", level: "Advanced" },
        { id: 10, title: "Applied Data Science Capstone", issuer: "IBM", date: "2025", icon: "🎯", level: "Advanced" },
        { id: 11, title: "Generative AI: Elevate Your Data Science Career", issuer: "IBM", date: "2025", icon: "💼", level: "Intermediate" },
        { id: 12, title: "Career Guide & Interview Prep", issuer: "IBM", date: "2025", icon: "💼", level: "Intermediate" },
      ],
      professional: {
        id: 13, title: "IBM Data Science Professional Certificate", issuer: "IBM", date: "2025", icon: "🎖️",
        description: "Professional Certificate - Complete 12-course series covering data science methodology, Python programming, machine learning, and real-world capstone projects"
      }
    },
  };

  const [activeSection, setActiveSection] = useState('data-analytics');
  const [expandedCard, setExpandedCard] = useState(null);

  const currentSection = certificateSections[activeSection];
  const sectionTabs = Object.keys(certificateSections);

  const getLevelColor = (level) => {
    switch(level) {
      case 'Beginner': return 'text-green-500 bg-green-500/20';
      case 'Intermediate': return 'text-yellow-500 bg-yellow-500/20';
      case 'Advanced': return 'text-red-500 bg-red-500/20';
      default: return 'text-gray-500 bg-gray-500/20';
    }
  };

  // Dynamic grid calculation for desktop
  const getDesktopGridLayout = (coursesLength) => {
    if (coursesLength <= 6) {
      // For 6 or fewer courses: 3 columns of 2 each
      return {
        columns: 3,
        coursesPerColumn: 2
      };
    } else if (coursesLength <= 9) {
      // For 7-9 courses: 3 columns, distribute evenly
      return {
        columns: 3,
        coursesPerColumn: Math.ceil(coursesLength / 3)
      };
    } else {
      // For 10+ courses: 4 columns, distribute evenly
      return {
        columns: 4,
        coursesPerColumn: Math.ceil(coursesLength / 4)
      };
    }
  };

  const desktopLayout = getDesktopGridLayout(currentSection.courses.length);

  // Split courses into columns for desktop
  const getCoursesForColumn = (columnIndex) => {
    const startIndex = columnIndex * desktopLayout.coursesPerColumn;
    const endIndex = Math.min(startIndex + desktopLayout.coursesPerColumn, currentSection.courses.length);
    return currentSection.courses.slice(startIndex, endIndex);
  };

  // Theme-responsive classes
  const getCardBackground = () => {
    return mounted && resolvedTheme === 'dark' 
      ? 'bg-gray-800/70 border-gray-700/50' 
      : 'bg-white/70 border-gray-300/50';
  };

  const getCardBackgroundHover = () => {
    return mounted && resolvedTheme === 'dark' 
      ? 'hover:bg-gray-700/70' 
      : 'hover:bg-gray-200/70';
  };

  const getTextClass = () => {
    return mounted && resolvedTheme === 'dark' ? 'text-white' : 'text-black';
  };

  const getSecondaryTextClass = () => {
    return mounted && resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  };

  return (
    <section ref={certificationsRef} className={`${mounted && resolvedTheme === 'dark' ? 'bg-black' : 'bg-white'} py-12 px-4 sm:px-8 transition-colors duration-300`} data-section="certifications">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Certifications" />
        
        {/* Unified Section Navigation - Mobile layout for all sizes */}
        <div className="mb-8">
          {/* Mobile & iPad Portrait: 2x2 Grid layout */}
          <div className="lg:hidden grid grid-cols-2 gap-3 sm:gap-4 mb-4 max-w-lg mx-auto">
            {sectionTabs.map((sectionKey) => {
              const section = certificateSections[sectionKey];
              return (
                <button
                  key={sectionKey}
                  onClick={() => setActiveSection(sectionKey)}
                  className={`flex items-center justify-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-4 rounded-xl transition-all duration-300 border backdrop-blur-lg ${
                    activeSection === sectionKey
                      ? `bg-gradient-to-r ${section.color} text-white shadow-lg transform scale-105`
                      : `${getCardBackground()} ${getCardBackgroundHover()} ${getTextClass()}`
                  }`}
                >
                  <span className="text-base sm:text-xl">{section.icon}</span>
                  <span className="font-medium text-xs sm:text-sm leading-tight text-center">{section.title}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop: Use mobile-style gradient colors but in horizontal layout */}
          <div className="hidden lg:flex flex-wrap gap-3 justify-center">
            {sectionTabs.map((sectionKey) => {
              const section = certificateSections[sectionKey];
              return (
                <button
                  key={sectionKey}
                  onClick={() => setActiveSection(sectionKey)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 border backdrop-blur-lg ${
                    activeSection === sectionKey
                      ? `bg-gradient-to-r ${section.color} text-white shadow-lg transform scale-105`
                      : `${getCardBackground()} ${getCardBackgroundHover()} ${getTextClass()}`
                  }`}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span className="font-medium text-sm">{section.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Unified Layout - Mobile-first for all sizes */}
        <div className="space-y-6">
          {/* Professional Certificate - Featured at top for all sizes */}
          <div>
            <div className={`${getCardBackground()} ${getCardBackgroundHover()} border backdrop-blur-lg p-6 rounded-2xl transition-all duration-300 hover:shadow-2xl cursor-pointer group relative overflow-hidden`}>
              {/* Animated Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${currentSection.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
              
              {/* Floating particles effect */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{currentSection.professional.icon}</div>
                    <div className="text-blue-400 text-xs font-bold uppercase tracking-wide bg-blue-500/20 px-3 py-1 rounded-full">
                      Professional
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 bg-gray-500/20 px-3 py-1 rounded-full">
                    {currentSection.professional.date}
                  </div>
                </div>
                
                <h3 className={`${getTextClass()} text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors`}>
                  {currentSection.professional.title}
                </h3>
                <p className={`${getSecondaryTextClass()} text-sm mb-3 font-medium`}>
                  {currentSection.professional.issuer}
                </p>
                <p className={`${getSecondaryTextClass()} text-sm mb-4 leading-relaxed`}>
                  {currentSection.professional.description}
                </p>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-500/20">
                  <span className="text-blue-500 text-sm font-medium">View Certificate</span>
                  <svg className="w-4 h-4 text-blue-500 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile & iPad Portrait: 2x3 Grid Layout */}
          <div className="lg:hidden grid grid-cols-2 gap-4">
            {currentSection.courses.map((cert, index) => (
              <div 
                key={cert.id}
                className={`${getCardBackground()} ${getCardBackgroundHover()} border backdrop-blur-lg p-4 rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer group relative overflow-hidden ${
                  expandedCard === cert.id ? 'col-span-2' : ''
                }`}
                onClick={() => setExpandedCard(expandedCard === cert.id ? null : cert.id)}
              >
                {/* Gradient background with section colors */}
                <div className={`absolute inset-0 bg-gradient-to-br ${currentSection.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-2xl">{cert.icon}</div>
                    <div className="flex flex-col items-end space-y-1">
                      <div className="text-xs text-gray-400 bg-gray-500/20 px-2 py-1 rounded-full">
                        {cert.date}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${getLevelColor(cert.level)}`}>
                        {cert.level}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className={`${getTextClass()} text-sm font-semibold mb-1 group-hover:text-blue-400 transition-colors leading-tight`}>
                    {cert.title}
                  </h3>
                  <p className={`${getSecondaryTextClass()} text-xs mb-3`}>
                    {cert.issuer}
                  </p>
                  
                  {expandedCard === cert.id && (
                    <div className="mt-3 pt-3 border-t border-gray-500/20">
                      <p className={`${getSecondaryTextClass()} text-xs mb-3`}>
                        Comprehensive course covering essential concepts and practical applications in {cert.title.toLowerCase()}.
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-blue-500 text-xs font-medium">View Certificate</span>
                    <svg className="w-3 h-3 text-blue-500 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Dynamic Grid Layout */}
          <div className={`hidden lg:grid gap-3 h-auto lg:h-[320px]`} style={{ gridTemplateColumns: `repeat(${desktopLayout.columns}, 1fr)` }}>
            {Array.from({ length: desktopLayout.columns }, (_, columnIndex) => (
              <div key={columnIndex} className="flex flex-col gap-3">
                {getCoursesForColumn(columnIndex).map((cert) => (
                  <div 
                    key={cert.id}
                    className={`${getCardBackground()} ${getCardBackgroundHover()} border backdrop-blur-lg p-3 rounded-lg transition-all duration-300 hover:shadow-lg cursor-pointer group flex-1 relative overflow-hidden`}
                  >
                    {/* Gradient background with section colors */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${currentSection.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-2">
                        <div className="text-xl">{cert.icon}</div>
                        <div className="flex flex-col items-end space-y-1">
                          <div className="text-xs text-gray-400 bg-gray-500/20 px-2 py-1 rounded-full">
                            {cert.date}
                          </div>
                          <div className={`text-xs px-2 py-1 rounded-full ${getLevelColor(cert.level)}`}>
                            {cert.level}
                          </div>
                        </div>
                      </div>
                      <h3 className={`${getTextClass()} text-sm font-semibold mb-1 group-hover:text-blue-400 transition-colors`}>
                        {cert.title}
                      </h3>
                      <p className={`${getSecondaryTextClass()} text-xs mb-2`}>
                        {cert.issuer}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-500 text-xs font-medium">View Certificate</span>
                        <svg className="w-3 h-3 text-blue-500 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Progress Indicator */}
        <div className="mt-8 text-center">
          <div className="flex justify-center items-center space-x-2 mb-2">
            {sectionTabs.map((sectionKey, index) => (
              <div
                key={sectionKey}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeSection === sectionKey
                    ? `bg-gradient-to-r ${certificateSections[sectionKey].color} w-8`
                    : 'bg-gray-400/50 w-2'
                }`}
              />
            ))}
          </div>
          <p className={`${getSecondaryTextClass()} text-sm`}>
            {Object.keys(certificateSections).indexOf(activeSection) + 1} of {sectionTabs.length} sections • 
            <span className="text-blue-500 font-medium ml-1">
              {currentSection.courses.length + 1} certificates
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;