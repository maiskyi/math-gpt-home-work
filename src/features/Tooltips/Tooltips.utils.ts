import type { TooltipItemProps } from "./TooltipItem"
import { RE, SKIP_TAGS } from "./Tooltips.conts"

export const shouldSkipTextNode = (textNode: Text) => {
  const el = textNode.parentElement
  if (!el) return true
  if (SKIP_TAGS.has(el.tagName)) return true
  if (el.isContentEditable || el.closest("[contenteditable='true']"))
    return true
  return false
}

export function* textNodesUnder(root: Node): Generator<Text> {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => {
      const t = n as Text
      if (!t.nodeValue || !t.nodeValue.trim()) return NodeFilter.FILTER_REJECT
      if (shouldSkipTextNode(t)) return NodeFilter.FILTER_REJECT
      if (!RE.test(t.nodeValue)) return NodeFilter.FILTER_REJECT
      RE.lastIndex = 0
      return NodeFilter.FILTER_ACCEPT
    },
  })

  let current = walker.nextNode()

  while (current) {
    yield current as Text
    current = walker.nextNode()
  }
}

export const collectHits = (): TooltipItemProps[] => {
  const hits: TooltipItemProps[] = []
  const root = document.body

  if (!root) return []

  for (const tn of textNodesUnder(root)) {
    const text = tn.nodeValue;
    RE.lastIndex = 0
    const matches = [...text.matchAll(RE)]
    if (matches.length === 0) continue
    console.log({matches})

    for (const m of matches) {
      const start = m.index ?? 0
      const end = start + m[0].length

      const range = document.createRange()
      range.setStart(tn, start)
      range.setEnd(tn, end)

      const rects = range.getClientRects()

      // A match can span multiple rects (line wraps). We'll place one icon per rect.
      Array.from(rects).forEach((r, idx) => {
        if (r.width === 0 || r.height === 0) return
        hits.push({
          id: `${Math.random().toString(36).slice(2)}_${Date.now()}_${idx}`,
          targetRect: {
            left: r.left + window.scrollX,
            top: r.top + window.scrollY,
            width: r.width,
            height: r.height,
          },
        })
      })

      range.detach?.()
    }
  }

  return hits
}
