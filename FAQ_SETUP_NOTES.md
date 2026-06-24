# FAQ feature — setup notes

## 1. Install packages
```
npm install firebase-admin resend
```

## 2. Env vars
Copy `.env.local.example` into your `.env.local` and fill in the values
(Firebase service account + Resend API key).

## 3. Fix two import paths
I guessed at these — update them to match your actual project:
- `lib/auth.ts` imports `authOptions` from `@/lib/authOptions`. Point this at
  wherever your NextAuth config object actually lives.
- `app/faq/page.tsx` assumes the FAQ page lives at `app/faq/page.tsx`
  (sibling to `/dashboard`). Move the file if your routing differs.

## 4. Add `role` to the NextAuth session
By default NextAuth's `session.user` only has name/email/image — no `role`.
In your `authOptions`, add (or extend) the `session` callback so the role
from your user record gets copied onto the session token:

```ts
callbacks: {
  async session({ session, token }) {
    if (session.user) {
      (session.user as any).role = token.role ?? "user";
    }
    return session;
  },
  async jwt({ token, user }) {
    if (user) {
      token.role = (user as any).role ?? "user";
    }
    return token;
  },
},
```

This assumes your `user` object (from your adapter/provider) already has a
`role` field — set that on the user record in Firestore (e.g. `role: "admin"`)
for whichever accounts should see the admin panel.

## 5. Firestore collections
No manual setup needed — the API routes create documents on first use.
For reference, the shape is:

**`faqs`**
```ts
{ question: string, answer: string, createdAt: Timestamp }
```

**`questions`**
```ts
{
  question: string,
  askerEmail: string,
  status: "pending" | "answered",
  reply?: string,
  publishedToFaq: boolean,
  createdAt: Timestamp,
  answeredAt?: Timestamp,
}
```

## 6. Resend sender domain
Emails will work immediately using Resend's sandbox sender for testing, but
it won't reliably land in real inboxes. When you're ready to go live, verify
your own domain in the Resend dashboard and set `EMAIL_FROM` to an address on
that domain.

## How it all connects
- A logged-in user types a question → `POST /api/questions` → saved to
  Firestore with `status: "pending"` and their session email attached.
- An admin (role === "admin") sees it in the "Unanswered Questions" panel,
  writes a reply, optionally ticks "Publish to FAQ" → `PATCH /api/questions/[id]`
  → saves the reply, optionally adds it to `faqs`, and emails the asker via
  Resend.
- The public FAQ accordion just reads from `GET /api/faq`.
