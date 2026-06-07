import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppLayout } from "./AppLayout-BUEmiuLK.mjs";
import { u as useStore, M as MATERIALS, V as VEHICLES, C as COMPANIES } from "./router-qAY7HeMS.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
import { b as Save, P as Plus, R as RotateCcw, c as Truck, d as Pencil, T as Trash2 } from "../_libs/lucide-react.mjs";
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
const empty = {
  vehicle: VEHICLES[0],
  date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
  company: "",
  destination: "",
  billNo: "",
  material: MATERIALS[0],
  quantity: "",
  crusherRate: ""
};
function DailyEntry() {
  const {
    entries,
    addEntry,
    updateEntry,
    deleteEntry
  } = useStore();
  const [form, setForm] = reactExports.useState(empty);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const reset = () => {
    setForm(empty);
    setEditingId(null);
  };
  const submit = async (e) => {
    e.preventDefault();
    if (!form.company || !form.destination || !form.billNo || !form.quantity || !form.crusherRate) {
      toast.error("Please fill all fields");
      return;
    }
    setIsLoading(true);
    try {
      const payload = {
        vehicle: form.vehicle,
        date: form.date,
        company: form.company,
        destination: form.destination,
        billNo: form.billNo,
        material: form.material,
        quantity: Number(form.quantity),
        crusherRate: Number(form.crusherRate)
      };
      if (editingId) {
        await updateEntry(editingId, payload);
        toast.success("Entry updated");
      } else {
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
  const startEdit = (e) => {
    setEditingId(e.id);
    setForm({
      ...e,
      quantity: String(e.quantity),
      crusherRate: String(e.crusherRate)
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { title: "Daily Entry", subtitle: "Record every trip in one tap.", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.section, { initial: {
      opacity: 0,
      y: 8
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "glass-card p-6 sm:p-8 mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "Vehicle Number", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { list: "vehicles-list", value: form.vehicle, onChange: (e) => setForm({
          ...form,
          vehicle: e.target.value
        }), className: "glass-select", placeholder: "Select or type..." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("datalist", { id: "vehicles-list", children: VEHICLES.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: v }, v)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Date", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: form.date, onChange: (e) => setForm({
        ...form,
        date: e.target.value
      }), className: "glass-select" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "Company Name", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { list: "companies-list", value: form.company, onChange: (e) => setForm({
          ...form,
          company: e.target.value
        }), className: "glass-select", placeholder: "e.g. Sri Sai Constructions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("datalist", { id: "companies-list", children: Array.from(/* @__PURE__ */ new Set([...COMPANIES, ...entries.map((e) => e.company)])).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c }, c)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Destination", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.destination, onChange: (e) => setForm({
        ...form,
        destination: e.target.value
      }), className: "glass-select", placeholder: "e.g. Hyderabad" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Bill No", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.billNo, onChange: (e) => setForm({
        ...form,
        billNo: e.target.value
      }), className: "glass-select", placeholder: "B-1001" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "Material", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { list: "materials-list", value: form.material, onChange: (e) => setForm({
          ...form,
          material: e.target.value
        }), className: "glass-select", placeholder: "Select or type..." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("datalist", { id: "materials-list", children: MATERIALS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: m }, m)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Quantity (tons)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, step: "0.01", value: form.quantity, onChange: (e) => setForm({
        ...form,
        quantity: e.target.value
      }), className: "glass-select" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Crusher Rate (₹)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, step: "1", value: form.crusherRate, onChange: (e) => setForm({
        ...form,
        crusherRate: e.target.value
      }), className: "glass-select" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: isLoading, className: "flex-1 rounded-2xl bg-primary text-primary-foreground px-4 py-3 text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all inline-flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed", children: isLoading ? "Saving..." : editingId ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
          " Update"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Save Entry"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: reset, className: "glass-button rounded-2xl px-4 py-3 text-sm font-semibold inline-flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4" }),
          " Reset"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass-card overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 border-b border-white/40 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-4 w-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold", children: "Recent trips" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "(",
          entries.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-left text-xs uppercase tracking-wide text-muted-foreground bg-white/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: ["Date", "Vehicle", "Company", "Destination", "Bill No", "Material", "Qty", "Rate", "Actions"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3 font-medium", children: h }, h)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: entries.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.tr, { layout: true, initial: {
            opacity: 0,
            y: -4
          }, animate: {
            opacity: 1,
            y: 0
          }, exit: {
            opacity: 0
          }, className: "border-t border-white/40 hover:bg-white/40 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 whitespace-nowrap", children: e.date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 whitespace-nowrap font-medium", children: e.vehicle }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: e.company }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: e.destination }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: e.billNo }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: e.material }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: e.quantity }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3", children: [
              "₹",
              e.crusherRate
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => startEdit(e), className: "glass-button h-9 w-9 rounded-xl grid place-items-center", "aria-label": "Edit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: async () => {
                if (window.confirm("Are you sure you want to delete this entry?")) {
                  try {
                    await deleteEntry(e.id);
                    toast.success("Entry deleted");
                  } catch (err) {
                    toast.error("Failed to delete entry");
                    console.error(err);
                  }
                }
              }, className: "glass-button h-9 w-9 rounded-xl grid place-items-center text-destructive", "aria-label": "Delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
            ] }) })
          ] }, e.id)) }),
          entries.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 9, className: "px-5 py-12 text-center text-muted-foreground", children: "No entries yet — add your first trip above." }) })
        ] })
      ] }) })
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
  DailyEntry as component
};
