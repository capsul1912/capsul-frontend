import type { ISessionStatus } from "@/features/project/model"

export const fakeCurrentSession = {
  end_time: "2025-01-18T15:30:00Z",
  id: "session_12345",
  project: "AI Support Chat",
  reply_operator: true,
  session_id: "abcde-67890-fghij-12345",
  assigned_to: "operator_56789",
  status: "assigned" as ISessionStatus, // Replace with actual status values based on your `ISessionStatus` type
  start_time: "2025-01-18T14:00:00Z",
  total_cost: "25.00",
  total_input_tokens: 1200,
  total_output_tokens: 850
}
