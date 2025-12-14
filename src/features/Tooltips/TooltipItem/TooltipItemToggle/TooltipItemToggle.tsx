import classNames from "classnames"
import type { FC } from "react"

import ICON_SRC from "./TooltipItemToggle.png"

interface TooltipItemToggleProps {
  onClick: () => void
}

export const TooltipItemToggle: FC<TooltipItemToggleProps> = ({ onClick }) => {
  return (
    <div className="tooltip-item-toggle plasmo-absolute plasmo-top-0 plasmo-left-0 plasmo-z-[999999]">
      <button
        onClick={onClick}
        className="plasmo-tooltip-item-toggle plasmo-rounded-full plasmo-border plasmo-backdrop-blur-sm plasmo-shadow-md plasmo-overflow-hidden plasmo-flex plasmo-items-center plasmo-justify-center">
        <img src={ICON_SRC} alt="Tooltip Item Toggle" />
      </button>
    </div>
  )
}
