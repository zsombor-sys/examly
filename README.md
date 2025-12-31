# Examly Webapp (Linear-style MVP)

Single **Next.js** app: landing + Plan + Practice + optional Supabase auth.

## 1) Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open: http://localhost:3000

If you do **not** add keys, the app returns safe **mock** results so you can test the UI.

## 2) OpenAI (real AI)

Add to `.env.local`:

```env
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-5.2
# If your account can't use GPT-5 yet, set this instead:
# OPENAI_MODEL=gpt-4o-mini
```

## 3) Supabase (login + Google)

Add to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

### Where to find these in Supabase

Supabase Dashboard -> your project -> **Settings** -> **API**
- **Project URL** (or build it from the Project Ref): `https://<project-ref>.supabase.co`
- **anon public** key

### Google OAuth (works on localhost too)

Supabase Dashboard -> **Authentication** -> **URL Configuration**
- Site URL: `http://localhost:3000`
- Redirect URLs: add `http://localhost:3000/auth/callback`

Supabase Dashboard -> **Authentication** -> **Providers** -> **Google**
- Enable Google
- Paste Client ID + Secret

Then use:
- http://localhost:3000/login -> "Continue with Google"

## 4) Turn off email confirmation (instant sign up)

Supabase Dashboard -> **Authentication** -> **Providers** -> **Email**
- Turn **Confirm email** OFF

After that, signup logs the user in immediately.
