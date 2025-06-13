// import type { RegisterOptions } from 'react-hook-form';
// import { Controller, useFormContext } from 'react-hook-form';
// import TextareaWithLabel from '@/shared/ui/textarea-with-label.tsx';
// import type { HTMLAttributes } from 'react';
// import type { TextareaProps } from '@/shared/ui/textarea.tsx';
//
// interface IProps<T> extends Omit<TextareaProps, 'name'> {
//     name: keyof T | string;
//     label: string;
//     wrapperProps?: HTMLAttributes<HTMLDivElement>;
//     rules?: RegisterOptions;
// }
//
// const CustomFormTextarea = <T,>({
//     name,
//     rules,
//     label,
//     ...props
// }: IProps<T>) => {
//     // Form Hooks
//     const { control } = useFormContext();
//
//     return (
//         <Controller
//             name={name as string}
//             rules={rules}
//             control={control}
//             render={({ field: { onChange, value }, fieldState: { error } }) => (
//                 <TextareaWithLabel
//                     {...props}
//                     fieldError={error}
//                     label={label}
//                     onChange={onChange}
//                     value={value}
//                 />
//             )}
//         />
//     );
// };
// export default CustomFormTextarea;
