import InvitationTeamTable from "./invitation-team-table.tsx"

interface TeamPageProps {
  teams: Array<{
    id: number
    name: string
    users: number
  }>
  onDelete: (id: number) => void
}

export default function TeamPage({ teams, onDelete }: TeamPageProps) {
  return (
    <div className="w-full">
      <InvitationTeamTable teams={teams} onDelete={onDelete} />
    </div>
  )
}
