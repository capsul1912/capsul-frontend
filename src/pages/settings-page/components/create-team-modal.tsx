import { useCreateTeam } from "@/shared/lib/api/use-teams"
import { Button } from "@/shared/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form"
import { Input } from "@/shared/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  teamName: z.string().min(1, { message: "Team name is required" })
})

interface CreateTeamModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateTeamModal({ isOpen, onClose }: CreateTeamModalProps) {
  const { mutate: createTeam, isPending, isError, error } = useCreateTeam() // useCreateTeam hookidan foydalanamiz
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: ""
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createTeam(
      { name: values.teamName },
      {
        onSuccess: response => {
          console.log("Team created successfully:", response)
          form.reset()
          onClose()
        }
      }
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create team</DialogTitle>
          <DialogDescription>Create a team to fast work.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="teamName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team name</FormLabel>
                  <FormControl>
                    <Input placeholder="Team name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isError && <p className="text-red-500 text-sm">{error?.message || "Error creating team"}</p>}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Creating..." : "Create"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
