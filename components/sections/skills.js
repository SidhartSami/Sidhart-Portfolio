import { motion } from 'framer-motion';

const skills = [
  { name: "Python", icon: "python/python-original.svg" },
  { name: "C++", icon: "cplusplus/cplusplus-original.svg" },
  { name: "JavaScript", icon: "javascript/javascript-original.svg" },
  { name: "React", icon: "react/react-original.svg" },
  { name: "Next.js", icon: "nextjs/nextjs-original.svg" },
  { name: "Flutter", icon: "flutter-original.jpg", local: true },
  { name: "Kotlin", icon: "Kotlin-original.png", local: true },
  { name: "Tailwind", icon: "tailwindcss/tailwindcss-original.svg" },
  { name: "TensorFlow", icon: "tensorflow/tensorflow-original.svg" },
  { name: "Pandas", icon: "pandas/pandas-original.svg" },
  { name: "NumPy", icon: "numpy/numpy-original.svg" },
  { name: "MySQL", icon: "mysql/mysql-original.svg" },
  { name: "Git", icon: "git/git-original.svg" },
];

const SkillItem = ({ skill }) => (
  <div className="marquee-item group">
    <img 
      src={skill.local ? `/${skill.icon}` : `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}`} 
      alt={skill.name}
      className="marquee-icon transition-all"
    />
    <span className="marquee-text text-[var(--color-text)]">{skill.name}</span>
  </div>
);

export default function Skills() {
  const firstRow = skills.slice(0, Math.ceil(skills.length / 2));
  const secondRow = skills.slice(Math.ceil(skills.length / 2));

  return (
    <div className="py-0 overflow-hidden">
      <div className="flex flex-col gap-0 relative">
        <div className="marquee-container bg-transparent border-none py-2 shadow-none">
          <div className="flex animate-marquee-left">
            {[...firstRow, ...firstRow, ...firstRow, ...firstRow].map((skill, idx) => (
              <SkillItem key={`l1-${idx}`} skill={skill} />
            ))}
          </div>
        </div>
        
        <div className="marquee-container bg-transparent border-none py-2 shadow-none">
          <div className="flex animate-marquee-right">
            {[...secondRow, ...secondRow, ...secondRow, ...secondRow].map((skill, idx) => (
              <SkillItem key={`l2-${idx}`} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
