import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Printer, Download, FileText, ArrowLeft } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { COMPANIES, MONTHS, useStore } from "@/lib/store";
import { toast } from "sonner";
import html2pdf from "html2pdf.js";
import ParameshaInvoiceTemplate, { type InvoiceItem } from "@/components/ParameshaInvoiceTemplate";

export const Route = createFileRoute("/billing-format")({
  head: () => ({ meta: [{ title: "Billing Format — CrusherFlow" }] }),
  component: BillingFormat,
});

type Ctx = { company: string; month: string; year: string; vehicle: string; material: string; selectedIds?: string[] };

function BillingFormat() {
  const { entries, addBill, uploadInvoicePDF } = useStore();
  const navigate = useNavigate();
  const [ctx, setCtx] = useState<Ctx>({ company: "all", month: "all", year: String(new Date().getFullYear()), vehicle: "all", material: "all" });
  const [company, setCompany] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [partyGstinNo, setPartyGstinNo] = useState<string>("");
  const [invoiceDate, setInvoiceDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [gstNo, setGstNo] = useState("");
  const [rates, setRates] = useState<Record<string, number>>({});
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    // Generate initial gstNo based on entries count or random
    setGstNo(Math.floor(100 + Math.random() * 900).toString());
  }, []);

  useEffect(() => {
    const raw = sessionStorage.getItem("billing:context");
    if (raw) {
      try {
        const c = JSON.parse(raw) as Ctx;
        setCtx(c);
        if (c.company && c.company !== "all") setCompany(c.company);
      } catch {}
    }
  }, []);

  const companies = useMemo(() => Array.from(new Set([...COMPANIES, ...entries.map(e => e.company)])), [entries]);

  const filtered = useMemo(() => entries.filter((e) => {
    if (ctx.selectedIds) {
      return ctx.selectedIds.includes(e.id);
    }
    
    // Fallback if accessed via direct navigation without selectedIds
    if (!company) return false;
    if (e.company !== company) return false;
    const d = new Date(e.date);
    if (ctx.month !== "all" && d.getMonth() !== MONTHS.indexOf(ctx.month)) return false;
    if (ctx.year && String(d.getFullYear()) !== ctx.year) return false;
    if (ctx.vehicle !== "all" && e.vehicle !== ctx.vehicle) return false;
    if (ctx.material && ctx.material !== "all" && e.material !== ctx.material) return false;
    return true;
  }), [entries, company, ctx]);

  useEffect(() => {
    setRates((prev) => {
      const next = { ...prev };
      filtered.forEach((e) => { if (next[e.id] === undefined) next[e.id] = Math.round(e.crusherRate); });
      return next;
    });
  }, [filtered]);

  const rows = useMemo(() => {
    return filtered.map((e) => {
      const rate = rates[e.id] ?? Math.round(e.crusherRate);
      return {
        id: e.id,
        date: new Date(e.date).toLocaleDateString("en-GB").replace(/\//g, "/"),
        tripSheetNo: e.billNo,
        vehicleNo: e.vehicle,
        material: e.material,
        hsnCode: "",
        qty: e.quantity,
        rate: rate,
      };
    });
  }, [filtered, rates]);

  const subtotal = rows.reduce((s, r) => s + (r.rate * r.qty), 0);
  const gst = subtotal * 0.05; // 2.5% CGST + 2.5% SGST
  const grand = subtotal + gst;

  const handleSave = async () => {
    if (!company) { toast.error("Please enter a company name"); return; }
    if (!gstNo) { toast.error("Please enter GST number"); return; }
    setIsPrinting(true);
    try {
      await addBill({
        gstBillNumber: gstNo, company, address, partyGstinNo, printDate: invoiceDate,
        totalAmount: grand, rows, subtotal, gst
      });
      navigate({ to: "/printed-bills" });
    } catch (error: any) {
      toast.error(error.message || "Failed to save bill or generate PDF");
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <AppLayout title="Billing Format" subtitle="Generate a professional GST invoice.">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 print:block">
        {/* Form side */}
        <div className="space-y-6 print:hidden">
          <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 sm:p-8">
            <button onClick={() => navigate({ to: "/billing" })} className="text-xs text-muted-foreground inline-flex items-center gap-1 mb-4 hover:text-foreground">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to billing
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block sm:col-span-2">
                <span className="text-xs font-medium text-muted-foreground mb-1.5 block">Company Name</span>
                <input list="companies-list" value={company} onChange={(e) => setCompany(e.target.value)} className="glass-select" placeholder="Enter full company name" />
                <datalist id="companies-list">
                  {companies.map((c) => <option key={c} value={c} />)}
                </datalist>
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-medium text-muted-foreground mb-1.5 block">Address</span>
                <input value={address} onChange={(e) => setAddress(e.target.value)} className="glass-select" placeholder="Customer Address" />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-muted-foreground mb-1.5 block">GST Bill Number</span>
                <input value={gstNo} onChange={(e) => setGstNo(e.target.value)} className="glass-select" />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-muted-foreground mb-1.5 block">Invoice Date</span>
                <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className="glass-select" />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-medium text-muted-foreground mb-1.5 block">Party GSTIN No</span>
                <input value={partyGstinNo} onChange={(e) => setPartyGstinNo(e.target.value.toUpperCase())} className="glass-select uppercase" placeholder="GSTIN" />
              </label>
            </div>
          </motion.section>

          <section className="glass-card overflow-hidden">
            <div className="px-6 py-4 border-b border-white/40 flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <h2 className="font-semibold">Trips</h2>
            </div>
            <div className="overflow-x-auto max-h-[400px]">
              <table className="w-full text-sm">
                <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground bg-white/40 sticky top-0 z-10 backdrop-blur-md">
                  <tr>{["Date","Trip No","Vehicle","Material","Qty","Rate","Amount"].map(h => <th key={h} className="px-3 py-3 font-medium">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-t border-white/40">
                      <td className="px-3 py-2 text-xs">{r.date}</td>
                      <td className="px-3 py-2 text-xs">{r.tripSheetNo}</td>
                      <td className="px-3 py-2 text-xs">{r.vehicleNo}</td>
                      <td className="px-3 py-2 font-medium">{r.material}</td>
                      <td className="px-3 py-2">{r.qty.toFixed(2)}</td>
                      <td className="px-3 py-2">
                        <input
                          type="number" min={0}
                          value={rates[r.id] ?? Math.round(r.rate)}
                          onChange={(e) => setRates({ ...rates, [r.id]: Number(e.target.value) })}
                          className="glass-select max-w-[5rem] py-1 text-xs"
                        />
                      </td>
                      <td className="px-3 py-2 font-semibold">₹{(r.rate * r.qty).toLocaleString("en-IN", { maximumFractionDigits: 0 })}</td>
                    </tr>
                  ))}
                  {rows.length === 0 && <tr><td colSpan={7} className="px-5 py-12 text-center text-muted-foreground">Select a company to load trips.</td></tr>}
                </tbody>
              </table>
            </div>
          </section>

          <div className="flex flex-wrap gap-3">
            <button disabled={isPrinting} onClick={handleSave} className="rounded-2xl bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all inline-flex items-center gap-2 disabled:opacity-50">
              <FileText className="h-4 w-4" /> {isPrinting ? "Saving..." : "Save to Printed Bills"}
            </button>
          </div>
        </div>

        {/* Invoice preview */}
        <div className="print:col-span-5 w-full overflow-x-auto pb-4">
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="glass-strong rounded-3xl p-4 sm:p-8 w-max min-w-full print:shadow-none print:bg-white print:border-0 print:p-0">
            <div id="invoice-preview" className="bg-white mx-auto" style={{ width: "210mm" }}>
              <ParameshaInvoiceTemplate 
                invoiceNo={gstNo} 
                invoiceDate={new Date(invoiceDate).toLocaleDateString("en-GB")} 
                customerName={company} 
                address={address} 
                partyGstinNo={partyGstinNo}
                partyState="TELANGANA"
                partyStateCode="36"
                items={rows}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}

