import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { supabase } from "./supabase";
import { toast } from "sonner";
import { type InvoiceItem } from "@/components/ParameshaInvoiceTemplate";

export type Entry = {
  id: string;
  date: string; // ISO yyyy-mm-dd
  vehicle: string;
  company: string;
  destination: string;
  billNo: string;
  material: string;
  quantity: number;
  crusherRate: number;
};

export type PrintedBill = {
  id: string;
  gstBillNumber: string;
  company: string;
  address: string;
  partyGstinNo: string;
  printDate: string;
  totalAmount: number;
  rows: InvoiceItem[];
  subtotal: number;
  gst: number;
};

export const VEHICLES = ["AP24TB8555", "TS07UK5333"];
export const MATERIALS = ["Robo", "20MM", "12MM", "6MM", "40MM"];
export const COMPANIES = [
  "Sri Sai Constructions",
  "Lakshmi Builders",
  "Vasavi Infra",
  "Krishna Cement Works",
  "Anjaneya Projects",
];
export const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

type Store = {
  authed: boolean;
  login: (u: string, p: string) => boolean;
  logout: () => void;
  entries: Entry[];
  addEntry: (e: Omit<Entry, "id">) => Promise<void>;
  updateEntry: (id: string, e: Omit<Entry, "id">) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  bills: PrintedBill[];
  addBill: (b: Omit<PrintedBill, "id">) => Promise<PrintedBill>;
  deleteBill: (id: string) => Promise<void>;
  loadEntries: () => Promise<void>;
  loadBills: () => Promise<void>;
};

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [bills, setBills] = useState<PrintedBill[]>([]);

  const loadEntries = async () => {
    const { data, error } = await supabase.from("daily_entries").select("*").order("created_at", { ascending: false });
    if (error) {
      console.error(error);
      toast.error("Failed to load entries");
      return;
    }
    setEntries(data.map((d: any) => ({
      id: d.id,
      date: d.date,
      vehicle: d.vehicle_no,
      company: d.company_name,
      destination: d.destination || "",
      billNo: d.bill_no,
      material: d.material,
      quantity: d.quantity,
      crusherRate: d.crusher_rate
    })));
  };

  const loadBills = async () => {
    const { data, error } = await supabase.from("printed_bills").select("*").order("created_at", { ascending: false });
    if (error) {
      console.error(error);
      toast.error("Failed to load bills");
      return;
    }
    setBills(data.map((d: any) => ({
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
    })));
  };

  useEffect(() => {
    loadEntries();
    loadBills();
  }, []);

  const value: Store = {
    authed,
    login: (u, p) => {
      const ok = u.trim().toLowerCase() === "admin" && p === "admin";
      if (ok) setAuthed(true);
      return ok;
    },
    logout: () => setAuthed(false),
    entries,
    loadEntries,
    addEntry: async (e) => {
      const { error } = await supabase.from("daily_entries").insert({
        vehicle_no: e.vehicle,
        date: e.date,
        company_name: e.company,
        destination: e.destination,
        bill_no: e.billNo,
        material: e.material,
        quantity: e.quantity,
        crusher_rate: e.crusherRate
      });
      if (error) throw error;
      await loadEntries();
    },
    updateEntry: async (id, e) => {
      const { error } = await supabase.from("daily_entries").update({
        vehicle_no: e.vehicle,
        date: e.date,
        company_name: e.company,
        destination: e.destination,
        bill_no: e.billNo,
        material: e.material,
        quantity: e.quantity,
        crusher_rate: e.crusherRate
      }).eq("id", id);
      if (error) throw error;
      await loadEntries();
    },
    deleteEntry: async (id) => {
      const { error } = await supabase.from("daily_entries").delete().eq("id", id);
      if (error) throw error;
      await loadEntries();
    },
    bills,
    loadBills,
    addBill: async (b) => {
      const { data, error } = await supabase.from("printed_bills").insert({
        gst_bill_no: b.gstBillNumber,
        company_name: b.company,
        address: b.address,
        party_gstin_no: b.partyGstinNo,
        month: MONTHS[new Date(b.printDate).getMonth()],
        year: String(new Date(b.printDate).getFullYear()),
        subtotal: b.subtotal,
        gst_amount: b.gst,
        grand_total: b.totalAmount,
        items: b.rows,
        printed_at: b.printDate
      }).select().single();
      
      if (error) throw error;
      await loadBills();
      
      return {
        id: data.id,
        gstBillNumber: data.gst_bill_no,
        company: data.company_name,
        address: data.address,
        partyGstinNo: data.party_gstin_no,
        printDate: data.printed_at,
        totalAmount: data.grand_total,
        rows: data.items,
        subtotal: data.subtotal,
        gst: data.gst_amount
      };
    },
    deleteBill: async (id) => {
      const { error } = await supabase.from("printed_bills").delete().eq("id", id);
      if (error) throw error;
      await loadBills();
    }
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useStore = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
