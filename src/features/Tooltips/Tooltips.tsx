import { useCallback, useEffect, useState, type FC } from "react"

import type { ChromeTabMessage } from "../features.types"
import { TooltipItem, type TooltipItemProps } from "./TooltipItem"
import { TooltipsContext } from "./Tooltips.context"

export const Tooltips: FC = () => {
  const [tooltips, setTooltips] = useState<Record<string, TooltipItemProps>>({
    1: {
      id: "1",
      targetRect: {
        left: 100,
        top: 100,
      },
    }
  })

  const removeTooltip = useCallback((id: string) => {
    setTooltips((prev) => {
      const { [id]: _, ...rest } = prev
      return rest
    })
  }, [])

  useEffect(() => {
    const handler = (msg: ChromeTabMessage) => {
      if (msg?.type === "ADD_TOOLTIP") {
        const id = Math.random().toString(36).substring(2, 15)
        setTooltips((prev) => ({
          ...prev,
          [id]: {
            id,
            targetRect: {
              left: msg.x,
              top: msg.y,
            },
          },
        }))
      }
    }
    chrome.runtime.onMessage.addListener(handler)
    return () => chrome.runtime.onMessage.removeListener(handler)
  }, [])

  return (
    <TooltipsContext.Provider value={{ removeTooltip }}>
      <div className="plasmo-root plasmo-fixed plasmo-top-0 plasmo-left-0 plasmo-z-[999999]">
        {Object.values(tooltips).map((tooltip) => {
          return <TooltipItem key={tooltip.id} {...tooltip} />
        })}
      </div>
    </TooltipsContext.Provider>
  )
}
