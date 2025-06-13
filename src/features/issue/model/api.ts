import { customBaseQuery } from "@/shared/lib/api"
import type { IPageable } from "@/shared/types"
import { createApi } from "@reduxjs/toolkit/query/react"
import type { IIssue, IIssueApiParams } from "./types.ts"

export const issueApi = createApi({
  reducerPath: "issueApi",
  baseQuery: customBaseQuery,
  tagTypes: ["issues"],
  endpoints: builder => ({
    fetchIssues: builder.query<IIssue[], IIssueApiParams>({
      query: params => ({
        url: "/chatbot/session-issue-list",
        params
      }),
      transformResponse: (data: IPageable<IIssue>) => data.results,
      providesTags: (_, __, arg) => [
        {
          type: "issues",
          id: arg.session || arg.session__session_id
        }
      ]
      // keepUnusedDataFor: 60*5,
    }),

    resolveIssue: builder.mutation<void, { issue_id: string; body: { value: "answer" | "not-answer" } }>({
      query: ({ issue_id, body }) => ({
        url: `/chatbot/resolve-issue/${issue_id}/`,
        method: "POST",
        body
      }),
      invalidatesTags: ["issues"]
    })

    // deleteProject: builder.mutation<void, { id: string }>({
    //     query: ({ id }) => ({
    //         url: `chatbot/projects/${id}`,
    //         method: 'DELETE',
    //     }),
    //     invalidatesTags: ['projects'],
    // }),
  })
})

export const { useFetchIssuesQuery, useResolveIssueMutation } = issueApi
