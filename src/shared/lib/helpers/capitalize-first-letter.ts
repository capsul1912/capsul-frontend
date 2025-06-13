export function capitalizeFirstLetter(text: string): string {
  if (!text) return text // Return empty string if input is empty
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}
