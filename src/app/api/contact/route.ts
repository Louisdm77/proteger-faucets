import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return NextResponse.json(
      { error: "Our message service is being set up. Please try again shortly." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const company = String(body.company ?? "").trim();
    const enquiry = String(body.enquiry ?? "General enquiry").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid name, email and message." }, { status: 400 });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Website enquiry: ${enquiry}`,
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "Not supplied"}\nEnquiry: ${enquiry}\n\n${message}`
      })
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Email delivery failed. Please try again later." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to process the enquiry. Please try again." }, { status: 400 });
  }
}
