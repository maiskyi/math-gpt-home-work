import { createContext } from "react"

export interface TooltipsContextProps {
  removeTooltip: (id: string) => void
}

export const TooltipsContext = createContext<TooltipsContextProps>({
  removeTooltip: () => {},
})
