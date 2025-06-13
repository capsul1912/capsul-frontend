// import type { IOption } from "@/shared/ui/inputs"
// import { useMemo } from "react"
//
// export default function useMakeMemoOptions<T extends object>(data: T[] | undefined, title?: keyof T, value?: keyof T) {
//   // Functions
//   return useMemo(
//     () =>
//       data?.map(
//         item =>
//           ({
//             title: title ? item[title] : "name" in item ? item["name"] : "no-name",
//             value: value ? item[value] : "id" in item ? item["id"] : "no-value"
//           }) as IOption
//       ) || [],
//     [data]
//   )
// }
