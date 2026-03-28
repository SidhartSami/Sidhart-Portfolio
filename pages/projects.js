import { useState, useEffect } from 'react'; 
 import { useTheme } from 'next-themes'; 
 import { Github, ExternalLink, ShieldCheck, Trophy, Layout, Smartphone, Lock, Play } from 'lucide-react'; 
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
       id: 1, 
       title: "WalkOver", 
       description: "A published Android fitness app that turns daily walks into a competitive social experience. Features real-time GPS tracking, territory claiming, and global leaderboards. Built with a custom GPS polygon system.", 
       technologies: ["Kotlin", "Jetpack Compose", "Firebase", "Google Maps", "MVVM"], 
       category: "Android App", 
       github: "https://github.com/SidhartSami/WalkOver", 
       live: "https://play.google.com/store/apps/details?id=com.sidhart.walkover&hl=en", 
       icon: <Trophy className="w-6 h-6" />, 
       featured: true, 
       hasGithub: true, 
       hasLive: true, 
       liveLabel: "Play Store",
       isPrivate: false,
     }, 
     { 
       id: 2, 
       title: "SecureNet", 
       description: "ML-powered Network Intrusion Detection System that classifies traffic in real-time using a Random Forest classifier. Achieved 90%+ accuracy on NSL-KDD dataset. Features a custom Electron monitoring dashboard.", 
       technologies: ["Python", "Random Forest", "FastAPI", "Electron", "scikit-learn"], 
       category: "Machine Learning", 
       github: "https://github.com/SidhartSami/SecureNet-App", 
       icon: <ShieldCheck className="w-6 h-6" />, 
       featured: true, 
       hasGithub: true, 
       hasLive: false, 
       isPrivate: false,
     }, 
     { 
       id: 3, 
       title: "Budsy", 
       description: "A Flutter social companion app featuring modular, composable profile widgets. Reimagines digital identity through dynamic blocks representing personality and interests. Supports real-time updates and social feeds.", 
       technologies: ["Flutter", "Dart", "Firebase", "Modular Design"], 
       category: "Mobile Design", 
       github: "https://github.com/SidhartSami/Budsy", 
       icon: <Smartphone className="w-6 h-6" />, 
       featured: true, 
       hasGithub: true, 
       hasLive: false, 
       isPrivate: false,
     }, 
     { 
       id: 4, 
       title: "HBL PSL", 
       description: "A complete cricket platform for HBL PSL fans. Features live scorecards, ball-by-ball commentary, and real-time FCM notifications. Built with a custom Node.js scraper and PostgreSQL backend.", 
       technologies: ["Next.js", "Flutter", "TypeScript", "PostgreSQL", "Firebase FCM"], 
       category: "Full Stack", 
       github: "https://github.com/SidhartSami/__HBL_PSL__", 
       live: "https://hblpsl.com", 
       icon: <Layout className="w-6 h-6" />, 
       featured: true, 
       hasGithub: true, 
       hasLive: true, 
       liveLabel: "Live Site",
       isPrivate: true,
     } 
   ]; 
  
   return ( 
     <section ref={projectsRef} className="scroll-mt-28 py-12" data-section="projects"> 
       <div className="max-w-7xl mx-auto px-6"> 
         <SectionHeading title="Projects" /> 
  
         <div className="grid grid-cols-1 md:grid-cols-2 gap-10"> 
           {projects.map((project, idx) => { 
             return ( 
               <motion.div 
                 key={project.id} 
                 initial={{ opacity: 0, y: 20 }} 
                 whileInView={{ opacity: 1, y: 0 }} 
                 viewport={{ once: true }} 
                 transition={{ delay: idx * 0.1 }} 
                 className="group relative rounded-[2rem] border border-[var(--color-border)] p-10 flex flex-col transition-all duration-500 overflow-hidden min-h-[420px]" 
                 style={{ backgroundColor: 'var(--color-surface)' }} 
                 whileHover={{  
                   y: -10, 
                   boxShadow: '0 25px 50px -12px rgba(29, 185, 160, 0.15)', 
                   borderColor: 'rgba(29, 185, 160, 0.4)' 
                 }} 
               > 
                 <div className="relative z-10 flex flex-col h-full"> 
                   <div className="flex items-center justify-between mb-10"> 
                     <div className="p-4 rounded-2xl bg-[var(--color-surface-2)] text-[var(--color-primary)] border border-[var(--color-border)] group-hover:scale-110 transition-transform shadow-sm"> 
                       {project.icon} 
                     </div> 
                     <div className="flex items-center gap-4"> 
                       {project.isPrivate && (
                         <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-widest">
                           <Lock className="w-3 h-3" />
                           Private
                         </div>
                       )}
                       {project.hasGithub && ( 
                         <a 
                           href={project.isPrivate ? '#' : project.github} 
                           target={project.isPrivate ? '_self' : '_blank'} 
                           rel="noreferrer" 
                           className={`p-2 rounded-full transition-all ${project.isPrivate ? 'opacity-30 cursor-not-allowed grayscale' : 'hover:bg-[var(--color-surface-2)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)]'}`}
                           onClick={(e) => project.isPrivate && e.preventDefault()}
                         > 
                           <Github className="w-6 h-6" /> 
                         </a> 
                       )} 
                       {project.hasLive && ( 
                         <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center gap-2 p-2 rounded-full bg-[var(--color-surface-2)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-all border border-[var(--color-border)] hover:border-[var(--color-primary)]/30" title={project.liveLabel}> 
                           {project.liveLabel === "Play Store" ? (
                             <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                               <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L18.65,14.06C21.45,12.45 21.45,9.58 18.65,7.97L16.81,6.91L14.39,12L16.81,15.12M15.15,16.78L14.39,12L4.54,21.85C4.68,21.92 4.84,22 5,22C5.47,22 5.94,21.89 6.35,21.65L15.15,16.78M15.15,7.25L6.35,2.35C5.94,2.11 5.47,2 5,2C4.84,2 4.68,2.08 4.54,2.15L14.39,12L15.15,7.25Z" />
                             </svg>
                           ) : <ExternalLink className="w-6 h-6" />}
                         </a> 
                       )} 
                     </div> 
                   </div> 
  
                   <h3 className="text-3xl font-bold mb-4 group-hover:text-[var(--color-primary)] transition-colors" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}> 
                     {project.title} 
                   </h3> 
  
                   <p className="text-lg leading-relaxed mb-8 flex-grow" style={{ color: 'var(--color-text-muted)' }}> 
                     {project.description} 
                   </p> 
  
                   <div className="flex flex-wrap gap-3 mt-auto"> 
                     {project.technologies.map(tech => ( 
                       <span key={tech} className="text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-muted)] group-hover:border-[var(--color-primary)]/20 transition-colors"> 
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
