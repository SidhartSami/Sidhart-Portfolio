import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { BadgeCheck, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const SectionHeading = ({ title }) => {
  return (
    <div className="relative mb-16 text-left">
      <span className="heading-background-text left-[-20px] translate-x-0 uppercase">Certificates</span>
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

const CertificationsSection = ({ certificationsRef }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const certificateSections = {
    'data-analytics': {
      title: 'Google Advance Data Analytics',
      icon: <BadgeCheck className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500',
      courses: [
        { id: 26, title: "Foundations of Data Science", issuer: "Google", date: "2025", level: "Beginner" },
        { id: 27, title: "Get Started with Python", issuer: "Google", date: "2025", level: "Beginner" },
        { id: 28, title: "Go Beyond the Numbers: Translate Data into Insights", issuer: "Google", date: "2025", level: "Intermediate" },
        { id: 29, title: "The Power of Statistics", issuer: "Google", date: "2025", level: "Intermediate" },
        { id: 30, title: "Regression Analysis: Simplify Complex Data Relationships", issuer: "Google", date: "2025", level: "Advanced" },
        { id: 31, title: "The Nuts and Bolts of Machine Learning", issuer: "Google", date: "2025", level: "Advanced" },
        { id: 32, title: "Advanced Data Analytics Capstone", issuer: "Google", date: "2025", level: "Advanced" },
        { id: 33, title: "Accelerate Job Search with AI", issuer: "Google", date: "2025", level: "Intermediate" }
      ],
      professional: {
        id: 34, title: "Google Advance Data Analytics Professional Certificate", issuer: "Google", date: "2025", 
        description: "Professional Certificate - Complete 8-course series covering data science methodology, Python programming, machine learning, and real-world capstone projects"
      }
    },
    'data-science': {
      title: 'IBM Data Science',
      icon: <BadgeCheck className="w-5 h-5" />,
      color: 'from-green-500 to-teal-500',
      courses: [
        { id: 1, title: "What is Data Science?", issuer: "IBM", date: "2025", level: "Beginner" },
        { id: 2, title: "Tools for Data Science", issuer: "IBM", date: "2025", level: "Beginner" },
        { id: 3, title: "Data Science Methodology", issuer: "IBM", date: "2025", level: "Intermediate" },
        { id: 4, title: "Python for Data Science, AI & Development", issuer: "IBM", date: "2025", level: "Intermediate" },
        { id: 5, title: "Python Project for Data Science", issuer: "IBM", date: "2025", level: "Intermediate" },
        { id: 6, title: "Databases and SQL for Data Science", issuer: "IBM", date: "2025", level: "Intermediate" },
        { id: 7, title: "Data Analysis with Python", issuer: "IBM", date: "2025", level: "Advanced" },
        { id: 8, title: "Data Visualization with Python", issuer: "IBM", date: "2025", level: "Advanced" },
        { id: 9, title: "Machine Learning with Python", issuer: "IBM", date: "2025", level: "Advanced" },
        { id: 10, title: "Applied Data Science Capstone", issuer: "IBM", date: "2025", level: "Advanced" },
        { id: 11, title: "Generative AI: Elevate Your Data Science Career", issuer: "IBM", date: "2025", level: "Intermediate" },
        { id: 12, title: "Career Guide & Interview Prep", issuer: "IBM", date: "2025", level: "Intermediate" },
      ],
      professional: {
        id: 13, title: "IBM Data Science Professional Certificate", issuer: "IBM", date: "2025", 
        description: "Professional Certificate - Complete 12-course series covering data science methodology, Python programming, machine learning, and real-world capstone projects"
      }
    },
  };

  const [activeSection, setActiveSection] = useState('data-analytics');

  const currentSection = certificateSections[activeSection];
  const sectionTabs = Object.keys(certificateSections);

  const getLevelColor = (level) => {
    switch(level) {
      case 'Beginner': return 'text-[var(--color-primary)] border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5';
      case 'Intermediate': return 'text-yellow-500 border-yellow-500/20 bg-yellow-500/5';
      case 'Advanced': return 'text-[var(--color-secondary)] border-[var(--color-secondary)]/20 bg-[var(--color-secondary)]/5';
      default: return 'text-gray-500 border-gray-500/20 bg-gray-500/5';
    }
  };

  return (
    <section ref={certificationsRef} className="scroll-mt-28 py-12" data-section="certifications">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="Certifications" />
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Left: Navigation Tabs */}
          <div className="md:col-span-4 space-y-4">
            {sectionTabs.map((sectionKey) => {
              const section = certificateSections[sectionKey];
              const isActive = activeSection === sectionKey;
              return (
                <button
                  key={sectionKey}
                  onClick={() => setActiveSection(sectionKey)}
                  className={`w-full flex flex-col items-start p-6 rounded-2xl border transition-all duration-500 group relative overflow-hidden ${
                    isActive ? 'border-[var(--color-primary)]' : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/40'
                  }`}
                  style={{ backgroundColor: isActive ? 'var(--color-surface-2)' : 'var(--color-surface)' }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span style={{ color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>{section.icon}</span>
                    <span className={`text-sm font-bold uppercase tracking-widest ${isActive ? 'text-[var(--color-text)]' : 'text-[var(--color-text-muted)]'}`}>
                      {sectionKey.replace('-', ' ')}
                    </span>
                  </div>
                  <h3 className={`text-lg font-bold text-left leading-tight ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}`}>
                    {section.title}
                  </h3>
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shadow-[0_0_10px_var(--color-primary)]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Content Area */}
          <div className="md:col-span-8 space-y-8">
            {/* Professional Certificate - Hero Card */}
            <motion.div
              key={activeSection + '-pro'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 md:p-10 rounded-[2rem] border border-[var(--color-primary)]/20 relative overflow-hidden group"
              style={{ backgroundColor: 'var(--color-surface)' }}
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <BadgeCheck className="w-24 h-24 text-[var(--color-primary)]" />
              </div>
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[var(--color-primary)] text-[var(--color-bg)]">
                    Professional Specialization
                  </span>
                  <span className="text-xs font-medium opacity-40">{currentSection.professional.date}</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: 'var(--color-text)' }}>
                  {currentSection.professional.title}
                </h3>
                
                <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--color-text-muted)' }}>
                  {currentSection.professional.description}
                </p>
                
                <div className="flex items-center gap-6 pt-4">
                  <button className="flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] hover:opacity-80 transition-opacity">
                    Verify Credential <ExternalLink className="w-4 h-4" />
                  </button>
                  <div className="h-4 w-px bg-[var(--color-border)]"></div>
                  <span className="text-sm font-medium opacity-40">Issuer: {currentSection.professional.issuer}</span>
                </div>
              </div>
            </motion.div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentSection.courses.map((cert, idx) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-5 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-all duration-300 group"
                  style={{ backgroundColor: 'var(--color-surface)' }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border uppercase tracking-wider ${getLevelColor(cert.level)}`}>
                      {cert.level}
                    </span>
                    <BadgeCheck className="w-4 h-4 text-[var(--color-primary)] opacity-20 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="font-bold text-sm leading-snug mb-2 group-hover:text-[var(--color-text)] transition-colors" style={{ color: 'var(--color-text-muted)' }}>
                    {cert.title}
                  </h4>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-[10px] opacity-30 font-medium">{cert.issuer} • {cert.date}</span>
                    <button className="text-[10px] font-bold text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                      VIEW
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
