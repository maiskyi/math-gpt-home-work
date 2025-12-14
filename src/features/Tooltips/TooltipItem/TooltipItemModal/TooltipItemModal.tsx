import { memo, type FC, type PointerEventHandler } from "react"

export interface TooltipItemModalProps {
  onPointerUp: PointerEventHandler<HTMLDivElement>
  onPointerMove: PointerEventHandler<HTMLDivElement>
  onPointerDown: PointerEventHandler<HTMLDivElement>
}

export const TooltipItemModal: FC<TooltipItemModalProps> = memo(
  ({ onPointerDown, onPointerMove, onPointerUp }) => {
    console.log("TooltipItemModal")
    return (
      <div className="tooltip-item-modal plasmo-rounded-3xl plasmo-border plasmo-text-white plasmo-shadow-2xl/20 plasmo-backdrop-blur-sm plasmo-transition plasmo-duration-300 plasmo-pointer-events-auto tooltip-entrance">
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className="plasmo-absolute plasmo-top-0 plasmo-left-0 plasmo-right-0 plasmo-h-6 plasmo-rounded-t-3xl plasmo-cursor-move plasmo-z-20 plasmo-flex plasmo-items-center plasmo-justify-center plasmo-opacity-0 hover:plasmo-opacity-100 plasmo-transition-opacity plasmo-duration-200">
          <div className="plasmo-flex plasmo-space-x-1">
            <div className="plasmo-w-1 plasmo-h-1 plasmo-bg-white/40 plasmo-rounded-full"></div>
            <div className="plasmo-w-1 plasmo-h-1 plasmo-bg-white/40 plasmo-rounded-full"></div>
            <div className="plasmo-w-1 plasmo-h-1 plasmo-bg-white/40 plasmo-rounded-full"></div>
          </div>
        </div>
      </div>
    )
  },
)
