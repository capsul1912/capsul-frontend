import { AccountForm } from "@/features/account"
import { ResizablePanel } from "@/shared/ui/resizable.tsx"

interface MailProps {
  defaultLayout?: number[] | undefined
}

export default function AccountPage1({ defaultLayout = [20, 32, 48] }: MailProps) {
  // Helper Hooks

  // // States
  // const [selectedSession, setSelectedSession] = useState<IChatSession | null>(
  //     null
  // );
  // const [search, setSearch] = useState('');
  //
  // // Selectors
  // const currentProject = useSelector(
  //     state => state.projectReducer.currentProject
  // );
  //
  // // Queries
  // const { data: chatSessions, isLoading } = useFetchChatSessionQuery(
  //     (currentProject as IChatbotProject)?.id,
  //     { skip: !currentProject?.id }
  // );
  //
  // // Effects
  // useEffect(() => {
  //     if (chatSessions?.length) setSelectedSession(chatSessions?.[0]);
  // }, [chatSessions]);

  // const sessions = useMemo(() => {
  //     if (!search) return chatSessions;
  //     if (chatSessions) {
  //         return chatSessions.filter(s => s.session_id.startsWith(search));
  //     }
  // }, [search, chatSessions]);

  return (
    <ResizablePanel defaultSize={defaultLayout[1]} minSize={30} className="h-screen p-6">
      <AccountForm />
    </ResizablePanel>
  )
}
