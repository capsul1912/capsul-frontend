// // import { AuthService } from "@/features/auth/api";
// // import { useAuthStore } from "@/features/auth/model/store";
// import axios, { AxiosError } from "axios";
// import {
//   AUTH_TOKEN_KEY,
//   getAuthToken,
//   getRefreshToken,
//   removeAuthTokens,
//   setAuthToken,
// } from "./cookies";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL ,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
//   timeout: 10000,
// });

// api.interceptors.request.use((config) => {
//   const token = getAuthToken();
//   if (token != null) config.headers.Authorization = `Bearer ${token}`;
//   if (!config.url?.includes("?") && !config.url?.endsWith("/"))
//     config.url += "/";
//   if (!("Content-Type" in config.headers))
//     config.headers["Content-Type"] = "application/json";
//   config.headers["Accept"] = "*/*";
//   if (!api.defaults.params) api.defaults.params = {};
//   return config;
// }, errorHandler);

// export async function errorHandler(error: AxiosError): Promise<void> {
//   if (error.response !== null) {
//     if (
//       error.response?.status === 401 &&
//       !error.response.request.responseURL.includes("auth/logout")
//     )
//       // AuthService.logout();
//       removeAuthTokens();
//     await Promise.reject(error.response);
//   }
//   if (error.request !== null) {
//     await Promise.reject(error.request);
//   }
//   await Promise.reject(error);
// }

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response) {
//       if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         const refreshToken = getRefreshToken();
//         if (refreshToken) {
//           try {
//             const response = await api.post("auth/token/refresh/", {
//               refresh: refreshToken,
//             });
//             const { access } = response.data;
//             // Cookies.set("access", access)
//             setAuthToken(AUTH_TOKEN_KEY, access);
//             originalRequest.headers.Authorization = `Bearer ${access}`;

//             return api(originalRequest);
//           } catch (err) {
//             console.error("Refresh token expired or invalid:", err);
//             // const logout = useAuthStore.getState().logout;
//             const logout = () => removeAuthTokens();
//             logout();
//             window.location.href = "/login";
//           }
//         } else {
//           console.error("Refresh token not found");
//           //  const logout = useAuthStore.getState().logout;
//           const logout = () => removeAuthTokens();
//           logout();
//           window.location.href = "/login";
//         }
//       } else if (error.request) {
//         throw new Error(
//           "No response from server. Please check your internet connection"
//         );
//       } else {
//         throw new Error("An unexpected error occurred");
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
