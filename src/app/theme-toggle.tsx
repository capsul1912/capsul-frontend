import { storageKeys } from "@/shared/constants"
import { getFromLocalStorage, setToLocalStorage } from "@/shared/lib/helpers"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"

const ThemeToggle = () => {
  // States
  const [theme, setTheme] = useState(getFromLocalStorage(storageKeys.THEME) || "light")

  // Effects
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
      setToLocalStorage(storageKeys.THEME, "dark")
    } else {
      document.documentElement.classList.remove("dark")
      setToLocalStorage(storageKeys.THEME, "light")
    }
  }, [theme])

  // Functions
  const isDarkMode = theme === "dark"

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex size-7 items-center justify-center rounded-full bg-primary p-1 text-primary-foreground transition-colors duration-300 hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      {isDarkMode ? <MoonIcon className="size-6" /> : <SunIcon className="size-6" />}
    </button>
  )
}

export default ThemeToggle
