import Identicon from "@/shared/ui/identicon.tsx"
import SearchableSelect from "@/shared/ui/searchable-select.tsx"
import { motion } from "framer-motion"

const assigneeOptions = [
  {
    value: "1",
    label: "Javohir Kamolov",
    icon: <Identicon value={"mmappw12"} className={"mt-px size-4"} />
  },
  {
    value: "2",
    label: "Husan Erkinov",
    icon: <Identicon value={"001200d"} className={"mt-px size-4"} />
  },
  {
    value: "3",
    label: "Diyor Mamatov",
    icon: <Identicon value={"0ll200d"} className={"mt-px size-4"} />
  }
]
const teamOptions = [
  {
    value: "1",
    label: "Engineering",
    icon: <span>💻</span>
  },
  {
    value: "2",
    label: "Support",
    icon: <span>💪</span>
  },
  {
    value: "3",
    label: "Backoffice",
    icon: <span>💼</span>
  }
]

// const typeOptions = [
//   { label: "Inbox", value: "inbox", icon: <InboxIcon /> },
//   { label: "Bug", value: "bug", icon: <BugIcon /> },
//   { label: "Crash report", value: "crash", icon: <FileWarningIcon /> },
//   { label: "Roadmap", value: "roadmap", icon: <LampIcon /> },
//   { label: "dc", value: "dc", icon: <TargetIcon /> }
// ]

// const statusOptions = [
//   { label: "Open", value: "open", icon: <PanelTopOpenIcon /> },
//   {
//     label: "Done",
//     value: "done",
//     icon: (
//       <div className="size-4 rounded-full bg-green-500">
//         <CheckIcon className="stroke-transparent pt-px pl-px *:fill-white" />
//       </div>
//     )
//   }
// ]

// const priorityOptions = [
//   {
//     label: "Low",
//     value: "low",
//     icon: <div className="!size-3 rounded-full bg-green-500" />
//   },
//   {
//     label: "Medium",
//     value: "medium",
//     icon: <div className="!size-3 rounded-full bg-yellow-500" />
//   },
//   {
//     label: "High",
//     value: "high",
//     icon: <div className="!size-3 rounded-full bg-red-500" />
//   }
// ]

function ChatDetails() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 p-4">
      <div className="gap-2 space-y-2 rounded-lg border bg-[#F7F7F8] px-4 py-3 text-sm">
        <div className="flex flex-col gap-4">
          <p>Owner</p>
          <SearchableSelect defaultValue="1" options={assigneeOptions} searchPlaceholder="Search assignee" placeholder="Select a assignee" />
          {/*</div>*/}
          {/*<div className="flex items-center gap-4">*/}
          {/*    <p className="w-[80px]">Team</p>*/}
          <SearchableSelect defaultValue="1" options={teamOptions} searchPlaceholder="Search team" placeholder="Select a team" />
        </div>
      </div>
      {/* <div className="w-full space-y-5 rounded-lg border bg-white px-4 py-3 text-sm">
        <div className="flex flex-col gap-2">
          <div className="flex w-full flex-col gap-4">
            <p>Owner</p>
            <CustomSelect className="w-full" defaultValue={"inbox"} options={typeOptions} />
            <CustomSelect className="w-full" defaultValue={"open"} options={statusOptions} />
            <CustomSelect className="w-full" defaultValue={"low"} options={priorityOptions} />
          </div>
        </div>
      </div> */}
    </motion.div>
  )
}

export default ChatDetails
