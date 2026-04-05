import type { Metadata } from "next";

import { ArticleCard } from "@/components/article-card";
import { CategoryBadge } from "@/components/category-badge";
import { SectionTitle } from "@/components/section-title";
import { getCategoryStats, getLatestArticles, siteConfig } from "@/lib/news-data";

export const metadata: Metadata = {
  title: "記事一覧",
  description:
    "古今吉報の記事一覧。前向きなニュースをやさしい要約、古文ふう意訳、俳句でまとめて読めます。",
  alternates: {
    canonical: "/articles",
  },
};

export default function ArticlesPage() {
  const articles = getLatestArticles();
  const categories = getCategoryStats().filter((category) => category.count > 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <section className="paper-panel pattern-weave p-8 md:p-10">
        <SectionTitle
          eyebrow="All Articles"
          title="新着順の記事一覧"
          description={`${siteConfig.name} の記事を新しい順に並べています。まずは気になるカテゴリからでも、俳句の一行からでもどうぞ。`}
        />
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <CategoryBadge
              key={category.slug}
              href={`/categories/${category.slug}`}
              label={`${category.name} (${category.count})`}
            />
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </section>
    </div>
  );
}
