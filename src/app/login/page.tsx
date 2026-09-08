import { SiteShell } from "@/components/site-shell";
import { AuthForm } from "@/components/auth-form";
import { signIn } from "@/app/actions/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;
  const nextPath = params.next?.startsWith("/") ? params.next : "/dashboard";

  return (
    <SiteShell>
      <main className="mx-auto max-w-md px-4 py-16">
        <h1 className="font-display text-3xl font-semibold">লগইন</h1>
        <p className="mt-3 text-muted">আপনার খামার ড্যাশবোর্ডে প্রবেশ করুন।</p>
        {params.error ? (
          <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
            অথেনটিকেশন ব্যর্থ। আবার চেষ্টা করুন।
          </p>
        ) : null}
        <AuthForm mode="login" action={signIn} nextPath={nextPath} />
      </main>
    </SiteShell>
  );
}
