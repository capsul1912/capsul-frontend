import { useFetchAccountQuery, usePostAccountMutation } from "@/features/account/api/account-api.ts"
import type { IUser } from "@/features/form-specific/model/types.ts"
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from '@/shared/ui/select.tsx';
import { storageKeys } from "@/shared/constants"
import { SpinnerIcon } from "@/shared/icons"
import { getFromLocalStorage } from "@/shared/lib/helpers"
import { MainButton } from "@/shared/ui/buttons"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form.tsx"
import { Input } from "@/shared/ui/input.tsx"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const accountFormSchema = z.object({
  first_name: z.string().min(2, "Name must be at least 2 characters."),
  last_name: z.string().min(2, "Name must be at least 2 characters."),
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters."
    })
    .max(30, {
      message: "Username must not be longer than 30 characters."
    })
  // email: z.string().email(),
  // language: z.string({
  //     required_error: 'Please select a language.',
  // }),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = getFromLocalStorage(storageKeys.USER_DATA) || {}

function AccountForm() {
  // Helpers
  const operator = getFromLocalStorage<IUser>(storageKeys.USER_DATA)
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues
  })

  // Queries
  const [postAccount, { isLoading: updating }] = usePostAccountMutation()
  const { data, isSuccess, isLoading } = useFetchAccountQuery(
    { id: operator?.id as string },
    {
      skip: !operator?.id
    }
  )

  // Effects
  useEffect(() => {
    if (isSuccess && data) {
      form.reset(data)
    }
  }, [data])

  function onSubmit(data: AccountFormValues) {
    console.log(data)
    if (operator?.id) {
      postAccount({
        ...data,
        id: operator.id
        // image: 'https://images.hdqwalls.com/download/bright-orange-and-dark-abstract-8k-ay-2880x1800.jpg',
      })
        .unwrap()
        .then(res => {
          console.log(res)
        })
        .catch()
      // toast({
      //     title: 'You submitted the following values:',
      //     description: (
      //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //             <code className="text-white">
      //                 {JSON.stringify(data, null, 2)}
      //             </code>
      //         </pre>
      //     ),
      // });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 items-end gap-2">
        <FormField
          control={form.control}
          name="first_name"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Firstname</FormLabel>
              <FormControl>
                <Input placeholder="Firstname" {...field} />
              </FormControl>
              {isLoading ? <SpinnerIcon className="absolute right-0 bottom-0 size-9" /> : null}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Lastname</FormLabel>
              <FormControl>
                <Input placeholder="Lastname" {...field} />
              </FormControl>
              {isLoading ? <SpinnerIcon className="absolute right-0 bottom-0 size-9" /> : null}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              {isLoading ? <SpinnerIcon className="absolute right-0 bottom-0 size-9" /> : null}
              <FormMessage />
            </FormItem>
          )}
        />
        {/*<FormField*/}
        {/*    control={form.control}*/}
        {/*    name="email"*/}
        {/*    render={({ field }) => (*/}
        {/*        <FormItem>*/}
        {/*            <FormLabel>Email</FormLabel>*/}
        {/*            <FormControl>*/}
        {/*                <Input placeholder="Email" {...field} />*/}
        {/*            </FormControl>*/}
        {/*            <FormMessage />*/}
        {/*        </FormItem>*/}
        {/*    )}*/}
        {/*/>*/}
        {/*<FormField*/}
        {/*    control={form.control}*/}
        {/*    name="language"*/}
        {/*    render={({ field }) => (*/}
        {/*        <FormItem className="flex flex-col">*/}
        {/*            <FormLabel>Language</FormLabel>*/}
        {/*            <Select*/}
        {/*                onValueChange={field.onChange}*/}
        {/*                defaultValue={field.value}*/}
        {/*            >*/}
        {/*                <FormControl>*/}
        {/*                    <SelectTrigger className="text-primary">*/}
        {/*                        <SelectValue placeholder="" />*/}
        {/*                    </SelectTrigger>*/}
        {/*                </FormControl>*/}
        {/*                <SelectContent>*/}
        {/*                    {languageOptions.map(language => (*/}
        {/*                        <SelectItem*/}
        {/*                            value={language.value.toString()}*/}
        {/*                        >*/}
        {/*                            {language.title}*/}
        {/*                        </SelectItem>*/}
        {/*                    ))}*/}
        {/*                </SelectContent>*/}
        {/*            </Select>*/}
        {/*            /!*{error?.message && (*!/*/}
        {/*            /!*    <p className="text-[0.8rem] font-medium text-destructive">*!/*/}
        {/*            /!*        {t(error?.message)}*!/*/}
        {/*            /!*    </p>*!/*/}
        {/*            /!*)}*!/*/}
        {/*        </FormItem>*/}
        {/*    )}*/}
        {/*/>*/}
        <MainButton type="submit" loading={updating}>
          Update account
        </MainButton>
      </form>
    </Form>
  )
}

export default AccountForm
