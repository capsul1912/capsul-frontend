// import * as React from 'react';
// import { ReactNode, useState } from 'react';
// import { CircleUserRound, Folder, Home, Inbox, Settings } from 'lucide-react';
//
// import {
//     cn,
//     getFromLocalStorage,
//     setToLocalStorage,
// } from '@/shared/lib/helpers';
// import {
//     ResizableHandle,
//     ResizablePanel,
//     ResizablePanelGroup,
// } from '@/shared/ui/resizable.tsx';
// import { Separator } from '@/shared/ui/separator.tsx';
// import { AccountSwitcher } from '@/features/account-switcher.tsx';
// import { Nav } from '@/features/nav.tsx';
// import { Outlet } from 'react-router-dom';
// import { storageKeys } from '@/shared/constants';
// import {
//     Sidebar,
//     SidebarContent,
//     SidebarGroup,
//     SidebarGroupContent,
//     SidebarGroupLabel,
//     SidebarMenu,
//     SidebarMenuButton,
//     SidebarMenuItem,
//     SidebarProvider,
// } from '@/shared/ui/sidebar.tsx';
//
// interface Mail {}
//
// interface MailProps {
//     accounts?: {
//         label: string;
//         email: string;
//         icon: React.ReactNode;
//     }[];
//     mails?: Mail[];
//     defaultLayout?: number[] | undefined;
//     navCollapsedSize?: number;
// }
//
// // Define the type for a project
// interface Project {
//     name: string;
//     url: string;
//     icon: ReactNode;
// }
//
// // Generate the projects array
// const projects: Project[] = [
//     {
//         name: 'Dashboard',
//         url: '/dashboard',
//         icon: <Home />,
//     },
//     {
//         name: 'Settings',
//         url: '/settings',
//         icon: <Settings />,
//     },
//     {
//         name: 'Projects',
//         url: '/projects',
//         icon: <Folder />,
//     },
// ];
//
// export default function MainPage({
//     defaultLayout = [20, 32, 48],
//     navCollapsedSize = 4,
// }: MailProps) {
//     // Helper Hooks
//     const layoutSizes =
//         getFromLocalStorage<number[]>(storageKeys.INBOX_WINDOW_SIZES) ||
//         defaultLayout;
//
//     // States
//     const [isCollapsed, setIsCollapsed] = useState(false);
//     const [open, setOpen] = useState(false);
//
//     return (
//         <ResizablePanelGroup
//             direction="horizontal"
//             onLayout={(sizes: number[]) => {
//                 document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
//                     sizes
//                 )}`;
//             }}
//             className="max-h-screen items-stretch"
//         >
//             <ResizablePanel
//                 defaultSize={layoutSizes[0]}
//                 collapsedSize={navCollapsedSize}
//                 collapsible={true}
//                 minSize={15}
//                 maxSize={20}
//                 onCollapse={() => {
//                     setIsCollapsed(true);
//                     setToLocalStorage(
//                         storageKeys.INBOX_WINDOW_SIZES,
//                         [0, 32, 48]
//                     );
//                     // document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
//                     //     true
//                     // )}`;
//                 }}
//                 onResize={() => {
//                     setIsCollapsed(false);
//                     setToLocalStorage(
//                         storageKeys.INBOX_WINDOW_SIZES,
//                         [20, 32, 48]
//                     );
//                     // document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
//                     //     false
//                     // )}`;
//                 }}
//                 className={cn(
//                     isCollapsed &&
//                         'min-w-[50px] transition-all duration-300 ease-in-out'
//                 )}
//             >
//                 <SidebarProvider open={open} onOpenChange={setOpen}>
//                     <Sidebar>
//                         <SidebarContent>
//                             <SidebarGroup>
//                                 <SidebarGroupLabel>Projects</SidebarGroupLabel>
//                                 <SidebarGroupContent>
//                                     <SidebarMenu>
//                                         {projects.map((project, index) => (
//                                             <SidebarMenuItem key={index}>
//                                                 <SidebarMenuButton asChild>
//                                                     <a href={project.url}>
//                                                         {project.icon}{' '}
//                                                         <span>
//                                                             {project.name}
//                                                         </span>
//                                                     </a>
//                                                 </SidebarMenuButton>
//                                             </SidebarMenuItem>
//                                         ))}
//                                     </SidebarMenu>
//                                 </SidebarGroupContent>
//                             </SidebarGroup>
//                         </SidebarContent>
//                     </Sidebar>
//                 </SidebarProvider>
//                 <div
//                     className={cn(
//                         'flex h-[52px] items-center justify-center',
//                         isCollapsed ? 'h-[52px]' : 'px-2'
//                     )}
//                 >
//                     <AccountSwitcher isCollapsed={isCollapsed} />
//                 </div>
//                 <Separator />
//                 <Nav
//                     isCollapsed={isCollapsed}
//                     links={[
//                         {
//                             title: 'Inbox',
//                             path: '',
//                             label: '128',
//                             icon: Inbox,
//                         },
//                         // {
//                         //     title: 'Mentions',
//                         //     path: 'mentions',
//                         //     label: '9',
//                         //     icon: AtSignIcon,
//                         // },
//                         // {
//                         //     title: 'All',
//                         //     path: 'a',
//                         //     label: '',
//                         //     icon: Rows4Icon,
//                         // },
//                         // {
//                         //     title: 'Unassigned',
//                         //     path: 'b',
//                         //     label: '23',
//                         //     icon: Unlink2Icon,
//                         // },
//                         // {
//                         //     title: 'Trash',
//                         //     label: '',
//                         //     icon: Trash2,
//                         //     variant: 'ghost',
//                         // },
//                         // {
//                         //     title: 'Archive',
//                         //     label: '',
//                         //     icon: Archive,
//                         //     variant: 'ghost',
//                         // },
//                     ]}
//                 />
//                 <Separator />
//                 <Nav
//                     isCollapsed={isCollapsed}
//                     links={[
//                         {
//                             title: 'Account',
//                             path: 'account',
//                             icon: CircleUserRound,
//                         },
//                         // {
//                         //     title: 'Updates',
//                         //     path: 'd',
//                         //     label: '342',
//                         //     icon: AlertCircle,
//                         // },
//                         // {
//                         //     title: 'Forums',
//                         //     path: 'e',
//                         //     label: '128',
//                         //     icon: MessagesSquare,
//                         // },
//                         // {
//                         //     title: 'Shopping',
//                         //     label: '8',
//                         //     icon: ShoppingCart,
//                         //     variant: 'ghost',
//                         // },
//                         // {
//                         //     title: 'Promotions',
//                         //     label: '21',
//                         //     icon: Archive,
//                         //     variant: 'ghost',
//                         // },
//                     ]}
//                 />
//             </ResizablePanel>
//             <ResizableHandle withHandle />
//             <Outlet />
//         </ResizablePanelGroup>
//     );
// }
