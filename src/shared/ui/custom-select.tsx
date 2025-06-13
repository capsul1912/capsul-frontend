import { cn } from "@/shared/lib/utils"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import type { SelectTriggerProps } from "@radix-ui/react-select"
import { type ReactNode, useState } from "react"

const optionsDefault = [
  { label: "Engineering", value: "engineering", icon: "💻" },
  { label: "Support", value: "support", icon: "💪" },
  { label: "Backoffice", value: "backoffice", icon: "💼" }
]

interface IOption {
  label: string
  value: string
  icon?: ReactNode
}

interface IProps extends SelectTriggerProps {
  options?: IOption[]
  defaultValue?: string
}

export function CustomSelect({ options = optionsDefault, defaultValue, ...props }: IProps) {
  // const [search, setSearch] = useState('');
  const [selected, setSelected] = useState("")
  console.warn(selected)
  // const filteredOptions = options.filter(option =>
  //     option.label.toLowerCase().includes(search.toLowerCase())
  // );

  return (
    <Select onValueChange={setSelected} defaultValue={defaultValue}>
      <SelectTrigger {...props} className={cn("w-[200px] border-gray-300 border-none bg-zinc-100", props.className)}>
        <SelectValue placeholder={<span className="text-gray-400">Not assigned</span>} />
      </SelectTrigger>
      <SelectContent className="rounded-md border border-gray-200 shadow-md">
        {/*<Input*/}
        {/*    placeholder="Search..."*/}
        {/*    value={search}*/}
        {/*    onChange={e => setSearch(e.target.value)}*/}
        {/*    className="border-gray-300"*/}
        {/*/>*/}
        <SelectGroup>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value} className="flex cursor-pointer items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="*:size-4">{option.icon}</span>
                <span>{option.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
