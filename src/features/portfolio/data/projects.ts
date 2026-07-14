import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "burst",
    title: "Burst",
    logo: "/burst.png",
    period: {
      start: "2026",
      end: "2026",
    },
    link: "https://github.com/SidhartSami/Burst",
    skills: [
      "Python",
      "FastAPI",
      "aiohttp",
      "React",
      "HTTP Range Requests",
      "Bandwidth Bonding",
    ],
    description: "Windows download manager that solves a real ISP constraint: most connections are rate-limited per-source. Burst bonds multiple network interfaces simultaneously — Wi-Fi, Ethernet, LTE — and splits downloads across them using HTTP range requests, saturating all available bandwidth at once. Python / FastAPI / aiohttp backend handles multi-interface orchestration; React frontend shows real-time per-interface throughput.",
    isExpanded: true,
  },
  {
    id: "walkover",
    title: "WalkOver",
    logo: "/walkover.png",
    period: {
      start: "2025",
      end: "2025",
    },
    link: "https://github.com/SidhartSami/WalkOver",
    skills: [
      "Kotlin",
      "Jetpack Compose",
      "Firebase",
      "OSMDroid",
      "GPS",
      "Computational Geometry",
    ],
    description: "Social fitness app where walking becomes territory. Each session captures GPS coordinates in real-time as GeoPoints in Firestore. On session end, those points form a claimed polygon — the hard part is detecting ownership conflicts when two users' polygons overlap, a computational geometry problem on a NoSQL database with no native spatial query support. MVVM architecture; OSMDroid renders routes and territory polygons; foreground services handle reliable background GPS and step counting. Published on Google Play Store under Highbrow Studios.",
  },
  {
    id: "agentic-data-scientist",
    title: "Agentic Data Scientist",
    period: {
      start: "2026",
      end: "2026",
    },
    link: "https://github.com/SidhartSami/agentic-data-scientist",
    skills: [
      "Python",
      "LangChain",
      "MCP",
      "Streamlit",
      "Agentic AI",
    ],
    description: "Autonomous AI agent that takes a raw CSV and a plain-English task, then ships a complete data science deliverable end-to-end — exploratory charts, a trained and evaluated model, a PPTX presentation, and a live interactive dashboard. No human in the loop between input and output. Built with LangChain and the Model Context Protocol (MCP); Streamlit for the dashboard layer.",
  },
  {
    id: "hbl-psl",
    title: "PSL App & Platform",
    period: {
      start: "2026",
      end: "2026",
    },
    link: "https://github.com/SidhartSami/pakistan-super-league-app",
    skills: [
      "Flutter",
      "Dart",
      "Firebase",
      "Real-time",
      "Push Notifications",
      "PostgreSQL",
    ],
    description: "Full-featured fan app for the HBL Pakistan Super League — live scorecards, ball-by-ball commentary, player stats, team profiles, points table, news and highlights for all 8 teams. Real-time push notifications for sixes, fours, and wickets via Firebase Cloud Messaging. Backend listens to PostgreSQL LISTEN/NOTIFY events from Neon DB for low-latency score updates. Handled real traffic during PSL 2026. (Backend private.)",
  },
  {
    id: "rapidremedy",
    title: "RapidRemedy",
    period: {
      start: "2026",
      end: "2026",
    },
    link: "https://github.com/SidhartSami/RapidRemedy",
    skills: [
      "Python",
      "RAG",
      "PubMed API",
      "Medical AI",
      "Vector Search",
    ],
    description: "Medical RAG system grounded in PubMed — the largest biomedical literature database. Query in natural language; the system retrieves relevant papers, ranks them by relevance, and synthesizes cited answers. Built to cut down the hours clinicians and researchers spend on manual literature searches. Embedding and retrieval pipeline built from scratch in Python.",
  },
]
