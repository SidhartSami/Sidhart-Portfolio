import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

const SectionHeading = ({ title }) => {
  return (
    <div className="relative mb-20">
      <span className="heading-background-text uppercase">Skills</span>
      <h2 className="text-4xl md:text-6xl font-bold relative z-10 section-heading-teal-bar">
        {title}<span style={{ color: 'var(--color-primary)' }}>.</span>
      </h2>
    </div>
  );
};

const SkillCard = ({ name, icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5, borderColor: 'var(--color-primary)', boxShadow: '0 10px 30px rgba(29, 185, 160, 0.1)' }}
      className="flex flex-col items-center justify-center p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-300 group"
    >
      <div className="w-12 h-12 mb-4 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
        <img 
          src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}`} 
          alt={name}
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.src = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'; // Fallback
          }}
        />
      </div>
      <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors">
        {name}
      </span>
    </motion.div>
  );
};

export default function Skills({ skillsRef }) {
  const skillGroups = [
    {
      category: "Languages",
      skills: [
        { name: "Python", icon: "python/python-original.svg" },
        { name: "C++", icon: "cplusplus/cplusplus-original.svg" },
        { name: "JavaScript", icon: "javascript/javascript-original.svg" },
        { name: "C", icon: "c/c-original.svg" },
        { name: "MySQL", icon: "mysql/mysql-original.svg" },
        { name: "R", icon: "r/r-original.svg" },
      ]
    },
    {
      category: "Data Science & AI",
      skills: [
        { name: "Pandas", icon: "pandas/pandas-original.svg" },
        { name: "NumPy", icon: "numpy/numpy-original.svg" },
        { name: "TensorFlow", icon: "tensorflow/tensorflow-original.svg" },
        { name: "Scikit-Learn", icon: "scikitlearn/scikitlearn-original.svg" },
        { name: "Matplotlib", icon: "python/python-original.svg" },
        { name: "Tableau", icon: "python/python-original.svg" },
      ]
    },
    {
      category: "Web & Tools",
      skills: [
        { name: "React", icon: "react/react-original.svg" },
        { name: "Next.js", icon: "nextjs/nextjs-original.svg" },
        { name: "Tailwind", icon: "tailwindcss/tailwindcss-original-wordmark.svg" },
        { name: "Git", icon: "git/git-original.svg" },
        { name: "Docker", icon: "docker/docker-original.svg" },
        { name: "VS Code", icon: "vscode/vscode-original.svg" },
      ]
    }
  ];

  return (
    <section ref={skillsRef} className="scroll-mt-28" data-section="skills">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="Technical Toolkit" />
        
        <div className="space-y-20">
          {skillGroups.map((group, groupIdx) => (
            <div key={group.category} className="space-y-8">
              <div className="flex items-center gap-4">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
                  {group.category}
                </h3>
                <div className="flex-1 h-px bg-[var(--color-border)]"></div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {group.skills.map((skill, skillIdx) => (
                  <SkillCard 
                    key={skill.name} 
                    name={skill.name} 
                    icon={skill.icon} 
                    index={skillIdx + (groupIdx * 6)} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
