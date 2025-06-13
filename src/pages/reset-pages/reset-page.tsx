import { ResetEmailPage } from "@/pages/reset-pages/reset-email-page.tsx"
import { ResetPassPage } from "@/pages/reset-pages/reset-pass-page.tsx"
import { useParams } from "react-router-dom"

function ResetPage() {
  const params = useParams()

  if (params.fieldName === "password") {
    return <ResetPassPage />
  } else if (params.fieldName === "email") {
    return <ResetEmailPage />
  }
}

export default ResetPage
