import type { RefObject } from "react"
import { useEffect } from "react"

const useClickOutside = <T extends HTMLElement>(ref: RefObject<T>, handler: (event: MouseEvent | TouchEvent) => void): void => {
  // Effects
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [ref, handler])
}

export default useClickOutside
