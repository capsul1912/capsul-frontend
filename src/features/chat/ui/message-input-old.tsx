// import { useCallback, useRef } from 'react';
// import { Button } from '@/shared/ui/button.tsx';
// import {
//     Book,
//     Code,
//     Image,
//     Languages,
//     LightbulbIcon,
//     Paperclip,
//     Send,
// } from 'lucide-react';
// import { useChatStore } from '@/features/chat/model/chat.store.ts';
// import { AudioRecorder } from '@/features/audio-recorder/ui/for-main-chat/audio-recorder.tsx';
// import { MessageInputToggle } from '@/features/chat/ui/message-input-toggle.tsx';
// import GifPicker from '@/features/gifs/ui/gif-picker.tsx';
// import { Textarea } from '@/shared/ui/textarea.tsx';
//
// export default function MessageInput() {
//     const { inputValue, setInputValue, sendMessage } = useChatStore();
//     const inputRef = useRef<HTMLDivElement>(null);
//
//     const handleSend = useCallback(() => {
//         if (inputRef.current) {
//             setInputValue(inputRef.current.innerHTML);
//             sendMessage();
//             inputRef.current.innerHTML = ''; // Clear input after sending
//         }
//     }, [sendMessage, setInputValue]);
//
//     return (
//         <div className="mx-auto mb-1 h-auto w-[92%] max-w-[500px] rounded-2xl border border-gray-200 bg-white p-3 shadow-2xl">
//             {/* Toggle between Reply and Note */}
//             <MessageInputToggle />
//
//             {/* Editable Div (Replaces Textarea) */}
//             <div
//                 ref={inputRef}
//                 contentEditable
//                 className="chat-message-input custom-field-sizing-content max-h-40 !min-h-[40px] w-full resize-none overflow-hidden break-words rounded-lg !border-none px-1.5 text-sm shadow-none focus:!outline-none focus:!ring-0"
//                 data-placeholder="Write your message..."
//             />
//             {/*/!* Text Area *!/*/}
//             {/*<Textarea*/}
//             {/*    style={{ overflowWrap: 'anywhere' }}*/}
//             {/*    className="custom-field-sizing-content max-h-40 !min-h-[40px] w-full resize-none overflow-hidden break-words rounded-lg !border-none px-1.5 shadow-none focus:!outline-none focus:!ring-0"*/}
//             {/*    placeholder="Write your message..."*/}
//             {/*    value={inputValue}*/}
//             {/*    onChange={e => setInputValue(e.target.value)}*/}
//             {/*/>*/}
//
//             {/* Action Icons */}
//             <div className="mt-3 flex items-center justify-between">
//                 <div className="relative flex gap-2">
//                     <Button variant="ghost" size="icon">
//                         <Paperclip className="h-5 w-5" />
//                     </Button>
//                     <GifPicker />
//                     <Button variant="ghost" size="icon">
//                         <Image className="h-5 w-5" />
//                     </Button>
//                     <Button variant="ghost" size="icon">
//                         <Code className="h-5 w-5" />
//                     </Button>
//                     <Button variant="ghost" size="icon">
//                         <Book className="h-5 w-5" />
//                     </Button>
//                     <Button variant="ghost" size="icon">
//                         <LightbulbIcon className="h-5 w-5" />
//                     </Button>
//                     <Button variant="ghost" size="icon">
//                         <Languages className="h-5 w-5" />
//                     </Button>
//                 </div>
//
//                 <div className="flex gap-2">
//                     <AudioRecorder />
//                     <Button
//                         onClick={handleSend}
//                         className="bg-black text-white hover:bg-gray-800"
//                     >
//                         Send <Send className="ml-2 h-4 w-4" />
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// }
