import type { PropsWithChildren } from "react"
import { createContext, useContext, useState } from "react"

interface IInboxContext {
  menu: number | null
  setMenu: (value: number) => void
}

const InboxContext = createContext<IInboxContext | undefined>(undefined)

export const InboxProvider = ({ children }: PropsWithChildren) => {
  // States
  const [menu, setMenu] = useState<number | null>(null)

  return <InboxContext.Provider value={{ menu, setMenu }}>{children}</InboxContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useInbox = (): IInboxContext => {
  const context = useContext(InboxContext)
  if (!context) {
    throw new Error("useInbox must be used within a InboxProvider")
  }
  return context
}
