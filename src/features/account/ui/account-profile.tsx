import { useFetchAccountQuery } from "@/features/account/api/account-api.ts"
import type { IUser } from "@/features/form-specific/model/types.ts"
import { storageKeys } from "@/shared/constants"
import { getFromLocalStorage } from "@/shared/lib/helpers"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar.tsx"
import { Button } from "@/shared/ui/button.tsx"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card.tsx"
import { Input } from "@/shared/ui/input.tsx"
import { Label } from "@/shared/ui/label.tsx"
import { type ChangeEvent, useEffect, useState } from "react"

function AccountProfile() {
  // States
  const [avatar, setAvatar] = useState("/placeholder.svg?height=100&width=100")

  // Queries
  const operator = getFromLocalStorage<IUser>(storageKeys.USER_DATA)
  const { data, isSuccess } = useFetchAccountQuery(
    { id: operator?.id || "" },
    {
      skip: !operator?.id
    }
  )

  // Effects
  useEffect(() => {
    if (isSuccess && data) {
      setAvatar(data.image)
    }
  }, [data])

  // Functions
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = e => {
        setAvatar(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Manage your public profile information</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Avatar className="mb-4 h-32 w-32">
          <AvatarImage src={avatar} alt="Profile picture" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Label htmlFor="avatar-upload" className="cursor-pointer">
          <Input id="avatar-upload" type="file" className="sr-only w-auto" onChange={handleAvatarChange} accept="image/*" />
          <Button variant="outline" className="select-none">
            Change Picture
          </Button>
        </Label>
      </CardContent>
    </Card>
  )
}

export default AccountProfile
