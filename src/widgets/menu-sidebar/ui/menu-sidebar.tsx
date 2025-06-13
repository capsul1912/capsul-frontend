import avatarImage from "@/assets/images/avatar.png"
import { useFetchIntegrations } from "@/entities/integrations/api/use-fetch-integrations"
import { useFetchTeams } from "@/entities/team/api/use-fetch-teams.ts"
import { useFetchTickets } from "@/entities/ticket/api/use-fetch-tickets.ts"
import { useChatStore } from "@/features/chat/model/chat.store.ts"
import { SessionCardItemSkeleton } from "@/pages/main-page/components/sidebar-menu-button-skeleton.tsx"
import { SessionCardItem } from "@/pages/main-page/components/sidebar-menu-button.tsx"
import TicketStatusSelect from "@/pages/main-page/components/ticket-status-select.tsx"
import { UnassignedToUser } from "@/shared/icons"
import { capitalizeFirstLetter } from "@/shared/lib/helpers/capitalize-first-letter"
import { useAuthStore } from "@/shared/lib/store/auth-store.ts"
import { Separator } from "@/shared/ui/separator.tsx"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider
} from "@/shared/ui/sidebar.tsx"
import { useTicketsStore } from "@/widgets/menu-sidebar/model/store.ts"
import { AtSign, MessageCircle, User2Icon, Users } from "lucide-react" // Added MessageCircle
import { type ReactNode, useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom"

export type IMainFilterType = "MY_INBOX" | "ALL" | "UNASSIGNED" | "MENTIONS" | "AGENT"

interface IMainFilter {
  title: string
  icon: ReactNode
  type: IMainFilterType
}

const mainFilterMenus: IMainFilter[] = [
  {
    title: "My inbox",
    icon: <img src={avatarImage} alt="" className="size-[18px]" />,
    type: "MY_INBOX"
  },
  {
    title: "All",
    icon: <Users />,
    type: "ALL"
  },
  {
    title: "Unassigned",
    icon: <UnassignedToUser />,
    type: "UNASSIGNED"
  },
  {
    title: "Mentions",
    icon: <AtSign />,
    type: "MENTIONS"
  },
  {
    title: "Agent",
    icon: <User2Icon />,
    type: "AGENT"
  }
]

// interface IPinnedChat {
//     id: number;
//     email?: string;
//     user?: string;
//     uuid: string;
//     message: string;
//     type: 'telegram' | 'whatsapp';
// }

// const pinned: IPinnedChat[] = [
//     {
//         id: 1,
//         email: 'Qulpiddin@gmail.com',
//         uuid: '9284912',
//         message: 'Iltimos menga manbalar royhatini bersangiz',
//         type: 'telegram',
//     },
//     {
//         id: 2,
//         user: 'Temurbek Shonazarov',
//         uuid: '1023444',
//         message: 'Ha shunday lekin menda boshqa muammo ham borda',
//         type: 'whatsapp',
//     },
// ];

export default function MenuSidebar() {
  // Helpers
  const { projectId } = useParams()
  const [params, setTicketIdParam] = useSearchParams()
  const ticketId = params.get("ticketId")

  // Store
  const { user } = useAuthStore()
  const { setFilters, filters } = useTicketsStore()
  const { setCurrentTicket, setChatLoading } = useChatStore()
  // const selectedProjectId = useProjectStore((state) => state.selectedProjectId);

  // Queries
  const { data: teamsResponse, isPending: teamsLoading } = useFetchTeams()
  const { data: ticketsResponse, isPending: ticketsLoading } = useFetchTickets({
    team: filters.teamId || undefined,
    status: filters.status && filters.status !== "ALL" ? filters.status : undefined,
    assignee: filters.mainFilter === "MY_INBOX" && user?.id ? user?.id : undefined,
    mentioned_user: filters.mainFilter === "MENTIONS" && user?.id ? user?.id : undefined,
    session__project: projectId || undefined
  })
  const { data: integrationsResponse, isPending: integrationsLoading } = useFetchIntegrations({
    project_id: projectId
  })

  const teams = teamsResponse?.results
  const tickets = ticketsResponse?.results
  const integrations = integrationsResponse?.results

  // Effects
  useEffect(() => {
    if (tickets?.length) {
      if (!ticketId) {
        setCurrentTicket(tickets[0])
        setTicketIdParam(prev => {
          const params = new URLSearchParams(prev)
          params.set("ticketId", tickets[0].id)
          return params
        })
      } else {
        setCurrentTicket(tickets.find(t => t.id === ticketId) || null)
      }
    }
  }, [tickets])

  // Sync ticketsLoading with chatLoading in Zustand store
  useEffect(() => {
    setChatLoading(ticketsLoading)
  }, [ticketsLoading])

  return (
    <>
      <SidebarProvider className={"relative z-[100] w-[256px]"}>
        <Sidebar variant="sidebar" collapsible="icon" className={"absolute w-full overflow-hidden border-none"}>
          <SidebarContent className="bg-zinc-100 p-2">
            <SidebarGroup>
              <SidebarGroupContent>
                <div className="flex flex-col text-left">
                  <h2 className={"mt-1 font-semibold text-xl text-zinc-900 transition"}>Oybek AI</h2>
                </div>
                <SidebarMenu>
                  <div className={"mt-7 mb-4 flex items-center justify-between text-[#6C6E79] text-sm"}>
                    Inboxes
                    {/*<button className="flex size-6 items-center justify-center rounded hover:bg-zinc-200">*/}
                    {/*  <PlusIcon size={17} />*/}
                    {/*</button>*/}
                  </div>
                  {mainFilterMenus.map((item, index) => (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton
                        onClick={() => setFilters({ mainFilter: item.type, teamId: null })}
                        className={`${
                          item.type === filters.mainFilter ? "!border-[#B4C7F8] hover:!bg-white bg-white hover:border-zinc200" : ""
                        } active:!bg-white select-none rounded-xl border border-transparent py-[17px] hover:bg-zinc-200/30`}
                        asChild
                      >
                        <div className="cursor-pointer">
                          {item.icon}
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
                <SidebarMenu className="mt-3">
                  <div className={"mt-7 mb-4 flex items-center justify-between text-[#6C6E79] text-sm"}>
                    Teams
                    {/*<button className="flex size-6 items-center justify-center rounded hover:bg-zinc-200">*/}
                    {/*  <PlusIcon size={17} />*/}
                    {/*</button>*/}
                  </div>
                  {teamsLoading ? (
                    <div className="!bg-zinc-200 flex h-9 w-full animate-pulse items-center rounded-lg px-2">
                      <div className="h-4 w-[72%] rounded-sm bg-zinc-300" />
                    </div>
                  ) : (
                    teams?.map(team => (
                      <SidebarMenuItem key={team.id}>
                        <SidebarMenuButton
                          onClick={() => setFilters({ teamId: team.id, mainFilter: null })}
                          className={`${
                            team.id === filters.teamId ? "!border-zinc-200 hover:!bg-white bg-white" : ""
                          } active:!bg-white rounded-xl border border-transparent py-[17px] hover:bg-zinc-200/30`}
                          asChild
                        >
                          <div className="cursor-pointer">
                            <span>{team.name}</span>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                  )}
                </SidebarMenu>
                <SidebarMenu className="mt-3">
                  <div className={"mt-7 mb-4 flex items-center justify-between text-[#6C6E79] text-sm"}>
                    Integrations
                    {/*<button className="flex size-6 items-center justify-center rounded hover:bg-zinc-200">*/}
                    {/*  <PlusIcon size={17} />*/}
                    {/*</button>*/}
                  </div>
                  {integrationsLoading ? (
                    <div className="!bg-zinc-200 flex h-9 w-full animate-pulse items-center rounded-lg px-2">
                      <div className="h-4 w-[72%] rounded-sm bg-zinc-300" />
                    </div>
                  ) : (
                    integrations?.map(integration => (
                      <SidebarMenuItem key={integration.id}>
                        <SidebarMenuButton
                          onClick={() =>
                            setFilters({
                              integrationId: String(integration.id),
                              mainFilter: null
                            })
                          }
                          className={`${
                            integration.id === filters.integrationId ? "!border-zinc-200 hover:!bg-white bg-white" : ""
                          } active:!bg-white rounded-xl border border-transparent py-[17px] hover:bg-zinc-200/30`}
                          asChild
                        >
                          <div className="flex cursor-pointer items-center gap-2">
                            {integration.integration_type === "telegram" ? (
                              <MessageCircle size={18} className="text-blue-500" />
                            ) : (
                              <Users size={18} className="text-gray-500" /> // Default icon for other types
                            )}
                            <span>{capitalizeFirstLetter(integration.integration_type)}</span>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
      <SidebarProvider className={"!transition relative z-[100] max-w-[350px] duration-500"}>
        <Sidebar
          variant="sidebar"
          collapsible="icon"
          className={"!w-full !transition absolute overflow-hidden border border-[#DEE0E3] border-t-0 duration-500"}
        >
          <SidebarContent className="!bg-white">
            <SidebarGroup className="p-0">
              <SidebarGroupContent>
                <div className="flex items-center justify-between px-4 py-[14px]">
                  <h2 className={"font-semibold text-[#14151A] text-base transition"}>
                    {filters.mainFilter
                      ? mainFilterMenus.find(i => i.type === filters.mainFilter)?.title
                      : teams?.find(team => team.id === filters.teamId)?.name}
                  </h2>
                  <TicketStatusSelect />
                </div>
                <Separator />
                <SidebarMenu className="h-[calc(100vh-70px)] overflow-auto p-4">
                  {/*{pinned.map((chat, i) => (*/}
                  {/*    <SidebarMenuItem key={i} className="-mt-[5px] hidden">*/}
                  {/*        <SidebarMenuButton*/}
                  {/*            className={cn(*/}
                  {/*                '!border-[#DEE0E3] hover:!border-[#B4C7F8] h-auto rounded-none border bg-[#F7F7F8] px-1.5 py-1.5 hover:bg-[#F5F5F5]',*/}
                  {/*                i === 0 ? 'rounded-tl-lg rounded-tr-lg' : '',*/}
                  {/*                i === pinned.length - 1 ? 'rounded-br-lg rounded-bl-lg' : '',*/}
                  {/*            )}*/}
                  {/*            asChild*/}
                  {/*        >*/}
                  {/*            <button className="flex flex-col">*/}
                  {/*                <div className="flex w-full items-center justify-between">*/}
                  {/*                    <div className="flex items-center gap-2">*/}
                  {/*                        {i % 4 === 0 ? (*/}
                  {/*                            <div className="relative">*/}
                  {/*                                <img src={avatarImage} alt="" className="size-8" />*/}
                  {/*                                <ChatFromType type={chat.type} />*/}
                  {/*                            </div>*/}
                  {/*                        ) : (*/}
                  {/*                            <div className="relative size-8">*/}
                  {/*                                <Avatar className="relative size-8">*/}
                  {/*                                    <AvatarFallback className="bg-zinc-200">*/}
                  {/*                                        <Identicon value={chat.uuid} size={80} />*/}
                  {/*                                    </AvatarFallback>*/}
                  {/*                                </Avatar>*/}
                  {/*                                <ChatFromType type={chat.type} />*/}
                  {/*                            </div>*/}
                  {/*                        )}*/}
                  {/*                        <p className="flex items-center gap-2 font-semibold text-[#6F6D74] text-sm">*/}
                  {/*                            {i % 4 === 0 ? 'Jane Smith' : chat.uuid}*/}
                  {/*                            <PinIcon className="min-size-[14px] max-size-[16px]" />*/}
                  {/*                        </p>*/}
                  {/*                    </div>*/}
                  {/*                    <div className="flex items-center gap-2">*/}
                  {/*                        <div className="inline text-[#14151A] text-[10px]">*/}
                  {/*                            {formatDistanceToNow(new Date(), {*/}
                  {/*                                addSuffix: true,*/}
                  {/*                            })}*/}
                  {/*                        </div>*/}
                  {/*                        <button>*/}
                  {/*                            <CustomEllipsisIcon className="size-4" />*/}
                  {/*                        </button>*/}
                  {/*                    </div>*/}
                  {/*                </div>*/}
                  {/*                <div*/}
                  {/*                    className="flex w-full flex-grow items-center truncate text-ellipsis text-[#696D7C] text-xs">{chat.message}</div>*/}
                  {/*            </button>*/}
                  {/*        </SidebarMenuButton>*/}
                  {/*    </SidebarMenuItem>*/}
                  {/*))}*/}

                  {ticketsLoading
                    ? Array.from({ length: 15 }).map((_, i) => <SessionCardItemSkeleton key={i} />)
                    : tickets?.map((ticket, i) => <SessionCardItem chat={ticket} key={i} index={i} />)}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </>
  )
}
