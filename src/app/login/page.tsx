import { SiteShell } from "@/components/site-shell";

export default function LoginPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-md px-4 py-16">
        <h1 className="font-display text-3xl font-semibold">শুরু করুন</h1>
        <p className="mt-3 text-muted">পরবর্তী ধাপে নিরাপদ অ্যাকাউন্ট যুক্ত হবে।</p>
        <form className="mt-8 space-y-4">
          <input className="h-11 w-full rounded-xl border border-border bg-surface px-3" placeholder="ইমেইল" />
          <input type="password" className="h-11 w-full rounded-xl border border-border bg-surface px-3" placeholder="পাসওয়ার্ড" />
          <button type="button" className="h-11 w-full rounded-full bg-primary font-semibold text-primary-fg">
            লগইন (শীঘ্রই)
          </button>
        </form>
      </main>
    </SiteShell>
  );
}
