import { SiteShell } from "@/components/site-shell";

export default function Page() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="font-display text-3xl font-semibold">গোপনীয়তা</h1>
        <p className="mt-4 text-muted">আমরা শুধু খামার পরিচালনার জন্য প্রয়োজনীয় তথ্য রাখি।</p>
      </main>
    </SiteShell>
  );
}
