export interface TooltipItemModalOnMoveFnParams {
  left: number
  top: number
}

export type TooltipItemModalOnMoveFn = (
  params: TooltipItemModalOnMoveFnParams,
) => void
