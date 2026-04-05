import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="px-4 pb-8 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="panel-muted px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="font-display text-lg font-semibold tracking-[0.18em] text-accent-900">
                EC画像ととのえ
              </div>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                運営者名: ゴヨウタシ
              </p>
              <p className="text-sm leading-7 text-slate-600">
                商品画像はブラウザ内で処理され、アップロード画像は当サイトのサーバーに保存されません。
              </p>
            </div>

            <div className="flex flex-col gap-2 text-sm text-slate-600 md:items-end">
              <Link href="/#contact" className="hover:text-accent-800">
                お問い合わせ
              </Link>
              <Link href="/privacy" className="hover:text-accent-800">
                プライバシーポリシー
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
