import { type FC } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"

import type { ChromeTabMessageAddTooltip } from "../features.types"
import type { PopupForm } from "./Popup.types"

export const Popup: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PopupForm>()

  const onSubmit: SubmitHandler<PopupForm> = async ({
    positionX,
    positionY,
  }) => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    })

    if (!tab?.id) return

    const message: ChromeTabMessageAddTooltip = {
      type: "ADD_TOOLTIP",
      x: positionX,
      y: positionY,
    }

    chrome.tabs.sendMessage(tab.id, message)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className="plasmo-flex plasmo-flex-col plasmo-justify-center plasmo-p-4 plasmo-gap-4"
        style={{ width: 400 }}>
        <div className="plasmo-flex plasmo-flex-col plasmo-gap-1">
          <label
            htmlFor="email"
            className="plasmo-text-sm plasmo-font-medium plasmo-text-gray-700">
            Position X <span className="plasmo-text-red-500">*</span>
          </label>
          <input
            id="position-x"
            type="number"
            placeholder="e.g. 100"
            className="plasmo-rounded-md plasmo-border plasmo-border-gray-300 plasmo-px-3 plasmo-py-2 plasmo-text-sm
           plasmo-focus:border-blue-500 plasmo-focus:outline-none plasmo-focus:ring-2 plasmo-focus:ring-blue-500/20"
            {...register("positionX", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "Position X is required",
              },
            })}
          />
          {errors.positionX && (
            <p
              id="position-x-error"
              className="plasmo-text-xs plasmo-text-red-600">
              {errors.positionX.message}
            </p>
          )}
        </div>
        <div className="plasmo-flex plasmo-flex-col plasmo-gap-1">
          <label
            htmlFor="email"
            className="plasmo-text-sm plasmo-font-medium plasmo-text-gray-700">
            Position Y <span className="plasmo-text-red-500">*</span>
          </label>
          <input
            id="position-y"
            type="number"
            placeholder="e.g. 100"
            className="plasmo-rounded-md plasmo-border plasmo-border-gray-300 plasmo-px-3 plasmo-py-2 plasmo-text-sm
           plasmo-focus:border-blue-500 plasmo-focus:outline-none plasmo-focus:ring-2 plasmo-focus:ring-blue-500/20"
            {...register("positionY", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "Position Y is required",
              },
            })}
          />
          {errors.positionY && (
            <p
              id="position-y-error"
              className="plasmo-text-xs plasmo-text-red-600">
              {errors.positionY.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="plasmo-px-4 plasmo-py-2 plasmo-rounded-md plasmo-bg-blue-600 plasmo-text-white plasmo-font-medium
             plasmo-hover:bg-blue-700 plasmo-active:bg-blue-800
             plasmo-focus:outline-none plasmo-focus:ring-2 plasmo-focus:ring-blue-400 plasmo-w-full">
          Add tooltip
        </button>
      </div>
    </form>
  )
}
