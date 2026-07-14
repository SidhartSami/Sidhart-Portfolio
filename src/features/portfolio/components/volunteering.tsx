import {
  Panel,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/features/portfolio/components/panel-title-copy"
import { VOLUNTEERING } from "@/features/portfolio/data/experiences"
import { ExperienceItem } from "./experiences/experience-item"

const ID = "volunteering"

export function Volunteering() {
  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Volunteering</a>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      <div className="pr-2 pl-4">
        {VOLUNTEERING.map((item) => (
          <ExperienceItem key={item.id} experience={item} />
        ))}
      </div>
    </Panel>
  )
}
