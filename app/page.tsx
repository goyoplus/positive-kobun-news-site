import { ContactSection } from "@/components/contact-section";
import { FeatureGrid } from "@/components/feature-grid";
import { ImageWorkspace } from "@/components/image-workspace";
import { LandingHero } from "@/components/landing-hero";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="pb-20">
      <LandingHero />
      <FeatureGrid />
      <ImageWorkspace />
      <ContactSection />
    
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight">出品画像の整え方ガイド</h2>
          <p className="mt-3 text-sm leading-7 text-black/70">
            Amazon・メルカリ・楽天向けに、商品画像を整える方法をまとめました。
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Link href="/amazon-product-image-square" className="rounded-2xl border border-black/10 p-5 transition hover:bg-black/5">
              <div className="text-base font-semibold">Amazon用に商品画像を1:1の正方形へ変換する方法</div>
              <p className="mt-2 text-sm leading-6 text-black/70">Amazon向けの商品画像を正方形に整えたい方向けの解説ページです。</p>
            </Link>
            <Link href="/mercari-image-square-resize" className="rounded-2xl border border-black/10 p-5 transition hover:bg-black/5">
              <div className="text-base font-semibold">メルカリ出品画像を正方形に整える方法</div>
              <p className="mt-2 text-sm leading-6 text-black/70">メルカリ用の画像サイズをそろえたい方向けの解説ページです。</p>
            </Link>
            <Link href="/rakuten-product-image-white-background" className="rounded-2xl border border-black/10 p-5 transition hover:bg-black/5">
              <div className="text-base font-semibold">楽天の商品画像を白背景で見やすく整える方法</div>
              <p className="mt-2 text-sm leading-6 text-black/70">楽天向けの商品画像を白背景で整えたい方向けの解説ページです。</p>
            </Link>
          </div>
        </div>
      </section>
</main>
  );
}
