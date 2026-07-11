import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getServerSupabaseClient } from "../supabase.server";

// Schema for an item in the bill
const billItemSchema = z.object({
  id: z.string().uuid().optional(),
  date: z.string(),
  tripSheetNo: z.string(),
  vehicleNo: z.string(),
  material: z.string(),
  hsnCode: z.string().optional(),
  qty: z.number(),
  rate: z.number(),
});

// Schema for the bill payload
const billSchema = z.object({
  gst_bill_no: z.string().min(1, "GST Bill Number is required"),
  company_name: z.string().min(1, "Company is required"),
  address: z.string().optional(),
  party_gstin_no: z.string().optional(),
  month: z.string(),
  year: z.string(),
  subtotal: z.number().nonnegative(),
  gst_amount: z.number().nonnegative(),
  grand_total: z.number().nonnegative(),
  items: z.array(billItemSchema),
  printed_at: z.string(),
});

export const createBillFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      accessToken: z.string(),
      payload: billSchema,
    })
  )
  .handler(async ({ data: { accessToken, payload } }) => {
    const supabase = getServerSupabaseClient(accessToken);
    const { data, error } = await supabase
      .from("printed_bills")
      .insert(payload)
      .select()
      .single();

    if (error) throw new Error(error.message);

    // After creating the bill, mark all the trips included as billed
    const tripIds = payload.items.map((r) => r.id).filter(Boolean) as string[];
    if (tripIds.length > 0) {
      const { error: updateError } = await supabase
        .from("daily_entries")
        .update({ bill_id: data.id })
        .in("id", tripIds);
      if (updateError) {
        console.error("Failed to mark trips as billed:", updateError);
        // We still return the bill since it was created successfully
      }
    }

    return data;
  });

export const deleteBillFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      accessToken: z.string(),
      id: z.string().uuid(),
    })
  )
  .handler(async ({ data: { accessToken, id } }) => {
    const supabase = getServerSupabaseClient(accessToken);
    const { error } = await supabase
      .from("printed_bills")
      .delete()
      .eq("id", id);

    if (error) throw new Error(error.message);
    return { success: true };
  });
