import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Printer, Download, Search as SearchIcon, FileText, X, Trash2 } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { useStore, type PrintedBill } from "@/lib/store";
import ParameshaInvoiceTemplate from "@/components/ParameshaInvoiceTemplate";
import { toast } from "sonner";

export const Route = createFileRoute("/printed-bills")({
  head: () => ({ meta: [{ title: "Printed Bills — CrusherFlow" }] }),
  component: PrintedBills,
});

import { supabase } from "@/lib/supabase";

function PrintedBills() {
  const { bills, deleteBill } = useStore();
  const [q, setQ] = useState("");
  const [viewing, setViewing] = useState<PrintedBill | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const downloadPDF = async (b: PrintedBill) => {
    setIsPrinting(true);
    setViewing(b);
    // Give it a moment to render in the DOM before capturing
    setTimeout(async () => {
      try {
        const element = document.querySelector(".invoice-shell");
        if (element) {
          const html2pdf = (await import("html2pdf.js")).default;
          const opt = {
            margin: 5,
            filename: `invoice-${b.gstBillNumber || b.id.substring(0, 5)}.pdf`,
            image: { type: 'jpeg' as const, quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            pagebreak: { mode: 'css', before: '.html2pdf__page-break' },
            jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
          };
          await html2pdf().set(opt).from(element as HTMLElement).save();
          toast.success("PDF downloaded successfully!");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to generate PDF");
      } finally {
        setViewing(null);
        setIsPrinting(false);
      }
    }, 400);
  };

  const filtered = useMemo(() => bills.filter((b) =>
    !q || b.gstBillNumber.toLowerCase().includes(q.toLowerCase()) || b.company.toLowerCase().includes(q.toLowerCase())
  ), [bills, q]);

  return (
    <AppLayout title="Printed Bills" subtitle="Reprint or download any past GST invoice.">
      <div className="glass-card p-4 sm:p-5 mb-6 print:hidden">
        <div className="relative">
          <SearchIcon className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search by GST bill number or company…"
            className="glass-select pl-11"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-primary/10 grid place-items-center mb-4">
            <FileText className="h-7 w-7 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">No printed bills yet</h3>
          <p className="text-sm text-muted-foreground mt-1">Generate an invoice from the Billing page and it will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 print:hidden">
          {filtered.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="glass-card p-6 hover:-translate-y-1 hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">GST Bill</div>
                  <div className="font-semibold text-lg">{b.gstBillNumber}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Total</div>
                  <div className="font-bold text-primary">₹{b.totalAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</div>
                </div>
              </div>
              <div className="text-sm font-medium">{b.company}</div>
              <div className="text-xs text-muted-foreground mb-4">Printed on {b.printDate}</div>
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => setViewing(b)} className="glass-button rounded-xl px-3 py-2 text-xs font-semibold inline-flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5" /> View
                </button>
                <button disabled={isPrinting} onClick={() => downloadPDF(b)} className="glass-button rounded-xl px-3 py-2 text-xs font-semibold inline-flex items-center gap-1.5 disabled:opacity-50">
                  <Download className="h-3.5 w-3.5" /> PDF
                </button>
                <button disabled={isPrinting} onClick={() => {
                  if (window.confirm("Are you sure you want to delete this bill? This cannot be undone.")) {
                    deleteBill(b.id).then(() => toast.success("Bill deleted")).catch((err) => {
                      console.error(err);
                      toast.error("Failed to delete bill");
                    });
                  }
                }} className="glass-button rounded-xl px-3 py-2 text-xs font-semibold inline-flex items-center gap-1.5 text-red-500 hover:text-red-600 disabled:opacity-50">
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {viewing && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-center items-start pt-8 pb-16 overflow-y-auto print:static print:p-0 print:m-0 print:bg-white print:block print:overflow-visible"
            style={{ background: "rgba(15, 30, 60, 0.3)", backdropFilter: "blur(8px)" }}
            onClick={() => setViewing(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-strong rounded-3xl w-[230mm] max-w-[95vw] p-4 sm:p-8 relative print:shadow-none print:bg-white print:border-0 print:rounded-none print:w-full print:max-w-none overflow-x-auto print:overflow-visible print:p-0 print:m-0"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setViewing(null)} className="absolute top-4 right-4 z-50 glass-button rounded-full h-9 w-9 grid place-items-center print:hidden">
                <X className="h-4 w-4" />
              </button>
              <div id="printed-invoice-preview" className="bg-white print:w-full">
                <ParameshaInvoiceTemplate
                  invoiceNo={viewing.gstBillNumber}
                  invoiceDate={new Date(viewing.printDate).toLocaleDateString("en-GB")}
                  customerName={viewing.company}
                  address={viewing.address || ""}
                  partyGstinNo={viewing.partyGstinNo || ""}
                  partyState="TELANGANA"
                  partyStateCode="36"
                  items={viewing.rows}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
}
