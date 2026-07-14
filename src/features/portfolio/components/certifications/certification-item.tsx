import Image from "next/image"
import { format } from "date-fns"
import { ArrowUpRightIcon, CircleCheckBigIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/base/ui/separator"
import {
  Collapsible,
  CollapsibleChevronsUpDownIcon,
} from "@/components/base/collapsible-animated"
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/base/ui/collapsible"
import { Prose } from "@/components/base/ui/typography"

import {
  AccentureIcon,
  AnimationsDevIcon,
  CourseraIcon,
  GoogleIcon,
  MetaIcon,
  MicrosoftIcon,
  VercelIcon,
} from "@/components/icons"

import type { Certification } from "../../types/certifications"

const ISSUER_ICONS: Record<string, React.ReactNode> = {
  accenture: <AccentureIcon />,
  animationsdev: <AnimationsDevIcon />,
  coursera: <CourseraIcon />,
  google: <GoogleIcon />,
  meta: <MetaIcon />,
  microsoft: <MicrosoftIcon />,
  vercel: <VercelIcon />,
}

export function CertificationItem({
  className,
  certification,
}: {
  className?: string
  certification: Certification
}) {
  return (
    <div className="group/certification-item relative before:absolute before:left-3 before:h-full before:w-px before:bg-border py-2">
      <Collapsible defaultOpen={false} disabled={!certification.courses}>
        <CollapsibleTrigger
          className={cn(
            "group block w-full text-left",
            "relative before:absolute before:-top-1 before:-right-1 before:-bottom-1.5 before:left-7 before:-z-1 before:rounded-lg before:transition-[background-color] before:ease-out hover:before:bg-accent-muted",
            "outline-none focus-visible:before:inset-ring-2 focus-visible:before:inset-ring-ring/50",
            "data-disabled:before:content-none"
          )}
        >
          <div className="relative z-1 mb-1 flex items-start gap-3 text-base">
            {certification.issuerLogoURL ? (
              <Image
                src={certification.issuerLogoURL}
                alt={certification.issuer}
                width={32}
                height={32}
                quality={100}
                className="flex size-6 shrink-0 select-none dark:grayscale rounded-md border border-muted-foreground/15"
                unoptimized
                aria-hidden
              />
            ) : (
              <div
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-md select-none",
                  "bg-muted text-muted-foreground",
                  "border border-muted-foreground/15 ring-1 ring-line ring-offset-1 ring-offset-background",
                  "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                )}
              >
                {(certification.issuerIconName
                  ? ISSUER_ICONS[certification.issuerIconName]
                  : null) ?? <CircleCheckBigIcon />}
              </div>
            )}

            <h3 className="flex-1 font-medium text-balance pr-8">
              {certification.title}
            </h3>

            <div className="shrink-0 text-muted-foreground group-data-disabled:hidden [&_svg]:h-lh [&_svg]:w-4 mr-6">
              <CollapsibleChevronsUpDownIcon duration={0.15} />
            </div>
          </div>

          <dl className="flex flex-wrap items-center gap-x-2 pl-9 text-sm text-muted-foreground">
            <div>
              <dt className="sr-only">Issued by</dt>
              <dd>
                <span aria-hidden>@</span>
                <span className="ml-0.5">{certification.issuer}</span>
              </dd>
            </div>

            <Separator
              className="data-vertical:h-4 data-vertical:self-center"
              orientation="vertical"
              aria-hidden
            />

            <div>
              <dt className="sr-only">Issued on</dt>
              <dd>
                <time dateTime={new Date(certification.issueDate).toISOString()}>
                  {format(new Date(certification.issueDate), "dd.MM.yyyy")}
                </time>
              </dd>
            </div>

            {certification.credentialID && (
              <>
                <Separator
                  className="data-vertical:h-4 data-vertical:self-center"
                  orientation="vertical"
                  aria-hidden
                />
                <div>
                  <dt className="sr-only">Credential ID</dt>
                  <dd>ID: {certification.credentialID}</dd>
                </div>
              </>
            )}
          </dl>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden">
          {certification.courses && (
            <Prose className="pt-2 pl-9">
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground border-l border-line pl-2 mt-2">
                {certification.courses.map((course, idx) => (
                  <li key={idx} className="hover:text-foreground transition-colors">
                    {course}
                  </li>
                ))}
              </ol>
            </Prose>
          )}
        </CollapsibleContent>

        <div className="absolute right-2 top-4 flex items-center gap-1.5">
          {certification.credentialURL && (
            <a
              href={certification.credentialURL}
              target="_blank"
              rel="noopener"
              className="text-muted-foreground hover:text-foreground relative z-10"
              aria-label="Verify Certificate"
            >
              <ArrowUpRightIcon className="size-4" />
            </a>
          )}
        </div>
      </Collapsible>
    </div>
  )
}
