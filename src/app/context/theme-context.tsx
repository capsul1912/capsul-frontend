import { type ReactNode, createContext, useContext, useEffect, useState } from "react"

interface ThemeContextType {
  isDarkMode: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // localStorage dan boshlang'ich qiymatni olish
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("theme")
    return savedTheme === "dark" // Agar 'dark' bo'lsa true, aks holda false
  })

  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode
      // Yangi holatni localStorage ga saqlash
      localStorage.setItem("theme", newMode ? "dark" : "light")
      return newMode
    })
  }

  // Dark mode ni global CSS class sifatida qo'llash (ixtiyoriy)
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  return <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
