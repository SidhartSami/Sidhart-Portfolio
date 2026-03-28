import { useState, useEffect } from 'react'; 
 import { useTheme } from 'next-themes'; 
 import { Github, ExternalLink, ShieldCheck, Calendar, Layout, Gamepad2, BrainCircuit } from 'lucide-react'; 
 import { motion } from 'framer-motion'; 
  
 const SectionHeading = ({ title }) => { 
   return ( 
     <div className="relative mb-16 text-left"> 
       <span className="heading-background-text left-[-20px] translate-x-0 uppercase">WORK</span> 
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
  
 const Projects = ({ projectsRef }) => { 
   const { resolvedTheme } = useTheme(); 
    
   const projects = [ 
     { 
       id: 8, 
       title: "SecureNet-App", 
       description: "AI-powered Network Intrusion Detection System. Features 90+ accuracy, live packet capture, and interactive React dashboard.", 
       technologies: ["Python", "FastAPI", "React", "scikit-learn"], 
       category: "AI & Cybersecurity", 
       github: "https://github.com/SidhartSami/SecureNet-App", 
       icon: <ShieldCheck className="w-6 h-6" />, 
       featured: true, 
       hasGithub: true, 
       hasLive: false, 
     }, 
     { 
       id: 5, 
       title: "NUCES Timetable", 
       description: "Intelligent web app to generate optimized timetables based on course and time preferences.", 
       technologies: ["Python", "Pandas", "Streamlit"], 
       category: "Data Automation", 
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
       description: "Brand-focused e-commerce for 'Ozone'. Features clean modern UI and responsive design.", 
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
       description: "Classic arcade-style Centipede game built with C++ and SFML graphics library.", 
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
       description: "Interactive Sudoku solver that visualizes backtracking algorithms in real-time.", 
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
     <section ref={projectsRef} className="scroll-mt-28 py-12" data-section="projects"> 
       <div className="max-w-7xl mx-auto px-6"> 
         <SectionHeading title="Projects" /> 
  
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
           {projects.map((project, idx) => { 
             return ( 
               <motion.div 
                 key={project.id} 
                 initial={{ opacity: 0, y: 20 }} 
                 whileInView={{ opacity: 1, y: 0 }} 
                 viewport={{ once: true }} 
                 transition={{ delay: idx * 0.1 }} 
                 className="group relative rounded-[1.5rem] border border-[var(--color-border)] p-6 flex flex-col transition-all duration-500 overflow-hidden" 
                 style={{ backgroundColor: 'var(--color-surface)' }} 
                 whileHover={{  
                   y: -5, 
                   boxShadow: '0 15px 30px rgba(29, 185, 160, 0.08)', 
                   borderColor: 'rgba(29, 185, 160, 0.3)' 
                 }} 
               > 
                 <div className="relative z-10 flex flex-col h-full"> 
                   <div className="flex items-center justify-between mb-6"> 
                     <div className="p-2 rounded-lg bg-[var(--color-surface-2)] text-[var(--color-primary)] border border-[var(--color-border)] group-hover:scale-110 transition-transform"> 
                       {project.icon} 
                     </div> 
                     <div className="flex gap-2"> 
                       {project.hasGithub && ( 
                         <a href={project.github} target="_blank" rel="noreferrer" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"> 
                           <Github className="w-4 h-4" /> 
                         </a> 
                       )} 
                       {project.hasLive && ( 
                         <a href={project.live} target="_blank" rel="noreferrer" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"> 
                           <ExternalLink className="w-4 h-4" /> 
                         </a> 
                       )} 
                     </div> 
                   </div> 
  
                   <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--color-primary)] transition-colors" style={{ color: 'var(--color-text)' }}> 
                     {project.title} 
                   </h3> 
  
                   <p className="text-sm leading-relaxed mb-6 flex-grow" style={{ color: 'var(--color-text-muted)' }}> 
                     {project.description} 
                   </p> 
  
                   <div className="flex flex-wrap gap-2 mt-auto"> 
                     {project.technologies.map(tech => ( 
                       <span key={tech} className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-muted)]"> 
                         {tech} 
                       </span> 
                     ))} 
                   </div> 
                 </div> 
               </motion.div> 
             ); 
           })} 
         </div> 
       </div> 
     </section> 
   ); 
 }; 
  
 export default Projects; 
