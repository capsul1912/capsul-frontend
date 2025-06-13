import { cn } from "@/shared/lib/helpers"
import { buttonVariants } from "@/shared/ui/button.tsx"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip.tsx"
import type { LucideIcon } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

interface NavProps {
  isCollapsed: boolean
  links: {
    title: string
    label?: string
    path: string
    icon: LucideIcon
  }[]
}

export function Nav({ links, isCollapsed }: NavProps) {
  // Helper Hooks
  const { pathname } = useLocation()

  return (
    <div data-collapsed={isCollapsed} className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  to={link.path}
                  className={cn(
                    buttonVariants({
                      variant: pathname.endsWith(`/${link.path}`) ? "default" : "ghost",
                      size: "icon"
                    }),
                    "h-9 w-9",
                    // link.variant === 'default' &&
                    pathname.endsWith(link.path) && "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && <span className="ml-auto text-muted-foreground">{link.label}</span>}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              to={link.path}
              className={cn(
                buttonVariants({
                  // variant: link.variant,
                  variant: pathname.endsWith(`/${link.path}`) ? "default" : "ghost",
                  size: "sm"
                }),
                // link.variant === 'default' &&
                pathname.endsWith(link.path) && "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start"
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    "ml-auto",
                    // link.variant === 'default' &&
                    pathname.endsWith(`/${link.path}`) && "text-background dark:text-white"
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          )
        )}
      </nav>
    </div>
  )
}
