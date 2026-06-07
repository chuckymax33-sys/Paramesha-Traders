import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppLayout } from "./AppLayout-BhNDFMbx.mjs";
import { u as useStore, C as COMPANIES, V as VEHICLES, s as supabase } from "./router-B5aOr_WX.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { S as Search, X, P as Pencil, T as Trash2, C as ChevronLeft, a as ChevronRight } from "../_libs/lucide-react.mjs";
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
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const PAGE = 6;
function SearchPage() {
  const navigate = useNavigate();
  const {
    entries,
    deleteEntry
  } = useStore();
  const [vehicle, setVehicle] = reactExports.useState("all");
  const [company, setCompany] = reactExports.useState("");
  const [date, setDate] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(0);
  const [filters, setFilters] = reactExports.useState(null);
  const companies = reactExports.useMemo(() => Array.from(/* @__PURE__ */ new Set([...COMPANIES, ...entries.map((e) => e.company)])), [entries]);
  const [dbResults, setDbResults] = reactExports.useState([]);
  const [isSearching, setIsSearching] = reactExports.useState(false);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      try {
        await deleteEntry(id);
        setDbResults((prev) => prev.filter((r) => r.id !== id));
        toast.success("Trip deleted");
      } catch {
        toast.error("Failed to delete trip");
      }
    }
  };
  const handleEdit = (e) => {
    sessionStorage.setItem("edit_entry", JSON.stringify(e));
    navigate({
      to: "/daily-entry"
    });
  };
  const results = reactExports.useMemo(() => {
    return dbResults;
  }, [dbResults]);
  const pages = Math.max(1, Math.ceil(results.length / PAGE));
  const paged = results.slice(page * PAGE, (page + 1) * PAGE);
  const clear = () => {
    setVehicle("all");
    setCompany("");
    setDate("");
    setPage(0);
    setFilters(null);
    setDbResults([]);
  };
  const handleSearch = async () => {
    setFilters({
      vehicle,
      company,
      date
    });
    setPage(0);
    setIsSearching(true);
    let query = supabase.from("daily_entries").select("*").order("created_at", {
      ascending: false
    });
    if (vehicle !== "all") query = query.eq("vehicle_no", vehicle);
    if (company) query = query.ilike("company_name", `%${company}%`);
    if (date) query = query.eq("date", date);
    const {
      data,
      error
    } = await query.limit(500);
    if (!error && data) {
      setDbResults(data.map((d) => ({
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
    setIsSearching(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { title: "Search", subtitle: "Find any trip in seconds.", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.section, { initial: {
      opacity: 0,
      y: 8
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "glass-card p-6 sm:p-8 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Vehicle Number", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: vehicle, onChange: (e) => {
        setVehicle(e.target.value);
        setPage(0);
      }, className: "glass-select", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All vehicles" }),
        VEHICLES.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: v }, v))
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "Company Name", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { list: "companies", value: company, onChange: (e) => {
          setCompany(e.target.value);
          setPage(0);
        }, className: "glass-select", placeholder: "Search company…" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("datalist", { id: "companies", children: companies.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c }, c)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Date", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: date, onChange: (e) => {
        setDate(e.target.value);
        setPage(0);
      }, className: "glass-select" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSearch, className: "flex-1 rounded-2xl bg-primary text-primary-foreground px-4 py-3 text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4" }),
          " Search"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: clear, className: "glass-button rounded-2xl px-4 py-3 text-sm font-semibold inline-flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          " Clear"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass-card overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-white/40 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold", children: [
        "Results ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "(",
          results.length,
          ")"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-left text-xs uppercase tracking-wide text-muted-foreground bg-white/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: ["Date", "Vehicle", "Driver", "Company", "Bill No", "Material", "Qty", "Rate", "Actions"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3 font-medium", children: h }, h)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          paged.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-white/40 hover:bg-white/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 whitespace-nowrap", children: e.date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-medium", children: e.vehicle }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: e.driverName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: e.company }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: e.billNo }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: e.material }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: e.quantity }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3", children: [
              "₹",
              e.crusherRate
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleEdit(e), className: "glass-button h-8 w-8 rounded-xl grid place-items-center text-primary hover:bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleDelete(e.id), className: "glass-button h-8 w-8 rounded-xl grid place-items-center text-red-500 hover:bg-red-500/10 hover:text-red-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
            ] }) })
          ] }, e.id)),
          paged.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 9, className: "px-5 py-12 text-center text-muted-foreground", children: !filters ? "Click search to find trips." : "No results match your filters." }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 border-t border-white/40 flex items-center justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
          "Page ",
          page + 1,
          " of ",
          pages
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: page === 0, onClick: () => setPage((p) => p - 1), className: "glass-button rounded-xl h-9 w-9 grid place-items-center disabled:opacity-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: page >= pages - 1, onClick: () => setPage((p) => p + 1), className: "glass-button rounded-xl h-9 w-9 grid place-items-center disabled:opacity-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) })
        ] })
      ] })
    ] })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground mb-1.5 block", children: label }),
    children
  ] });
}
export {
  SearchPage as component
};
