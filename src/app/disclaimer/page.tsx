import { SiteShell } from "@/components/site-shell";

export default function Page() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="font-display text-3xl font-semibold">AI Disclaimer</h1>
        <p className="mt-4 text-muted">
          AI অনুমান দিতে পারে। এটি ১০০% নির্ণয় নয় এবং বিশেষজ্ঞের স্থলাভিষিক্ত নয়।
        </p>
      </main>
    </SiteShell>
  );
}
