import { SiteShell } from "@/components/site-shell";

export default function Page() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="font-display text-3xl font-semibold">আমাদের সম্পর্কে</h1>
        <p className="mt-4 text-muted">
          Krishi AI বাংলাদেশের কৃষকদের জন্য একটি ডিজিটাল খামার সহকারী।
        </p>
      </main>
    </SiteShell>
  );
}
