import type { IPostAccountBody, IPostChangeEmail, IPostChangePassword } from "@/features/account/models/api-types.ts"
import { createFormData } from "@/features/chat/lib/helpers.ts"
import type { IUser } from "@/features/form-specific/model/types.ts"
import { customBaseQuery } from "@/shared/lib/api"
import { createApi } from "@reduxjs/toolkit/query/react"

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: customBaseQuery,
  tagTypes: ["account"],
  endpoints: builder => ({
    postAccount: builder.mutation<IPostAccountBody, IPostAccountBody>({
      query: body => {
        const formData = createFormData(body)
        return {
          url: `/accounts/operator-detail/${body.id}`,
          method: "PUT",
          body: formData
        }
      },
      invalidatesTags: ["account"]
    }),

    changePasswordRequest: builder.mutation<IPostAccountBody, void>({
      query: () => "/accounts/password-link/"
    }),

    postNewPassword: builder.mutation<IPostAccountBody, IPostChangePassword>({
      query: body => ({
        url: "/accounts/password-update/",
        method: "POST",
        body
      })
    }),

    postNewEmail: builder.mutation<IPostAccountBody, IPostChangeEmail>({
      query: body => ({
        url: "/accounts/email-update/",
        method: "POST",
        body
      })
    }),

    changeEmailRequest: builder.mutation<IPostAccountBody, void>({
      query: () => "/accounts/email-link/"
    }),

    fetchAccount: builder.query<IUser, { id: string }>({
      query: ({ id }) => `/accounts/operator-detail/${id}`
    })
  })
})

export const {
  usePostAccountMutation,
  useFetchAccountQuery,
  useChangeEmailRequestMutation,
  usePostNewPasswordMutation,
  usePostNewEmailMutation,
  useChangePasswordRequestMutation
} = accountApi
