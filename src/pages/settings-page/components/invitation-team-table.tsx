// InvitationTable.tsx
import { Button } from "@/shared/ui/button.tsx"
import { Input } from "@/shared/ui/input.tsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table.tsx"
import { CircleCheck, Edit2, Trash2 } from "lucide-react"
import { useState } from "react"

// Foydalanuvchi ma'lumotlari uchun interfeys
interface Team {
  id: number
  name: string
  users: number
}

// Komponent uchun props
interface InvitationTeamTableProps {
  teams: Team[]
  onDelete: (id: number) => void // Foydalanuvchini o'chirish uchun funksiya
}

const InvitationTeamTable: React.FC<InvitationTeamTableProps> = ({ teams, onDelete }) => {
  const [editingRow, setEditingRow] = useState<number | null>(null)
  const [editedTeam, setEditedTeam] = useState<Team | null>(null)
  const [disabledChecks, setDisabledChecks] = useState<number[]>([])

  const handleEdit = (team: Team) => {
    setEditingRow(team.id)
    setEditedTeam({ ...team })
  }

  const handleSave = (id: number) => {
    if (editedTeam) {
      console.log("Saqlangan ma'lumotlar:", editedTeam)
      setEditingRow(null)
      setEditedTeam(null)
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
          <TableHead className="text-left">Users</TableHead>

          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {teams.map(team => (
          <TableRow key={team.id} className={editingRow === team.id ? "bg-blue-50" : ""}>
            <TableCell>
              {editingRow === team.id ? (
                <Input
                  value={editedTeam?.name || ""}
                  onChange={e =>
                    setEditedTeam(prev =>
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
                team.name
              )}
            </TableCell>

            {/* Team ustuni */}
            <TableCell>{team.users}</TableCell>

            <TableCell className="w-[200px] text-left">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSave(team.id)}
                  disabled={editingRow !== team.id || disabledChecks.includes(team.id)}
                >
                  <CircleCheck className="h-5 w-5 text-green-500" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleEdit(team)} disabled={disabledChecks.includes(team.id)}>
                  <Edit2 className="h-4 w-4 text-blue-500" />
                </Button>

                {/* Trash tugmasi */}
                <Button variant="ghost" size="icon" onClick={() => handleDelete(team.id)}>
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

export default InvitationTeamTable
