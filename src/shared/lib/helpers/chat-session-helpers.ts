import type { IChatSession } from "@/features/project/model"
import { storageKeys } from "@/shared/constants"
import { getFromLocalStorage, setToLocalStorage } from "@/shared/lib/helpers/storage-helpers.ts"

// Get sessions
export function getChatSessionsObject() {
  return getFromLocalStorage<IChatSession>(storageKeys.PROJECT_PREVIEW_SESSION_ID)
}

// Get sessionId
// export function getChatSession(projectId?: string) {
//     if (!projectId) return null;
//     const sessionObject = getChatSessionsObject();
//     return sessionObject?.[projectId] || null;
// }

// Save
export function saveChatSession(projectId: string, sessionId: string) {
  const sessionsObject = getChatSessionsObject()
  const updated = {
    ...(sessionsObject ? sessionsObject : {}),
    [projectId]: sessionId
  }
  setToLocalStorage(storageKeys.PROJECT_PREVIEW_SESSION_ID, updated)
}

// Remove
// export function removeChatSession(projectId: string) {
//     const sessionsObject = getChatSessionsObject();
//     if (sessionsObject) {
//         delete sessionsObject[projectId];
//         setToLocalStorage(
//             storageKeys.PROJECT_PREVIEW_SESSION_ID,
//             sessionsObject
//         );
//     }
// }

// Re-generate
// export function reGenerateChatSession(projectId?: string) {
//     if (!projectId) return null;
//     return saveChatSession(projectId, uuidv4());
// }
