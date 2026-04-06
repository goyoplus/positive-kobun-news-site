import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Amazon用に商品画像を1:1の正方形に変換する無料ツール",
  description:
    "Amazonの商品画像を正方形に整えたい方向けの無料ツールです。白背景を保ちながら余白を追加し、1:1サイズに簡単変換できます。",
};

export default function AmazonProductImageSquarePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <article className="prose prose-neutral max-w-none">
        <h1>Amazon用に商品画像を1:1の正方形へ変換する方法</h1>

        <p>
          Amazonに出品する商品画像は、見た目の整い方がクリック率や印象に大きく影響します。
          このページでは、長方形の商品画像を正方形に整えたい方に向けて、簡単に使える無料ツールを紹介します。
        </p>

        <h2>Amazon用画像でよくある悩み</h2>
        <ul>
          <li>画像が縦長や横長で見た目がバラバラ</li>
          <li>余白が足りず、商品が窮屈に見える</li>
          <li>白背景にしたいが編集ソフトは面倒</li>
        </ul>

        <h2>このツールでできること</h2>
        <ul>
          <li>商品画像を1:1の正方形に変換</li>
          <li>白背景のまま自然に余白を追加</li>
          <li>出品用に見やすい形へ整える</li>
          <li>面倒な画像編集ソフトなしで使える</li>
        </ul>

        <h2>こんな人におすすめ</h2>
        <ul>
          <li>Amazon出品用画像を整えたい</li>
          <li>商品画像を一括で見やすくしたい</li>
          <li>とにかく簡単に正方形化したい</li>
        </ul>

        <h2>よくある質問</h2>

        <h3>無料で使えますか？</h3>
        <p>はい。基本機能は無料で使えます。</p>

        <h3>スマホでも使えますか？</h3>
        <p>はい。スマホからでも利用できます。</p>

        <div className="mt-10 rounded-2xl border p-6">
          <p className="mb-4 font-semibold">
            Amazon用の商品画像を整えたい方は、上の画像変換ツールをそのままお使いください。
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
