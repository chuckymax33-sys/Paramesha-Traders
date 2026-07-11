import { supabase } from "./supabase";
import { type Entry, type PrintedBill } from "./store";
import { MONTHS } from "./store";

// Centralized mapper from DB row to application Entry type
export function mapEntry(d: any): Entry {
  return {
    id: d.id,
    date: d.date,
    vehicle: d.vehicle_no,
    company: d.company_name,
    destination: d.destination || "",
    billNo: d.bill_no,
    material: d.material,
    quantity: d.quantity,
    crusherRate: d.crusher_rate,
    driverName: d.driver_name || "",
    billId: d.bill_id ?? null,
  };
}

export const repository = {
  async getRecentEntries(limit = 10): Promise<{ data?: Entry[], error?: any }> {
    const { data, error } = await supabase
      .from("daily_entries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);
      
    if (error) return { error };
    return { data: (data || []).map(mapEntry) };
  },

  async searchEntries(filters: { vehicle: string; company: string; date: string; billNo: string }, limit = 500): Promise<{ data?: Entry[], error?: any }> {
    let query = supabase.from("daily_entries").select("*").order("created_at", { ascending: false });
    
    if (filters.vehicle !== "all") query = query.eq("vehicle_no", filters.vehicle);
    if (filters.company) query = query.ilike("company_name", `%${filters.company}%`);
    if (filters.date) query = query.eq("date", filters.date);
    if (filters.billNo) query = query.ilike("bill_no", `%${filters.billNo}%`);
    
    const { data, error } = await query.limit(limit);
    if (error) return { error };
    return { data: (data || []).map(mapEntry) };
  },

  async getUnbilledTrips(filters: { vehicle: string; company: string; material: string; year: string; month: string }): Promise<{ data?: Entry[], error?: any }> {
    let query: any = supabase.from("daily_entries").select("*");
    
    // Only show unbilled trips
    query = query.is("bill_id", null);

    if (filters.vehicle !== "all") query = query.eq("vehicle_no", filters.vehicle);
    if (filters.company !== "all") query = query.eq("company_name", filters.company);
    if (filters.material !== "all") query = query.eq("material", filters.material);
    
    if (filters.year) {
      const y = parseInt(filters.year);
      if (filters.month !== "all") {
        const m = MONTHS.indexOf(filters.month);
        const startDate = new Date(y, m, 1).toISOString().split('T')[0];
        const endDate = new Date(y, m + 1, 0).toISOString().split('T')[0];
        query = query.gte("date", startDate).lte("date", endDate);
      } else {
        const startDate = new Date(y, 0, 1).toISOString().split('T')[0];
        const endDate = new Date(y, 11, 31).toISOString().split('T')[0];
        query = query.gte("date", startDate).lte("date", endDate);
      }
    }

    query = query.order("date", { ascending: true }).order("bill_no", { ascending: true });
    
    const { data, error } = await query;
    if (error) return { error };
    return { data: (data || []).map(mapEntry) };
  },

  async getEntriesByIds(ids: string[]): Promise<{ data?: Entry[], error?: any }> {
    const { data, error } = await supabase
      .from("daily_entries")
      .select("*")
      .in("id", ids)
      .order("date", { ascending: true })
      .order("bill_no", { ascending: true });
      
    if (error) return { error };
    return { data: (data || []).map(mapEntry) };
  },

  async getPrintedBills(): Promise<{ data?: PrintedBill[], error?: any }> {
    const { data, error } = await supabase
      .from("printed_bills")
      .select("*")
      .order("created_at", { ascending: false });
      
    if (error) return { error };
    return {
      data: (data || []).map((d: any) => ({
        id: d.id,
        gstBillNumber: d.gst_bill_no,
        company: d.company_name,
        address: d.address || "",
        partyGstinNo: d.party_gstin_no || "",
        printDate: d.printed_at,
        totalAmount: d.grand_total,
        rows: d.items,
        subtotal: d.subtotal,
        gst: d.gst_amount
      }))
    };
  }
};
