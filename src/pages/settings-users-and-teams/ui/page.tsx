import { useFetchProjects } from "@/pages/main/api/use-fetch-project"
import type { components } from "@/shared/lib/api/api"
import { $api } from "@/shared/lib/api/client"
import { MenuItem, Select, type SelectChangeEvent } from "@mui/material"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { DataGrid, type GridColDef } from "@mui/x-data-grid"
import React from "react"
import { CreateNewTeam } from "./create-new-team"
import { InviteNewUser } from "./invite-new-user"

export const SettingsUsersAndTeamsPage: React.FC = () => {
  const [inviteUser, setInviteUser] = React.useState(false)
  const [newTeamModal, setNewTeamModal] = React.useState(false)
  const { data: projects } = useFetchProjects({
    // organization: "e9d3d89c-f85b-41cd-83ad-b3826b1c990d"
  })

  const project = projects?.results[0]

  const { data: users, refetch: refetchUsers } = $api.useQuery(
    "get",
    "/api/v1/accounts/projects/{project_id}/members/",
    {
      params: {
        path: {
          project_id: project?.id ?? ""
        }
      }
    },
    {
      enabled: typeof project?.id === "string"
    }
  )

  const { mutateAsync: mutateUserAsync } = $api.useMutation("patch", "/api/v1/accounts/projects/{project_id}/members/{id}/")

  const { data: teams, refetch: refetchTeams } = $api.useQuery(
    "get",
    "/api/v1/accounts/projects/{project_id}/teams/",
    {
      params: {
        path: {
          project_id: project?.id ?? ""
        }
      }
    },
    {
      enabled: typeof project?.id === "string"
    }
  )

  const changeTeam = (userId: string) => (event: SelectChangeEvent<number>) => {
    const teamId = event.target.value
    if (!project) return

    mutateUserAsync({
      params: {
        path: {
          id: userId,
          project_id: project.id
        }
      },
      body: {
        team: teamId === -1 ? undefined : teamId
      }
    }).then(() => refetchUsers())
  }

  const userColumns: GridColDef<components["schemas"]["User"]>[] = [
    {
      field: "full_name",
      headerName: "Full name",
      flex: 2
    },
    {
      field: "phone_number",
      headerName: "Phone number",
      flex: 1
    },
    {
      field: "team",
      headerName: "Team",
      flex: 2,
      renderCell: ({ row }) => (
        <Select<number> value={row?.team?.id ?? -1} size="small" fullWidth onChange={changeTeam(row.id)}>
          <MenuItem value={-1}>&lt;No team&gt;</MenuItem>
          {teams?.results.map(t => (
            <MenuItem key={t.id} value={t.id}>
              {t.name}
            </MenuItem>
          ))}
        </Select>
      )
    }
  ]

  // TODO: pagination and extra stuff required here should be also implemented

  const teamColumns: GridColDef<components["schemas"]["Team"]>[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 2
    },
    {
      field: "members_count",
      headerName: "Total members",
      flex: 2
    }
  ]

  if (!project || !users || !teams) {
    return "Loading"
  }

  return (
    <Stack spacing={4}>
      <Typography variant="h4">Users and teams</Typography>

      <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Users</Typography>
        <Button variant="outlined" onClick={() => setInviteUser(true)}>
          Invite new user
        </Button>
      </Stack>
      <DataGrid columns={userColumns} rows={users.results} />

      <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Teams</Typography>
        <Button variant="outlined" onClick={() => setNewTeamModal(true)}>
          Create new team
        </Button>
      </Stack>
      <DataGrid columns={teamColumns} rows={teams.results} />

      <InviteNewUser open={inviteUser} setOpen={setInviteUser} teams={teams.results} projectId={project.id} refetch={refetchUsers} />
      <CreateNewTeam open={newTeamModal} setOpen={setNewTeamModal} projectId={project.id} refetch={refetchTeams} />
    </Stack>
  )
}
