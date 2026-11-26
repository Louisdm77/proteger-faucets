"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Message could not be sent.");
      setStatus("success");
      setMessage("Thanks — your enquiry has been received.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }
  return <form onSubmit={submit} className="space-y-5">
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="form-label">Full name<input name="name" required autoComplete="name" className="form-input" placeholder="Your name"/></label>
      <label className="form-label">Email address<input name="email" type="email" required autoComplete="email" className="form-input" placeholder="you@company.com"/></label>
    </div>
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="form-label">Company <span className="font-normal text-slate-400">(optional)</span><input name="company" className="form-input" placeholder="Company name"/></label>
      <label className="form-label">Enquiry type<select name="enquiry" className="form-input" defaultValue="Product information"><option>Product information</option><option>Product compatibility</option><option>Commercial / project enquiry</option><option>General enquiry</option></select></label>
    </div>
    <label className="form-label">How can we help?<textarea name="message" required rows={5} className="form-input resize-y" placeholder="Tell us a little about your project or question..."/></label>
    <button disabled={status === "sending"} className="inline-flex min-h-12 items-center gap-3 rounded-full bg-blue px-7 text-sm font-semibold text-ink transition hover:bg-ink hover:text-white disabled:opacity-60">{status === "sending" ? "Sending..." : "Send enquiry"} <ArrowUpRight size={17}/></button>
    {message && <p role="status" className={`flex items-center gap-2 text-sm ${status === "success" ? "text-emerald-700" : "text-rose-600"}`}>{status === "success" && <CheckCircle2 size={17}/ >}{message}</p>}
    <p className="text-xs leading-5 text-slate-400">This form sends through the configured email service. Add the Resend environment variables before deployment to enable delivery.</p>
  </form>;
}
