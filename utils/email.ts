import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendReplyEmail({
  to,
  question,
  reply,
}: {
  to: string;
  question: string;
  reply: string;
}) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM || "Builder Buddies <onboarding@resend.dev>",
    to,
    subject: "Your question has been answered — Builder Buddies",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px;">
        <h2 style="color:#0052CC;">Builder Buddies</h2>
        <p>Hi,</p>
        <p>You recently asked:</p>
        <p style="background:#f0f0f0; padding:12px; border-radius:8px;">${escapeHtml(question)}</p>
        <p>Here's the reply from our team:</p>
        <p style="background:#dce8fb; padding:12px; border-radius:8px;">${escapeHtml(reply)}</p>
        <p>Thanks for using Builder Buddies.</p>
      </div>
    `,
  });
}
