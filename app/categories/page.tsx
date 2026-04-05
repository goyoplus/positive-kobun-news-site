import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionTitle } from "@/components/section-title";
import { getCategoryStats, getLatestArticles } from "@/lib/news-data";

export const metadata: Metadata = {
  title: "カテゴリ",
  description: "古今吉報のカテゴリ一覧。技術、地方、仕事、教育など、前向きな話題だけを棚分けしています。",
  alternates: {
    canonical: "/categories",
  },
};

export default function CategoriesPage() {
  const categories = getCategoryStats().filter((category) => category.count > 0);
  const latestArticles = getLatestArticles();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <section className="paper-panel pattern-weave p-8 md:p-10">
        <SectionTitle
          eyebrow="Category Shelf"
          title="カテゴリ一覧"
          description="ニュースを不安で切り分けるのではなく、伸びしろと読み味で並べ替えた棚です。気分に合う入口からどうぞ。"
        />
      </section>

      <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => {
          const categoryArticles = latestArticles.filter(
            (article) => article.categorySlug === category.slug,
          );

          return (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="paper-panel flex min-h-[240px] flex-col justify-between p-6 transition hover:-translate-y-1"
            >
              <div>
                <p className="section-kicker">{String(category.count).padStart(2, "0")}本</p>
                <h2 className="mt-3 font-serif text-3xl text-ink">{category.name}</h2>
                <p className="mt-4 text-sm leading-7 text-indigobase/72">
                  {category.description}
                </p>
              </div>

              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.3em] text-sage-600">
                  recent
                </p>
                <div className="mt-3 space-y-2">
                  {categoryArticles.slice(0, 2).map((article) => (
                    <p key={article.slug} className="text-sm leading-7 text-indigobase/74">
                      {article.title}
                    </p>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-sage-700">
                  カテゴリを開く
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
