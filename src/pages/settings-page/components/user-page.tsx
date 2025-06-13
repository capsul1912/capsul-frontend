import type { IUser } from "@/shared/lib/api/use-users.ts"
import InvitationUserTable from "./invitation-user-table.tsx"

interface UserPageProps {
  users: IUser[]
  onDelete: (id: number) => void
}

export default function UserPage({ users, onDelete }: UserPageProps) {
  //  const filteredUsers = users.filter(user => user.role === 'User');

  return (
    <div className="w-full">
      {/* <div className="mb-4 flex gap-2 border-b p-5 text-base">
                <h2 className="font-semibold">User List</h2>
            </div> */}
      <InvitationUserTable users={users} onDelete={onDelete} />
    </div>
  )
}
