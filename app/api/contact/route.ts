import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured`);
  }

  return value;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const subject = body.subject?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "すべての項目を入力してください。" },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "返信先メールアドレスの形式を確認してください。" },
        { status: 400 },
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: "お問い合わせ内容は 5000 文字以内で入力してください。" },
        { status: 400 },
      );
    }

    const smtpHost = process.env.SMTP_HOST ?? "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT ?? "465");
    const smtpSecure =
      process.env.SMTP_SECURE !== undefined
        ? process.env.SMTP_SECURE === "true"
        : smtpPort === 465;
    const smtpUser = getRequiredEnv("SMTP_USER");
    const smtpPass = getRequiredEnv("SMTP_PASS");
    const recipient = process.env.CONTACT_TO_EMAIL ?? smtpUser;
    const fromAddress = process.env.CONTACT_FROM_EMAIL ?? smtpUser;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `EC画像ととのえ <${fromAddress}>`,
      to: recipient,
      replyTo: email,
      subject: `[EC画像ととのえ] ${subject}`,
      text: [
        "EC画像ととのえ にお問い合わせが届きました。",
        "",
        `お名前: ${name}`,
        `返信先メールアドレス: ${email}`,
        "",
        "お問い合わせ内容",
        message,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("contact_send_failed", error);

    return NextResponse.json(
      {
        error:
          "お問い合わせ送信の設定が未完了か、一時的に送信できませんでした。時間をおいて再度お試しください。",
      },
      { status: 500 },
    );
  }
}
