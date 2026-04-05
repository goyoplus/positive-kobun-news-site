import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/article-card";
import { SectionTitle } from "@/components/section-title";
import {
  buildAbsoluteUrl,
  categories,
  getArticlesByCategory,
  getCategoryBySlug,
} from "@/lib/news-data";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "カテゴリが見つかりません",
    };
  }

  return {
    title: `${category.name}の記事`,
    description: category.description,
    alternates: {
      canonical: `/categories/${category.slug}`,
    },
    openGraph: {
      title: `${category.name}の記事`,
      description: category.description,
      url: buildAbsoluteUrl(`/categories/${category.slug}`),
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryArticles = getArticlesByCategory(category.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <section className="paper-panel pattern-weave p-8 md:p-10">
        <SectionTitle
          eyebrow="Category Detail"
          title={category.name}
          description={category.description}
        />
        <p className="mt-6 text-sm leading-7 text-indigobase/72">
          現在 {categoryArticles.length} 本の記事があります。MVPでは新着順に並べ、
          読み味の違いよりも前向きさを優先して収録しています。
        </p>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        {categoryArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </section>
    </div>
  );
}
