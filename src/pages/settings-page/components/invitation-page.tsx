import { type ITeam, useTeams } from "@/shared/lib/api/use-teams"
import { type IUser, useDeleteUser, useUpdateUser, useUsers } from "@/shared/lib/api/use-users"
import { Button } from "@/shared/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { Edit2, Trash2, UserPlus } from "lucide-react"
import { useState } from "react"
import CreateTeamModal from "./create-team-modal"

export default function InvitationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUserId, setEditingUserId] = useState<number | null>(null)

  const { data: users } = useUsers()
  const { data: teams } = useTeams()
  const { mutate: updateUser } = useUpdateUser()
  const { mutate: deleteUser } = useDeleteUser()

  const handleRoleChange = (user: IUser, value: "admin" | "user") => {
    const payload = {
      email: user.email,
      username: user.username,
      full_name: user.full_name,
      password: user.password || "dummy_password", // API talabiga ko‘ra, agar password yo‘q bo‘lsa, dummy qiymat
      role: value,
      team: user.team ? user.team.toString() : null,
      is_active: user.is_active,
      is_staff: user.is_staff
    }

    updateUser(
      { id: user.id, payload },
      {
        onSuccess: () => {
          setEditingUserId(null)
          // toast.success("Role updated successfully")
        },
        onError: (error: any) => {
          console.error("Failed to update role:", error)
          const errorMessage = error?.response?.data?.errors?.map((err: any) => err.detail).join(", ") || "Failed to update role"
          // toast.error(errorMessage)
          console.error("Failed to update role:", errorMessage)
        }
      }
    )
  }

  const handleTeamChange = (user: IUser, teamName: string) => {
    const selectedTeam = teams?.results?.find((team: ITeam) => team.name === teamName)
    if (selectedTeam) {
      const payload = {
        email: user.email,
        username: user.username,
        full_name: user.full_name,
        password: user.password || "dummy_password", // API talabiga ko‘ra
        role: user.role,
        team: selectedTeam.id.toString(),
        is_active: user.is_active,
        is_staff: user.is_staff
      }

      updateUser(
        { id: user.id, payload },
        {
          onSuccess: () => {
            setEditingUserId(null)
            // toast.success("Team updated successfully")
          },
          onError: (error: any) => {
            console.error("Failed to update team:", error)
            const errorMessage = error?.response?.data?.errors?.map((err: any) => err.detail).join(", ") || "Failed to update team"
            // toast.error(errorMessage)
            console.error("Failed to update team:", errorMessage)
          }
        }
      )
    } else {
      // toast.error("Selected team not found")
      console.error("Selected team not found")
    }
  }

  const handleDeleteUser = (userId: number) => {
    deleteUser(userId, {
      onSuccess: () => {
        // toast.success(`User ${userId} deleted successfully`)
      },
      onError: (error: any) => {
        console.error("Failed to delete user:", error)
        // toast.error("Failed to delete user")
      }
    })
  }

  const handleEditToggle = (userId: number) => {
    setEditingUserId(editingUserId === userId ? null : userId)
  }

  const getTeamNameById = (teamId: string | null): string => {
    if (!teamId) return ""
    const team = teams?.results?.find((team: ITeam) => team.id.toString() === teamId)
    return team?.name || ""
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between border-b-2 pb-5">
        <h1 className="px-4 font-medium text-xl">Users and team</h1>
        <div className="flex items-center gap-2">
          <Button onClick={() => setIsModalOpen(true)} variant="outline" className="text-sm">
            Team
          </Button>
          <Button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600">
            <UserPlus className="h-4 w-4" />
            <span>Invite user</span>
          </Button>
        </div>
      </div>
      <div className="pl-4">
        <Table className="px-4">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.results?.map((user: IUser) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell className="text-blue-500">{user.email}</TableCell>
                <TableCell>
                  <Select
                    value={user.role ?? ""}
                    onValueChange={value => handleRoleChange(user, value as "admin" | "user")}
                    disabled={editingUserId !== user.id}
                  >
                    <SelectTrigger className="w-28">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    value={getTeamNameById(user.team ? user.team.toString() : null)}
                    onValueChange={value => handleTeamChange(user, value)}
                    disabled={editingUserId !== user.id}
                  >
                    <SelectTrigger className="w-28">
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams?.results?.map((team: ITeam) => (
                        <SelectItem key={team.id} value={team.name}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500" onClick={() => handleEditToggle(user.id)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDeleteUser(user.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <CreateTeamModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
