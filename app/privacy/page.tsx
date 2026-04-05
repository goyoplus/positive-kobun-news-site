import Link from "next/link";

const sections = [
  {
    title: "1. 基本方針",
    body: [
      "EC画像ととのえ（運営者名: ゴヨウタシ）は、利用者のプライバシーを尊重し、取得する情報を必要最小限にとどめて取り扱います。",
      "特に本サービスの画像整形機能は、利用者のブラウザ内で完結することを基本とし、アップロードされた画像データを当サイトのサーバーへ保存しません。",
    ],
  },
  {
    title: "2. 取得する情報",
    body: [
      "お問い合わせ時に、利用者が入力する氏名、返信先メールアドレス、件名、お問い合わせ内容。",
      "当サイトの安定運用や不正アクセス対策のため、IPアドレス、ブラウザ種別、閲覧日時、参照元などのアクセス情報が、ホスティング事業者またはサーバーログとして自動的に記録される場合があります。",
      "画像整形のために利用者が選択した画像ファイルは、原則として利用者の端末内でのみ処理され、当サイト運営者が内容を取得・保存することはありません。",
    ],
  },
  {
    title: "3. 利用目的",
    body: [
      "お問い合わせへの回答、本人確認、必要な連絡のため。",
      "サービスの安定運用、障害対応、不正利用の防止、改善検討のため。",
      "法令に基づく対応のため。",
    ],
  },
  {
    title: "4. お問い合わせフォームについて",
    body: [
      "本サイトのお問い合わせフォームは、運営者宛のメール送信のためにのみ利用します。",
      "フォーム送信内容は、返信対応のためにメールとして運営者へ転送されますが、本サイト上に恒久保存することはありません。",
    ],
  },
  {
    title: "5. 第三者提供",
    body: [
      "法令に基づく場合を除き、利用者の同意なく個人情報を第三者へ提供しません。",
      "ただし、メール送信インフラやホスティング事業者の提供機能を利用する範囲では、委託先サービスを経由する場合があります。",
    ],
  },
  {
    title: "6. 安全管理",
    body: [
      "取得する情報を必要最小限にとどめ、画像データをサーバー保存しない設計を採用しています。",
      "お問い合わせにより取得した情報は、対応に必要な範囲でのみ取り扱います。",
    ],
  },
  {
    title: "7. 開示・訂正・削除等",
    body: [
      "ご本人から、保有する個人情報について開示、訂正、削除等の申し出があった場合は、法令に従い適切に対応します。",
      "ご連絡は本サイトのお問い合わせフォームからお願いします。",
    ],
  },
  {
    title: "8. 改定",
    body: [
      "本ポリシーは、法令改正やサービス内容の変更に応じて改定することがあります。重要な変更がある場合は、本ページでお知らせします。",
      "制定日: 2026年4月5日",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-4xl">
        <div className="panel px-6 py-8 sm:px-8 lg:px-10">
          <div className="soft-badge">Privacy Policy</div>
          <h1 className="mt-4 text-3xl font-semibold text-slate-950 sm:text-4xl">
            プライバシーポリシー
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            EC画像ととのえは、個人情報保護委員会のガイドラインに沿って、取得する情報と利用目的がわかるように整理しています。
          </p>

          <div className="mt-8 space-y-8">
            {sections.map((section) => (
              <section key={section.title} className="rounded-[28px] border border-accent-200/70 bg-accent-50/70 px-5 py-5">
                <h2 className="text-lg font-semibold text-slate-950">{section.title}</h2>
                <div className="mt-3 space-y-3 text-sm leading-7 text-slate-600">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="secondary-button">
              トップへ戻る
            </Link>
            <Link href="/#contact" className="soft-button">
              お問い合わせフォームへ
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
