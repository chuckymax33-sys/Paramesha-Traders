import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppLayout } from "./AppLayout-BhNDFMbx.mjs";
import { u as useStore, s as supabase } from "./router-B5aOr_WX.mjs";
import { P as ParameshaInvoiceTemplate } from "./ParameshaInvoiceTemplate-C6B51PtT.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { S as Search, F as FileText, E as Eye, D as Download, T as Trash2, X } from "../_libs/lucide-react.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function PrintedBills() {
  const {
    deleteBill
  } = useStore();
  const [q, setQ] = reactExports.useState("");
  const [viewing, setViewing] = reactExports.useState(null);
  const [isPrinting, setIsPrinting] = reactExports.useState(false);
  const [dbBills, setDbBills] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const fetchBills = async () => {
    setIsLoading(true);
    const {
      data
    } = await supabase.from("printed_bills").select("*").order("created_at", {
      ascending: false
    });
    if (data) {
      setDbBills(data.map((d) => ({
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
    }
    setIsLoading(false);
  };
  reactExports.useEffect(() => {
    fetchBills();
  }, []);
  const downloadPDF = async (b) => {
    setIsPrinting(true);
    setViewing(b);
    setTimeout(async () => {
      try {
        const element = document.querySelector(".invoice-shell");
        if (element) {
          const html2pdf = (await import("../_libs/html2pdf.js.mjs").then(function(n) {
            return n.h;
          })).default;
          const opt = {
            margin: 5,
            filename: `invoice-${b.gstBillNumber || b.id.substring(0, 5)}.pdf`,
            image: {
              type: "jpeg",
              quality: 0.98
            },
            html2canvas: {
              scale: 2,
              useCORS: true
            },
            pagebreak: {
              mode: "css",
              before: ".html2pdf__page-break"
            },
            jsPDF: {
              unit: "mm",
              format: "a4",
              orientation: "portrait"
            }
          };
          await html2pdf().set(opt).from(element).save();
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
  const filtered = reactExports.useMemo(() => dbBills.filter((b) => !q || b.gstBillNumber.toLowerCase().includes(q.toLowerCase()) || b.company.toLowerCase().includes(q.toLowerCase())), [dbBills, q]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { title: "Printed Bills", subtitle: "Reprint or download any past GST invoice.", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card p-4 sm:p-5 mb-6 print:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search by GST bill number or company…", className: "glass-select pl-11" })
    ] }) }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-14 w-14 rounded-2xl bg-primary/10 grid place-items-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-7 w-7 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: "No printed bills yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Generate an invoice from the Billing page and it will appear here." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 print:hidden", children: filtered.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 12
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      delay: i * 0.04
    }, className: "glass-card p-6 hover:-translate-y-1 hover:shadow-xl transition-all", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "GST Bill" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-lg", children: b.gstBillNumber })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-primary", children: [
            "₹",
            b.totalAmount.toLocaleString("en-IN", {
              maximumFractionDigits: 0
            })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: b.company }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mb-4", children: [
        "Printed on ",
        b.printDate
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setViewing(b), className: "glass-button rounded-xl px-3 py-2 text-xs font-semibold inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" }),
          " View"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: isPrinting, onClick: () => downloadPDF(b), className: "glass-button rounded-xl px-3 py-2 text-xs font-semibold inline-flex items-center gap-1.5 disabled:opacity-50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
          " PDF"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: isPrinting, onClick: async () => {
          if (window.confirm("Are you sure you want to delete this bill? This cannot be undone.")) {
            try {
              await deleteBill(b.id);
              fetchBills();
              toast.success("Bill deleted");
            } catch (err) {
              console.error(err);
              toast.error("Failed to delete bill");
            }
          }
        }, className: "glass-button rounded-xl px-3 py-2 text-xs font-semibold inline-flex items-center gap-1.5 text-red-500 hover:text-red-600 disabled:opacity-50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
          " Delete"
        ] })
      ] })
    ] }, b.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: viewing && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0
    }, animate: {
      opacity: 1
    }, exit: {
      opacity: 0
    }, className: "fixed inset-0 z-50 flex justify-center items-start pt-8 pb-16 overflow-y-auto print:static print:p-0 print:m-0 print:bg-white print:block print:overflow-visible", style: {
      background: "rgba(15, 30, 60, 0.3)",
      backdropFilter: "blur(8px)"
    }, onClick: () => setViewing(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      scale: 0.95,
      y: 16
    }, animate: {
      opacity: 1,
      scale: 1,
      y: 0
    }, exit: {
      opacity: 0,
      scale: 0.95
    }, className: "glass-strong rounded-3xl w-[230mm] max-w-[95vw] p-4 sm:p-8 relative print:shadow-none print:bg-white print:border-0 print:rounded-none print:w-full print:max-w-none overflow-x-auto print:overflow-visible print:p-0 print:m-0", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setViewing(null), className: "absolute top-4 right-4 z-50 glass-button rounded-full h-9 w-9 grid place-items-center print:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "printed-invoice-preview", className: "bg-white print:w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ParameshaInvoiceTemplate, { invoiceNo: viewing.gstBillNumber, invoiceDate: new Date(viewing.printDate).toLocaleDateString("en-GB"), customerName: viewing.company, address: viewing.address || "", partyGstinNo: viewing.partyGstinNo || "", partyState: "TELANGANA", partyStateCode: "36", items: viewing.rows }) })
    ] }) }) })
  ] });
}
export {
  PrintedBills as component
};
