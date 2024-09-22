import React from "react"
import LangToggle from "./LangToggle"
import ToggleTheme from "./ToggleTheme"

export default function SettingsContent() {
  return (
    <div className="p-4 w-56">
      <div className="mb-4">
        <h3 className="mb-2 text-sm font-medium">Language</h3>
        <LangToggle />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Theme</h3>
        <ToggleTheme />
      </div>
    </div>
  )
}