import type { Metadata } from "next";

import { SectionTitle } from "@/components/section-title";

export const metadata: Metadata = {
  title: "このサイトについて",
  description:
    "古今吉報のコンセプト、記事フォーマット、運用方針をまとめたページです。",
  alternates: {
    canonical: "/about",
  },
};

const principles = [
  "暗い話題や炎上ではなく、読後に少し呼吸が軽くなるニュースを扱う。",
  "単なる転載にせず、要約と観点、古文ふう意訳、俳句で独自性を作る。",
  "MVPでは量より質を優先し、手動で確かめた記事だけを少しずつ増やす。",
];

const formatItems = [
  "やさしい要約: 元ニュースの輪郭を、まずは短くつかむ。",
  "よき知らせポイント: なぜ前向きなのかを一段深く言語化する。",
  "古文ふう意訳: 少し知的で、少し遊び心のある読み味を足す。",
  "俳句要約: 五・七・五で余韻だけを残す。",
];

const workflowItems = [
  "元記事を見つける",
  "前向きな内容か判断する",
  "要約、観点、古文、俳句を作る",
  "短く整えて公開する",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <section className="paper-panel pattern-weave p-8 md:p-10">
        <SectionTitle
          eyebrow="About"
          title="古今吉報とは"
          description="前向きなニュースだけを集め、現代の吉報を現代語と古風な遊びのあいだで読み直す、小さなニュースサイトです。"
        />
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        <article className="paper-panel p-6 lg:col-span-2">
          <p className="section-kicker">Editorial Principles</p>
          <div className="mt-5 space-y-4">
            {principles.map((item) => (
              <p key={item} className="text-base leading-8 text-indigobase/76">
                {item}
              </p>
            ))}
          </div>
        </article>

        <article className="paper-panel-soft p-6">
          <p className="section-kicker">MVPの前提</p>
          <p className="mt-4 text-sm leading-7 text-indigobase/72">
            管理画面は持たず、記事は手動追加。まずは 10 本前後の初期アーカイブで
            反応を見ながら、検索流入や SNS での読みやすさを整えていきます。
          </p>
        </article>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="paper-panel p-6">
          <p className="section-kicker">記事の基本フォーマット</p>
          <div className="mt-5 space-y-4">
            {formatItems.map((item) => (
              <p key={item} className="text-base leading-8 text-indigobase/76">
                {item}
              </p>
            ))}
          </div>
        </article>

        <article className="paper-panel p-6">
          <p className="section-kicker">作成フロー</p>
          <div className="mt-5 space-y-4">
            {workflowItems.map((item, index) => (
              <p key={item} className="text-base leading-8 text-indigobase/76">
                {index + 1}. {item}
              </p>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
