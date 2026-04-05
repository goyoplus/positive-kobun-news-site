export type Category = {
  slug: string;
  name: string;
  description: string;
};

export type Article = {
  slug: string;
  title: string;
  dek: string;
  summary: string;
  positivePoint: string;
  classicalTranslation: string;
  haiku: [string, string, string];
  categorySlug: string;
  tags: string[];
  sourceName: string;
  sourceUrl: string;
  publishedAt: string;
  featuredNote: string;
};

export const siteConfig = {
  name: "古今吉報",
  tagline: "現代の吉報を、やさしく、古く、おもしろく。",
  description:
    "前向きなニュースだけを集め、やさしい要約、古文ふう意訳、俳句要約で届ける和やかなニュースサイト。",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  navItems: [
    { href: "/articles", label: "記事一覧" },
    { href: "/categories", label: "カテゴリ" },
    { href: "/haiku", label: "俳句で巡る" },
    { href: "/about", label: "このサイトについて" },
  ],
} as const;

export const categories: Category[] = [
  {
    slug: "technology",
    name: "技術",
    description: "ものづくりや新サービスの前進を、明るく実感できる話。",
  },
  {
    slug: "local",
    name: "地方",
    description: "地域で生まれた小さな工夫や、地元発の面白い挑戦。",
  },
  {
    slug: "work",
    name: "仕事",
    description: "働き方や商いに効く、現場の知恵と改善のニュース。",
  },
  {
    slug: "education",
    name: "教育",
    description: "学びの場で芽吹いた、次につながる好ましい変化。",
  },
  {
    slug: "research",
    name: "研究",
    description: "研究成果や実証の進展を、読みやすく噛み砕いた話。",
  },
  {
    slug: "lifestyle",
    name: "くらし",
    description: "日々の暮らしをほんの少しよくする実践や発明。",
  },
  {
    slug: "healthcare",
    name: "医療",
    description: "医療や介護の現場で続けやすい前向きな取り組み。",
  },
  {
    slug: "environment",
    name: "環境",
    description: "無理なく続けられる環境改善や循環の工夫。",
  },
];

// MVP seed content. Replace sample source URLs with real article links before launch.
const articleSeed: Article[] = [
  {
    slug: "precision-factory-overseas-orders",
    title: "地方の精密加工会社、新治具の工夫で海外受注を拡大",
    dek: "少人数の町工場が加工精度を高め、海外企業から継続発注を得たという前向きな話です。",
    summary:
      "地方の精密加工会社が、作業のぶれを減らす独自治具を開発し、納期の安定と品質向上を実現したことで、海外の取引先からの注文を増やしたというニュースです。",
    positivePoint:
      "大きな設備投資だけでなく、現場の改善力そのものが競争力になることを示しています。中小企業でも、強みの磨き方しだいで世界とつながれる点が明るい材料です。",
    classicalTranslation:
      "いと小さき工房なれど、わざの整ひけるによりて、海の外よりも求めらるること、まことにめでたきしるしなり。",
    haiku: ["技磨き", "海の向こうへ", "春ひらく"],
    categorySlug: "technology",
    tags: ["中小企業", "製造業", "海外展開"],
    sourceName: "元記事サンプル",
    sourceUrl: "https://example.com/source/precision-factory-overseas-orders",
    publishedAt: "2026-04-05",
    featuredNote: "町工場の改善力が、そのまま世界への切符になった一報。",
  },
  {
    slug: "shopping-street-learning-workshop",
    title: "商店街の空き店舗、高校生の工房として再生",
    dek: "空いた店を地域の学び場に変え、高校生と商店街が一緒に使い始めた取り組みです。",
    summary:
      "地元商店街の空き店舗を改装し、高校生が木工やデザインを学べる工房として活用する実証が始まりました。地域の店主も講師役として参加しています。",
    positivePoint:
      "空き店舗対策と若い世代の実践的な学びが同時に進む点が前向きです。地域の知恵がそのまま教育資源になる、持続しやすい形でもあります。",
    classicalTranslation:
      "あきらける店の間も、若き人らの学びの座となりて、町のぬくもり再び満ちくること、をかしきこと限りなし。",
    haiku: ["空き店に", "若葉の手仕事", "町息づく"],
    categorySlug: "local",
    tags: ["地域活性", "高校生", "リノベーション"],
    sourceName: "元記事サンプル",
    sourceUrl: "https://example.com/source/shopping-street-learning-workshop",
    publishedAt: "2026-04-04",
    featuredNote: "地域の空白を、学びと手仕事で埋め直す良い循環。",
  },
  {
    slug: "care-sensor-long-battery",
    title: "介護見守りセンサー、電池交換を年1回へ",
    dek: "介護現場の負担を減らすため、見守り機器の電力効率を高めた開発です。",
    summary:
      "介護施設向けの見守りセンサーで、省電力設計を進めた新モデルが登場し、電池交換の頻度を大幅に減らせるようになったというニュースです。",
    positivePoint:
      "機能を増やすだけでなく、現場で続けやすい設計に振っている点が重要です。介護職の細かな負担を減らす改善は、導入の広がりにもつながります。",
    classicalTranslation:
      "人を見守る器も、いよいよ手間すくなくなりて、日々いそがしき現場を助くること、ありがたきわざなり。",
    haiku: ["見守りの", "手間ひとつ減り", "灯やさし"],
    categorySlug: "healthcare",
    tags: ["介護", "省力化", "センサー"],
    sourceName: "元記事サンプル",
    sourceUrl: "https://example.com/source/care-sensor-long-battery",
    publishedAt: "2026-04-03",
    featuredNote: "派手ではないが、現場にいちばん効く改良。",
  },
  {
    slug: "food-waste-packaging-research",
    title: "大学研究室、食品ロスを減らす新包装素材を開発",
    dek: "鮮度保持の工夫で廃棄を減らしやすくする研究成果がまとまった話です。",
    summary:
      "大学の研究チームが、湿度をゆるやかに調整できる包装素材を開発し、野菜や焼き菓子の保存期間を伸ばせる可能性を示しました。",
    positivePoint:
      "研究成果がそのまま家庭や小売の無駄の削減につながる点が明るいです。難しい技術でも、生活者に届く出口が見えている研究は価値があります。",
    classicalTranslation:
      "包みの材までも賢くなりて、食のむだをしづかに減らさんとすること、まことに世のため人のためなり。",
    haiku: ["包む知恵", "食のあしたを", "やわらかく"],
    categorySlug: "research",
    tags: ["大学研究", "食品ロス", "新素材"],
    sourceName: "元記事サンプル",
    sourceUrl: "https://example.com/source/food-waste-packaging-research",
    publishedAt: "2026-04-02",
    featuredNote: "研究の出口が暮らしに近いと、希望は伝わりやすい。",
  },
  {
    slug: "voice-map-station-navigation",
    title: "音声地図アプリ、駅の乗り換え導線をより分かりやすく",
    dek: "視覚障害のある人の移動を支えるため、駅構内の案内を細かく改善した更新です。",
    summary:
      "音声地図アプリの最新版で、駅構内の階段位置や改札の向きなどの案内精度が上がり、乗り換え時の迷いを減らせるようになりました。",
    positivePoint:
      "テクノロジーが誰か一部のためだけでなく、移動の不便を減らす具体策として働いている点がよい話です。小さな改善の積み重ねが、移動の自由を広げます。",
    classicalTranslation:
      "道を告ぐる声、いよいよ細やかになりて、駅路にまどふ人を助くること、心うれしきわざなり。",
    haiku: ["道しるべ", "声のぬくもり", "駅晴るる"],
    categorySlug: "lifestyle",
    tags: ["アクセシビリティ", "アプリ", "公共交通"],
    sourceName: "元記事サンプル",
    sourceUrl: "https://example.com/source/voice-map-station-navigation",
    publishedAt: "2026-04-01",
    featuredNote: "機能追加より先に、使う人の不便をほどく更新。",
  },
  {
    slug: "brewery-data-export",
    title: "小規模酒蔵、発酵データの見える化で新しい輸出商品を開発",
    dek: "経験に頼りがちな酒造りにデータを重ね、海外向けの商品開発に生かした事例です。",
    summary:
      "小規模酒蔵が温度や発酵の変化を記録して分析し、味の再現性を高めたことで、海外向けの新商品を安定して出荷できるようになりました。",
    positivePoint:
      "伝統産業がデータ活用を取り込みながら、らしさを失わずに販路を広げている点が前向きです。地元の技が今の方法で次へつながっています。",
    classicalTranslation:
      "古き蔵のわざに、新しきしるしを添へて、遠き国にも香りを届けんとすること、めでたく頼もし。",
    haiku: ["蔵の春", "数字と香り", "海を越え"],
    categorySlug: "work",
    tags: ["伝統産業", "データ活用", "輸出"],
    sourceName: "元記事サンプル",
    sourceUrl: "https://example.com/source/brewery-data-export",
    publishedAt: "2026-03-31",
    featuredNote: "伝統と計測がきれいに両立した好例。",
  },
  {
    slug: "highschool-river-sensor",
    title: "工業高校チーム、安価な水質センサーを制作",
    dek: "生徒たちが地域の川を調べるため、手の届く価格のセンサーづくりに挑んだニュースです。",
    summary:
      "工業高校の生徒チームが、部品コストを抑えた水質センサーを自作し、地元河川の継続観測に活用し始めました。",
    positivePoint:
      "学びが教室の中で終わらず、地域の課題にそのまま向いている点が良いところです。若い世代の実践が、地域への関心と技術の両方を育てています。",
    classicalTranslation:
      "若き工の子ら、川のけしきを守らんとて、みづから器を作り出づること、いと頼もしき眺めなり。",
    haiku: ["川を見る", "若きまなざし", "澄みわたる"],
    categorySlug: "education",
    tags: ["高校生", "環境計測", "地域連携"],
    sourceName: "元記事サンプル",
    sourceUrl: "https://example.com/source/highschool-river-sensor",
    publishedAt: "2026-03-30",
    featuredNote: "授業が地域にひらくと、学びの輪郭がはっきりする。",
  },
  {
    slug: "recycled-paper-insulation",
    title: "古紙由来の断熱材、地域工場が量産へ",
    dek: "再生素材を使った断熱材づくりが進み、冬の光熱費対策にも期待が集まっています。",
    summary:
      "地域の建材工場が、古紙を活用した断熱材の製造体制を整え、省エネ改修向けの供給を始める準備を進めています。",
    positivePoint:
      "資源循環と暮らしの負担軽減が同時に進む点が前向きです。環境対応が生活コストの改善にも結びつくと、広がりやすくなります。",
    classicalTranslation:
      "紙の命あらたまりて、寒き季の住まひを助くる材となること、まことにむだなき世のしるしなり。",
    haiku: ["紙めぐり", "あたたかき壁", "冬やわぐ"],
    categorySlug: "environment",
    tags: ["再資源化", "省エネ", "建材"],
    sourceName: "元記事サンプル",
    sourceUrl: "https://example.com/source/recycled-paper-insulation",
    publishedAt: "2026-03-28",
    featuredNote: "循環の話を、生活の実感にまで引き寄せたニュース。",
  },
  {
    slug: "fish-coldchain-service",
    title: "未利用魚を生かす冷凍サービス、漁港から首都圏へ",
    dek: "これまで流通しづらかった魚を、冷凍技術で届けやすくした地域発の取り組みです。",
    summary:
      "漁港で水揚げされても活用しきれなかった魚を、品質を保つ冷凍サービスで都市部へ出荷する仕組みが動き始めました。",
    positivePoint:
      "捨てられがちな資源を価値に変え、漁業者の収入機会も増やせる点が明るいです。地域の課題が新しい商いに変わる好例といえます。",
    classicalTranslation:
      "浜に残りし魚までも、工夫の冷えにて都へ送り出づること、いと賢く、浜の喜びも増さむ。",
    haiku: ["浜の知恵", "眠れる魚に", "道ひらく"],
    categorySlug: "local",
    tags: ["水産", "フードテック", "販路開拓"],
    sourceName: "元記事サンプル",
    sourceUrl: "https://example.com/source/fish-coldchain-service",
    publishedAt: "2026-03-26",
    featuredNote: "埋もれていた価値を、物流の工夫で掘り起こした例。",
  },
  {
    slug: "small-factory-shared-orders",
    title: "町工場ネットワーク、共同受注で短納期案件に対応",
    dek: "複数の工場が得意分野をつなぎ、今まで受けづらかった案件を回せるようにした取り組みです。",
    summary:
      "近隣の町工場数社が加工工程を分担する体制を整え、これまで断っていた短納期案件にも対応できる仕組みを作りました。",
    positivePoint:
      "競争だけでなく連携で強くなる形を示しているのが良い点です。地域内で仕事が回ることで、技術も売上も地域に残りやすくなります。",
    classicalTranslation:
      "工房ひとつひとつのわざを結び合わせて、急ぎの求めにも応ずること、まことに和して強き姿なり。",
    haiku: ["手をつなぎ", "町のわざ咲く", "納期駆く"],
    categorySlug: "technology",
    tags: ["町工場", "共同受注", "地域連携"],
    sourceName: "元記事サンプル",
    sourceUrl: "https://example.com/source/small-factory-shared-orders",
    publishedAt: "2026-03-24",
    featuredNote: "個社の限界を、連携の設計で越えた一報。",
  },
];

const byNewest = (left: Article, right: Article) =>
  Date.parse(right.publishedAt) - Date.parse(left.publishedAt);

export const articles = [...articleSeed].sort(byNewest);

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryStats() {
  return categories.map((category) => ({
    ...category,
    count: articles.filter((article) => article.categorySlug === category.slug).length,
  }));
}

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(categorySlug: string) {
  return articles.filter((article) => article.categorySlug === categorySlug);
}

export function getFeaturedArticle() {
  return articles[0];
}

export function getLatestArticles(count = articles.length) {
  return articles.slice(0, count);
}

export function getRelatedArticles(article: Article, count = 3) {
  return articles
    .filter((candidate) => candidate.slug !== article.slug)
    .sort((left, right) => {
      const leftScore = getRelatedScore(article, left);
      const rightScore = getRelatedScore(article, right);

      if (leftScore === rightScore) {
        return byNewest(left, right);
      }

      return rightScore - leftScore;
    })
    .slice(0, count);
}

function getRelatedScore(baseArticle: Article, candidate: Article) {
  let score = 0;

  if (baseArticle.categorySlug === candidate.categorySlug) {
    score += 3;
  }

  score += candidate.tags.filter((tag) => baseArticle.tags.includes(tag)).length;

  return score;
}

export function formatJapaneseDate(date: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function buildAbsoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}
