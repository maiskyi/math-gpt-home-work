import "~style.css"

function IndexPopup() {
  const onClick = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    })

    if (!tab?.id) return

    chrome.tabs.sendMessage(tab.id, {
      type: "ADD_TOOLTIP",
    })
  }

  return (
    <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-h-16 plasmo-w-40">
      <button
        onClick={onClick}
        className="plasmo-px-4 plasmo-py-2 plasmo-rounded-md plasmo-bg-blue-600 plasmo-text-white plasmo-font-medium
         plasmo-hover:bg-blue-700 plasmo-active:bg-blue-800
         plasmo-focus:outline-none plasmo-focus:ring-2 plasmo-focus:ring-blue-400">
        Click me
      </button>
    </div>
  )
}

export default IndexPopup
