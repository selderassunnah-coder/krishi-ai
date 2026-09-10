import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { createClient } from "@/lib/supabase/server";
import { deleteFarm } from "@/app/actions/farm";
import { FARM_SECTORS } from "@/lib/constants";

export const dynamic = "force-dynamic";

const sectorLabel = Object.fromEntries(FARM_SECTORS.map((s) => [s.id, s.label]));

export default async function FarmDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?next=/farm/${id}`);
  }

  const { data: farm } = await supabase
    .from("farms")
    .select("id, name, district, area_acres, sectors, created_at")
    .eq("id", id)
    .eq("owner_id", user.id)
    .maybeSingle();

  if (!farm) {
    notFound();
  }

  const sectorNames = Array.isArray(farm.sectors)
    ? farm.sectors.map((sid: string) => sectorLabel[sid] || sid).join(", ")
    : "—";

  const created =
    farm.created_at &&
    new Date(farm.created_at).toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <SiteShell>
      <main className="mx-auto max-w-lg px-4 py-12 sm:px-6">
        <Link href="/dashboard" className="text-sm font-medium text-primary hover:underline">
          ← ড্যাশবোর্ড
        </Link>

        <p className="mt-6 text-sm font-semibold text-primary">খামার বিবরণ</p>
        <h1 className="mt-1 font-display text-3xl font-semibold">{farm.name}</h1>

        {error === "delete" ? (
          <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
            মুছে ফেলা যায়নি। আবার চেষ্টা করুন।
          </p>
        ) : null}

        <dl className="mt-8 space-y-4 rounded-3xl bg-surface p-6">
          <div>
            <dt className="text-xs text-muted">জেলা</dt>
            <dd className="mt-1 font-medium">{farm.district || "উল্লেখ নেই"}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">আয়তন</dt>
            <dd className="mt-1 font-medium">
              {farm.area_acres != null ? `${farm.area_acres} একর` : "উল্লেখ নেই"}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted">সেক্টর</dt>
            <dd className="mt-1 font-medium">{sectorNames || "—"}</dd>
          </div>
          {created ? (
            <div>
              <dt className="text-xs text-muted">তৈরির তারিখ</dt>
              <dd className="mt-1 font-medium">{created}</dd>
            </div>
          ) : null}
        </dl>

        <p className="mt-6 text-sm text-muted">
          পরের ধাপে এখানে ফসল, পশু ও কাজের রেকর্ড যোগ হবে।
        </p>

        <form action={deleteFarm} className="mt-10">
          <input type="hidden" name="id" value={farm.id} />
          <button
            type="submit"
            className="h-11 w-full rounded-full border border-red-200 bg-red-50 text-sm font-semibold text-red-700"
          >
            খামার মুছে ফেলুন
          </button>
        </form>
      </main>
    </SiteShell>
  );
}
