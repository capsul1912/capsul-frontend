export function tryWithTransition(callback: () => void) {
  if (document.startViewTransition) {
    document.startViewTransition(callback)
  } else {
    callback()
  }
}

export function hexToRgba(hex: string, alpha: number) {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, "")

  // Parse r, g, b values
  const bigint = Number.parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  // Return the RGBA string
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
