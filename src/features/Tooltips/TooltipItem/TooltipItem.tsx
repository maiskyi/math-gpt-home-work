import { useState, type FC } from "react"

import { TOOLTIP_ITEM_OFFSET } from "./TooltipItem.const"
import type { TooltipItemTargetRect } from "./TooltipItem.types"
import { TooltipItemModal } from "./TooltipItemModal"
import { TooltipItemToggle } from "./TooltipItemToggle"

export interface TooltipItemProps {
  id: string
  targetRect: TooltipItemTargetRect
}

export const TooltipItem: FC<TooltipItemProps> = ({ targetRect }) => {
  const [{ left, top, isOpen }, setState] = useState({
    isOpen: true,
    left: targetRect.left + targetRect.width + TOOLTIP_ITEM_OFFSET,
    top: targetRect.top - targetRect.height - TOOLTIP_ITEM_OFFSET,
  })

  const handleOnToggle = () => {
    setState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }))
  }

  const handleOnMove = () => {
    setState((prev) => ({
      ...prev,
      left: prev.left + 1,
      top: prev.top + 1,
    }))
  }

  return (
    <div className="plasmo-absolute" style={{ left, top }}>
      <TooltipItemToggle onClick={handleOnToggle} />
      {isOpen && <TooltipItemModal onMove={handleOnMove} />}
    </div>
  )
}
