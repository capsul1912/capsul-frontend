// 'use client';
//
// import { Mic } from 'lucide-react';
// import { useEffect, useRef, useState } from 'react';
// import { cn } from '@/shared/lib/helpers';
// import SpeechRecognition, {
//     useSpeechRecognition,
// } from 'react-speech-recognition';
//
// interface AIVoiceInputProps {
//     onStart?: () => void;
//     onStop?: (duration: number) => void;
//     // onSend?: (duration: number, transcript: string) => void;
//     onCancel?: () => void;
//     visualizerBars?: number;
//     demoMode?: boolean;
//     demoInterval?: number;
//     className?: string;
// }
//
// export function AiVoiceInputPrevious({
//     onStart,
//     onStop,
//     // onSend,
//     // onCancel,
//     visualizerBars = 48,
//     demoMode = false,
//     demoInterval = 3000,
//     className,
// }: AIVoiceInputProps) {
//     const { browserSupportsContinuousListening } = useSpeechRecognition();
//
//     const [submitted, setSubmitted] = useState(false);
//     const [recordingComplete, setRecordingComplete] = useState(false);
//     const [time, setTime] = useState(0);
//     const [isClient, setIsClient] = useState(false);
//     const [isDemo, setIsDemo] = useState(demoMode);
//     const hasStarted = useRef(false);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const audioRef = useRef<HTMLAudioElement | null>(null);
//
//     useEffect(() => {
//         setIsClient(true);
//     }, []);
//
//     useEffect(() => {
//         let intervalId: NodeJS.Timeout;
//
//         if (submitted) {
//             hasStarted.current = true;
//             onStart?.();
//             if (browserSupportsContinuousListening) {
//                 SpeechRecognition.startListening({
//                     continuous: true,
//                     language: 'uz-UZ',
//                 });
//             } else {
//                 // Fallback behaviour
//             }
//             intervalId = setInterval(() => {
//                 setTime(t => t + 1);
//             }, 1000);
//         } else if (hasStarted.current) {
//             onStop?.(time);
//             if (browserSupportsContinuousListening) {
//                 SpeechRecognition.stopListening();
//             }
//             setTime(0);
//             hasStarted.current = false;
//         }
//
//         return () => clearInterval(intervalId);
//     }, [submitted, time, onStart, onStop]);
//
//     useEffect(() => {
//         if (!isDemo) return;
//
//         let timeoutId: NodeJS.Timeout;
//         const runAnimation = () => {
//             setSubmitted(true);
//             timeoutId = setTimeout(() => {
//                 setSubmitted(false);
//                 timeoutId = setTimeout(runAnimation, 1000);
//             }, demoInterval);
//         };
//
//         const initialTimeout = setTimeout(runAnimation, 100);
//         return () => {
//             clearTimeout(timeoutId);
//             clearTimeout(initialTimeout);
//         };
//     }, [isDemo, demoInterval]);
//
//     const formatTime = (seconds: number) => {
//         const mins = Math.floor(seconds / 60);
//         const secs = seconds % 60;
//         return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//     };
//
//     const handleClick = () => {
//         if (isDemo) {
//             setIsDemo(false);
//             setSubmitted(false);
//         } else {
//             if (submitted) {
//                 handleStop();
//             } else {
//                 setSubmitted(true);
//                 setRecordingComplete(false);
//             }
//         }
//     };
//
//     const handleStop = () => {
//         setSubmitted(false);
//         setRecordingComplete(true);
//         onStop?.(time);
//     };
//
//     // const handleSend = () => {
//     //     onSend?.(time, transcript);
//     //     setRecordingComplete(false);
//     //     setTime(0);
//     //     resetTranscript();
//     // };
//     //
//     // const handleCancel = () => {
//     //     onCancel?.();
//     //     setRecordingComplete(false);
//     //     setTime(0);
//     //     resetTranscript();
//     // };
//
//     // const handlePlayback = () => {
//     //     if (isPlaying) {
//     //         audioRef.current?.pause();
//     //         setIsPlaying(false);
//     //     } else {
//     //         // In a real app, you'd use actual audio data here
//     //         // This is just for demonstration
//     //         const audio = new Audio('path/to/recording');
//     //         audioRef.current = audio;
//     //         audio.play().then(() => {
//     //             setIsPlaying(true);
//     //             audio.onended = () => setIsPlaying(false);
//     //         });
//     //     }
//     // };
//
//     return (
//         <div className={cn('w-full py-4', className)}>
//             <div className="relative mx-auto flex w-full max-w-xl flex-col items-center gap-1.5">
//                 <button
//                     className={cn(
//                         'group flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300',
//                         submitted
//                             ? 'bg-black/5 dark:bg-white/5'
//                             : 'hover:bg-black/5 dark:hover:bg-white/5'
//                     )}
//                     type="button"
//                     onClick={handleClick}
//                 >
//                     {submitted ? (
//                         <div
//                             className="pointer-events-auto h-5 w-5 animate-spin cursor-pointer rounded-sm bg-black dark:bg-white"
//                             style={{ animationDuration: '3s' }}
//                         />
//                     ) : (
//                         <Mic className="h-5 w-5 text-black/70 dark:text-white/70" />
//                     )}
//                 </button>
//
//                 <span
//                     className={cn(
//                         'font-mono text-xs tracking-wider transition-all duration-300',
//                         submitted
//                             ? 'text-black/70 dark:text-white/70'
//                             : 'dark:text.white/40 text-black/40'
//                     )}
//                 >
//                     {formatTime(time)}
//                 </span>
//
//                 <div className="flex h-3 w-56 items-center justify-center gap-[2px]">
//                     {[...Array(visualizerBars)].map((_, i) => (
//                         <div
//                             key={i}
//                             className={cn(
//                                 'w-[2px] rounded-full transition-all duration-300',
//                                 submitted
//                                     ? 'animate-pulse bg-black/40 dark:bg-white/40'
//                                     : 'h-[2px] bg-black/10 dark:bg-white/10'
//                             )}
//                             style={
//                                 submitted && isClient
//                                     ? {
//                                           height: `${30 + Math.random() * 70}%`,
//                                           animationDelay: `${i * 0.02}s`,
//                                       }
//                                     : undefined
//                             }
//                         />
//                     ))}
//                 </div>
//
//                 {/*{recordingComplete ? (*/}
//                 {/*    <div className="mt-2 flex gap-2">*/}
//                 {/*        <button*/}
//                 {/*            onClick={handleCancel}*/}
//                 {/*            className="rounded-lg bg-black/5 px-3 py-1 text-xs text-black/60 transition-all duration-200 hover:bg-black/10 dark:bg-white/5 dark:text.white/60 dark:hover:bg.white/10"*/}
//                 {/*        >*/}
//                 {/*            Cancel*/}
//                 {/*        </button>*/}
//                 {/*        <button*/}
//                 {/*            onClick={handlePlayback}*/}
//                 {/*            className="flex items-center gap-1.5 rounded-lg bg-black/5 px-3 py-1 text-xs text-black/60 transition-all duration-200 hover:bg-black/10 dark:bg-white/5 dark:text.white/60 dark:hover:bg.white/10"*/}
//                 {/*        >*/}
//                 {/*            {isPlaying ? (*/}
//                 {/*                <>*/}
//                 {/*                    <Square className="h-2.5 w-2.5" />*/}
//                 {/*                    Stop*/}
//                 {/*                </>*/}
//                 {/*            ) : (*/}
//                 {/*                <>*/}
//                 {/*                    <Play className="h-2.5 w-2.5" />*/}
//                 {/*                    Play*/}
//                 {/*                </>*/}
//                 {/*            )}*/}
//                 {/*        </button>*/}
//                 {/*        <button*/}
//                 {/*            onClick={handleSend}*/}
//                 {/*            className="rounded-lg bg-black/10 px-3 py-1 text-xs text-black/60 transition-all duration-200 hover:bg-black/15 dark:bg-white/10 dark:text.white/60 dark:hover:bg.white/15"*/}
//                 {/*        >*/}
//                 {/*            Send*/}
//                 {/*        </button>*/}
//                 {/*    </div>*/}
//                 {/*) : (*/}
//                 <p className="dark:text.white/50 h-4 text-[10px] text-black/50">
//                     {submitted ? 'Listening...' : 'Click to speak'}
//                 </p>
//                 {/*)}*/}
//                 {/*{transcript && (*/}
//                 {/*    <div className="mt-2 text-sm text-black/70 dark:text.white/70">*/}
//                 {/*        <p>Transcript: {transcript}</p>*/}
//                 {/*    </div>*/}
//                 {/*)}*/}
//             </div>
//         </div>
//     );
// }
