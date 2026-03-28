import { motion } from "framer-motion";
import { CheckCircle2, Clock, Home } from "lucide-react";

export default function AboutSection({ aboutRef }) {
  const skillCategories = [
    {
      title: "Expert",
      icon: <CheckCircle2 className="w-5 h-5" />,
      iconColor: 'var(--color-primary)',
      skills: ["Flutter", "Kotlin", "C/C++", "HTML", "CSS", "MySQL", "JavaScript", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn", "Tableau", "MATLAB", "OOP", "Git/GitHub"]
    },
    {
      title: "Moderate",
      icon: <Clock className="w-5 h-5" />,
      iconColor: '#EAB308',
      skills: ["Python", "SFML", "Streamlit"]
    },
    {
      title: "Learning",
      icon: <Home className="w-5 h-5" />,
      iconColor: 'var(--color-secondary)',
      skills: ["R", "TensorFlow", "React", "Next.js"]
    }
  ];

  return (
    <section id="about" ref={aboutRef} className="scroll-mt-28 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header - Left Aligned with Watermark */}
        <div className="relative mb-16 text-left">
          <span className="heading-background-text left-[-20px] translate-x-0">ABOUT</span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold relative z-10 leading-tight tracking-tight section-heading-teal-bar"
          >
            About Me<span style={{ color: 'var(--color-primary)' }}>.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          {/* Left Side: Bio & Learning-Incline Quote */}
          <div className="md:col-span-7 space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 text-xl md:text-2xl leading-relaxed font-light text-[var(--color-text-muted)]"
            >
              <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-[var(--color-primary)] first-letter:mr-3 first-letter:float-left">
                Hey! I&apos;m Sidhart Sami, a Computer Science student at FAST NUCES, set to graduate in 2027. I&apos;m passionate about Data Science and transforming complex datasets into actionable insights that solve real-world problems.
              </p>
              <p>
                Certified in Data Science by IBM and Google&apos;s Advanced Data Analytics, I&apos;ve grown from struggling with code to confidently helping friends debug complex issues. My love for gaming led me to build several games as semester projects, shaping my technical and creative skills.
              </p>
              
              {/* Elegant Learning Quote */}
              <div className="relative mt-16">
                <div className="relative z-10">
                  <span className="text-7xl md:text-8xl font-serif text-[var(--color-primary)] opacity-10 absolute -top-12 -left-8 pointer-events-none">&ldquo;</span>
                  <p className="text-2xl md:text-3xl lg:text-4xl font-light italic text-[var(--color-text)] leading-[1.4] tracking-tight">
                    The best way to learn to code is to <span className="text-[var(--color-primary)] font-medium not-italic">code</span>. The second best way is to learn from the people who are better than you.
                  </p>
                  <div className="flex items-center gap-6 mt-10">
                    <div className="h-px w-16 bg-gradient-to-r from-[var(--color-primary)] to-transparent"></div>
                    <div className="flex flex-col">
                      <span className="text-sm font-black uppercase tracking-[0.3em] text-[var(--color-primary)]">
                        Chris Wanstrath
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] mt-1 font-bold">
                        Co-founder of GitHub
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Technical Toolkit */}
          <div className="md:col-span-5 space-y-8 bg-[var(--color-surface)] p-8 md:p-12 rounded-[2.5rem] border border-[var(--color-border)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)] opacity-[0.03] blur-3xl group-hover:opacity-[0.08] transition-opacity"></div>
            
            <h3 className="text-3xl font-bold mb-10 flex items-center gap-3">
              <span className="w-8 h-1 bg-[var(--color-primary)] rounded-full"></span>
              Technical Toolkit
            </h3>

            {skillCategories.map((category) => (
              <div key={category.title} className="space-y-4">
                <div className="flex items-center gap-3">
                  <span style={{ color: category.iconColor }}>{category.icon}</span>
                  <span className="text-xs uppercase tracking-widest font-bold opacity-50">{category.title}</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-4 py-2 rounded-xl border text-sm transition-all duration-300 hover:border-[var(--color-primary)] hover:text-[var(--color-text)]"
                      style={{ 
                        backgroundColor: 'var(--color-surface-2)', 
                        borderColor: 'transparent',
                        color: 'var(--color-text-muted)' 
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
