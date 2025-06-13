import "regenerator-runtime/runtime"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./app/app.tsx"
import "./index.css"
import "./globals.css"
import "./assets/fonts/Inter-4.1/web/inter.css"
// import store from './app/store.ts';
import LanguageProvider from "@/app/lang-provider.tsx"
import store from "@/app/store.ts"
import { Toaster } from "@/shared/ui/sonner.tsx"
import { ToastProvider } from "@/shared/ui/toast.tsx"
import { TooltipProvider } from "@/shared/ui/tooltip.tsx"
import * as Sentry from "@sentry/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import React from "react"
import { Provider } from "react-redux"
import { ThemeProvider } from "./app/context/theme-context.tsx"

Sentry.init({
  dsn: "https://2a2ae6cad590af5410b70af148f7577b@o4509110745825280.ingest.de.sentry.io/4509110759981136"
})

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Provider store={store}>
          <LanguageProvider>
            <BrowserRouter>
              <TooltipProvider delayDuration={0}>
                <ToastProvider>
                  <App />
                  <Toaster
                    richColors
                    className="*:text-base"
                    position="top-center"
                    // icons={{
                    //     success: <CheckedIcon
                    //         className="rounded-full bg-green-600 p-1 *:stroke-green-300" />,
                    //     error: <CircleX />,
                    // }}
                    // toastOptions={{
                    //     className: 'dark:bg-transparent  border border-transparent p-4 rounded-lg shadow-lg',
                    //     descriptionClassName: 'text-muted-foreground text-sm',
                    //     duration: 3000,
                    // }}
                  />
                  <ReactQueryDevtools />
                </ToastProvider>
              </TooltipProvider>
            </BrowserRouter>
          </LanguageProvider>
        </Provider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
