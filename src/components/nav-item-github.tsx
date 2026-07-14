import { addQueryParams } from "@/utils/url"
import { UTM_PARAMS } from "@/config/site"
import { Button } from "@/components/base/ui/button"
import { GlobeIcon } from "lucide-react"

export function NavItemGitHub() {
  return (
    <Button
      className="gap-1.5 border-none px-1.5 text-muted-foreground hover:text-foreground"
      variant="ghost"
      size="sm"
      nativeButton={false}
      render={
        <a
          href={addQueryParams("https://sidhart-sami.vercel.app", UTM_PARAMS)}
          target="_blank"
          rel="noopener"
          aria-label="Portfolio"
        >
          <GlobeIcon className="size-5" />
        </a>
      }
    />
  )
}
