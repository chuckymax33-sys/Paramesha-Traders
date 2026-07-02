import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { A as AppLayout } from "./AppLayout-BnxuOsVR.mjs";
import { u as useStore, s as supabase, C as COMPANIES, a as MONTHS } from "./router-CzO775jj.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { P as ParameshaInvoiceTemplate } from "./ParameshaInvoiceTemplate-BmN9XrYm.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { A as ArrowLeft, F as FileText } from "../_libs/lucide-react.mjs";
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
function BillingFormat() {
  const {
    entries,
    addBill
  } = useStore();
  const navigate = useNavigate();
  const [ctx, setCtx] = reactExports.useState({
    company: "all",
    month: "all",
    year: String((/* @__PURE__ */ new Date()).getFullYear()),
    vehicle: "all",
    material: "all"
  });
  const [company, setCompany] = reactExports.useState("");
  const [address, setAddress] = reactExports.useState("");
  const [partyGstinNo, setPartyGstinNo] = reactExports.useState("");
  const [invoiceDate, setInvoiceDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [gstNo, setGstNo] = reactExports.useState("");
  const [rates, setRates] = reactExports.useState({});
  const [isPrinting, setIsPrinting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setGstNo(Math.floor(100 + Math.random() * 900).toString());
  }, []);
  const [dbTrips, setDbTrips] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const raw = sessionStorage.getItem("billing:context");
    if (raw) {
      try {
        const c = JSON.parse(raw);
        setCtx(c);
        if (c.company && c.company !== "all") setCompany(c.company);
        if (c.selectedIds && c.selectedIds.length > 0) {
          supabase.from("daily_entries").select("*").in("id", c.selectedIds).order("date", {
            ascending: true
          }).order("bill_no", {
            ascending: true
          }).then(({
            data
          }) => {
            if (data) {
              setDbTrips(data.map((d) => ({
                id: d.id,
                date: d.date,
                vehicle: d.vehicle_no,
                company: d.company_name,
                destination: d.destination || "",
                billNo: d.bill_no,
                material: d.material,
                quantity: d.quantity,
                crusherRate: d.crusher_rate,
                driverName: d.driver_name || ""
              })));
            }
          });
        }
      } catch {
      }
    }
  }, []);
  const companies = reactExports.useMemo(() => Array.from(/* @__PURE__ */ new Set([...COMPANIES, ...entries.map((e) => e.company)])), [entries]);
  const filtered = reactExports.useMemo(() => {
    if (ctx.selectedIds) {
      return dbTrips;
    }
    const fallbackSource = entries;
    return fallbackSource.filter((e) => {
      if (!company) return false;
      if (e.company !== company) return false;
      const d = new Date(e.date);
      if (ctx.month !== "all" && d.getMonth() !== MONTHS.indexOf(ctx.month)) return false;
      if (ctx.year && String(d.getFullYear()) !== ctx.year) return false;
      if (ctx.vehicle !== "all" && e.vehicle !== ctx.vehicle) return false;
      if (ctx.material && ctx.material !== "all" && e.material !== ctx.material) return false;
      return true;
    });
  }, [entries, dbTrips, company, ctx]);
  reactExports.useEffect(() => {
    setRates((prev) => {
      const next = {
        ...prev
      };
      filtered.forEach((e) => {
        if (next[e.id] === void 0) next[e.id] = Math.round(e.crusherRate);
      });
      return next;
    });
  }, [filtered]);
  const rows = reactExports.useMemo(() => {
    return filtered.map((e) => {
      const rate = rates[e.id] ?? Math.round(Number(e.crusherRate) || 0);
      return {
        id: e.id,
        date: new Date(e.date).toLocaleDateString("en-GB").replace(/\//g, "/"),
        tripSheetNo: e.billNo,
        vehicleNo: e.vehicle,
        material: e.material,
        hsnCode: "",
        qty: Number(e.quantity) || 0,
        rate
      };
    });
  }, [filtered, rates]);
  const subtotal = rows.reduce((s, r) => s + r.rate * r.qty, 0);
  const gst = subtotal * 0.05;
  const grand = subtotal + gst;
  const handleSave = async () => {
    if (!company) {
      toast.error("Please enter a company name");
      return;
    }
    if (!gstNo) {
      toast.error("Please enter GST number");
      return;
    }
    setIsPrinting(true);
    try {
      await addBill({
        gstBillNumber: gstNo,
        company,
        address,
        partyGstinNo,
        printDate: invoiceDate,
        totalAmount: grand,
        rows,
        subtotal,
        gst
      });
      navigate({
        to: "/printed-bills"
      });
    } catch (error) {
      toast.error(error.message || "Failed to save bill or generate PDF");
    } finally {
      setIsPrinting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { title: "Billing Format", subtitle: "Generate a professional GST invoice.", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-2 gap-6 print:block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 print:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.section, { initial: {
        opacity: 0,
        y: 8
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "glass-card p-6 sm:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => navigate({
          to: "/billing"
        }), className: "text-xs text-muted-foreground inline-flex items-center gap-1 mb-4 hover:text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
          " Back to billing"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground mb-1.5 block", children: "Company Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { list: "companies-list", value: company, onChange: (e) => setCompany(e.target.value), className: "glass-select", placeholder: "Enter full company name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("datalist", { id: "companies-list", children: companies.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c }, c)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground mb-1.5 block", children: "Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: address, onChange: (e) => setAddress(e.target.value), className: "glass-select", placeholder: "Customer Address" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground mb-1.5 block", children: "GST Bill Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: gstNo, onChange: (e) => setGstNo(e.target.value), className: "glass-select" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground mb-1.5 block", children: "Invoice Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: invoiceDate, onChange: (e) => setInvoiceDate(e.target.value), className: "glass-select" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground mb-1.5 block", children: "Party GSTIN No" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: partyGstinNo, onChange: (e) => setPartyGstinNo(e.target.value.toUpperCase()), className: "glass-select uppercase", placeholder: "GSTIN" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass-card overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 border-b border-white/40 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold", children: "Trips" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto max-h-[400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-left text-xs uppercase tracking-wide text-muted-foreground bg-white/40 sticky top-0 z-10 backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: ["Date", "Trip No", "Vehicle", "Material", "Qty", "Rate", "Amount"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3 font-medium", children: h }, h)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
            rows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-white/40", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-xs", children: r.date }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-xs", children: r.tripSheetNo }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-xs", children: r.vehicleNo }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-medium", children: r.material }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: Number(r.qty).toFixed(2) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, value: rates[r.id] ?? Math.round(r.rate), onChange: (e) => setRates({
                ...rates,
                [r.id]: Number(e.target.value)
              }), className: "glass-select max-w-[5rem] py-1 text-xs" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2 font-semibold", children: [
                "₹",
                (r.rate * r.qty).toLocaleString("en-IN", {
                  maximumFractionDigits: 0
                })
              ] })
            ] }, r.id)),
            rows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, className: "px-5 py-12 text-center text-muted-foreground", children: "Select a company to load trips." }) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: isPrinting, onClick: handleSave, className: "rounded-2xl bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all inline-flex items-center gap-2 disabled:opacity-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
        " ",
        isPrinting ? "Saving..." : "Save to Printed Bills"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "print:col-span-5 w-full overflow-x-auto pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      scale: 0.98
    }, animate: {
      opacity: 1,
      scale: 1
    }, className: "glass-strong rounded-3xl p-4 sm:p-8 w-max min-w-full print:shadow-none print:bg-white print:border-0 print:p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "invoice-preview", className: "bg-white mx-auto", style: {
      width: "210mm"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ParameshaInvoiceTemplate, { invoiceNo: gstNo, invoiceDate: new Date(invoiceDate).toLocaleDateString("en-GB"), customerName: company, address, partyGstinNo, partyState: "TELANGANA", partyStateCode: "36", items: rows }) }) }) })
  ] }) });
}
export {
  BillingFormat as component
};
