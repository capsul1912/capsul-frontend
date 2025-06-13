export default function TypingEffect() {
  return (
    <div className="flex animate-fade-in items-center space-x-2">
      <div className="flex space-x-1">
        <div className="size-[6px] animate-bounce rounded-full bg-primary" style={{ animationDelay: "0ms" }} />
        <div className="size-[6px] max-w-[6px] animate-bounce rounded-full bg-primary" style={{ animationDelay: "150ms" }} />
        <div className="size-[6px] animate-bounce rounded-full bg-primary" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  )
}
