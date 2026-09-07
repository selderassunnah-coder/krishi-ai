import { Camera } from "lucide-react";
import { SiteShell } from "@/components/site-shell";

export default function DiagnosisPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-xl px-4 py-16">
        <h1 className="font-display text-3xl font-semibold">AI Diagnosis</h1>
        <p className="mt-3 text-muted">ছবি তুলে পর্যবেক্ষণ পাবেন। এই ধাপে ছবি সার্ভারে যায় না।</p>
        <div className="mt-8 rounded-3xl border border-dashed border-border bg-surface px-6 py-16 text-center">
          <Camera className="mx-auto size-8 text-primary" />
          <p className="mt-3 font-medium">ছবি আপলোড করুন</p>
        </div>
      </main>
    </SiteShell>
  );
}
