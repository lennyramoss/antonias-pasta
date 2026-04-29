type SectionDividerProps = {
  className?: string;
};

export default function SectionDivider({ className = "" }: SectionDividerProps) {
  return (
    <div className={`mx-auto w-[calc(100%-2rem)] max-w-[700px] ${className}`} aria-hidden="true">
      <div className="h-px w-full bg-antonias-gold/35" />
    </div>
  );
}
