import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center md:px-8">
      <div className="paper-panel p-8 md:p-12">
        <p className="section-kicker">Not Found</p>
        <h1 className="mt-4 font-serif text-4xl text-ink">その頁は見つかりませんでした</h1>
        <p className="mt-5 text-base leading-8 text-indigobase/74">
          記事の場所が変わったか、まだ用意されていないようです。トップか記事一覧から探してください。
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="primary-link">
            トップへ戻る
          </Link>
          <Link href="/articles" className="secondary-link">
            記事一覧へ
          </Link>
        </div>
      </div>
    </div>
  );
}
