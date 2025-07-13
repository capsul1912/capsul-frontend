import { ChatProvider } from "@/app/context/chat-context.tsx"
import AccountPage from "@/pages/account-page"
import AccountPage1 from "@/pages/account-page/old-index.tsx"
import { LoginPage } from "@/pages/auth-login-page"
import SetNewPassword from "@/pages/auth/change-password"
import ResetPasswordPage from "@/pages/auth/reset-password-page.tsx"
import SignupPage from "@/pages/auth/signup-page"
import VerifyEmailPage from "@/pages/auth/verify-email-page.tsx"
import { InboxPage } from "@/pages/inbox-page"
import AddOrganizationForm from "@/pages/main/components/add-organizations-form"
import CreateProjectForm from "@/pages/main/components/create-project-form"
import MainPageNew from "@/pages/main/components/main-page-new"
import OrganizationSettings from "@/pages/main/components/organization-settings"
import MentionsPage from "@/pages/mentions-page"
import NotFoundPage from "@/pages/not-found-page"
import ResetPage from "@/pages/reset-pages/reset-page.tsx"
import SettingsPage from "@/pages/settings-page"
import CustomizationPage from "@/pages/settings-page/components/customization-page.tsx"
import DeleteBotPage from "@/pages/settings-page/components/delete-bot-page.tsx"
import InstallationPage from "@/pages/settings-page/components/installation-page.tsx"
import IntegrationPage from "@/pages/settings-page/components/integration-page.tsx"
import InvitationPage from "@/pages/settings-page/components/invitation-page.tsx"
import KnowledgePage from "@/pages/settings-page/components/knowledge-page.tsx"
import ProfilePage from "@/pages/settings-page/components/profile-page.tsx"
import ProjectSettigs from "@/pages/settings-page/components/project-settings"
import { DashboardLayout } from "@/widgets/dashboard"
import { InboxLayout } from "@/widgets/inbox-layout"
import { type IndexRouteObject, Navigate, type NonIndexRouteObject } from "react-router-dom"
import ProtectedRoute from "./protected-route"

type CustomNonIndexRouteObject = NonIndexRouteObject & {
  children?: CustomRouteObject[]
}

type CustomRouteProps = {}

type CustomRouteObject = (IndexRouteObject | CustomNonIndexRouteObject) & CustomRouteProps

export const routes: CustomRouteObject[] = [
  {
    path: "/:projectId",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        element: <InboxLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="inbox" />
          },
          {
            path: "inbox",
            element: <InboxPage />
          },
          {
            path: "settings",
            element: <SettingsPage />,
            children: [
              {
                path: "profile",
                element: <ProfilePage />
              },
              {
                path: "invitation",
                element: <InvitationPage />
              },
              {
                path: "installation",
                element: <InstallationPage />
              },
              {
                path: "customize",
                element: <CustomizationPage />
              },
              {
                path: "integration",
                element: <IntegrationPage />
              },
              {
                path: "knowledge",
                element: <KnowledgePage />
              },
              {
                path: "delete",
                element: <DeleteBotPage />
              },
              {
                path: "project-settings",
                element: <ProjectSettigs />
              }
            ]
          },
          {
            path: "inbox/mentions",
            element: (
              <ChatProvider>
                <MentionsPage />
              </ChatProvider>
            )
          },
          { path: "account-old", element: <AccountPage1 /> },
          { path: "account", element: <AccountPage /> }
        ]
      }
    ]
  },
  // { path: "/login", element: <LoginPage /> },
  // { path: "/login", element: <LoginPagePrevious /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/reset-password", element: <ResetPasswordPage /> },
  { path: "/change-password", element: <SetNewPassword /> },
  { path: "/verify-key/:key", element: <VerifyEmailPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/", element: <Navigate to="/main" /> },
  {
    path: "/main",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <MainPageNew /> },
      { path: "create-organization", element: <AddOrganizationForm /> },
      { path: "settings", element: <OrganizationSettings /> },
      { path: "create-project", element: <CreateProjectForm /> }
    ]
  },
  { path: "/main/settings", element: <OrganizationSettings /> },

  {
    path: "accounts/:fieldName/update/:userId/:oneTimePassword",
    element: <ResetPage />
  },
  { path: "*", element: <NotFoundPage /> }
] as const
