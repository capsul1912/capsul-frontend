import { usePostNewEmailMutation } from "@/features/account/api/account-api.ts"
import { MainButton } from "@/shared/ui/buttons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form"
import { Input } from "@/shared/ui/input.tsx"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import * as z from "zod"

const formSchema = z.object({
  email: z.string().email().min(1, "Current password is required")
})

export function ResetEmailPage() {
  // Helpers
  const params = useParams()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ""
    }
  })

  // Queries
  const [postEmail, { isLoading }] = usePostNewEmailMutation()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // This is where you would typically make an API call to update the password
      // For this example, we'll just simulate a successful update
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (params.oneTimePassword && params.userId) {
        postEmail({
          email: values.email,
          token: params.oneTimePassword,
          uid: params.userId
        })
      }
      // toast({
      //     title: 'Password updated',
      //     description: 'Your password has been successfully updated.',
      // });

      form.reset()
    } catch (error) {
      console.log(error)
      // toast({
      //     title: 'Error',
      //     description: 'There was a problem updating your password.',
      //     variant: 'destructive',
      // });
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Update Email</CardTitle>
          <CardDescription>Change your account email here.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <MainButton loading={isLoading} type="submit" className="w-full">
                {isLoading ? "Updating..." : "Update Email"}
              </MainButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
