import { memo, type FC, type PointerEventHandler } from "react"

export interface TooltipItemModalProps {
  onClose: () => void
  onPointerUp: PointerEventHandler<HTMLDivElement>
  onPointerMove: PointerEventHandler<HTMLDivElement>
  onPointerDown: PointerEventHandler<HTMLDivElement>
}

export const TooltipItemModal: FC<TooltipItemModalProps> = memo(
  ({ onPointerDown, onPointerMove, onPointerUp, onClose }) => {
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
        <button
          onClick={onClose}
          className="plasmo-absolute plasmo-top-2 plasmo-right-2 plasmo-w-6 plasmo-h-6 plasmo-text-white/70 plasmo-text-sm plasmo-hover:text-white plasmo-bg-white/20 plasmo-hover:bg-white/30 plasmo-rounded-full plasmo-transition-all plasmo-duration-200 plasmo-z-30 plasmo-flex plasmo-items-center plasmo-justify-center">
          <svg
            className="plasmo-w-4 plasmo-h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.5">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h14"></path>
          </svg>
        </button>
      </div>
    )
  },
)
