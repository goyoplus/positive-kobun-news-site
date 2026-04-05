import Link from "next/link";

type CategoryBadgeProps = {
  href: string;
  label: string;
};

export function CategoryBadge({ href, label }: CategoryBadgeProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-full border border-sage-200 bg-sage-50 px-3 py-1 text-xs font-medium tracking-[0.22em] text-sage-700 transition hover:border-sage-300 hover:bg-sage-100"
    >
      {label}
    </Link>
  );
}
