import type { IDispatch, IState } from "@/app/store.ts"
import type { TypedUseSelectorHook } from "react-redux"
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux"

export const useDispatch: () => IDispatch = useReduxDispatch
export const useSelector: TypedUseSelectorHook<IState> = useReduxSelector
