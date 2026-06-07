import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { A as AppLayout } from "./AppLayout-QMdXlTta.mjs";
import { u as useStore, C as COMPANIES, V as VEHICLES, a as MONTHS, M as MATERIALS, s as supabase } from "./router-CDQ16I2E.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { d as Truck, B as Building2, e as Calendar, F as FileText, f as Receipt, g as TrendingUp } from "../_libs/lucide-react.mjs";
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
const years = Array.from({
  length: 6
}, (_, i) => String((/* @__PURE__ */ new Date()).getFullYear() - i));
function BillingPage() {
  const {
    entries,
    loadEntries
  } = useStore();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = reactExports.useState("all");
  const [company, setCompany] = reactExports.useState("all");
  const [month, setMonth] = reactExports.useState("all");
  const [year, setYear] = reactExports.useState(years[0]);
  const [material, setMaterial] = reactExports.useState("all");
  const [loaded, setLoaded] = reactExports.useState(false);
  const [selectedIds, setSelectedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const companies = reactExports.useMemo(() => {
    const fromData = Array.from(new Set(entries.map((e) => e.company)));
    return Array.from(/* @__PURE__ */ new Set([...COMPANIES, ...fromData]));
  }, [entries]);
  const [dbTrips, setDbTrips] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const trips = dbTrips;
  const totals = reactExports.useMemo(() => {
    const selectedTrips = trips.filter((t) => selectedIds.has(t.id));
    const qty = selectedTrips.reduce((s, t) => s + t.quantity, 0);
    const amount = selectedTrips.reduce((s, t) => s + t.quantity * t.crusherRate, 0);
    return {
      count: selectedTrips.length,
      qty,
      amount
    };
  }, [trips, selectedIds]);
  reactExports.useEffect(() => {
    setSelectedIds(new Set(trips.map((t) => t.id)));
  }, [trips]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { title: "Billing", subtitle: "Filter trips by vehicle, company, month, and year.", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.section, { initial: {
      opacity: 0,
      y: 8
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "glass-card p-6 sm:p-8 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Vehicle Number", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-3.5 w-3.5" }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: vehicle, onChange: (e) => setVehicle(e.target.value), className: "glass-select", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All vehicles" }),
        VEHICLES.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: v }, v))
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Company Name", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-3.5 w-3.5" }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: company, onChange: (e) => setCompany(e.target.value), className: "glass-select", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All companies" }),
        companies.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: c }, c))
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Month", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: month, onChange: (e) => setMonth(e.target.value), className: "glass-select", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All months" }),
        MONTHS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: m }, m))
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Year", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: year, onChange: (e) => setYear(e.target.value), className: "glass-select", children: years.map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: y }, y)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Material", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3.5 w-3.5" }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: material, onChange: (e) => setMaterial(e.target.value), className: "glass-select", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All materials" }),
        MATERIALS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: m }, m))
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: isLoading, onClick: async () => {
        setIsLoading(true);
        let query = supabase.from("daily_entries").select("*");
        if (vehicle !== "all") query = query.eq("vehicle_no", vehicle);
        if (company !== "all") query = query.eq("company_name", company);
        if (material !== "all") query = query.eq("material", material);
        if (year) {
          const y = parseInt(year);
          if (month !== "all") {
            const m = MONTHS.indexOf(month);
            const startDate = new Date(y, m, 1).toISOString().split("T")[0];
            const endDate = new Date(y, m + 1, 0).toISOString().split("T")[0];
            query = query.gte("date", startDate).lte("date", endDate);
          } else {
            const startDate = new Date(y, 0, 1).toISOString().split("T")[0];
            const endDate = new Date(y, 11, 31).toISOString().split("T")[0];
            query = query.gte("date", startDate).lte("date", endDate);
          }
        }
        query = query.order("date", {
          ascending: true
        }).order("bill_no", {
          ascending: true
        });
        const {
          data,
          error
        } = await query;
        if (error) {
          toast.error("Failed to load trips");
        } else if (data) {
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
          setLoaded(true);
          toast.success("Trips loaded");
        }
        setIsLoading(false);
      }, className: "w-full rounded-2xl bg-primary text-primary-foreground px-4 py-3 text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed", children: isLoading ? "Loading..." : "Load Trips" }) })
    ] }) }),
    loaded && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.section, { initial: {
        opacity: 0
      }, animate: {
        opacity: 1
      }, className: "glass-card overflow-hidden mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 border-b border-white/40 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "h-4 w-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold", children: "Matching trips" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "(",
            trips.length,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-left text-xs uppercase tracking-wide text-muted-foreground bg-white/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3 w-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary", checked: trips.length > 0 && selectedIds.size === trips.length, onChange: (e) => {
              if (e.target.checked) setSelectedIds(new Set(trips.map((t) => t.id)));
              else setSelectedIds(/* @__PURE__ */ new Set());
            } }) }),
            ["Date", "Vehicle", "Company", "Material", "Qty", "Crusher Rate", "Amount"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3 font-medium", children: h }, h))
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
            trips.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: `border-t border-white/40 hover:bg-white/40 ${!selectedIds.has(t.id) ? "opacity-50" : ""}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary", checked: selectedIds.has(t.id), onChange: (e) => {
                const next = new Set(selectedIds);
                if (e.target.checked) next.add(t.id);
                else next.delete(t.id);
                setSelectedIds(next);
              } }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 whitespace-nowrap", children: t.date }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-medium", children: t.vehicle }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: t.company }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: t.material }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: t.quantity }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3", children: [
                "₹",
                t.crusherRate
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3 font-semibold", children: [
                "₹",
                (t.quantity * t.crusherRate).toLocaleString("en-IN")
              ] })
            ] }, t.id)),
            trips.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, className: "px-5 py-12 text-center text-muted-foreground", children: "No trips found for the selected filters." }) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.section, { initial: {
        opacity: 0,
        y: 8
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Total Trips", value: totals.count.toString(), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Total Quantity", value: `${totals.qty} t`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Total Amount", value: `₹${totals.amount.toLocaleString("en-IN")}`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "h-5 w-5" }), accent: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: selectedIds.size === 0 || company === "all", onClick: () => {
        sessionStorage.setItem("billing:context", JSON.stringify({
          company,
          month,
          year,
          vehicle,
          material,
          selectedIds: Array.from(selectedIds)
        }));
        navigate({
          to: "/billing-format"
        });
      }, className: "w-full rounded-3xl bg-gradient-to-r from-primary to-chart-2 text-primary-foreground px-6 py-5 text-base font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5" }),
        " Generate Billing Format"
      ] }),
      company === "all" && trips.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground mt-3", children: "Select a specific company to generate an invoice." })
    ] })
  ] });
}
function Field({
  label,
  icon,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5", children: [
      icon,
      label
    ] }),
    children
  ] });
}
function Stat({
  label,
  value,
  icon,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `glass-card p-6 ${accent ? "bg-gradient-to-br from-primary/15 to-chart-2/10" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wide font-medium", children: [
      icon,
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-3xl font-semibold tracking-tight", children: value })
  ] });
}
export {
  BillingPage as component
};
