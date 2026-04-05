export function LandingHero() {
  return (
    <section className="px-4 pb-6 pt-6 sm:px-6 lg:px-8 lg:pt-8">
      <div className="mx-auto max-w-7xl">
        <div className="panel relative overflow-hidden bg-gradient-to-br from-accent-100/80 via-white/90 to-accent-200/45 px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-accent-400/55 via-accent-100/10 to-accent-300/45" />

          <div className="relative">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="font-display text-base font-semibold tracking-[0.22em] text-accent-900 sm:text-lg">
                  EC画像ととのえ
                </div>
              </div>
              <p className="max-w-sm text-xs leading-6 text-slate-500 sm:text-right">
                アップロード画像はサーバーに保存されません。画像処理はブラウザ内だけで完結します。
              </p>
            </div>

            <div className="mt-6">
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                EC画像を、
                <span className="block text-accent-800">やさしく一括でととのえる。</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
