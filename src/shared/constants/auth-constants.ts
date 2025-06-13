export const storageKeys = Object.freeze({
  INBOX_WINDOW_SIZES: "inbox-window-sizes",
  THEME: "inbox-chatx-theme",
  LANG: "inbox-chat-user-lang",
  USER_DATA: "inbox-chat-user-data",
  CURRENT_PROJECT: "inbox-current-project",
  PROJECT_PREVIEW_SESSION_ID: "inbox-chatx-project-sessions",
  IS_SIDEBAR_PINNED: "is_sidebar-pinned",
  IS_MENUBAR_PINNED: "is_menubar-pinned"
} as const)

export const CookieKeys = Object.freeze({
  ACCESS: "inbox-chat-access-token",
  REFRESH: "inbox-chat-refresh-token"
} as const)
