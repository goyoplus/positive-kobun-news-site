import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CategoryBadge } from "@/components/category-badge";
import { HaikuBlock } from "@/components/haiku-block";
import { categories, formatJapaneseDate, type Article } from "@/lib/news-data";

type ArticleCardProps = {
  article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
  const category = categories.find(
    (candidate) => candidate.slug === article.categorySlug,
  );

  if (!category) {
    return null;
  }

  return (
    <article className="paper-panel fade-rise flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <CategoryBadge href={`/categories/${category.slug}`} label={category.name} />
        <time className="shrink-0 text-sm text-indigobase/55">
          {formatJapaneseDate(article.publishedAt)}
        </time>
      </div>

      <div className="mt-5 space-y-3">
        <h3 className="font-serif text-2xl leading-tight text-ink">
          <Link href={`/articles/${article.slug}`} className="hover:text-sage-700">
            {article.title}
          </Link>
        </h3>
        <p className="text-sm leading-7 text-indigobase/72">{article.dek}</p>
      </div>

      <div className="mt-6">
        <HaikuBlock lines={article.haiku} compact />
      </div>

      <Link
        href={`/articles/${article.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-sage-700 transition hover:gap-3"
      >
        続きを読む
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
