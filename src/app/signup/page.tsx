import { SiteShell } from "@/components/site-shell";
import { AuthForm } from "@/components/auth-form";
import { signUp } from "@/app/actions/auth";

export default function SignupPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-md px-4 py-16">
        <h1 className="font-display text-3xl font-semibold">অ্যাকাউন্ট তৈরি</h1>
        <p className="mt-3 text-muted">কৃষক হিসেবে নিবন্ধন করে খামার ব্যবস্থাপনা শুরু করুন।</p>
        <AuthForm mode="signup" action={signUp} />
      </main>
    </SiteShell>
  );
}
