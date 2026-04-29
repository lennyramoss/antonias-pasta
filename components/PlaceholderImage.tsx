type PlaceholderVariant = "square" | "circle" | "triangle";

type PlaceholderImageProps = {
  label: string;
  variant?: PlaceholderVariant;
  className?: string;
};

export default function PlaceholderImage({
  label,
  variant = "square",
  className = "",
}: PlaceholderImageProps) {
  return (
    <div
      aria-label={label}
      role="img"
      className={`flex items-center justify-center rounded-[10px] bg-antonias-panel ${className}`}
    >
      {variant === "square" && (
        <span aria-hidden="true" className="block size-14 rounded-[3px] bg-white sm:size-16" />
      )}
      {variant === "circle" && (
        <span aria-hidden="true" className="block size-16 rounded-full bg-white sm:size-[74px]" />
      )}
      {variant === "triangle" && <span aria-hidden="true" className="placeholder-triangle" />}
    </div>
  );
}
