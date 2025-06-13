import Cookie from "js-cookie"
import { CookieKeys } from "../../constants"

// Access token
export function saveAccessToken(token: string) {
  Cookie.set(CookieKeys.ACCESS, token)
}

export function getAccessToken() {
  return Cookie.get(CookieKeys.ACCESS)
}

export function removeAccessToken() {
  Cookie.remove(CookieKeys.ACCESS)
}

// Refresh token
export function saveRefreshToken(token: string) {
  Cookie.set(CookieKeys.REFRESH, token, {
    secure: true
  })
}

export function getRefreshToken() {
  return Cookie.get(CookieKeys.REFRESH)
}

export function removeRefreshToken() {
  Cookie.remove(CookieKeys.REFRESH)
}
