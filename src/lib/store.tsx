import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { supabase } from "./supabase";
import { createEntryFn, updateEntryFn, deleteEntryFn } from "./api/entries.functions";
import { createBillFn, deleteBillFn } from "./api/bills.functions";
import { repository } from "./repository";
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
  driverName?: string;
  billId?: string | null; // null = unbilled, uuid = linked to a printed bill
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
export const COMPANIES: string[] = [];
export const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

type Store = {
  authed: boolean;
  isAuthLoading: boolean;
  login: (email: string, p: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  entries: Entry[];
  addEntry: (e: Omit<Entry, "id">) => Promise<void>;
  updateEntry: (id: string, e: Omit<Entry, "id">) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;

  addBill: (b: Omit<PrintedBill, "id">) => Promise<PrintedBill>;
  deleteBill: (id: string) => Promise<void>;
  loadEntries: () => Promise<void>;
};

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [entries, setEntries] = useState<Entry[]>([]);

  const loadEntries = async () => {
    const { data, error } = await repository.getRecentEntries(10);
    if (error) {
      console.error(error);
      toast.error("Failed to load entries");
      return;
    }
    if (data) {
      setEntries(data);
    }
  };

  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthed(!!session);
      setIsAuthLoading(false);
      if (session) {
        loadEntries();
      }
    });

    // 2. Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setAuthed(!!session);
      setIsAuthLoading(false);
      if (session) {
        loadEntries();
      } else {
        setEntries([]);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value: Store = {
    authed,
    isAuthLoading,
    login: async (email, password) => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    },
    logout: async () => {
      await supabase.auth.signOut();
    },
    entries,
    loadEntries,
    addEntry: async (e) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");
      
      await createEntryFn({
        data: {
          accessToken: session.access_token,
          payload: {
            vehicle_no: e.vehicle,
            date: e.date,
            company_name: e.company,
            destination: e.destination || "",
            bill_no: e.billNo,
            material: e.material,
            quantity: e.quantity,
            crusher_rate: e.crusherRate,
            driver_name: e.driverName || ""
          }
        }
      });
      await loadEntries();
    },
    updateEntry: async (id, e) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");
      
      await updateEntryFn({
        data: {
          accessToken: session.access_token,
          id,
          payload: {
            vehicle_no: e.vehicle,
            date: e.date,
            company_name: e.company,
            destination: e.destination || "",
            bill_no: e.billNo,
            material: e.material,
            quantity: e.quantity,
            crusher_rate: e.crusherRate,
            driver_name: e.driverName || ""
          }
        }
      });
      await loadEntries();
    },
    deleteEntry: async (id) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");
      
      await deleteEntryFn({ data: { accessToken: session.access_token, id } });
      await loadEntries();
    },


    addBill: async (b) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");
      
      const data = await createBillFn({
        data: {
          accessToken: session.access_token,
          payload: {
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
          }
        }
      });

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
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");
      
      await deleteBillFn({ data: { accessToken: session.access_token, id } });
    }
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useStore = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
