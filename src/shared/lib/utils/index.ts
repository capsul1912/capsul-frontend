import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const mergeArray = <T = unknown>(...items: (T | undefined)[]) => items.filter((item): item is T => !!item)
