// import type { HTMLAttributes } from 'react';
// import type { SliderProps } from '@radix-ui/react-slider';
// import { Controller, useFormContext } from 'react-hook-form';
// import { CustomSlider } from '@/shared/ui/inputs';
//
// interface IProps<T> extends Omit<SliderProps, 'name'> {
//     wrapperProps?: HTMLAttributes<HTMLDivElement>;
//     title?: string;
//     name: keyof T;
//     showValue?: boolean;
// }
//
// function CustomFormSlider<T>({ name, ...props }: IProps<T>) {
//     //
//     const { control } = useFormContext();
//
//     return (
//         <Controller
//             name={name as string}
//             control={control}
//             render={({ field: { onChange, value, ...field } }) => {
//                 return (
//                     <CustomSlider
//                         onValueChange={newValue => {
//                             onChange(newValue[0] || 0);
//                         }}
//                         value={[value]}
//                         {...field}
//                         {...props}
//                     />
//                 );
//             }}
//         />
//     );
// }
//
// export default CustomFormSlider;
