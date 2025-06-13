import { usePostNewPasswordMutation } from "@/features/account/api/account-api.ts"
import { MainButton } from "@/shared/ui/buttons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form"
import { Input } from "@/shared/ui/input.tsx"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import * as z from "zod"

const formSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password")
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  })

export function ResetPassPage() {
  // Helpers
  const params = useParams()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  })

  // Queries
  const [postNewPassword, { isLoading }] = usePostNewPasswordMutation()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // This is where you would typically make an API call to update the password
      // For this example, we'll just simulate a successful update
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (params.oneTimePassword && params.userId) {
        postNewPassword({
          password: values.confirmPassword,
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
          <CardTitle>Update Password</CardTitle>
          <CardDescription>Change your account password here.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <MainButton loading={isLoading} type="submit" className="w-full">
                {isLoading ? "Updating..." : "Update Password"}
              </MainButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
