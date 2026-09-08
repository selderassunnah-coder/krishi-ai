"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { AuthState } from "@/app/actions/auth";

type Mode = "login" | "signup";

export function AuthForm({
  mode,
  action,
  nextPath = "/dashboard",
}: {
  mode: Mode;
  action: (prev: AuthState, formData: FormData) => Promise<AuthState>;
  nextPath?: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="mt-8 space-y-4">
      {mode === "signup" ? (
        <input
          name="fullName"
          className="h-11 w-full rounded-xl border border-border bg-surface px-3"
          placeholder="আপনার নাম"
          autoComplete="name"
        />
      ) : null}
      <input
        name="email"
        type="email"
        required
        className="h-11 w-full rounded-xl border border-border bg-surface px-3"
        placeholder="ইমেইল"
        autoComplete="email"
      />
      <input
        name="password"
        type="password"
        required
        minLength={6}
        className="h-11 w-full rounded-xl border border-border bg-surface px-3"
        placeholder="পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)"
        autoComplete={mode === "login" ? "current-password" : "new-password"}
      />
      <input type="hidden" name="next" value={nextPath} />

      {state.error ? (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      ) : null}
      {state.success ? (
        <p className="rounded-xl bg-green-50 px-3 py-2 text-sm text-green-800">{state.success}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="h-11 w-full rounded-full bg-primary font-semibold text-primary-fg disabled:opacity-60"
      >
        {pending ? "অপেক্ষা করুন…" : mode === "login" ? "লগইন" : "অ্যাকাউন্ট তৈরি"}
      </button>

      <p className="text-center text-sm text-muted">
        {mode === "login" ? (
          <>
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/signup" className="font-medium text-primary">
              সাইন আপ
            </Link>
          </>
        ) : (
          <>
            আগে থেকে আছেন?{" "}
            <Link href="/login" className="font-medium text-primary">
              লগইন
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
