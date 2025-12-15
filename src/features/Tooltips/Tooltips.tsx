import { useEffect, useState, type FC } from "react"

import { TooltipItem, type TooltipItemProps } from "./TooltipItem"

export const Tooltips: FC = () => {
  const [tooltips, setTooltips] = useState<TooltipItemProps[]>([])

  useEffect(() => {
    const handler = (msg: any) => {
      if (msg?.type === "ADD_TOOLTIP") {
        setTooltips((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(2, 15),
            targetRect: {
              left: 100,
              // left: window.innerWidth / 2 - 200,
              top: window.innerHeight / 2 - 60,
              width: 100,
              height: 100,
            },
          },
        ])
      }
    }
    chrome.runtime.onMessage.addListener(handler)
    return () => chrome.runtime.onMessage.removeListener(handler)
  }, [])

  return (
    <div className="plasmo-root plasmo-fixed plasmo-top-0 plasmo-left-0 plasmo-z-[999999]">
      {tooltips.map((tooltip) => {
        return <TooltipItem key={tooltip.id} {...tooltip} />
      })}
    </div>
  )
}
