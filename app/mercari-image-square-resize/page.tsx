import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "メルカリの出品画像を正方形に整える無料ツール",
  description:
    "メルカリ出品用の画像を正方形に整えたい方向けの無料ツールです。余白追加やサイズ調整を簡単に行えます。",
};

export default function MercariImageSquareResizePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <article className="prose prose-neutral max-w-none">
        <h1>メルカリ出品画像を正方形に整える方法</h1>

        <p>
          メルカリでは、商品画像が整っているだけで一覧画面の見え方がかなり変わります。
          このページでは、画像を正方形に整えて、見やすく出品したい方向けの無料ツールを紹介します。
        </p>

        <h2>メルカリ画像で多い悩み</h2>
        <ul>
          <li>写真の向きがバラバラで見栄えが悪い</li>
          <li>商品が端に寄っていて見にくい</li>
          <li>画像のサイズをそろえるのが面倒</li>
        </ul>

        <h2>このツールの特徴</h2>
        <ul>
          <li>メルカリ向けに正方形へ簡単変換</li>
          <li>商品を切らずに余白で整えられる</li>
          <li>スマホで撮った写真も扱いやすい</li>
          <li>無料ですぐ使える</li>
        </ul>

        <h2>使うメリット</h2>
        <ul>
          <li>一覧での見た目が整う</li>
          <li>商品が見やすくなる</li>
          <li>出品作業が早くなる</li>
        </ul>

        <h2>よくある質問</h2>

        <h3>無料で使えますか？</h3>
        <p>はい。基本機能は無料で使えます。</p>

        <h3>スマホでも使えますか？</h3>
        <p>はい。スマホからでも利用できます。</p>

        <div className="mt-10 rounded-2xl border p-6">
          <p className="mb-4 font-semibold">
            メルカリ用の画像をすぐ整えたい場合は、上のツールからそのまま変換してください。
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
