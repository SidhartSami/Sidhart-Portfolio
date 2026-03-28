import { Github, ExternalLink, ShieldCheck, Calendar, Layout, Gamepad2, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';

const SectionHeading = ({ title }) => {
  return (
    <div className="relative mb-20 text-center">
      <span className="heading-background-text left-1/2 -translate-x-1/2">WORK</span>
      <h2 className="text-4xl md:text-6xl font-bold relative z-10">
        {title}<span style={{ color: 'var(--color-primary)' }}>.</span>
      </h2>
    </div>
  );
};

const Projects = ({ projectsRef }) => {
  const projects = [
    {
      id: 8,
      title: "SecureNet-App",
      description: "AI-powered Network Intrusion Detection System with 90+ accuracy and live packet capture.",
      technologies: ["Python", "FastAPI", "React", "scikit-learn"],
      category: "Cybersecurity",
      github: "https://github.com/SidhartSami/SecureNet-App",
      icon: <ShieldCheck className="w-6 h-6" />,
      featured: true,
      hasGithub: true,
      hasLive: false,
    },
    {
      id: 5,
      title: "NUCES Timetable",
      description: "Intelligent timetable generator for NUCES students based on custom preferences.",
      technologies: ["Python", "Pandas", "Streamlit"],
      category: "Automation",
      github: "https://github.com/SidhartSami/FAST-NUCES-TimeTable",
      live: "https://nucestimetable.streamlit.app/",
      icon: <Calendar className="w-6 h-6" />,
      featured: true,
      hasGithub: true,
      hasLive: true,
    },
    {
      id: 1,
      title: "Ozone E-Commerce",
      description: "Modern e-commerce UI for a premium clothing label with responsive design.",
      technologies: ["HTML", "CSS", "JS"],
      category: "Web Design",
      github: "https://github.com/SidhartSami/Ecommerce-Website_IICT",
      live: "https://sidhartsami.github.io/Ecommerce-Website_IICT/",
      icon: <Layout className="w-6 h-6" />,
      featured: false,
      hasGithub: true,
      hasLive: true,
    },
    {
      id: 2,
      title: "Centipede Arcade",
      description: "Classic arcade game reimagined with C++ and SFML graphics library.",
      technologies: ["C++", "SFML"],
      category: "Game Dev",
      github: "https://github.com/SidhartSami/Centipede_PF",
      icon: <Gamepad2 className="w-6 h-6" />,
      featured: false,
      hasGithub: true,
      hasLive: false,
    },
    {
      id: 7,
      title: "Sudoku Solver",
      description: "Visualizer for backtracking algorithms solving Sudoku in real-time.",
      technologies: ["JS", "Algorithm"],
      category: "Visualization",
      github: "https://github.com/SidhartSami/SudokoSolver_TOA",
      icon: <BrainCircuit className="w-6 h-6" />,
      featured: false,
      hasGithub: true,
      hasLive: false,
    }
  ];

  return (
    <section ref={projectsRef} className="scroll-mt-28 py-20" data-section="projects">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="Selected Work" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`group relative rounded-3xl border border-[var(--color-border)] p-8 flex flex-col transition-all duration-500 hover:border-[var(--color-primary)]/50 hover:shadow-2xl hover:shadow-[var(--color-glow)] bg-[var(--color-surface)] ${
                project.featured && idx < 2 ? 'md:col-span-1 lg:col-span-1' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-2xl bg-[var(--color-bg)] text-[var(--color-primary)] border border-[var(--color-border)] group-hover:scale-110 transition-transform">
                  {project.icon}
                </div>
                <div className="flex gap-2">
                  {project.hasGithub && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="p-2 rounded-xl hover:bg-[var(--color-surface-2)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-all">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {project.hasLive && (
                    <a href={project.live} target="_blank" rel="noreferrer" className="p-2 rounded-xl hover:bg-[var(--color-surface-2)] text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] transition-all">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                {project.title}
              </h3>

              <p className="text-sm leading-relaxed text-[var(--color-text-muted)] mb-8 line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.technologies.slice(0, 3).map(tech => (
                  <span key={tech} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
