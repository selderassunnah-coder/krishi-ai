# Krishi AI

বাংলাদেশের কৃষকদের জন্য AI-powered স্মার্ট কৃষি ও খামার ব্যবস্থাপনা প্ল্যাটফর্ম।

## Phase 1 — সম্পন্ন
পাবলিক ল্যান্ডিং, Diagnosis UI, নীতিমালা পেজ।

## Phase 2 — Auth + Database
- Supabase Auth (ইমেইল/পাসওয়ার্ড)
- `/login`, `/signup`, `/dashboard`
- Middleware দিয়ে protected routes
- `profiles` ও `farms` টেবিল + RLS

### ১) Supabase প্রজেক্ট
1. https://supabase.com এ প্রজেক্ট তৈরি করুন
2. **SQL Editor** এ `supabase/schema.sql` পুরোটা রান করুন
3. **Project Settings → API** থেকে নিন:
   - Project URL
   - `anon` `public` key

### ২) Vercel Environment Variables
প্রজেক্ট → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

Production + Preview দুটোতেই যোগ করে **Redeploy** করুন।

### ৩) Auth URL (Supabase)
Authentication → URL Configuration:
- Site URL: আপনার Vercel ডোমেইন (যেমন `https://krishi-ai-okge.vercel.app`)
- Redirect URLs: `https://YOUR_DOMAIN/auth/callback`

### টেস্ট
1. `/signup` → অ্যাকাউন্ট তৈরি
2. `/login` → লগইন
3. `/dashboard` → প্রোটেক্টেড পেজ
