"use client"

import { Button } from "@/shared/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/shared/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { type ReactNode, useId, useState } from "react"

// const items = [
//     {
//         value: 'analytics platform',
//         label: 'Analytics Platform',
//         icon: LineChart,
//         number: 2451,
//     },
//     {
//         value: 'ai services',
//         label: 'AI Services',
//         icon: Brain,
//         number: 1832,
//     },
//     {
//         value: 'database systems',
//         label: 'Database Systems',
//         icon: Database,
//         number: 1654,
//     },
//     {
//         value: 'compute resources',
//         label: 'Compute Resources',
//         icon: Cpu,
//         number: 943,
//     },
//     {
//         value: 'network services',
//         label: 'Network Services',
//         icon: Network,
//         number: 832,
//     },
//     {
//         value: 'web services',
//         label: 'Web Services',
//         icon: Globe,
//         number: 654,
//     },
//     {
//         value: 'monitoring tools',
//         label: 'Monitoring Tools',
//         icon: Search,
//         number: 432,
//     },
//     {
//         value: 'server management',
//         label: 'Server Management',
//         icon: Server,
//         number: 321,
//     },
//     {
//         value: 'infrastructure',
//         label: 'Infrastructure',
//         icon: Blocks,
//         number: 234,
//     },
//     {
//         value: 'frontend services',
//         label: 'Frontend Services',
//         icon: Layout,
//         number: 123,
//     },
// ];
interface IOption {
  value: string
  label: string
  icon?: ReactNode
  number?: number
}

interface IProps {
  options: IOption[]
  placeholder?: string
  searchPlaceholder?: string
  defaultValue?: string
}

export default function SearchableSelect({ options, placeholder, searchPlaceholder, defaultValue }: IProps) {
  const id = useId()
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>(defaultValue || "")

  return (
    <div className="flex-grow space-y-2">
      {/*<Label htmlFor={id}>Options with icon and number</Label>*/}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-background bg-white px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20 active:bg-zinc-100"
          >
            {value ? (
              <span className="flex min-w-0 items-center gap-2">
                {(() => {
                  const selectedItem = options.find(item => item.value === value)
                  if (selectedItem) {
                    return selectedItem.icon
                    // return (
                    //     <Icon className="h-4 w-4 text-muted-foreground" />
                    // );
                  }
                  return null
                })()}
                <span className="truncate">{options.find(item => item.value === value)?.label}</span>
              </span>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            <ChevronDownIcon strokeWidth={2} className="size-4 shrink-0 text-muted-foreground/80" aria-hidden="true" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0" align="start">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>No service found.</CommandEmpty>
              <CommandGroup>
                {options.map(item => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={currentValue => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      {item.label}
                    </div>
                    {/*<span className="text-xs text-muted-foreground">*/}
                    {/*    {item.number.toLocaleString()}*/}
                    {/*</span>*/}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
