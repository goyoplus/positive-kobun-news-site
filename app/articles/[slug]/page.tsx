import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/article-card";
import { CategoryBadge } from "@/components/category-badge";
import { HaikuBlock } from "@/components/haiku-block";
import {
  articles,
  buildAbsoluteUrl,
  formatJapaneseDate,
  getArticleBySlug,
  getCategoryBySlug,
  getRelatedArticles,
} from "@/lib/news-data";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "記事が見つかりません",
    };
  }

  const category = getCategoryBySlug(article.categorySlug);

  return {
    title: article.title,
    description: article.dek,
    alternates: {
      canonical: `/articles/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      url: buildAbsoluteUrl(`/articles/${article.slug}`),
      publishedTime: article.publishedAt,
      section: category?.name,
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.dek,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const category = getCategoryBySlug(article.categorySlug);
  const relatedArticles = getRelatedArticles(article);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <Link
        href="/articles"
        className="inline-flex items-center gap-2 text-sm font-medium text-sage-700"
      >
        <ArrowLeft className="h-4 w-4" />
        記事一覧へ戻る
      </Link>

      <article className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="paper-panel overflow-hidden p-8 md:p-10">
          <div className="flex flex-wrap items-center gap-3">
            {category ? (
              <CategoryBadge
                href={`/categories/${category.slug}`}
                label={category.name}
              />
            ) : null}
            <time className="text-sm text-indigobase/58">
              {formatJapaneseDate(article.publishedAt)}
            </time>
          </div>

          <h1 className="mt-6 max-w-4xl font-serif text-4xl leading-tight text-ink md:text-5xl">
            {article.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-9 text-indigobase/76">
            {article.dek}
          </p>

          <div className="mt-10 grid gap-6">
            <section className="article-panel">
              <p className="section-kicker">やさしい要約</p>
              <p className="mt-4 text-base leading-8 text-indigobase/76">
                {article.summary}
              </p>
            </section>

            <section className="article-panel">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-gold-100 p-2 text-gold-400">
                  <Sparkles className="h-4 w-4" />
                </span>
                <p className="section-kicker">よき知らせポイント</p>
              </div>
              <p className="mt-4 text-base leading-8 text-indigobase/76">
                {article.positivePoint}
              </p>
            </section>

            <section className="article-panel bg-[linear-gradient(140deg,rgba(239,245,239,0.92),rgba(255,252,247,0.92))]">
              <p className="section-kicker">古文ふう意訳</p>
              <p className="mt-4 font-serif text-2xl leading-[1.9] text-ink">
                {article.classicalTranslation}
              </p>
            </section>

            <HaikuBlock lines={article.haiku} />

            <section className="article-panel">
              <p className="section-kicker">元記事はこちら</p>
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-sage-200 bg-sage-50 px-5 py-3 text-sm font-medium text-sage-700 transition hover:border-sage-300 hover:bg-sage-100"
              >
                {article.sourceName} を開く
                <ExternalLink className="h-4 w-4" />
              </a>
            </section>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="paper-panel-soft p-6">
            <p className="section-kicker">この話の余韻</p>
            <p className="mt-4 text-sm leading-7 text-indigobase/72">
              {article.featuredNote}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-paper-200 bg-paper-50 px-3 py-1 text-xs text-indigobase/66"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="paper-panel-soft p-6">
            <p className="section-kicker">次に読む</p>
            <div className="mt-4 space-y-4">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.slug}
                  href={`/articles/${relatedArticle.slug}`}
                  className="block rounded-[24px] border border-paper-200 bg-paper-50/90 p-4 transition hover:-translate-y-0.5 hover:border-sage-200"
                >
                  <p className="font-serif text-lg leading-8 text-ink">
                    {relatedArticle.title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-indigobase/70">
                    {relatedArticle.haiku.join(" / ")}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </article>

      <section className="mt-12">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="font-serif text-3xl text-ink">関連記事</h2>
          <Link href="/articles" className="inline-flex items-center gap-2 text-sm font-medium text-sage-700">
            もっと読む
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {relatedArticles.map((relatedArticle) => (
            <ArticleCard key={relatedArticle.slug} article={relatedArticle} />
          ))}
        </div>
      </section>
    </div>
  );
}
