import type { SocialProfile } from "@/features/portfolio/types/social-links"

export const SOCIAL = {
  github: {
    title: "GitHub",
    handle: "SidhartSami",
    href: "https://github.com/SidhartSami",
    sameAs: true,
  },
  linkedin: {
    title: "LinkedIn",
    handle: "sidhart-sami",
    href: "https://www.linkedin.com/in/sidhart-sami/",
    sameAs: true,
  },
  devto: {
    title: "Dev.to",
    handle: "sidhart_samir",
    href: "https://dev.to/sidhart_samir",
    sameAs: true,
  },
  x: {
    title: "X",
    handle: "sidhart_builds",
    href: "https://x.com/sidhart_builds",
    sameAs: true,
  },
} satisfies Record<string, SocialProfile>

export type SocialName = keyof typeof SOCIAL

export type SocialLink = SocialProfile & { name: SocialName }

export const SOCIAL_LINKS: SocialLink[] = (
  Object.entries(SOCIAL) as [SocialName, SocialProfile][]
).map(([name, profile]) => ({ name, ...profile }))
