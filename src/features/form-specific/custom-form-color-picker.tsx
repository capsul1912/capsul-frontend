// import type { HTMLAttributes } from 'react';
// import { Controller, useFormContext } from 'react-hook-form';
// import { CustomColorPicker } from '@/shared/ui/inputs';
//
// interface IProps<T> extends HTMLAttributes<HTMLInputElement> {
//     wrapperProps?: HTMLAttributes<HTMLDivElement>;
//     title: string;
//     name: keyof T;
// }
//
// function CustomFormColorPicker<T>({ name, ...props }: IProps<T>) {
//     // Helper Hooks
//     const { control } = useFormContext();
//
//     return (
//         <Controller
//             name={name as string}
//             control={control}
//             render={({ field }) => <CustomColorPicker {...field} {...props} />}
//         />
//     );
// }
//
// export default CustomFormColorPicker;
