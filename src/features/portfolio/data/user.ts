import type { User } from "@/features/portfolio/types/user"

export const USER: User = {
  firstName: "Sidhart",
  lastName: "Sami",
  displayName: "Sidhart Sami",
  username: "SidhartSami",
  gender: "male",
  pronouns: "he/him",
  bio: "I'm a CS student at FAST-NUCES Karachi building things at the intersection of AI and the real world. My focus is on creating high-performance tools, AI-powered applications, and robust agentic pipelines.",
  flipSentences: [
    "CS student at FAST-NUCES Karachi.",
    "AI & Full-Stack Developer.",
    "I prefer shipping over planning.",
  ],
  address: "Karachi, Pakistan",
  phoneNumberB64: "KzkyIDMzMCAyMzkwMzMw", // +92 330 2390330
  emailB64: "c2lkaGFydC5zYW1pci5wdW5qYWJpQGdtYWlsLmNvbQ==", // base64 encoded sidhart.samir.punjabi@gmail.com
  website: "https://sidhart-sami.vercel.app",
  jobTitle: "CS Undergrad · AI & Full-Stack Developer",
  jobs: [
    {
      title: "Pursuing Bachelors",
      company: "FAST NUCES",
      website: "https://www.nu.edu.pk",
      experienceId: "fast-nuces",
    },
    {
      title: "Co-Founder",
      company: "Highbrow Studios",
      website: "https://play.google.com/store",
      experienceId: "highbrow-studios",
    },
  ],
  about: `I’m Sidhart Sami — a CS student at FAST-NUCES Karachi building things at the intersection of AI and the real world. I prefer shipping over planning.

My focus is on creating high-performance tools, AI-powered applications, and robust agentic pipelines.`,
  avatar: "/me.jpg",
  avatarVariants: {
    lightOff: "/me.jpg",
    lightOn: "/me.jpg",
    darkOff: "/me.jpg",
    darkOn: "/me.jpg",
  },
  ogImage: "https://assets.chanhdai.com/images/screenshot-og-image-dark.png",
  namePronunciationUrl: "/pronounce.mp3",
  timeZone: "Asia/Karachi",
  keywords: [
    "sidhart sami",
    "sidhart",
    "sami",
    "SidhartSami",
    "ai developer",
    "full-stack developer",
    "fast-nuces",
  ],
  dateCreated: "2024-01-01",
}
