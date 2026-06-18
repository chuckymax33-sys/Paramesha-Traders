import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, Plus, RotateCcw, Save, Truck } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { MATERIALS, VEHICLES, COMPANIES, useStore, type Entry } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/daily-entry")({
  head: () => ({ meta: [{ title: "Daily Entry — Shanku Chakram" }] }),
  component: DailyEntry,
});

const empty = {
  vehicle: "",
  driverName: "",
  date: new Date().toISOString().slice(0, 10),
  company: "",
  destination: "",
  billNo: "",
  material: "",
  quantity: "",
  crusherRate: "",
};

function DailyEntry() {
  const { entries, addEntry, updateEntry, deleteEntry } = useStore();
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("edit_entry");
    if (raw) {
      try {
        const e = JSON.parse(raw);
        setEditingId(e.id);
        setForm({ ...e, quantity: String(e.quantity), crusherRate: String(e.crusherRate) });
        sessionStorage.removeItem("edit_entry");
      } catch (err) {}
    }
  }, []);

  const reset = () => { setForm(empty); setEditingId(null); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.vehicle || !form.material || !form.company || !form.destination || !form.billNo || !form.quantity || !form.crusherRate) {
      toast.error("Please fill all fields");
      return;
    }
    
    setIsLoading(true);
    try {
      const payload: Omit<Entry, "id"> = {
        vehicle: form.vehicle, driverName: form.driverName, date: form.date, company: form.company,
        destination: form.destination,
        billNo: form.billNo, material: form.material,
        quantity: Number(form.quantity), crusherRate: Number(form.crusherRate),
      };
      
      if (editingId) { 
        await updateEntry(editingId, payload); 
        toast.success("Entry updated"); 
      }
      else { 
        await addEntry(payload); 
        toast.success("Entry saved"); 
      }
      reset();
    } catch (err) {
      toast.error(editingId ? "Failed to update entry" : "Failed to save entry");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const startEdit = (e: Entry) => {
    setEditingId(e.id);
    setForm({ ...e, driverName: e.driverName || "", quantity: String(e.quantity), crusherRate: String(e.crusherRate) });
  };

  return (
    <AppLayout title="Daily Entry" subtitle="Record every trip in one tap.">
      <motion.section
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 sm:p-8 mb-8"
      >
        <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Field label="Vehicle Number">
            <input
              list="vehicles-list"
              value={form.vehicle}
              onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
              className="glass-select"
              placeholder="Select or type..."
            />
            <datalist id="vehicles-list">
              {VEHICLES.map((v) => <option key={v} value={v} />)}
            </datalist>
          </Field>
          <Field label="Driver Name">
            <input 
              list="drivers-list"
              value={form.driverName} 
              onChange={(e) => setForm({ ...form, driverName: e.target.value })} 
              className="glass-select" 
              placeholder="e.g. Raju" 
            />
            <datalist id="drivers-list">
              {Array.from(new Set(entries.map(e => e.driverName).filter(Boolean))).map((d) => <option key={d} value={d} />)}
            </datalist>
          </Field>
          <Field label="Date">
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="glass-select" />
          </Field>
          <Field label="Company Name">
            <input 
              list="companies-list"
              value={form.company} 
              onChange={(e) => setForm({ ...form, company: e.target.value })} 
              className="glass-select" 
              placeholder="e.g. Sri Sai Constructions" 
            />
            <datalist id="companies-list">
              {Array.from(new Set([...COMPANIES, ...entries.map(e => e.company)])).map((c) => <option key={c} value={c} />)}
            </datalist>
          </Field>
          <Field label="Destination">
            <input 
              list="destinations-list"
              value={form.destination} 
              onChange={(e) => setForm({ ...form, destination: e.target.value })} 
              className="glass-select" 
              placeholder="e.g. Hyderabad" 
            />
            <datalist id="destinations-list">
              {Array.from(new Set(entries.map(e => e.destination).filter(Boolean))).map((d) => <option key={d} value={d} />)}
            </datalist>
          </Field>
          <Field label="Bill No">
            <input value={form.billNo} onChange={(e) => setForm({ ...form, billNo: e.target.value })} className="glass-select" placeholder="B-1001" />
          </Field>
          <Field label="Material">
            <input 
              list="materials-list"
              value={form.material} 
              onChange={(e) => setForm({ ...form, material: e.target.value })} 
              className="glass-select" 
              placeholder="Select or type..."
            />
            <datalist id="materials-list">
              {MATERIALS.map((m) => <option key={m} value={m} />)}
            </datalist>
          </Field>
          <Field label="Quantity (tons)">
            <input type="number" min={0} step="0.01" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="glass-select" />
          </Field>
          <Field label="Crusher Rate (₹)">
            <input type="number" min={0} step="1" value={form.crusherRate} onChange={(e) => setForm({ ...form, crusherRate: e.target.value })} className="glass-select" />
          </Field>
          <div className="flex items-end gap-2">
            <button type="submit" disabled={isLoading} className="flex-1 rounded-2xl bg-primary text-primary-foreground px-4 py-3 text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all inline-flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
              {isLoading ? "Saving..." : editingId ? <><Save className="h-4 w-4" /> Update</> : <><Plus className="h-4 w-4" /> Save Entry</>}
            </button>
            <button type="button" onClick={reset} className="glass-button rounded-2xl px-4 py-3 text-sm font-semibold inline-flex items-center gap-2">
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
          </div>
        </form>
      </motion.section>

      <section className="glass-card overflow-hidden">
        <div className="px-6 py-4 border-b border-white/40 flex items-center gap-3">
          <Truck className="h-4 w-4 text-primary" />
          <h2 className="font-semibold">Recent trips</h2>
          <span className="text-xs text-muted-foreground">({entries.length})</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground bg-white/40">
              <tr>
                {["Date", "Vehicle", "Driver", "Company", "Destination", "Bill No", "Material", "Qty", "Rate", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {entries.map((e) => (
                  <motion.tr
                    key={e.id}
                    layout
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="border-t border-white/40 hover:bg-white/40 transition-colors"
                  >
                    <td className="px-5 py-3 whitespace-nowrap">{e.date}</td>
                    <td className="px-5 py-3 whitespace-nowrap font-medium">{e.vehicle}</td>
                    <td className="px-5 py-3">{e.driverName || "-"}</td>
                    <td className="px-5 py-3">{e.company}</td>
                    <td className="px-5 py-3">{e.destination}</td>
                    <td className="px-5 py-3">{e.billNo}</td>
                    <td className="px-5 py-3">{e.material}</td>
                    <td className="px-5 py-3">{e.quantity}</td>
                    <td className="px-5 py-3">₹{e.crusherRate}</td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(e)} className="glass-button h-9 w-9 rounded-xl grid place-items-center" aria-label="Edit">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={async () => {
                          if (window.confirm("Are you sure you want to delete this entry?")) {
                            try {
                              await deleteEntry(e.id);
                              toast.success("Entry deleted");
                            } catch (err) {
                              toast.error("Failed to delete entry");
                              console.error(err);
                            }
                          }
                        }} className="glass-button h-9 w-9 rounded-xl grid place-items-center text-destructive" aria-label="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {entries.length === 0 && (
                <tr><td colSpan={10} className="px-5 py-12 text-center text-muted-foreground">No entries yet — add your first trip above.</td></tr>
              )}
            </tbody>
          </table>
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
