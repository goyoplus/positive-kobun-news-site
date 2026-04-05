import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionTitle } from "@/components/section-title";
import { getLatestArticles } from "@/lib/news-data";

export const metadata: Metadata = {
  title: "俳句で巡る",
  description: "古今吉報の記事を俳句だけで一覧できるページです。",
  alternates: {
    canonical: "/haiku",
  },
};

export default function HaikuPage() {
  const articles = getLatestArticles();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <section className="paper-panel pattern-weave p-8 md:p-10">
        <SectionTitle
          eyebrow="Haiku View"
          title="俳句で巡る"
          description="五・七・五だけ先に眺めて、気になった記事から読むための一覧です。忙しい日の入口として使えます。"
        />
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="paper-panel flex flex-col p-6 transition hover:-translate-y-1"
          >
            <p className="section-kicker">{article.title}</p>
            <div className="mt-5 font-serif text-3xl leading-relaxed text-ink">
              {article.haiku.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-sage-700">
              本文へ
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
