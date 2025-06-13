import type React from "react"
import { type ReactNode, createContext, useContext, useState } from "react"

interface ResizeContextType {
  isResize: boolean
  notify: boolean
  setNotify: React.Dispatch<React.SetStateAction<boolean>>
  setResize: React.Dispatch<React.SetStateAction<boolean>>
}

const ResizeContext = createContext<ResizeContextType | undefined>(undefined)

interface ResizeProviderProps {
  children: ReactNode
}

export const HelperProvider: React.FC<ResizeProviderProps> = ({ children }) => {
  const [isResize, setResize] = useState<boolean>(false)
  const [notify, setNotify] = useState<boolean>(false)

  return <ResizeContext.Provider value={{ isResize, setResize, notify, setNotify }}>{children}</ResizeContext.Provider>
}

export const useResize = (): ResizeContextType => {
  const context = useContext(ResizeContext)
  if (!context) {
    throw new Error("useResize must be used within a ResizeProvider")
  }
  return context
}
