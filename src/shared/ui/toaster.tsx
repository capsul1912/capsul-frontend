import { useToast } from "@/hooks/use-toast.ts"
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/shared/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      {/* Positioning the ToastViewport at the top center */}
      <ToastViewport
        style={{
          position: "fixed",
          top: "16px", // Adjust top offset as needed
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999 // Ensure it appears on top of other elements
        }}
        className="pointer-events-none" // Optional: ensures clicks pass through
        // className="fixed bottom-4 left-1/2 -translate-x-1/2 transform" />{' '}
      />
    </ToastProvider>
  )
}
