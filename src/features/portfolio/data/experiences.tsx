import {
  BriefcaseBusinessIcon,
  CodeXmlIcon,
  LightbulbIcon,
} from "lucide-react"

import type { Experience } from "@/features/portfolio/types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "highbrow-studios",
    companyName: "Highbrow Studios",
    companyIcon: <BriefcaseBusinessIcon strokeWidth={1.8} />,
    location: "Karachi, Pakistan",
    locationType: "Remote",
    positions: [
      {
        id: "1",
        title: "Co-Founder",
        employmentPeriod: {
          start: "09.2025",
          end: "03.2026",
        },
        employmentType: "Self-employed",
        description: `Mobile development studio. Built and published WalkOver on the Google Play Store. (Play Store publisher account under Highbrow Studios.)`,
        icon: <LightbulbIcon />,
        isExpanded: true,
      },
    ],
  },
  {
    id: "mujaddid-al-fsani",
    companyName: "Mujaddid Al-Fsani Welfare Organization",
    companyIcon: <BriefcaseBusinessIcon strokeWidth={1.8} />,
    location: "Karachi, Pakistan",
    locationType: "Remote",
    positions: [
      {
        id: "1",
        title: "Full Stack Developer Intern",
        employmentPeriod: {
          start: "11.2025",
          end: "02.2026",
        },
        employmentType: "Internship",
        description: `Revamped the organization's web platform as part of a 2-member team under a project manager. Migrated to ASP.NET Core (RESTful API) and React; improved performance and maintainability across the full stack.`,
        icon: <CodeXmlIcon />,
        skills: ["ASP.NET Core", "RESTful API", "React", "C#", "JavaScript"],
      },
    ],
  },
]

export const VOLUNTEERING: Experience[] = [
  {
    id: "mission-meow",
    companyName: "Mission Meow",
    companyIcon: <LightbulbIcon strokeWidth={1.8} />,
    location: "Karachi, Pakistan",
    locationType: "Remote",
    positions: [
      {
        id: "1",
        title: "Co-Founder",
        employmentPeriod: {
          start: "03.2026",
        },
        employmentType: "Part-time",
        description: `Community-driven initiative feeding and supporting stray cats in Karachi neighborhoods. Coordinate weekend feeding drives, manage volunteers, and run the initiative's online presence to raise awareness about urban stray animal welfare.`,
        icon: <LightbulbIcon />,
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "ml-toppers",
    companyName: "ML Toppers",
    companyIcon: <BriefcaseBusinessIcon strokeWidth={1.8} />,
    location: "Karachi, Pakistan",
    locationType: "Remote",
    positions: [
      {
        id: "1",
        title: "Machine Learning Mentor",
        employmentPeriod: {
          start: "06.2025",
          end: "08.2025",
        },
        employmentType: "Volunteering",
        description: `Co-founded a student-led free ML learning initiative during summer break. Taught Advanced Python, NumPy, Pandas, and Scikit-learn through peer-driven learning with structured assignments via Google Classroom.`,
        icon: <CodeXmlIcon />,
        skills: ["Python", "NumPy", "Pandas", "Scikit-learn", "Machine Learning"],
      },
    ],
  },
]
