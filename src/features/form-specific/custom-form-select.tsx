// import { useFormContext } from 'react-hook-form';
// import {
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
// } from '@/shared/ui/form.tsx';
// import type { HTMLAttributes, RefAttributes } from 'react';
// import { InputProps } from '@/shared/ui/input.tsx';
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from '@/shared/ui/select.tsx';
// import type { IOption } from '@/shared/ui/inputs';
// import { useTranslation } from 'react-i18next';
//
// export interface IFormInputProps<T = undefined>
//     extends HTMLAttributes<HTMLDivElement>,
//         RefAttributes<HTMLDivElement> {
//     name: keyof T;
//     options: IOption[];
//     label: string;
//     loading?: boolean;
//     inputProps?: InputProps;
// }
//
// const CustomFormSelect = <T,>({
//     name,
//     options,
//     label,
//     ...props
// }: IFormInputProps<T>) => {
//     // Form Hooks
//     const { control } = useFormContext();
//     const { t } = useTranslation();
//
//     return (
//         <FormField
//             name={name as string}
//             control={control}
//             render={({ field, fieldState: { error } }) => (
//                 <FormItem {...props}>
//                     <FormLabel className="text-primary">{label}</FormLabel>
//                     <Select
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                     >
//                         <FormControl>
//                             <SelectTrigger className="text-primary">
//                                 <SelectValue placeholder="" />
//                             </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                             {options.map(language => (
//                                 <SelectItem value={language.value.toString()}>
//                                     {language.title}
//                                 </SelectItem>
//                             ))}
//                         </SelectContent>
//                     </Select>
//                     {error?.message && (
//                         <p className="text-[0.8rem] font-medium text-destructive">
//                             {t(error?.message)}
//                         </p>
//                     )}
//                 </FormItem>
//             )}
//         />
//     );
// };
// export default CustomFormSelect;
