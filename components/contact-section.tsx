"use client";

import { FormEvent, useState } from "react";
import { LoaderCircle, Send, ShieldCheck } from "lucide-react";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("EC画像ととのえ へのお問い合わせ");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [helperMessage, setHelperMessage] = useState(
    "入力内容は運営者へ送信されます。メールアドレスはサイト上に表示されません。",
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim() || "EC画像ととのえ へのお問い合わせ",
          message: message.trim(),
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        throw new Error(
          payload?.error ?? "送信に失敗しました。少し時間をおいてお試しください。",
        );
      }

      setName("");
      setEmail("");
      setSubject("EC画像ととのえ へのお問い合わせ");
      setMessage("");
      setHelperMessage(
        "送信しました。内容を確認し、必要に応じて返信します。",
      );
    } catch (error) {
      setHelperMessage(
        error instanceof Error
          ? error.message
          : "送信に失敗しました。少し時間をおいてお試しください。",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="panel grid gap-6 px-6 py-6 sm:px-8 lg:grid-cols-[0.78fr_1fr] lg:px-10 lg:py-8">
          <div>
            <div className="soft-badge">Contact</div>
            <h2 className="mt-4 text-2xl font-semibold text-slate-950 sm:text-3xl">
              お問い合わせ
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              運営者名は <span className="font-medium text-slate-900">ゴヨウタシ</span>
              です。ご質問や改善希望があれば、下のフォームからご連絡いただけます。
            </p>

            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <div className="rounded-2xl border border-accent-200/70 bg-accent-100/75 px-4 py-3">
                <div className="text-slate-500">運営者名</div>
                <div className="mt-1 font-medium text-slate-900">ゴヨウタシ</div>
              </div>
              <div className="flex items-start gap-2 rounded-2xl border border-accent-200/70 bg-white/90 px-4 py-3 text-xs leading-6 text-slate-500">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent-700" />
                <span>
                  お問い合わせ内容は送信処理にのみ利用し、画像データと同様にこのサイトで恒久保存しません。
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="panel-muted p-5 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700" htmlFor="contact-name">
                  お名前
                </label>
                <input
                  id="contact-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="soft-input mt-2"
                  placeholder="山田 太郎"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700" htmlFor="contact-email">
                  返信先メールアドレス
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="soft-input mt-2"
                  placeholder="sample@example.com"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium text-slate-700" htmlFor="contact-subject">
                件名
              </label>
              <input
                id="contact-subject"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                className="soft-input mt-2"
                placeholder="お問い合わせ"
                required
              />
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium text-slate-700" htmlFor="contact-message">
                内容
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="soft-input mt-2 min-h-40 resize-y"
                placeholder="ご質問やご要望をご記入ください。"
                required
              />
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-6 text-slate-500">{helperMessage}</p>
              <button type="submit" className="soft-button" disabled={isSubmitting}>
                {isSubmitting ? (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                送信する
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
