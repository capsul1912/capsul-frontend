import { useFetchProjects } from "@/pages/main/api/use-fetch-project"
import type { components } from "@/shared/lib/api/api"
import { $api } from "@/shared/lib/api/client"
import CheckIcon from "@mui/icons-material/Check"
import ClearIcon from "@mui/icons-material/Clear"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import { Button, IconButton } from "@mui/material"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { DataGrid, type GridColDef } from "@mui/x-data-grid"
import dayjs from "dayjs"
import React from "react"
import { CreateNewApiToken } from "./create-api-token"

export const SettingsWidgetInstallationPage: React.FC = () => {
  const [open, setOpen] = React.useState(false)
  const { data: apiTokens, isLoading: apiTokensLoading, refetch: apiTokensRefetch } = $api.useQuery("get", "/api/v1/inbox/project-api-keys/")

  const { data: projects } = useFetchProjects({
    // organization: "e9d3d89c-f85b-41cd-83ad-b3826b1c990d"
  })

  const project = projects?.results[0]

  const apiTokensColumns: GridColDef<components["schemas"]["ProjectAPIKey"]>[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 2
    },
    {
      field: "active",
      headerName: "Active",
      flex: 1,
      renderCell: ({ row }) => (row.active ? <CheckIcon color="success" /> : <ClearIcon color="error" />)
    },
    {
      field: "key",
      headerName: "Key",
      renderCell: ({ row }) => {
        return (
          <>
            <IconButton onClick={() => navigator.clipboard.writeText(row.key)}>
              <ContentCopyIcon />
            </IconButton>
          </>
        )
      },
      flex: 0
    },
    {
      field: "expires_at",
      headerName: "Expires at",
      flex: 2,
      valueGetter: date => (date ? dayjs(date).format("DD.MM.YYYY HH:mm") : "<No date>")
    },
    {
      field: "request_count",
      headerName: "Request count",
      flex: 1
    },
    {
      field: "created_at",
      headerName: "Created at",
      flex: 2,
      valueGetter: date => (date ? dayjs(date).format("DD.MM.YYYY HH:mm") : "<No date>")
    }
  ]

  if (!project) return "No project"

  return (
    <Stack spacing={4}>
      <Typography variant="h4">Widget installation</Typography>

      <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
        <Typography variant="h5">API tokens</Typography>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Create new API token
        </Button>
      </Stack>
      <DataGrid rowSelection={false} columns={apiTokensColumns} rows={apiTokens?.results} loading={apiTokensLoading} />

      <CreateNewApiToken open={open} setOpen={setOpen} projectId={project.id} refetch={apiTokensRefetch} />
    </Stack>
  )
}
