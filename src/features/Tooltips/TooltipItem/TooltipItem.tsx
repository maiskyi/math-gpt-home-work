import {
  memo,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEventHandler,
} from "react"

import type { TooltipItemTargetRect } from "./TooltipItem.types"
import { TooltipItemModal } from "./TooltipItemModal"
import { TooltipItemToggle } from "./TooltipItemToggle"

export interface TooltipItemProps {
  id: string
  targetRect: TooltipItemTargetRect
}

export const TooltipItem = memo<TooltipItemProps>(({ id, targetRect }) => {
  const element = useRef<HTMLDivElement>(null)
  const scrollable = useRef<HTMLElement | Document>(null)

  const dragger = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    lastScrollTop: undefined,
    lastScrollLeft: undefined,
  })

  const [{ isOpen, elementX, elementY }, setState] = useState({
    isOpen: true,
    elementX: targetRect.left,
    elementY: targetRect.top,
  })

  const handleOnToggle = () => {
    setState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }))
  }

  const handleOnPointerDown: PointerEventHandler<HTMLDivElement> = useCallback(
    ({ currentTarget, pointerId, clientX, clientY }) => {
      if (!element.current) return
      dragger.current.isDragging = true
      currentTarget.setPointerCapture(pointerId)
      const { left, top } = element.current.getBoundingClientRect()
      dragger.current.startX = clientX - left
      dragger.current.startY = clientY - top
    },
    [],
  )

  const handleOnPointerUp = useCallback(({ currentTarget, pointerId }) => {
    dragger.current.isDragging = false
    currentTarget.releasePointerCapture(pointerId)
  }, [])

  const handleOnPointerMove: PointerEventHandler<HTMLDivElement> = useCallback(
    ({ clientX, clientY }) => {
      if (!dragger.current.isDragging || !element.current) return
      console.log(clientX, dragger.current.startX)
      setState((prev) => ({
        ...prev,
        elementX: clientX - dragger.current.startX,
        elementY: clientY - dragger.current.startY,
      }))
    },
    [],
  )

  useLayoutEffect(() => {
    document.addEventListener(
      "scroll",
      ({ target }) => {
        const {
          container,
          rect: targetRect,
          scrollTop: currentScrollTop,
          scrollLeft: currentScrollLeft,
        } = (() => {
          if (target instanceof HTMLElement) {
            const rect = target.getBoundingClientRect()
            return {
              rect,
              container: target,
              scrollTop: target.scrollTop,
              scrollLeft: target.scrollLeft,
            }
          }

          return {
            container: document,
            scrollTop: window.scrollY,
            scrollLeft: window.scrollX,
            rect: {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
              right: window.innerWidth,
              bottom: window.innerHeight,
            },
          }
        })()

        if (!element.current) return

        if (!scrollable.current) {
          const elementRect = element.current?.getBoundingClientRect()
          const overlaps =
            elementRect.left >= targetRect.left &&
            elementRect.left < targetRect.right
          if (overlaps) {
            scrollable.current = container
          }
        }

        if (scrollable.current && scrollable.current !== container) return

        if (!dragger.current.lastScrollTop) {
          dragger.current.lastScrollTop = currentScrollTop
        }

        if (!dragger.current.lastScrollLeft) {
          dragger.current.lastScrollLeft = currentScrollLeft
        }

        const scrollDiffY = currentScrollTop - dragger.current.lastScrollTop
        const scrollDiffX = currentScrollLeft - dragger.current.lastScrollLeft

        setState(({ elementX, elementY, ...rest }) => ({
          ...rest,
          elementX: elementX - scrollDiffX,
          elementY: elementY - scrollDiffY,
        }))

        dragger.current.lastScrollTop = currentScrollTop
        dragger.current.lastScrollLeft = currentScrollLeft
      },
      true,
    )
  }, [])

  return (
    <div
      ref={element}
      className="tooltip-item plasmo-fixed"
      style={{ left: elementX, top: elementY }}>
      <TooltipItemToggle onClick={handleOnToggle} />
      {isOpen && (
        <TooltipItemModal
          id={id}
          onClose={handleOnToggle}
          onPointerDown={handleOnPointerDown}
          onPointerMove={handleOnPointerMove}
          onPointerUp={handleOnPointerUp}
        />
      )}
    </div>
  )
})
