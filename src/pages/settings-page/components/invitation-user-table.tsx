// InvitationTable.tsx
import type { IUser } from "@/shared/lib/api/use-users.ts"
import { Button } from "@/shared/ui/button.tsx"
import { Input } from "@/shared/ui/input.tsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select.tsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table.tsx"
import { CircleCheck, Edit2, Trash2 } from "lucide-react"
import { useState } from "react"

// Foydalanuvchi ma'lumotlari uchun interfeys

// Komponent uchun props
interface InvitationUserTableProps {
  users: IUser[]
  onDelete: (id: number) => void // Foydalanuvchini o'chirish uchun funksiya
}

const InvitationUserTable: React.FC<InvitationUserTableProps> = ({ users, onDelete }) => {
  const [editingRow, setEditingRow] = useState<number | null>(null)
  const [editedUser, setEditedUser] = useState<IUser | null>(null)
  const [disabledChecks, setDisabledChecks] = useState<number[]>([])

  const handleEdit = (user: IUser) => {
    setEditingRow(user.id)
    setEditedUser({ ...user })
  }

  const handleSave = (id: number) => {
    if (editedUser) {
      console.log("Saqlangan ma'lumotlar:", editedUser)
      setEditingRow(null)
      setEditedUser(null)
      setDisabledChecks([...disabledChecks, id])
    }
  }

  const handleDelete = (id: number) => {
    onDelete(id)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Name</TableHead>
          <TableHead className="text-left">Email</TableHead>
          <TableHead className="text-left">Role</TableHead>
          <TableHead className="text-left">Team</TableHead>
          <TableHead className="text-left">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users?.map(user => (
          <TableRow key={user.id} className={editingRow === user.id ? "bg-blue-50" : ""}>
            <TableCell>
              {editingRow === user.id ? (
                <Input
                  value={editedUser?.username || ""}
                  onChange={e =>
                    setEditedUser(prev =>
                      prev
                        ? {
                            ...prev,
                            name: e.target.value
                          }
                        : null
                    )
                  }
                  className="w-full"
                />
              ) : (
                user.username
              )}
            </TableCell>

            <TableCell>
              {editingRow === user.id ? (
                <Input
                  value={editedUser?.email || ""}
                  onChange={e =>
                    setEditedUser(prev =>
                      prev
                        ? {
                            ...prev,
                            email: e.target.value
                          }
                        : null
                    )
                  }
                  className="w-full"
                />
              ) : (
                user.email
              )}
            </TableCell>

            <TableCell>
              {editingRow === user.id ? (
                <Select value={editedUser?.role || ""} onValueChange={value => setEditedUser(prev => (prev ? { ...prev, role: value } : null))}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                user.role
              )}
            </TableCell>

            {/* Team ustuni */}
            <TableCell>
              {editingRow === user.id ? (
                <Select
                  value={editedUser?.team?.toString() || ""}
                  onValueChange={value => setEditedUser(prev => (prev ? { ...prev, team: Number(value) } : null))}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Support">Support</SelectItem>
                    <SelectItem value="Office">Office</SelectItem>
                    <SelectItem value="Sellers">Sellers</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                user.team
              )}
            </TableCell>

            <TableCell>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSave(user.id)}
                  disabled={editingRow !== user.id || disabledChecks.includes(user.id)}
                >
                  <CircleCheck className="h-5 w-5 text-green-500" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleEdit(user)} disabled={disabledChecks.includes(user.id)}>
                  <Edit2 className="h-4 w-4 text-blue-500" />
                </Button>

                {/* Trash tugmasi */}
                <Button variant="ghost" size="icon" onClick={() => handleDelete(user.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default InvitationUserTable
