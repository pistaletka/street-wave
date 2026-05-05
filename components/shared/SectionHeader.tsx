interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
}

export default function SectionHeader({ badge, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-3">
      {badge && <p className="sw-label mb-1 text-accent">{badge}</p>}
      <h2 className="sw-h2 text-3xl sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 max-w-2xl sw-body text-text-secondary">
          {description}
        </p>
      )}
    </div>
  );
}
