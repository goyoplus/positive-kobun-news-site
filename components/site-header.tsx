import Link from "next/link";

import { siteConfig } from "@/lib/news-data";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-paper-200/80 bg-paper-50/82 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-8">
        <Link href="/" className="group">
          <p className="text-[11px] uppercase tracking-[0.35em] text-sage-600">
            よき知らせのみ
          </p>
          <div className="mt-1 flex items-baseline gap-3">
            <span className="font-serif text-2xl text-ink transition group-hover:text-sage-700">
              {siteConfig.name}
            </span>
            <span className="hidden text-sm text-indigobase/68 md:inline">
              {siteConfig.tagline}
            </span>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-2 text-sm">
          {siteConfig.navItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
