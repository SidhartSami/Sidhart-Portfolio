import { motion } from "framer-motion";

export default function AboutSection({ aboutRef }) {
  const skills = [
    { name: "Python", icon: "python/python-original.svg" },
    { name: "C++", icon: "cplusplus/cplusplus-original.svg" },
    { name: "JavaScript", icon: "javascript/javascript-original.svg" },
    { name: "React", icon: "react/react-original.svg" },
    { name: "Next.js", icon: "nextjs/nextjs-original.svg" },
    { name: "Tailwind", icon: "tailwindcss/tailwindcss-original.svg" },
    { name: "TensorFlow", icon: "tensorflow/tensorflow-original.svg" },
    { name: "Pandas", icon: "pandas/pandas-original.svg" },
    { name: "NumPy", icon: "numpy/numpy-original.svg" },
    { name: "MySQL", icon: "mysql/mysql-original.svg" },
    { name: "Git", icon: "git/git-original.svg" },
    { name: "Docker", icon: "docker/docker-original.svg" },
  ];

  const SkillItem = ({ skill }) => (
    <div className="flex items-center gap-4 px-8 py-4 mx-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl group hover:border-[var(--color-primary)] transition-colors">
      <img 
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}`} 
        alt={skill.name}
        className="w-8 h-8 object-contain grayscale group-hover:grayscale-0 transition-all"
      />
      <span className="text-lg font-bold uppercase tracking-widest text-[var(--color-text-muted)] group-hover:text-[var(--color-text)]">
        {skill.name}
      </span>
    </div>
  );

  return (
    <section id="about" ref={aboutRef} className="scroll-mt-28 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Large Background Heading */}
        <div className="relative mb-32 text-center">
          <span className="heading-background-text left-1/2 -translate-x-1/2">ABOUT</span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold relative z-10 leading-tight tracking-tight"
          >
            A technical mind with a <br />
            <span style={{ color: 'var(--color-primary)' }}>creative soul.</span>
          </motion.h2>
        </div>

        {/* Central Quote Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-40 text-center"
        >
          <div className="relative inline-block">
            <span className="absolute -top-10 -left-10 text-9xl text-[var(--color-primary)] opacity-10 font-serif">&ldquo;</span>
            <p className="text-2xl md:text-4xl lg:text-5xl font-light italic leading-relaxed text-[var(--color-text)]">
              I don&apos;t just build systems; I craft digital experiences that balance <span className="text-[var(--color-primary)] font-medium">technical precision</span> with <span className="text-[var(--color-secondary)] font-medium">human intuition</span>.
            </p>
            <span className="absolute -bottom-20 -right-10 text-9xl text-[var(--color-primary)] opacity-10 font-serif">&rdquo;</span>
          </div>
        </motion.div>

        {/* Scrolling Skill Marquees */}
        <div className="space-y-8 -mx-6">
          <div className="marquee-container">
            <div className="flex animate-marquee-left">
              {[...skills, ...skills].map((skill, idx) => (
                <SkillItem key={`l1-${idx}`} skill={skill} />
              ))}
            </div>
          </div>
          
          <div className="marquee-container">
            <div className="flex animate-marquee-right">
              {[...skills, ...skills].reverse().map((skill, idx) => (
                <SkillItem key={`l2-${idx}`} skill={skill} />
              ))}
            </div>
          </div>

          <div className="marquee-container">
            <div className="flex animate-marquee-left">
              {[...skills, ...skills].map((skill, idx) => (
                <SkillItem key={`l3-${idx}`} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
