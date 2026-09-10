import { redirect } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { FarmForm } from "@/components/farm-form";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function NewFarmPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/farm/new");
  }

  return (
    <SiteShell>
      <main className="mx-auto max-w-lg px-4 py-12 sm:px-6">
        <p className="text-sm font-semibold text-primary">খামার</p>
        <h1 className="mt-1 font-display text-3xl font-semibold">নতুন খামার</h1>
        <p className="mt-2 text-muted">
          আপনার খামারের মৌলিক তথ্য দিন। পরে ফসল, পশু বা পুকুর যোগ করতে পারবেন।
        </p>
        <FarmForm />
      </main>
    </SiteShell>
  );
}
