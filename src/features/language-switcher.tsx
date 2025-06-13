// import * as React from 'react';
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from '@/shared/ui/select.tsx';
// import { cn } from '@/shared/lib/helpers';
// import { useDispatch } from '@/shared/lib/store';
// import { GalleryVerticalEnd } from 'lucide-react';
// import { languageOptions } from '@/shared/constants';
//
// interface AccountSwitcherProps {
//     isCollapsed: boolean;
// }
//
// export function LanguageSwitcher({ isCollapsed }: AccountSwitcherProps) {
//     // Hel
//     const dispatch = useDispatch();
//
//     const selectedLanguage = languageOptions[0];
//
//     // Functions
//     const onValueChange = (id: string) => {
//         // const found = projects.find(p => p.id === id);
//         // setselectedLanguage(found || null);
//         // if (found) dispatch(setCurrentProject(found));
//     };
//
//     return (
//         <Select
//             defaultValue={selectedLanguage?.value}
//             onValueChange={onValueChange}
//         >
//             <SelectTrigger
//                 className={cn(
//                     'flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0',
//                     isCollapsed &&
//                         'flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden'
//                 )}
//                 aria-label="Select account"
//             >
//                 <SelectValue placeholder="Select an account">
//                     {/*{*/}
//                     {/*    accounts.find(*/}
//                     {/*        account => account.email === selectedLanguage*/}
//                     {/*    )?.icon*/}
//                     {/*}*/}
//                     {/*<span className={cn('ml-2', isCollapsed && 'hidden')}>*/}
//                     {isCollapsed && <GalleryVerticalEnd />}
//                     <span className={cn('ml2', isCollapsed && 'hidden')}>
//                         {selectedLanguage?.name as string}
//                         {/*{*/}
//                         {/*    accounts.find(*/}
//                         {/*        account => account.email === selectedLanguage*/}
//                         {/*    )?.label*/}
//                         {/*}*/}
//                     </span>
//                 </SelectValue>
//             </SelectTrigger>
//             <SelectContent>
//                 {languageOptions.map(lang => (
//                     <SelectItem key={lang.value} value={lang.value.toString()}>
//                         <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
//                             {/*{account.icon}*/}
//                             {lang.title}
//                         </div>
//                     </SelectItem>
//                 ))}
//             </SelectContent>
//         </Select>
//     );
// }
