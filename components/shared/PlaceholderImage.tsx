interface PlaceholderImageProps {
  aspectRatio?: string;
  className?: string;
  label?: string;
}

export default function PlaceholderImage({
  aspectRatio = "4/5",
  className = "",
  label,
}: PlaceholderImageProps) {
  return (
    <div
      className={`relative w-full border border-border bg-surface ${className}`}
      style={{ aspectRatio }}
    >
      {label && (
        <span className="absolute inset-0 flex items-center justify-center sw-caption text-muted/40 select-none">
          {label}
        </span>
      )}
    </div>
  );
}
