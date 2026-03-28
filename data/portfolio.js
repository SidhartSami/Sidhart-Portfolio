import {
  Award,
  BarChart3,
  BookOpenCheck,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  Gamepad2,
  Github,
  Globe2,
  Layers3,
  Linkedin,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const navItems = [
  { id: "landing", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certs" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const heroStats = [
  { label: "Focus areas", value: "3" },
  { label: "Project tracks", value: "Data, web, games" },
  { label: "Learning mode", value: "Always shipping" },
];

export const heroSummary = [
  {
    title: "Current focus",
    text: "Building portfolio-ready products where machine learning, clean interfaces, and practical UX meet.",
    icon: Sparkles,
  },
  {
    title: "What I bring",
    text: "A thoughtful mix of technical depth, curiosity, and an eye for making complex things feel approachable.",
    icon: BriefcaseBusiness,
  },
];

export const socialLinks = [
  {
    label: "Email",
    href: "mailto:sidhart.samir.punjabi@gmail.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sidhart-sami/",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/SidhartSami",
    icon: Github,
  },
];

export const aboutHighlights = [
  {
    label: "Studying",
    value: "Computer Science",
    detail: "Learning the systems, algorithms, and product fundamentals behind reliable software.",
  },
  {
    label: "Best at",
    value: "Data-led interfaces",
    detail: "I enjoy translating analysis, models, and workflows into experiences people can actually use.",
  },
  {
    label: "Open to",
    value: "Internships and junior roles",
    detail: "Especially teams where I can contribute quickly, learn from strong engineers, and keep improving.",
  },
];

export const skillDomains = [
  {
    title: "Data Science / ML",
    icon: BrainCircuit,
    description:
      "Modeling, analysis, and experimentation with a practical bias toward clear outputs and decision support.",
    skills: ["Python", "Pandas", "scikit-learn", "TensorFlow", "Statistics", "Tableau"],
  },
  {
    title: "Web Development",
    icon: Globe2,
    description:
      "Responsive frontends and full-stack builds that prioritize structure, readability, and sensible interactions.",
    skills: ["Next.js", "React", "Tailwind", "APIs", "HTML", "CSS"],
  },
  {
    title: "Game Development",
    icon: Gamepad2,
    description:
      "Gameplay systems and interactive prototypes shaped by solid logic, clear feedback, and iteration.",
    skills: ["C++", "SFML", "Unity", "Game Loops", "OOP", "Interaction Design"],
  },
];

export const certificationTracks = [
  {
    title: "Google Advanced Data Analytics",
    provider: "Google / Coursera",
    year: "2025",
    label: "Professional Track",
    icon: Award,
    summary:
      "An eight-course path focused on Python, statistics, regression, machine learning, and capstone problem solving.",
    modules: [
      "Foundations of Data Science",
      "Get Started with Python",
      "The Power of Statistics",
      "Advanced Data Analytics Capstone",
    ],
  },
  {
    title: "IBM Data Science",
    provider: "IBM / Coursera",
    year: "2025",
    label: "Professional Track",
    icon: BookOpenCheck,
    summary:
      "A twelve-course sequence covering methodology, SQL, analysis, visualization, machine learning, and applied capstone work.",
    modules: [
      "Python for Data Science, AI & Development",
      "Databases and SQL for Data Science",
      "Machine Learning with Python",
      "Applied Data Science Capstone",
    ],
  },
];

export const projects = [
  {
    title: "SecureNet-App",
    category: "AI & Cybersecurity",
    description:
      "A real-time intrusion detection system that blends packet capture, machine learning, and a React dashboard for readable threat monitoring.",
    tags: ["Featured", "Open Source"],
    stack: ["Python", "FastAPI", "React", "Electron", "scikit-learn"],
    github: "https://github.com/SidhartSami/SecureNet-App",
  },
  {
    title: "NUCES Timetable Assistant",
    category: "Data Automation",
    description:
      "A Streamlit tool that helps students generate better timetables around course preferences and schedule constraints.",
    tags: ["Live"],
    stack: ["Python", "Pandas", "Streamlit"],
    github: "https://github.com/SidhartSami/FAST-NUCES-TimeTable",
    live: "https://nucestimetable.streamlit.app/",
  },
  {
    title: "Ozone E-Commerce Website",
    category: "Web Design",
    description:
      "A brand-driven storefront concept focused on clean layout, responsive merchandising, and polished front-end presentation.",
    tags: ["Featured"],
    stack: ["HTML", "CSS", "Responsive UI"],
    github: "https://github.com/SidhartSami/Ecommerce-Website_IICT",
    live: "https://sidhartsami.github.io/Ecommerce-Website_IICT/",
  },
  {
    title: "Centipede Arcade Game",
    category: "Game Development",
    description:
      "A classic arcade recreation in C++ and SFML that demonstrates real-time input, collision handling, and gameplay loops.",
    tags: ["Open Source"],
    stack: ["C++", "SFML", "Gameplay Logic"],
    github: "https://github.com/SidhartSami/Centipede_PF",
  },
  {
    title: "Library Management System",
    category: "Low-Level Systems",
    description:
      "An Irvine32 assembly project for managing issuing, returns, and record operations with direct low-level logic.",
    tags: ["Systems"],
    stack: ["Assembly", "Irvine32", "Structured Logic"],
    github: "https://github.com/SidhartSami/Library-Management-System",
  },
  {
    title: "Plants vs Zombies 2",
    category: "Interactive Systems",
    description:
      "A tower-defense project in C++ with SFML focused on object-oriented architecture, combat rules, and level progression.",
    tags: ["New"],
    stack: ["C++", "OOP", "SFML"],
  },
];

export const contactCards = [
  {
    title: "Primary stack",
    value: "Data, full-stack web, and interactive systems",
    icon: Layers3,
  },
  {
    title: "Working style",
    value: "Calm communication, quick iteration, and steady follow-through",
    icon: BarChart3,
  },
  {
    title: "Best fit",
    value: "Teams that value curiosity, product thinking, and clean execution",
    icon: ShieldCheck,
  },
];

export const quickFacts = [
  {
    label: "Based in",
    value: "Pakistan",
    icon: Database,
  },
  {
    label: "Interested in",
    value: "Internships, freelance, collaborative builds",
    icon: Code2,
  },
];
