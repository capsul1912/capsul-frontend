import { getAuthToken } from "@/api/cookies"
import { authApi } from "@/shared/lib/api/auth-api"
import { capitalizeFirstLetter } from "@/shared/lib/helpers/capitalize-first-letter"
import { useAuthStore } from "@/shared/lib/store/auth-store.ts"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Card } from "@/shared/ui/card"
import { Skeleton } from "@/shared/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import OrganizationCard from "../ui/organization-card"

// const notifications = [
//   {
//     id: 1,
//     name: "Guest",
//     action: "has created a new ticket",
//     message:
//       "I noticed a $49.99 charge on my account that I don’t recognize. Can you help me understand what this is for? I thought my subscription was supposed to be $39.99 per month. I’m concerned about potential...",
//     time: "Today 18:56",
//     unread: true
//   },
//   {
//     id: 2,
//     name: "Guest",
//     action: "has created a new ticket",
//     message:
//       "I can’t log into my account on加载 mobile app. I’ve tried resetting my password three times, but I keep getting an error message that says ‘Authentication Failed’.",
//     time: "2 days ago 03:11",
//     unread: true
//   },
//   {
//     id: 3,
//     name: "Guest",
//     action: "has created a new ticket",
//     message:
//       "I’m experiencing a serious issue with my account. I can’t access my recovery email, and the system won’t let me reset my password. This account contains important professional documents and client infor...",
//     time: "Sunday 12:15",
//     unread: true
//   },
//   {
//     id: 4,
//     name: "Guest",
//     action: "has created a new ticket",
//     message:
//       "I purchased a yearly subscription three months ago, but our company’s needs have changed dramatically. The service is no longer useful for our current workflow. I’d like to discuss a partial ref...",
//     time: "24.03.2025 12:15",
//     unread: false
//   }
// ]

function MainPage() {
  // Helper
  const navigate = useNavigate()

  // Store
  // const { isCreateView, isCreateProjectView, isSettingsView } = useMainPageStore()
  const { setUser } = useAuthStore()

  // State
  // const [loggingOut, setLoggingOut] = useState(false)

  // Fetch user data
  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["user"],
    queryFn: authApi.getUser
  })
  console.log("User data:", user)
  // Effects
  useEffect(() => {
    if (!getAuthToken()) {
      navigate("/login")
    }
  }, [navigate])

  useEffect(() => {
    if (user) setUser(user)
  }, [user])

  // Functions
  // const handleLogout = async () => {
  //   try {
  //     setLoggingOut(true)
  //     removeAuthTokens()
  //     navigate("/login")
  //   } catch (e) {
  //     console.log(e)
  //   } finally {
  //     setLoggingOut(false)
  //   }
  // }

  // const displayName = isUserLoading ? null : user?.full_name || ""

  return (
    // <div className="flex min-h-screen bg-white dark:bg-black">
    //   <div className="fixed top-0 left-0 flex h-screen w-52 flex-col justify-between border-gray-20 border-r">
    //     <div className="flex items-center justify-between p-10">
    //       <div className="flex items-center gap-2">
    //         <Logo />
    //         <span className="font-semibold">Capsul</span>
    //       </div>
    //     </div>

    //     <div className="flex flex-col gap-6 p-10">
    //       <NotificationPopover notifications={notifications} />
    //       <ProfilePopover onLogout={handleLogout} loggingOut={loggingOut} />
    //     </div>
    //   </div>

    // </div>
    <main className="ml-64 h-screen flex-1 overflow-y-auto px-4 py-8">
      {/* {isCreateView ? (
        <AddOrganizationForm />
      ) : isSettingsView ? (
        <OrganizationSettings />
      ) : isCreateProjectView ? (
        <CreateProjectForm />
      ) : ( */}
      <div className="mx-auto max-w-[1000px]">
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2">
            <h1 className="flex gap-2 font-bold text-4xl">
              Hey {isUserLoading ? <Skeleton className="h-10 w-[280px]" /> : capitalizeFirstLetter(user?.full_name || "")}👋
            </h1>
            <div className="inline-flex h-[36px] w-[77px] items-center justify-center gap-2.5 rounded-sm bg-gradient-to-br from-orange-300 via-fuchsia-500 to-teal-400 px-2 py-1.5 text-white">
              <div className="justify-start text-nowrap text-center font-['Inter'] font-normal text-base text-text-base-static-white leading-normal">
                Pro Plan
              </div>
            </div>
          </div>
          <p className="text-dark-gray dark:text-white">
            Welcome to Capsul! We're here to help. If you have any questions or need assistance, don't hesitate to{" "}
            <a href="/" className="dark: text-[#14151A] underline dark:text-white">
              reach out
            </a>
            .
          </p>
        </div>

        <Card className="mb-8 rounded-3xl shadow-section">
          <Tabs defaultValue="my-inbox" className="w-full">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <Avatar className="size-9">
                  <AvatarImage src="" />
                  <AvatarFallback>MT</AvatarFallback>
                </Avatar>
                <h2 className="font-semibold">My tickets</h2>
              </div>
              <TabsList className="rounded-full p-px">
                <TabsTrigger value="my-inbox" className="h-full rounded-full">
                  My inbox
                </TabsTrigger>
                <TabsTrigger value="unread" className="h-full rounded-full">
                  Unread
                </TabsTrigger>
                <TabsTrigger value="mentioned" className="h-full rounded-full">
                  Mentioned
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent
              value="my-inbox"
              className="m-5 min-h-[84px] rounded-lg bg-[#F7F7F8] p-8 text-center text-gray-500 dark:bg-neutral-800 dark:text-white"
            >
              <span className="text-sm">No tickets yet!</span>
            </TabsContent>
            <TabsContent value="unread" className="m-5 min-h-[84px] rounded-lg bg-[#F7F7F8] p-8 text-center text-gray-500">
              <span className="text-sm">No unread tickets</span>
            </TabsContent>
            <TabsContent value="overdue" className="m-5 min-h-[84px] rounded-lg bg-[#F7F7F8] p-8 text-center text-gray-500">
              <span className="text-sm">No overdue tickets</span>
            </TabsContent>
            <TabsContent value="mentioned" className="m-5 min-h-[84px] rounded-lg bg-[#F7F7F8] p-8 text-center text-gray-500">
              <span className="text-sm">No mentions</span>
            </TabsContent>
          </Tabs>
        </Card>

        <OrganizationCard />
      </div>
      {/* )} */}
    </main>
  )
}

export default MainPage
