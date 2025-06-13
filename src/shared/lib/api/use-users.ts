import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "./axios-interceptors"

export interface IUser {
  id: number
  password: string
  last_login: string | null
  is_superuser: boolean
  email: string
  username: string
  full_name: string
  phone_number?: string | null
  role?: string | null
  is_active: boolean
  is_staff: boolean
  created_at: string
  updated_at: string
  team?: number | null // Team ID sifatida string yoki null deb taxmin qilamiz
  current_organization?: any
  groups: any[] // yoki agar aniq bo‘lsa: Group[]
  user_permissions: any[] // yoki Permission[]
}

interface IUsersResponse {
  count: number
  next?: string | null
  previous?: string | null
  results: IUser[]
}

interface IUsersParams {
  limit?: number
  offset?: number
}

interface IUpdateUserPayload {
  email?: string
  username?: string
  full_name?: string
  role?: string | null
  team?: string | null
  is_active?: boolean
  is_staff?: boolean
  phone_number?: string | null
  // Boshqa yangilanadigan maydonlar qo‘shilishi mumkin
}

// Query keys
export const usersKeys = {
  all: ["users"] as const,
  lists: () => [...usersKeys.all, "list"] as const,
  list: (filters: string) => [...usersKeys.lists(), { filters }] as const,
  details: () => [...usersKeys.all, "detail"] as const,
  detail: (id: string) => [...usersKeys.details(), id] as const
}

// Get all users
export const useUsers = (params?: IUsersParams) => {
  return useQuery({
    queryKey: usersKeys.list(JSON.stringify(params)),
    queryFn: async () => {
      const response = await api.get<IUsersResponse>("/accounts/users/", {
        params
      })
      return response.data
    }
  })
}

// Update a user
export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      payload
    }: {
      id: number
      payload: IUpdateUserPayload
    }) => {
      const response = await api.put<IUser>(`/accounts/users/${id}/`, payload)
      return response.data
    },
    onSuccess: updatedUser => {
      queryClient.setQueryData<IUsersResponse>(usersKeys.lists(), oldData => {
        if (!oldData) return oldData
        return {
          ...oldData,
          results: oldData.results.map(user => (user.id === updatedUser.id ? updatedUser : user))
        }
      })
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: usersKeys.detail(updatedUser.id.toString())
      })
    },
    onError: error => {
      console.error("Error updating user:", error)
    }
  })
}

// Delete a user
export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/accounts/users/${id}/`)
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData<IUsersResponse>(usersKeys.lists(), oldData => {
        if (!oldData) return oldData
        return {
          ...oldData,
          count: oldData.count - 1,
          results: oldData.results.filter(user => user.id !== id)
        }
      })
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: usersKeys.detail(id.toString())
      })
    },
    onError: error => {
      console.error("Error deleting user:", error)
    }
  })
}
