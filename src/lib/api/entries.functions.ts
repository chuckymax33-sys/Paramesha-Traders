import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getServerSupabaseClient } from "../supabase.server";

// Base schema for validation
const entrySchema = z.object({
  date: z.string().min(1, "Date is required"),
  vehicle_no: z.string().min(1, "Vehicle number is required"),
  company_name: z.string().min(1, "Company is required"),
  destination: z.string().optional(),
  bill_no: z.string().min(1, "Bill number is required"),
  material: z.string().min(1, "Material is required"),
  quantity: z.number().positive("Quantity must be positive"),
  crusher_rate: z.number().nonnegative("Crusher rate cannot be negative"),
  driver_name: z.string().optional(),
});

export const createEntryFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      accessToken: z.string(),
      payload: entrySchema,
    })
  )
  .handler(async ({ data: { accessToken, payload } }) => {
    const supabase = getServerSupabaseClient(accessToken);
    const { data, error } = await supabase
      .from("daily_entries")
      .insert(payload)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  });

export const updateEntryFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      accessToken: z.string(),
      id: z.string().uuid(),
      payload: entrySchema,
    })
  )
  .handler(async ({ data: { accessToken, id, payload } }) => {
    const supabase = getServerSupabaseClient(accessToken);
    const { data, error } = await supabase
      .from("daily_entries")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  });

export const deleteEntryFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      accessToken: z.string(),
      id: z.string().uuid(),
    })
  )
  .handler(async ({ data: { accessToken, id } }) => {
    const supabase = getServerSupabaseClient(accessToken);
    const { error } = await supabase
      .from("daily_entries")
      .delete()
      .eq("id", id);

    if (error) throw new Error(error.message);
    return { success: true };
  });
