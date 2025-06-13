export interface IOption<T = number | string> {
  disabled?: boolean
  title: string
  value: T | "__placeholder"
}

// __placeholder - shows placeholder on CustomSelect or CustomFormSelect
