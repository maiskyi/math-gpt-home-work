import { useEffect, useState, type FC } from "react"

import { TooltipItem, type TooltipItemProps } from "./TooltipItem"
import { collectHits } from "./Tooltips.utils"

export const Tooltips: FC = () => {
  const [tooltips, setTooltips] = useState<TooltipItemProps[]>([])

  useEffect(() => {
    let scheduled = false

    const schedule = () => {
      if (scheduled) return
      scheduled = true
      requestAnimationFrame(() => {
        scheduled = false
        setTooltips(collectHits())
      })
    }

    schedule()

    const mo = new MutationObserver(() => schedule())
    mo.observe(document.documentElement, {
      subtree: true,
      childList: true,
      characterData: true,
    })

    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)

    return () => {
      mo.disconnect()
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [])

  return (
    <div className="plasmo-root plasmo-fixed plasmo-top-0 plasmo-left-0 plasmo-z-[999999]">
      {tooltips.map((tooltip) => (
        <TooltipItem key={tooltip.id} {...tooltip} />
      ))}
    </div>
  )
}
