import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Building2, Truck, FileText, Receipt, TrendingUp } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { COMPANIES, MONTHS, VEHICLES, MATERIALS, useStore, type Entry } from "@/lib/store";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const Route = createFileRoute("/billing")({
  head: () => ({ meta: [{ title: "Billing — CrusherFlow" }] }),
  component: BillingPage,
});

const years = Array.from({ length: 6 }, (_, i) => String(new Date().getFullYear() - i));

function BillingPage() {
  const { entries, loadEntries } = useStore();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState("all");
  const [company, setCompany] = useState("all");
  const [month, setMonth] = useState("all");
  const [year, setYear] = useState(years[0]);
  const [material, setMaterial] = useState("all");
  const [loaded, setLoaded] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const companies = useMemo(() => {
    const fromData = Array.from(new Set(entries.map((e) => e.company)));
    return Array.from(new Set([...COMPANIES, ...fromData]));
  }, [entries]);

  const [dbTrips, setDbTrips] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const trips = dbTrips;

  const totals = useMemo(() => {
    const selectedTrips = trips.filter(t => selectedIds.has(t.id));
    const qty = selectedTrips.reduce((s, t) => s + (Number(t.quantity) || 0), 0);
    const amount = selectedTrips.reduce((s, t) => s + (Number(t.quantity) || 0) * (Number(t.crusherRate) || 0), 0);
    return { count: selectedTrips.length, qty, amount };
  }, [trips, selectedIds]);

  // Select all trips when the list changes
  useEffect(() => {
    setSelectedIds(new Set(trips.map(t => t.id)));
  }, [trips]);

  return (
    <AppLayout title="Billing" subtitle="Filter trips by vehicle, company, month, and year.">
      <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 sm:p-8 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          <Field label="Vehicle Number" icon={<Truck className="h-3.5 w-3.5" />}>
            <select value={vehicle} onChange={(e) => setVehicle(e.target.value)} className="glass-select">
              <option value="all">All vehicles</option>
              {VEHICLES.map((v) => <option key={v}>{v}</option>)}
            </select>
          </Field>
          <Field label="Company Name" icon={<Building2 className="h-3.5 w-3.5" />}>
            <select value={company} onChange={(e) => setCompany(e.target.value)} className="glass-select">
              <option value="all">All companies</option>
              {companies.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Month" icon={<Calendar className="h-3.5 w-3.5" />}>
            <select value={month} onChange={(e) => setMonth(e.target.value)} className="glass-select">
              <option value="all">All months</option>
              {MONTHS.map((m) => <option key={m}>{m}</option>)}
            </select>
          </Field>
          <Field label="Year" icon={<Calendar className="h-3.5 w-3.5" />}>
            <select value={year} onChange={(e) => setYear(e.target.value)} className="glass-select">
              {years.map((y) => <option key={y}>{y}</option>)}
            </select>
          </Field>
          <Field label="Material" icon={<FileText className="h-3.5 w-3.5" />}>
            <select value={material} onChange={(e) => setMaterial(e.target.value)} className="glass-select">
              <option value="all">All materials</option>
              {MATERIALS.map((m) => <option key={m}>{m}</option>)}
            </select>
          </Field>
          <div className="flex items-end">
            <button
              disabled={isLoading}
              onClick={async () => { 
                setIsLoading(true);
                let query: any = supabase.from("daily_entries").select("*");
                
                if (vehicle !== "all") query = query.eq("vehicle_no", vehicle);
                if (company !== "all") query = query.eq("company_name", company);
                if (material !== "all") query = query.eq("material", material);
                
                if (year) {
                  const y = parseInt(year);
                  if (month !== "all") {
                    const m = MONTHS.indexOf(month);
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
                if (error) {
                  toast.error("Failed to load trips");
                } else if (data) {
                  setDbTrips(data.map((d: any) => ({
                    id: d.id, date: d.date, vehicle: d.vehicle_no, company: d.company_name,
                    destination: d.destination || "", billNo: d.bill_no, material: d.material,
                    quantity: d.quantity, crusherRate: d.crusher_rate, driverName: d.driver_name || ""
                  })));
                  setLoaded(true); 
                  toast.success("Trips loaded"); 
                }
                setIsLoading(false);
              }}
              className="w-full rounded-2xl bg-primary text-primary-foreground px-4 py-3 text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Loading..." : "Load Trips"}
            </button>
          </div>
        </div>
      </motion.section>

      {loaded && (
        <>
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-white/40 flex items-center gap-2">
              <Receipt className="h-4 w-4 text-primary" />
              <h2 className="font-semibold">Matching trips</h2>
              <span className="text-xs text-muted-foreground">({trips.length})</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground bg-white/40">
                  <tr>
                    <th className="px-5 py-3 w-10">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                        checked={trips.length > 0 && selectedIds.size === trips.length} 
                        onChange={(e) => {
                          if (e.target.checked) setSelectedIds(new Set(trips.map(t => t.id)));
                          else setSelectedIds(new Set());
                        }} 
                      />
                    </th>
                    {["Date","Vehicle","Company","Material","Qty","Crusher Rate","Amount"].map(h => <th key={h} className="px-5 py-3 font-medium">{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {trips.map((t) => (
                    <tr key={t.id} className={`border-t border-white/40 hover:bg-white/40 ${!selectedIds.has(t.id) ? "opacity-50" : ""}`}>
                      <td className="px-5 py-3">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                          checked={selectedIds.has(t.id)} 
                          onChange={(e) => {
                            const next = new Set(selectedIds);
                            if (e.target.checked) next.add(t.id);
                            else next.delete(t.id);
                            setSelectedIds(next);
                          }} 
                        />
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">{t.date}</td>
                      <td className="px-5 py-3 font-medium">{t.vehicle}</td>
                      <td className="px-5 py-3">{t.company}</td>
                      <td className="px-5 py-3">{t.material}</td>
                      <td className="px-5 py-3 font-semibold">{(Number(t.quantity) || 0).toFixed(2)} Tons</td>
                      <td className="px-5 py-3 text-white/60">₹{Number(t.crusherRate) || 0}</td>
                      <td className="px-5 py-3 font-semibold">₹{((Number(t.quantity) || 0) * (Number(t.crusherRate) || 0)).toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                  {trips.length === 0 && <tr><td colSpan={7} className="px-5 py-12 text-center text-muted-foreground">No trips found for the selected filters.</td></tr>}
                </tbody>
              </table>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Stat label="Total Trips" value={totals.count.toString()} icon={<Truck className="h-5 w-5" />} />
            <Stat label="Total Quantity" value={`${totals.qty} t`} icon={<TrendingUp className="h-5 w-5" />} />
            <Stat label="Total Amount" value={`₹${totals.amount.toLocaleString("en-IN")}`} icon={<Receipt className="h-5 w-5" />} accent />
          </motion.section>

          <button
            disabled={selectedIds.size === 0 || company === "all"}
            onClick={() => {
              sessionStorage.setItem("billing:context", JSON.stringify({ company, month, year, vehicle, material, selectedIds: Array.from(selectedIds) }));
              navigate({ to: "/billing-format" });
            }}
            className="w-full rounded-3xl bg-gradient-to-r from-primary to-chart-2 text-primary-foreground px-6 py-5 text-base font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
          >
            <FileText className="h-5 w-5" /> Generate Billing Format
          </button>
          {company === "all" && trips.length > 0 && (
            <p className="text-xs text-center text-muted-foreground mt-3">Select a specific company to generate an invoice.</p>
          )}
        </>
      )}
    </AppLayout>
  );
}

function Field({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5">{icon}{label}</span>
      {children}
    </label>
  );
}

function Stat({ label, value, icon, accent }: { label: string; value: string; icon: React.ReactNode; accent?: boolean }) {
  return (
    <div className={`glass-card p-6 ${accent ? "bg-gradient-to-br from-primary/15 to-chart-2/10" : ""}`}>
      <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wide font-medium">
        {icon}{label}
      </div>
      <div className="mt-2 text-3xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}
