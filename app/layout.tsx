import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

import { SiteFooter } from "@/components/site-footer";

import "./globals.css";

export const metadata: Metadata = {
  title: "EC画像ととのえ | EC画像一括整形サイト",
  description:
    "EC 商品画像をまとめてアップロードし、JPEG化・3MB以下圧縮・正方形化・余白調整・型番リネームまでブラウザだけで完結できる画像整形サイトです。アップロード画像はサーバーに保存されません。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-cream text-ink antialiased">
        <div className="min-h-screen">
          {children}
          <SiteFooter />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
