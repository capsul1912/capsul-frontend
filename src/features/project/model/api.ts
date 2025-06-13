import { customBaseQuery } from "@/shared/lib/api"
import type { IPageable } from "@/shared/types"
import { createApi } from "@reduxjs/toolkit/query/react"
import type { IChatLog, IChatSession, IChatSessionParams, IChatbotProject } from "./types.ts"

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: customBaseQuery,
  tagTypes: ["projects", "chat-sessions", "chat-logs"],
  endpoints: builder => ({
    register: builder.mutation({
      query: body => ({
        url: "/filling_stations/branches/",
        method: "POST",
        body
      })
    }),

    fetchProjects: builder.query<IChatbotProject[], void>({
      query: () => "chatbot/projects/",
      transformResponse: (data: IPageable<IChatbotProject>) => data.results,
      providesTags: ["projects"]
    }),

    fetchChatSession: builder.query<IChatSession[], IChatSessionParams>({
      query: params => ({
        url: "chatbot/chat-session",
        params
      }),
      transformResponse: (data: IPageable<IChatSession>) => data.results,
      providesTags: sessions =>
        sessions
          ? [
              ...sessions.map(session => ({
                type: "chat-sessions" as const,
                id: session.session_id
              })),
              { type: "chat-sessions", id: "LIST" }
            ]
          : [{ type: "chat-sessions", id: "LIST" }]
    }),

    resolveSession: builder.mutation<void, { sessionId: string }>({
      query: ({ sessionId }) => ({
        url: `/chatbot/resolve-chat-session/${sessionId}/`,
        method: "POST"
      }),
      invalidatesTags: ["chat-sessions"]
    }),

    assignSession: builder.mutation<void, string>({
      query: session_id => ({
        url: `/chatbot/assign-chat-session/${session_id}/`,
        method: "POST"
      }),
      invalidatesTags: ["chat-sessions"]
    }),

    fetchChatLog: builder.query<IChatLog[], string>({
      query: sessionId => `/chatbot/chat-log?session__session_id=${sessionId}`,
      // query: sessionId => `/chatbot/chat-log?session_id=${sessionId}`,
      transformResponse: (data: IPageable<IChatLog>) => data.results,
      // transformResponse: (data: IPageable<IChatLog>) =>
      //     data.results.map(m => ({
      //         type: m.sender_type === 'USER' ? 'user' : 'bot',
      //         message: m.message,
      //     })),
      providesTags: (_, __, sessionId) => [{ type: "chat-logs", id: sessionId }]
    })
  })
})

export const { useFetchChatSessionQuery, useFetchChatLogQuery, useAssignSessionMutation, useResolveSessionMutation } = projectApi
