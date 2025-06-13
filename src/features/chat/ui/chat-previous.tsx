// import { BlurredLoading } from '@/features/loadings';
// import { useChat } from '@/app/context/chat-context.tsx';
// import MessageInput from '@/widgets/chat/message-input/message-input.tsx';
// import { MessageInputProvider } from '@/widgets/chat/message-input/message-input-context.tsx';
// import ChatHeader from '@/widgets/chat/components/chat-header.tsx';
// import MessageDate from '@/widgets/chat/components/message-date.tsx';
// import InitialChatMessagesEffect from '@/widgets/chat/components/chat-initial-loading.tsx';
// import { MessageRenderer } from '@/widgets/chat/components/message-renderer.tsx';
//
// export function Chat() {
//     // Helper Hooks
//     const { currentSession, bottomRef, messages } = useChat();
//
//     // States
//     // const [websocketState, setWebsocketState] = useState<ReadyState>(
//     //     ReadyState.UNINSTANTIATED
//     // );
//
//     // const { data: issues, isLoading: fetchingIssues } = useFetchIssuesQuery(
//     //     {
//     //         session__session_id: currentSession?.session_id,
//     //     },
//     //     { skip: !currentSession?.session_id }
//     // );
//     // const [assignSession, { isLoading: assigning }] =
//     //     useAssignSessionMutation();
//     // const [resolveSession, { isLoading: resolving }] =
//     //     useResolveSessionMutation();
//
//     // const socketURL = `${BASE_URL}/ws/operator/${currentSession?.project}/${getUserFromLS()?.id as string}/`;
//     // const { lastJsonMessage, readyState } = useWebSocket<ISocketResponse>(
//     //     socketURL,
//     //     {
//     //         reconnectAttempts: 5,
//     //         shouldReconnect: () => true,
//     //     }
//     // );
//
//     // // Effects
//     // useEffect(() => {
//     //     if (fetchedMessages?.length) {
//     //         setMessages(fetchedMessages);
//     //         setTimeout(scrollToBottom, 0);
//     //     }
//     // }, [fetchedMessages]);
//
//     // const a = projectApi.endpoints.fetchChatLog.select(
//     //     currentSession?.session_id as string
//     // );
//     // const aa = useSelector(a);
//     // console.log('CACHE');
//     // console.log(aa);
//
//     // useEffect(() => {
//     //     if (!lastJsonMessage) return;
//     //     let timerId: NodeJS.Timeout;
//     //
//     //     if (lastJsonMessage.session_id === currentSession?.session_id) {
//     //         // If the message belongs to currently opened session
//     //         const newMessageList = messages.slice();
//     //
//     //         if (isUserMessage(lastJsonMessage)) {
//     //             if (lastJsonMessage?.message?.length) {
//     //                 const newChatLog: IChatLog = makeChatLog({
//     //                     sender_type: 'USER',
//     //                     message: lastJsonMessage?.message,
//     //                 });
//     //                 newMessageList.push(newChatLog);
//     //                 updateChatLogCache(currentSession?.session_id, newChatLog);
//     //             }
//     //         } else {
//     //             if (
//     //                 lastJsonMessage.content.length &&
//     //                 lastJsonMessage.finished
//     //             ) {
//     //                 const newChatLog: IChatLog = makeChatLog({
//     //                     sender_type: 'AI',
//     //                     message: lastJsonMessage?.content,
//     //                 });
//     //                 newMessageList.push(newChatLog);
//     //                 updateChatLogCache(currentSession?.session_id, newChatLog);
//     //             }
//     //         }
//     //         tryWithTransition(() => {
//     //             setMessages(newMessageList);
//     //             timerId = setTimeout(scrollToBottom, 100);
//     //         });
//     //     }
//     //
//     //     tryWithTransition(() => setLoading(false));
//     //
//     //     return () => {
//     //         if (timerId) clearTimeout(timerId);
//     //     };
//     //     // Don't specify messages here, otherwise the page get infinity re-renders
//     // }, [lastJsonMessage]);
//     //
//     // useEffect(() => {
//     //     // Debug start
//     //     const connectionStatus = {
//     //         [ReadyState.CONNECTING]: 'Connecting',
//     //         [ReadyState.OPEN]: 'Open',
//     //         [ReadyState.CLOSING]: 'Closing',
//     //         [ReadyState.CLOSED]: 'Closed',
//     //         [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
//     //     }[readyState];
//     //
//     //     // console.log('___________________________');
//     //     console.warn({ STATUS: connectionStatus });
//     //     // console.log('___________________________');
//     //
//     //     let timerId: NodeJS.Timeout;
//     //     if (readyState === ReadyState.OPEN) {
//     //         timerId = setTimeout(() => {
//     //             // tryWithTransition(() => setWebsocketState(readyState));
//     //         }, 600);
//     //     } else if (readyState === ReadyState.CONNECTING) {
//     //         setRestarting(false);
//     //         // tryWithTransition(() => setWebsocketState(readyState));
//     //     } else {
//     //         // tryWithTransition(() => setWebsocketState(readyState));
//     //     }
//     //     return () => {
//     //         if (timerId) clearTimeout(timerId);
//     //     };
//     // }, [readyState]);
//
//     // Functions
//     // function updateChatLogCache(sessionId: string, chatLog: IChatLog) {
//     //     dispatch(
//     //         projectApi.util.updateQueryData(
//     //             'fetchChatLog',
//     //             sessionId,
//     //             draft => {
//     //                 draft.push(chatLog);
//     //             }
//     //         )
//     //     );
//     // }
//
//     // const handleChange:
//     //     | ChangeEventHandler<HTMLTextAreaElement>
//     //     | undefined = e => {
//     //     const value = e.target.value;
//     //     setInputValue(value);
//     // };
//
//     // const handleAssign = () => {
//     //     if (currentSession?.id) {
//     //         assignSession(currentSession?.id)
//     //             .unwrap()
//     //             .then(() => {
//     //                 if (getUserFromLS() && getUserFromLS()?.id) {
//     //                     handleTab('assigned');
//     //                     toast.success('Successfully assigned!');
//     //                     setCurrentSession({
//     //                         ...currentSession,
//     //                         assigned_to: getUserFromLS()?.id as string,
//     //                     });
//     //                 }
//     //             });
//     //     }
//     // };
//
//     // function handleAddToReferences(
//     //     el: HTMLDivElement | null,
//     //     messageObj: IChatLog
//     // ) {
//     //     if (el) {
//     //         messageRefs.current[messageObj.id] = el;
//     //     }
//     // }
//
//     // function handleSubmit(e: FormEvent) {
//     //     e.preventDefault();
//     //
//     //     if (inputValue.length) {
//     //         setLoading(true);
//     //         tryWithTransition(() => {
//     //             setMessages(prev => [
//     //                 ...prev,
//     //                 {
//     //                     timestamp: '',
//     //                     output_tokens: 0,
//     //                     sender_type: 'OPERATOR',
//     //                     input_tokens: 0,
//     //                     source: '',
//     //                     response_time: '',
//     //                     model: '',
//     //                     reply: replyingMessage?.id,
//     //                     cost: '',
//     //                     session: '',
//     //                     id: '',
//     //                     message: inputValue,
//     //                 },
//     //             ]);
//     //             setTimeout(scrollToBottom, 0);
//     //         });
//     //         sendJsonMessage({
//     //             session_id: currentSession?.session_id,
//     //             message: inputValue,
//     //             reply_to: replyingMessage?.id,
//     //         });
//     //         setreplyingMessage(null);
//     //         setInputValue('');
//     //     }
//     // }
//
//     // function handleResolveSession() {
//     //     const hasOpenIssue = issues?.some(i => i.status === 'open');
//     //     if (hasOpenIssue) {
//     //         toast.error('Please resolve all issues first!');
//     //     } else {
//     //         if (currentSession?.session_id) {
//     //             resolveSession({
//     //                 sessionId: currentSession?.id,
//     //             })
//     //                 .unwrap()
//     //                 .then(() => {
//     //                     // console.log('$$$$$$$$$');
//     //                     // console.log(res);
//     //                     toast.success('Successfully resolved!');
//     //                 });
//     //         }
//     //     }
//     // }
//
//     return (
//         <div className="relative flex h-full flex-grow flex-col bg-background">
//             <ChatHeader />
//             {currentSession ? (
//                 <>
//                     <div className="flex-1 overflow-auto">
//                         <div className="flex flex-col gap-3 p-4">
//                             <MessageDate date={currentSession.start_time} />
//                             <InitialChatMessagesEffect show={isLoading} />
//                             <MessageRenderer messages={messages} />
//                             <div ref={bottomRef} />
//                         </div>
//                     </div>
//
//                     <BlurredLoading
//                         className="backdrop-blur-[5px]"
//                         spinnerProps={{
//                             className: 'size-16 -mt-16',
//                         }}
//                         visible={isLoading || isFetching}
//                     />
//                     <MessageInputProvider>
//                         <MessageInput />
//                     </MessageInputProvider>
//                 </>
//             ) : (
//                 <div className="flex flex-1 items-center justify-center text-muted-foreground">
//                     No message selected
//                 </div>
//             )}
//         </div>
//     );
// }
