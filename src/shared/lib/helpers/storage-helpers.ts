import type { IUser } from "@/features/form-specific/model/types.ts"
import { storageKeys } from "../../constants"

export type AllValuesOf<T> = T[keyof T]
export type IStorageValue = AllValuesOf<typeof storageKeys>

// LocalStorage
export function getFromLocalStorage<T>(key: IStorageValue): T | null {
  try {
    const item = localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : null
  } catch (error: unknown) {
    console.log(error)
    return null
  }
}

export function removeFromLS(key: IStorageValue) {
  localStorage.removeItem(key)
}

export function setToLocalStorage(key: IStorageValue, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error: unknown) {
    console.log(error)
    return null
  }
}

// SessionStorage
export function getFromSessionStorage<T>(key: IStorageValue): T | null {
  try {
    const item = sessionStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : null
  } catch (error: unknown) {
    console.log(error)
    return null
  }
}

export function removeFromSessionStorage(key: IStorageValue) {
  sessionStorage.removeItem(key)
}

export function setToSessionStorage(key: IStorageValue, value: unknown) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value))
  } catch (error: unknown) {
    console.log(error)
    return null
  }
}

// Specific functions

export function saveUserToLS(user: IUser) {
  setToLocalStorage(storageKeys.USER_DATA, user)
}

export function getUserFromLS() {
  return getFromLocalStorage<IUser>(storageKeys.USER_DATA)
}

export function removeUserFromLS() {
  removeFromLS(storageKeys.USER_DATA)
}

// Session
export function getFromSession<T>(key: IStorageValue): T | null {
  try {
    const item = sessionStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : null
  } catch (error: unknown) {
    console.log(error)
    return null
  }
}

export function saveToSession(key: IStorageValue, value: unknown) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value))
  } catch (error: unknown) {
    console.log(error)
    return null
  }
}

export function removeFromSession(key: IStorageValue) {
  sessionStorage.removeItem(key)
}
