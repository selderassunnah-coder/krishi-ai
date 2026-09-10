"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { FARM_SECTORS } from "@/lib/constants";

export type FarmFormState = {
  error?: string;
};

const allowedSectors = new Set(FARM_SECTORS.map((s) => s.id));

export async function createFarm(
  _prev: FarmFormState,
  formData: FormData
): Promise<FarmFormState> {
  const name = String(formData.get("name") || "").trim();
  const district = String(formData.get("district") || "").trim();
  const areaRaw = String(formData.get("area_acres") || "").trim();
  const sectors = formData
    .getAll("sectors")
    .map((v) => String(v))
    .filter((id) => allowedSectors.has(id as (typeof FARM_SECTORS)[number]["id"]));

  if (!name) {
    return { error: "খামারের নাম দিন।" };
  }
  if (name.length > 120) {
    return { error: "নাম খুব বড়। ১২০ অক্ষরের মধ্যে রাখুন।" };
  }

  let area_acres: number | null = null;
  if (areaRaw) {
    const n = Number(areaRaw);
    if (!Number.isFinite(n) || n < 0 || n > 100000) {
      return { error: "আয়তন সঠিক নয়।" };
    }
    area_acres = n;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "লগইন প্রয়োজন।" };
  }

  const { error } = await supabase.from("farms").insert({
    owner_id: user.id,
    name,
    district: district || null,
    area_acres,
    sectors,
  });

  if (error) {
    return { error: "খামার সংরক্ষণ ব্যর্থ। আবার চেষ্টা করুন।" };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function deleteFarm(formData: FormData) {
  const id = String(formData.get("id") || "").trim();
  if (!id) {
    redirect("/dashboard");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase
    .from("farms")
    .delete()
    .eq("id", id)
    .eq("owner_id", user.id);

  if (error) {
    redirect(`/farm/${id}?error=delete`);
  }

  revalidatePath("/dashboard");
  revalidatePath(`/farm/${id}`);
  redirect("/dashboard");
}
