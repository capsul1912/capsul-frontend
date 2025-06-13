import { AccountForm, AccountProfile } from "@/features/account"
import { useChangeEmailRequestMutation, useChangePasswordRequestMutation } from "@/features/account/api/account-api.ts"
import type { IUser } from "@/features/form-specific/model/types.ts"
import { setCurrentProject, setProjects } from "@/features/project/model"
import { storageKeys } from "@/shared/constants"
import { getFromLocalStorage, removeAccessToken, removeFromSessionStorage, removeRefreshToken, removeUserFromLS } from "@/shared/lib/helpers"
import { useDispatch } from "@/shared/lib/store"
import { Button } from "@/shared/ui/button.tsx"
import { MainButton } from "@/shared/ui/buttons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card.tsx"
import { Label } from "@/shared/ui/label.tsx"
import { ResizablePanel } from "@/shared/ui/resizable.tsx"
import { Switch } from "@/shared/ui/switch.tsx"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs.tsx"
import { CheckIcon } from "@radix-ui/react-icons"
import { GithubIcon, Globe, InstagramIcon, LogOut, Settings, XIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AccountPage() {
  // Helpers
  const operator = getFromLocalStorage<IUser>(storageKeys.USER_DATA)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // States
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [emailSuccess, setEmailSuccess] = useState(false)

  // Queries
  const [changePasswordRequest, { isLoading: doingPasswordRequest, isSuccess: isPasswordRequestSuccess }] = useChangePasswordRequestMutation()
  const [changeEmailRequest, { isLoading: doingEmailRequest, isSuccess: isEmailRequestSuccess }] = useChangeEmailRequestMutation()

  // Effects
  useEffect(() => {
    if (isPasswordRequestSuccess) {
      setPasswordSuccess(true)
      setTimeout(() => {
        setPasswordSuccess(false)
      }, 6000)
    } else {
      if (isEmailRequestSuccess) {
        setEmailSuccess(true)
        setTimeout(() => {
          setEmailSuccess(false)
        }, 6000)
      }
    }
  }, [isPasswordRequestSuccess, isEmailRequestSuccess])

  // Functions
  const logout = () => {
    removeAccessToken()
    removeRefreshToken()
    dispatch(setProjects([]))
    dispatch(setCurrentProject(null))
    removeFromSessionStorage(storageKeys.CURRENT_PROJECT)
    removeUserFromLS()
    navigate("/login", { replace: true })
  }

  return (
    <ResizablePanel defaultSize={32} minSize={30} className={"h-screen"}>
      <div className="h-screen overflow-auto p-6">
        <div className="mb-6 flex items-center gap-5">
          <h1 className="font-bold text-3xl">Account Settings</h1>
          <Button variant="destructive" className="mt-1" onClick={logout}>
            Logout
          </Button>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <AccountProfile />
          <Card className="col-span-2">
            <Tabs defaultValue="general">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Account Settings</CardTitle>
                  <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  </TabsList>
                </div>
              </CardHeader>
              <CardContent>
                <TabsContent value="general">
                  <AccountForm />
                </TabsContent>
                <TabsContent value="security">
                  <div className="space-y-4">
                    {/*<div className="grid gap-2">*/}
                    {/*    <Label htmlFor="current-password">*/}
                    {/*        Current Password*/}
                    {/*    </Label>*/}
                    {/*    <Input*/}
                    {/*        id="current-password"*/}
                    {/*        type="password"*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div className="grid gap-2">*/}
                    {/*    <Label htmlFor="new-password">*/}
                    {/*        New Password*/}
                    {/*    </Label>*/}
                    {/*    <Input*/}
                    {/*        id="new-password"*/}
                    {/*        type="password"*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div className="grid gap-2">*/}
                    {/*    <Label htmlFor="confirm-password">*/}
                    {/*        Confirm New Password*/}
                    {/*    </Label>*/}
                    {/*    <Input*/}
                    {/*        id="confirm-password"*/}
                    {/*        type="password"*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div className="flex w-[390px] gap-3">
                      <div className="flex flex-col rounded-md border p-1">
                        <div className="flex h-8 w-[345px] items-center justify-center">**********************</div>
                        <MainButton
                          loading={doingPasswordRequest}
                          disabled={doingPasswordRequest || passwordSuccess}
                          className="border border-gray-300 disabled:bg-[#eee] disabled:text-[#000]"
                          onClick={() => !passwordSuccess && changePasswordRequest()}
                        >
                          {passwordSuccess ? (
                            <>
                              <div className="mr-2 flex size-5 items-center justify-center rounded-full bg-[#000] p-1">
                                <CheckIcon />
                              </div>
                              We have sent password reset link to your email.
                            </>
                          ) : (
                            "Change Password"
                          )}
                        </MainButton>
                      </div>
                      <div className="flex flex-col rounded-md border p-1">
                        <div className="flex h-8 w-[345px] items-center justify-center rounded-md">{operator?.email}</div>
                        <MainButton
                          loading={doingEmailRequest}
                          disabled={doingEmailRequest || emailSuccess}
                          className="border border-gray-300 disabled:bg-[#eee] disabled:text-[#000]"
                          onClick={() => !emailSuccess && changeEmailRequest()}
                        >
                          {emailSuccess ? (
                            <>
                              <div className="mr-2 flex size-5 items-center justify-center rounded-full bg-[#000] p-1">
                                <CheckIcon />
                              </div>
                              We have sent email reset link to your email.
                            </>
                          ) : (
                            "Change Email"
                          )}{" "}
                        </MainButton>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <div className="space-y-1">
                        <h4 className="font-medium">Two-factor Authentication</h4>
                        <p className="text-gray-500 text-sm">Add an extra layer of security to your account</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="preferences">
                  <div className="space-y-4">
                    <h3 className="font-medium">Email Notifications</h3>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="marketing-emails">Marketing emails</Label>
                      <Switch id="marketing-emails" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="security-emails">Security updates</Label>
                      <Switch id="security-emails" defaultChecked />
                    </div>
                    <h3 className="pt-4 font-medium">Connected Accounts</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <XIcon className="mr-2 h-4 w-4" />
                        Connect Twitter
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <GithubIcon className="mr-2 h-4 w-4" />
                        Connect GitHub
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <InstagramIcon className="mr-2 h-4 w-4" />
                        Connect Instagram
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Account Activity</CardTitle>
            <CardDescription>Recent activity on your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Globe className="mr-2 h-4 w-4 text-gray-500" />
                <span className="text-sm">Password changed from 192.168.1.1</span>
                <span className="ml-auto text-gray-500 text-sm">2 days ago</span>
              </div>
              <div className="flex items-center">
                <Settings className="mr-2 h-4 w-4 text-gray-500" />
                <span className="text-sm">Account settings updated</span>
                <span className="ml-auto text-gray-500 text-sm">5 days ago</span>
              </div>
              <div className="flex items-center">
                <LogOut className="mr-2 h-4 w-4 text-gray-500" />
                <span className="text-sm">Logged out from all devices</span>
                <span className="ml-auto text-gray-500 text-sm">1 week ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
            <CardDescription>Irreversible and destructive actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Delete Account</h4>
                <p className="text-gray-500 text-sm">Permanently delete your account and all of your content</p>
              </div>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ResizablePanel>
  )
}
