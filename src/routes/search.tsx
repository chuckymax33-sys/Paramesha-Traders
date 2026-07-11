import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search as SearchIcon, X, ChevronLeft, ChevronRight, Pencil, Trash2, Receipt } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { COMPANIES, VEHICLES, useStore, type Entry } from "@/lib/store";
import { supabase } from "@/lib/supabase";
import { repository } from "@/lib/repository";
import { toast } from "sonner";

export const Route = createFileRoute("/search")({
  beforeLoad: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw redirect({ to: "/" });
    } catch (err) {
      if (err && typeof err === "object" && "isRedirect" in err) throw err;
      throw redirect({ to: "/" });
    }
  },
  head: () => ({ meta: [{ title: "Search — Shanku Chakram" }] }),
  component: SearchPage,
});

const PAGE = 6;

function SearchPage() {
  const navigate = useNavigate();
  const { entries, deleteEntry } = useStore();
  const [vehicle, setVehicle] = useState("all");
  const [company, setCompany] = useState("");
  const [date, setDate] = useState("");
  const [billNo, setBillNo] = useState("");
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<{ vehicle: string; company: string; date: string; billNo: string } | null>(null);

  const companies = useMemo(() => Array.from(new Set([...COMPANIES, ...entries.map(e => e.company)])), [entries]);

  const [dbResults, setDbResults] = useState<Entry[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      try {
        await deleteEntry(id);
        setDbResults(prev => prev.filter(r => r.id !== id));
        toast.success("Trip deleted");
      } catch {
        toast.error("Failed to delete trip");
      }
    }
  };

  const handleEdit = (e: Entry) => {
    sessionStorage.setItem("edit_entry", JSON.stringify(e));
    navigate({ to: "/daily-entry" });
  };

  const results = useMemo(() => {
    return dbResults;
  }, [dbResults]);

  const pages = Math.max(1, Math.ceil(results.length / PAGE));
  const paged = results.slice(page * PAGE, (page + 1) * PAGE);

  const clear = () => { setVehicle("all"); setCompany(""); setDate(""); setBillNo(""); setPage(0); setFilters(null); setDbResults([]); };
  
  const handleSearch = async () => {
    setFilters({ vehicle, company, date, billNo });
    setPage(0);
    setIsSearching(true);

    const { data, error } = await repository.searchEntries({ vehicle, company, date, billNo });
    
    if (!error && data) {
       setDbResults(data);
    }
    setIsSearching(false);
  };

  return (
    <AppLayout title="Search" subtitle="Find any trip in seconds.">
      <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 sm:p-8 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
          <Field label="Vehicle Number">
            <select value={vehicle} onChange={(e) => { setVehicle(e.target.value); setPage(0); }} className="glass-select">
              <option value="all">All vehicles</option>
              {VEHICLES.map((v) => <option key={v}>{v}</option>)}
            </select>
          </Field>
          <Field label="Company Name">
            <input list="companies" value={company} onChange={(e) => { setCompany(e.target.value); setPage(0); }} className="glass-select" placeholder="Search company…" />
            <datalist id="companies">{companies.map((c) => <option key={c} value={c} />)}</datalist>
          </Field>
          <Field label="Date">
            <input type="date" value={date} onChange={(e) => { setDate(e.target.value); setPage(0); }} className="glass-select" />
          </Field>
          <Field label="Bill No">
            <input type="text" value={billNo} onChange={(e) => { setBillNo(e.target.value); setPage(0); }} className="glass-select" placeholder="Search bill no..." />
          </Field>
          <div className="flex items-end gap-2">
            <button onClick={handleSearch} className="flex-1 rounded-2xl bg-primary text-primary-foreground px-4 py-3 text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <SearchIcon className="h-4 w-4" /> Search
            </button>
            <button onClick={clear} className="glass-button rounded-2xl px-4 py-3 text-sm font-semibold inline-flex items-center gap-2">
              <X className="h-4 w-4" /> Clear
            </button>
          </div>
        </div>
      </motion.section>

      <section className="glass-card overflow-hidden">
        <div className="px-6 py-4 border-b border-white/40 flex items-center justify-between">
          <h2 className="font-semibold">Results <span className="text-xs text-muted-foreground">({results.length})</span></h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground bg-white/40">
              <tr>{["Date","Vehicle","Driver","Company","Bill No","Material","Qty","Rate","Actions"].map(h => <th key={h} className="px-5 py-3 font-medium">{h}</th>)}</tr>
            </thead>
            <tbody>
              {paged.map((e) => (
                <tr key={e.id} className="border-t border-white/40 hover:bg-white/40">
                  <td className="px-5 py-3 whitespace-nowrap">{e.date}</td>
                  <td className="px-5 py-3 font-medium">{e.vehicle}</td>
                  <td className="px-5 py-3">{e.driverName}</td>
                  <td className="px-5 py-3">{e.company}</td>
                  <td className="px-5 py-3">{e.billNo}</td>
                  <td className="px-5 py-3">{e.material}</td>
                  <td className="px-5 py-3">{e.quantity}</td>
                  <td className="px-5 py-3">₹{e.crusherRate}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      {e.billId ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 text-xs font-medium">
                          <Receipt className="h-3 w-3" /> Billed
                        </span>
                      ) : (
                        <>
                          <button onClick={() => handleEdit(e)} className="glass-button h-8 w-8 rounded-xl grid place-items-center text-primary hover:bg-primary/10">
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleDelete(e.id)} className="glass-button h-8 w-8 rounded-xl grid place-items-center text-red-500 hover:bg-red-500/10 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {paged.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-5 py-12 text-center text-muted-foreground">
                    {!filters ? "Click search to find trips." : "No results match your filters."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-white/40 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Page {page + 1} of {pages}</span>
          <div className="flex gap-2">
            <button disabled={page === 0} onClick={() => setPage(p => p - 1)} className="glass-button rounded-xl h-9 w-9 grid place-items-center disabled:opacity-40">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button disabled={page >= pages - 1} onClick={() => setPage(p => p + 1)} className="glass-button rounded-xl h-9 w-9 grid place-items-center disabled:opacity-40">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}
