import { LICENSE, SOURCE_CODE_GITHUB_URL } from "@/config/site"
import { cn } from "@/lib/utils"
import { DevtoIcon, DmcaIcon, GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons"
import { SiteFooterInteractiveLogotype } from "@/components/site-footer-brand"
import { SOCIAL } from "@/features/portfolio/data/social-links"

export function SiteFooter() {
  const githubLink = SOCIAL.github
  const linkedinLink = SOCIAL.linkedin
  const devtoLink = SOCIAL.devto
  const xLink = SOCIAL.x

  return (
    <footer className="max-w-screen overflow-x-clip px-2">
      <div className="mx-auto border-x border-line group-has-data-[slot=layout-wide]/layout:container md:max-w-3xl">
        <div className="screen-line-top screen-line-bottom">
          <div className="stripe-divider h-12" />
        </div>

        <div className="screen-line-top screen-line-bottom flex w-full before:z-1 after:z-1">
          <div className="mx-auto flex items-center justify-center gap-3 border-x border-line bg-background px-4">
            <a
              className="flex items-center text-muted-foreground transition-[color] hover:text-foreground"
              href={githubLink.href}
              target="_blank"
              rel="noopener"
              aria-label="GitHub Profile"
            >
              <GitHubIcon className="size-4" />
            </a>

            <Separator />

            <a
              className="flex items-center text-muted-foreground transition-[color] hover:text-foreground"
              href={linkedinLink.href}
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn Profile"
            >
              <LinkedInIcon className="size-4" />
            </a>

            <Separator />

            <a
              className="flex items-center text-muted-foreground transition-[color] hover:text-foreground"
              href={devtoLink.href}
              target="_blank"
              rel="noopener"
              aria-label="Dev.to Profile"
            >
              <DevtoIcon className="size-4" />
            </a>

            <Separator />

            <a
              className="flex items-center text-muted-foreground transition-[color] hover:text-foreground"
              href={xLink.href}
              target="_blank"
              rel="noopener"
              aria-label="X Profile"
            >
              <XIcon className="size-4" />
            </a>


          </div>
        </div>

        {/* <div className="*:absolute *:z-2 *:flex *:size-2 *:border *:border-line *:bg-background">
          <div className="bottom-[-3.5px] left-[-4.5px]" />
          <div className="right-[-4.5px] bottom-[-3.5px]" />
        </div> */}
      </div>

      <SiteFooterInteractiveLogotype />

      <div className="h-(--fade-bottom-height)" />
      <div className="pb-[env(safe-area-inset-bottom,0)]" />
    </footer>
  )
}

function Separator({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex h-11 w-px bg-line", className)} {...props} />
}

function Item({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("grid grid-cols-2 gap-4", className)} {...props} />
}
