"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createFarm, type FarmFormState } from "@/app/actions/farm";
import { BD_DISTRICTS, FARM_SECTORS } from "@/lib/constants";

export function FarmForm() {
  const [state, formAction, pending] = useActionState(
    createFarm,
    {} as FarmFormState
  );

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          খামারের নাম <span className="text-red-600">*</span>
        </label>
        <input
          id="name"
          name="name"
          required
          maxLength={120}
          placeholder="যেমন: সবুজ বাড়ি খামার"
          className="h-11 w-full rounded-xl border border-border bg-surface px-3"
        />
      </div>

      <div>
        <label htmlFor="district" className="mb-1.5 block text-sm font-medium">
          জেলা
        </label>
        <select
          id="district"
          name="district"
          className="h-11 w-full rounded-xl border border-border bg-surface px-3"
          defaultValue=""
        >
          <option value="">জেলা বাছুন</option>
          {BD_DISTRICTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="area_acres" className="mb-1.5 block text-sm font-medium">
          আয়তন (একর)
        </label>
        <input
          id="area_acres"
          name="area_acres"
          type="number"
          min={0}
          step="0.01"
          placeholder="যেমন: 2.5"
          className="h-11 w-full rounded-xl border border-border bg-surface px-3"
        />
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium">সেক্টর (একাধিক বাছতে পারবেন)</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {FARM_SECTORS.map((s) => (
            <label
              key={s.id}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2.5 text-sm"
            >
              <input type="checkbox" name="sectors" value={s.id} className="size-4" />
              {s.label}
            </label>
          ))}
        </div>
      </fieldset>

      {state.error ? (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={pending}
          className="h-11 flex-1 rounded-full bg-primary font-semibold text-primary-fg disabled:opacity-60"
        >
          {pending ? "সংরক্ষণ হচ্ছে…" : "খামার সংরক্ষণ"}
        </button>
        <Link
          href="/dashboard"
          className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-border bg-surface font-medium"
        >
          বাতিল
        </Link>
      </div>
    </form>
  );
}
