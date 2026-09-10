import Link from "next/link";
import { redirect } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions/auth";
import { FARM_SECTORS } from "@/lib/constants";

export const dynamic = "force-dynamic";

const sectorLabel = Object.fromEntries(FARM_SECTORS.map((s) => [s.id, s.label]));

export default async function DashboardPage() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return (
      <SiteShell>
        <main className="mx-auto max-w-lg px-4 py-16">
          <h1 className="font-display text-2xl font-semibold">সেটআপ বাকি</h1>
          <p className="mt-3 text-muted">
            Vercel-এ NEXT_PUBLIC_SUPABASE_URL ও NEXT_PUBLIC_SUPABASE_ANON_KEY
            সেট করে Redeploy করুন।
          </p>
        </main>
      </SiteShell>
    );
  }

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
    .select("id, name, district, area_acres, sectors")
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
              className="inline-flex h-10 items-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-fg"
            >
              + নতুন খামার
            </Link>
          </div>

          {!farms || farms.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-border bg-bg px-4 py-10 text-center">
              <p className="font-medium">এখনো কোনো খামার নেই</p>
              <p className="mt-2 text-sm text-muted">প্রথম খামার তৈরি করে শুরু করুন।</p>
              <Link
                href="/farm/new"
                className="mt-4 inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-fg"
              >
                খামার তৈরি করুন
              </Link>
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {farms.map((farm) => {
                const sectorNames = Array.isArray(farm.sectors)
                  ? farm.sectors
                      .map((sid: string) => sectorLabel[sid] || sid)
                      .join(", ")
                  : "";
                return (
                  <li key={farm.id}>
                    <Link
                      href={`/farm/${farm.id}`}
                      className="block rounded-2xl border border-border bg-bg px-4 py-3 transition hover:border-primary/40"
                    >
                      <p className="font-medium">{farm.name}</p>
                      <p className="mt-1 text-sm text-muted">
                        {farm.district || "জেলা উল্লেখ নেই"}
                        {farm.area_acres != null ? ` · ${farm.area_acres} একর` : ""}
                        {sectorNames ? ` · ${sectorNames}` : ""}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>
    </SiteShell>
  );
}
