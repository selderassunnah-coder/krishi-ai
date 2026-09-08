import Link from "next/link";
import { redirect } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions/auth";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/dashboard");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone, district")
    .eq("id", user.id)
    .maybeSingle();

  const { data: farms } = await supabase
    .from("farms")
    .select("id, name, district, sectors")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  const displayName =
    profile?.full_name ||
    (user.user_metadata?.full_name as string | undefined) ||
    user.email;

  return (
    <SiteShell>
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary">ড্যাশবোর্ড</p>
            <h1 className="mt-1 font-display text-3xl font-semibold">
              স্বাগতম, {displayName}
            </h1>
            <p className="mt-2 text-muted">আপনার খামারের সারসংক্ষেপ এখানে দেখাবে।</p>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="h-10 rounded-full border border-border bg-surface px-4 text-sm font-medium"
            >
              লগআউট
            </button>
          </form>
        </div>

        <section className="mt-10 rounded-3xl bg-surface p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">আমার খামার</h2>
            <Link
              href="/farm/new"
              className="text-sm font-semibold text-primary hover:underline"
            >
              + নতুন খামার
            </Link>
          </div>

          {!farms || farms.length === 0 ? (
            <p className="mt-4 text-sm text-muted">
              এখনো কোনো খামার নেই। Phase 2-এর পরের ধাপে খামার তৈরি ফর্ম যুক্ত হবে।
              আপাতত ডাটাবেস টেবিল প্রস্তুত।
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {farms.map((farm) => (
                <li
                  key={farm.id}
                  className="rounded-2xl border border-border bg-bg px-4 py-3"
                >
                  <p className="font-medium">{farm.name}</p>
                  <p className="text-sm text-muted">
                    {farm.district || "জেলা উল্লেখ নেই"}
                    {farm.sectors?.length
                      ? ` · ${farm.sectors.join(", ")}`
                      : ""}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            ["প্রোফাইল", profile?.district ? `জেলা: ${profile.district}` : "প্রোফাইল আপডেট করুন"],
            ["সেশন", user.email || "—"],
            ["পরবর্তী", "খামার তৈরি + ফসল মডিউল"],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl bg-surface p-4">
              <p className="text-xs text-muted">{title}</p>
              <p className="mt-1 text-sm font-medium">{body}</p>
            </div>
          ))}
        </section>
      </main>
    </SiteShell>
  );
}
