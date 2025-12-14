import {
  memo,
  useCallback,
  useRef,
  useState,
  type PointerEventHandler,
} from "react"

import { TOOLTIP_ITEM_OFFSET } from "./TooltipItem.const"
import type { TooltipItemTargetRect } from "./TooltipItem.types"
import { TooltipItemModal } from "./TooltipItemModal"
import { TooltipItemToggle } from "./TooltipItemToggle"

export interface TooltipItemProps {
  id: string
  targetRect: TooltipItemTargetRect
}

export const TooltipItem = memo<TooltipItemProps>(({ targetRect }) => {
  const root = useRef<HTMLDivElement>(null)

  const dragger = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
  })

  const [{ isOpen, left, top }, setState] = useState({
    isOpen: true,
    left: targetRect.left + targetRect.width + TOOLTIP_ITEM_OFFSET,
    top: targetRect.top - targetRect.height + TOOLTIP_ITEM_OFFSET,
  })

  const handleOnToggle = () => {
    setState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }))
  }

  const handleOnPointerDown: PointerEventHandler<HTMLDivElement> = useCallback(
    ({ currentTarget, pointerId, clientX, clientY }) => {
      if (!root.current) return
      dragger.current.isDragging = true
      currentTarget.setPointerCapture(pointerId)
      const { x, y } = root.current.getBoundingClientRect()
      dragger.current.startX = clientX - x
      dragger.current.startY = clientY - y
    },
    [],
  )

  const handleOnPointerUp = useCallback(({ currentTarget, pointerId }) => {
    dragger.current.isDragging = false
    currentTarget.releasePointerCapture(pointerId)
  }, [])

  const handleOnPointerMove: PointerEventHandler<HTMLDivElement> = useCallback(
    ({ clientY, clientX }) => {
      if (!dragger.current.isDragging || !root.current) return
      setState((prev) => ({
        ...prev,
        left: clientX - dragger.current.startX,
        top: clientY - dragger.current.startY,
      }))
    },
    [],
  )

  return (
    <div ref={root} className="plasmo-absolute" style={{ left, top }}>
      <TooltipItemToggle onClick={handleOnToggle} />
      {isOpen && (
        <TooltipItemModal
          onPointerDown={handleOnPointerDown}
          onPointerMove={handleOnPointerMove}
          onPointerUp={handleOnPointerUp}
        />
      )}
    </div>
  )
})
