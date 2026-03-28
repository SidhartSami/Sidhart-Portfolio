import { useState } from 'react';
import { BadgeCheck, ExternalLink, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SectionHeading = ({ title }) => {
  return (
    <div className="relative mb-20 text-center">
      <span className="heading-background-text left-1/2 -translate-x-1/2">LEARN</span>
      <h2 className="text-4xl md:text-6xl font-bold relative z-10">
        {title}<span style={{ color: 'var(--color-primary)' }}>.</span>
      </h2>
    </div>
  );
};

const CertificationsSection = ({ certificationsRef }) => {
  const certificateSections = {
    'data-analytics': {
      title: 'Google Advanced Data Analytics',
      courses: [
        { id: 26, title: "Foundations of Data Science", level: "Beginner" },
        { id: 27, title: "Get Started with Python", level: "Beginner" },
        { id: 28, title: "Go Beyond the Numbers", level: "Intermediate" },
        { id: 29, title: "The Power of Statistics", level: "Intermediate" },
        { id: 30, title: "Regression Analysis", level: "Advanced" },
        { id: 31, title: "Nuts and Bolts of ML", level: "Advanced" },
      ]
    },
    'data-science': {
      title: 'IBM Data Science',
      courses: [
        { id: 1, title: "What is Data Science?", level: "Beginner" },
        { id: 2, title: "Tools for Data Science", level: "Beginner" },
        { id: 3, title: "Data Science Methodology", level: "Intermediate" },
        { id: 4, title: "Python for AI & Dev", level: "Intermediate" },
        { id: 7, title: "Data Analysis with Python", level: "Advanced" },
        { id: 9, title: "Machine Learning with Python", level: "Advanced" },
      ]
    },
  };

  const [activeTab, setActiveTab] = useState('data-analytics');

  return (
    <section ref={certificationsRef} className="scroll-mt-28 py-20" data-section="certifications">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="Certifications" />
        
        <div className="flex flex-col items-center">
          {/* Compact Tabs */}
          <div className="flex p-1.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl mb-12">
            {Object.keys(certificateSections).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === key 
                    ? 'bg-[var(--color-primary)] text-black shadow-lg shadow-[var(--color-glow)]' 
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                }`}
              >
                {key.replace('-', ' ').toUpperCase()}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {certificateSections[activeTab].courses.map((course) => (
                <div 
                  key={course.id}
                  className="group p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/40 transition-all flex items-center gap-4"
                >
                  <div className="p-3 rounded-xl bg-[var(--color-bg)] text-[var(--color-primary)] group-hover:scale-110 transition-transform">
                    <BadgeCheck className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-[var(--color-text)] truncate group-hover:text-[var(--color-primary)] transition-colors">
                      {course.title}
                    </h4>
                    <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
                      {course.level}
                    </span>
                  </div>
                </div>
              ))}
              
              {/* Full Specialization Card */}
              <div className="md:col-span-2 lg:col-span-3 mt-4 p-6 rounded-3xl border border-[var(--color-primary)]/30 bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-bg)] flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5 text-center md:text-left">
                  <div className="p-4 rounded-2xl bg-[var(--color-primary)] text-black">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--color-text)]">
                      {certificateSections[activeTab].title} Professional Certificate
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)]">Verified Professional Specialization</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] text-sm font-bold text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all">
                  Verify Certificate <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
