import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "楽天の商品画像を白背景に見やすく整える無料ツール",
  description:
    "楽天の商品画像を白背景で見やすく整えたい方向けの無料ツールです。正方形化や余白調整も簡単にできます。",
};

export default function RakutenProductImageWhiteBackgroundPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <article className="prose prose-neutral max-w-none">
        <h1>楽天の商品画像を白背景で見やすく整える方法</h1>

        <p>
          楽天の商品ページでは、画像の見やすさが第一印象に直結します。
          このページでは、商品画像を白背景で整理し、見やすく整えたい方向けの無料ツールを紹介します。
        </p>

        <h2>楽天画像でありがちな問題</h2>
        <ul>
          <li>背景や余白が不揃いで統一感がない</li>
          <li>商品ごとに画像サイズが違う</li>
          <li>白背景にしたいが手作業は時間がかかる</li>
        </ul>

        <h2>このツールで解決できること</h2>
        <ul>
          <li>白背景に合わせて画像を整えやすい</li>
          <li>正方形の見やすい商品画像を作れる</li>
          <li>商品一覧の統一感を出しやすい</li>
          <li>出品作業を効率化できる</li>
        </ul>

        <h2>こんな使い方に向いています</h2>
        <ul>
          <li>楽天の商品画像をそろえたい</li>
          <li>見栄えを改善したい</li>
          <li>外注せず自分で簡単に整えたい</li>
        </ul>

        <h2>よくある質問</h2>

        <h3>無料で使えますか？</h3>
        <p>はい。基本機能は無料で使えます。</p>

        <h3>スマホでも使えますか？</h3>
        <p>はい。スマホからでも利用できます。</p>

        <div className="mt-10 rounded-2xl border p-6">
          <p className="mb-4 font-semibold">
            楽天向けの商品画像を整えるなら、上の無料ツールをご利用ください。
          </p>
          <Link
            href="/"
            className="inline-flex items-center rounded-xl bg-black px-5 py-3 text-white no-underline"
          >
            ツールを使う
          </Link>
        </div>
      </article>
    </main>
  );
}
