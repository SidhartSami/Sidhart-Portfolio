import type { Education } from "@/features/portfolio/types/education"

export const EDUCATION: Education[] = [
  {
    id: "fast-nuces",
    school: "FAST NUCES (National University of Computer and Emerging Sciences)",
    degree: "Bachelor of Science",
    fieldOfStudy: "Computer Science",
    period: {
      start: "08.2023",
      end: "06.2027",
    },
    description: `- **Dean's List — Fall 2026** (GPA: 3.63)
- **Star Performer — Procom'26, FAST-NUCES** (Feb 2026)
- **ASTERA AGENT X — Procom'26** (Feb 2026)
  Built an AI freelance automation workflow: discovers job listings, scores them, generates tailored proposals via Google Gemini, with automated email notifications and data logging.
- **CodeFu: Debugging Trials — ACM Coders Cup'25** (Jan 2026)
- **Coder Cup'25 — ACM NUCES** (Jan 2026)
- **Grand Debate 2024 — TLC FAST-NUCES** (Dec 2024)
  Debated minority and women's rights; public speaking and argumentation.`,
    skills: [
      "Python",
      "C++",
      "JavaScript / TypeScript",
      "Kotlin",
      "Data Structures & Algorithms (DSA)",
      "Object-Oriented Programming (OOP)",
      "Databases (SQL & NoSQL)",
      "Software Engineering",
      "Machine Learning",
      "Retrieval-Augmented Generation (RAG)",
    ],
    isExpanded: true,
  },
]
