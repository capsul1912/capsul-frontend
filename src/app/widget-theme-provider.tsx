import { hexToRgba } from "@/shared/lib/helpers"
import type { ITheme } from "@/shared/types"
import type { Dispatch, PropsWithChildren, SetStateAction } from "react"
import { createContext, useContext, useEffect, useState } from "react"

const WidgetThemeContext = createContext<IThemeReturnValue | undefined>(undefined)

interface IThemeReturnValue {
  theme: ITheme
  setTheme: Dispatch<SetStateAction<ITheme>>
}

export const WidgetThemeProvider = ({ children }: PropsWithChildren) => {
  // States
  const [theme, setTheme] = useState<ITheme>({
    primaryColor: "#000",
    bgColor: "#8ac2fa",
    buttonsBorderRadius: 10,
    messagesBorderRadius: 10,
    widgetBorderRadius: 10
  })

  // Effects
  useEffect(() => {
    const container = document.getElementById("chat-widget-preview-container")
    if (container) {
      if (theme.primaryColor !== "default") {
        container.style.setProperty("--widget-bg-primary", theme.primaryColor)
        container.style.setProperty("--widget-bg-primary-secondary", hexToRgba(theme.primaryColor, 0.1))
      }
      if (theme.bgColor !== "default") {
        container.style.setProperty("--bg-background", theme.bgColor)
      }
      container.style.setProperty("--widget-messages-radius", `${theme.messagesBorderRadius}px`)
      container.style.setProperty("--widget-radius", `${theme.widgetBorderRadius}px`)
      container.style.setProperty("--widget-buttons-radius", `${theme.buttonsBorderRadius}px`)
    }
  }, [theme])

  return <WidgetThemeContext.Provider value={{ theme, setTheme }}>{children}</WidgetThemeContext.Provider>
}

export const useWidgetTheme = (): IThemeReturnValue => {
  const context = useContext(WidgetThemeContext)
  if (!context) {
    throw new Error("useResize must be used within a ResizeProvider")
  }
  return context
}
