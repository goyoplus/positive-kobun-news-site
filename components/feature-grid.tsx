import Image from "next/image";

export function FeatureGrid() {
  return (
    <section id="features" className="px-4 py-2 sm:px-6 lg:px-8 lg:py-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <div>
            <div className="text-sm font-medium tracking-[0.18em] text-accent-700 uppercase">Feature Set</div>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950 sm:text-3xl">
              実務で使う要点だけを、気持ちよく。
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
              まずは「画像を追加して、そのまま整形して保存する」流れに絞った構成です。
            </p>
          </div>
        </div>

        <div className="panel-muted overflow-hidden bg-gradient-to-br from-accent-200/35 via-white/95 to-accent-100/65 p-5 md:p-6">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-center">
            <div className="max-w-md">
              <div className="soft-badge">Visual Flow</div>
              <h3 className="mt-4 text-2xl font-semibold text-slate-950 sm:text-3xl">
                横長画像も、販売用の正方形へ。
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                アスペクト比の違う商品画像でも、1:1 に整えながら商品が見えやすい配置へ寄せる流れをそのまま見せています。
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-500">
                <span className="rounded-full border border-accent-200/70 bg-white/95 px-3 py-1 shadow-soft">16:9 → 1:1</span>
                <span className="rounded-full border border-accent-300/70 bg-accent-100/90 px-3 py-1 shadow-soft">余白を自動調整</span>
                <span className="rounded-full border border-accent-200/70 bg-white/95 px-3 py-1 shadow-soft">見切れにくい配置</span>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[640px]">
              <div className="overflow-hidden rounded-[32px] border border-accent-300/75 bg-white/94 p-3 shadow-float backdrop-blur">
                <Image
                  src="/images/アスペクト比の変更ガイド.png"
                  alt="横長の商品画像を1対1の正方形画像に整えるガイドイラスト"
                  width={768}
                  height={768}
                  quality={72}
                  sizes="(min-width: 1280px) 640px, (min-width: 1024px) 50vw, 100vw"
                  className="h-auto w-full rounded-[24px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
