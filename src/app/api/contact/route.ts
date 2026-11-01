import { NextResponse } from "next/server";

/**
 * 문의 폼 수신 API
 * CONTACT_WEBHOOK_URL(n8n, Make, Zapier, Slack 등)로 JSON을 전달합니다.
 * 웹훅이 설정되지 않았으면 503을 반환하고, 폼은 이메일 문의를 안내합니다.
 */
type Payload = { name?: string; email?: string; company?: string; type?: string; message?: string; website?: string };

const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  // 허니팟: 봇이 숨김 필드를 채우면 조용히 성공 처리
  if (body.website) return NextResponse.json({ ok: true });

  const data = {
    name: clip(body.name, 80),
    email: clip(body.email, 120),
    company: clip(body.company, 120),
    type: clip(body.type, 40),
    message: clip(body.message, 5000),
  };

  if (!data.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.message.length < 10) {
    return NextResponse.json({ error: "입력값을 다시 확인해 주세요." }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ error: "문의 폼이 아직 연결되지 않았습니다." }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, source: "portfolio", receivedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] webhook failed:", err);
    return NextResponse.json({ error: "일시적인 오류로 전송하지 못했습니다." }, { status: 502 });
  }
}
