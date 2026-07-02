import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { T as Toaster$1, t as toast } from "../_libs/sonner.mjs";
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
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const appCss = "/assets/styles-BB1lRd9C.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const supabaseUrl = "https://wiggkdvjdcqwcavxrkqa.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpZ2drZHZqZGNxd2Nhdnhya3FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MjQ2NzUsImV4cCI6MjA5NjAwMDY3NX0.zkQ0m8bGgmKUvB3vlllJnSnvk0QTbr7UUTOAWlQ_5sY";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const VEHICLES = ["AP24TB8555", "TS07UK5333"];
const MATERIALS = ["Robo", "20MM", "12MM", "6MM", "40MM"];
const COMPANIES = [];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const Ctx = reactExports.createContext(null);
function StoreProvider({ children }) {
  const [authed, setAuthed] = reactExports.useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem("cf_authed") === "true";
    return false;
  });
  const [entries, setEntries] = reactExports.useState([]);
  const loadEntries = async () => {
    const { data, error } = await supabase.from("daily_entries").select("*").order("created_at", { ascending: false }).limit(10);
    if (error) {
      console.error(error);
      toast.error("Failed to load entries");
      return;
    }
    setEntries(data.map((d) => ({
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
  };
  reactExports.useEffect(() => {
    loadEntries();
  }, []);
  reactExports.useEffect(() => {
    if (typeof window !== "undefined") {
      if (authed) localStorage.setItem("cf_authed", "true");
      else localStorage.removeItem("cf_authed");
    }
  }, [authed]);
  const value = {
    authed,
    login: (u, p) => {
      const ok = u.trim() === "9959315999" && p === "0126";
      if (ok) setAuthed(true);
      return ok;
    },
    logout: () => setAuthed(false),
    entries,
    loadEntries,
    addEntry: async (e) => {
      const { error } = await supabase.from("daily_entries").insert({
        vehicle_no: e.vehicle,
        date: e.date,
        company_name: e.company,
        destination: e.destination,
        bill_no: e.billNo,
        material: e.material,
        quantity: e.quantity,
        crusher_rate: e.crusherRate,
        driver_name: e.driverName || ""
      });
      if (error) throw error;
      await loadEntries();
    },
    updateEntry: async (id, e) => {
      const { error } = await supabase.from("daily_entries").update({
        vehicle_no: e.vehicle,
        date: e.date,
        company_name: e.company,
        destination: e.destination,
        bill_no: e.billNo,
        material: e.material,
        quantity: e.quantity,
        crusher_rate: e.crusherRate,
        driver_name: e.driverName || ""
      }).eq("id", id);
      if (error) throw error;
      await loadEntries();
    },
    deleteEntry: async (id) => {
      const { error } = await supabase.from("daily_entries").delete().eq("id", id);
      if (error) throw error;
      await loadEntries();
    },
    addBill: async (b) => {
      const { data, error } = await supabase.from("printed_bills").insert({
        gst_bill_no: b.gstBillNumber,
        company_name: b.company,
        address: b.address,
        party_gstin_no: b.partyGstinNo,
        month: MONTHS[new Date(b.printDate).getMonth()],
        year: String(new Date(b.printDate).getFullYear()),
        subtotal: b.subtotal,
        gst_amount: b.gst,
        grand_total: b.totalAmount,
        items: b.rows,
        printed_at: b.printDate
      }).select().single();
      if (error) throw error;
      return {
        id: data.id,
        gstBillNumber: data.gst_bill_no,
        company: data.company_name,
        address: data.address,
        partyGstinNo: data.party_gstin_no,
        printDate: data.printed_at,
        totalAmount: data.grand_total,
        rows: data.items,
        subtotal: data.subtotal,
        gst: data.gst_amount
      };
    },
    deleteBill: async (id) => {
      const { error } = await supabase.from("printed_bills").delete().eq("id", id);
      if (error) throw error;
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Ctx.Provider, { value, children });
}
const useStore = () => {
  const ctx = reactExports.useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
};
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card max-w-md text-center p-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "glass-button inline-flex rounded-2xl px-4 py-2 text-sm font-medium", children: "Go home" }) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card max-w-md text-center p-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong. Try again or head home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "glass-button rounded-2xl px-4 py-2 text-sm font-medium",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "glass-button rounded-2xl px-4 py-2 text-sm font-medium", children: "Go home" })
    ] })
  ] }) });
}
const Route$6 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Shanku Chakram — Building Material Supplier Management" },
      { name: "description", content: "Modern liquid-glass dashboard to manage daily entries, billing, and printed bills for building material suppliers." }
    ],
    links: [
      { rel: "icon", href: "/pt.logo.png" },
      { rel: "stylesheet", href: appCss }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$6.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(StoreProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-right" })
  ] }) });
}
const $$splitComponentImporter$5 = () => import("./search-CC45SDta.mjs");
const Route$5 = createFileRoute("/search")({
  head: () => ({
    meta: [{
      title: "Search — Shanku Chakram"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./printed-bills-zlIzfuyD.mjs");
const Route$4 = createFileRoute("/printed-bills")({
  head: () => ({
    meta: [{
      title: "Printed Bills — Shanku Chakram"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./daily-entry-TFDnocnP.mjs");
const Route$3 = createFileRoute("/daily-entry")({
  head: () => ({
    meta: [{
      title: "Daily Entry — Shanku Chakram"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./billing-format-B-pOwPFi.mjs");
const Route$2 = createFileRoute("/billing-format")({
  head: () => ({
    meta: [{
      title: "Billing Format — Shanku Chakram"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./billing-DQGE3GsT.mjs");
const Route$1 = createFileRoute("/billing")({
  head: () => ({
    meta: [{
      title: "Billing — Shanku Chakram"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-DxsGs088.mjs");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Shanku Chakram — Sign in"
    }, {
      name: "description",
      content: "Admin sign-in for the Shanku Chakram building material supplier dashboard."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SearchRoute = Route$5.update({
  id: "/search",
  path: "/search",
  getParentRoute: () => Route$6
});
const PrintedBillsRoute = Route$4.update({
  id: "/printed-bills",
  path: "/printed-bills",
  getParentRoute: () => Route$6
});
const DailyEntryRoute = Route$3.update({
  id: "/daily-entry",
  path: "/daily-entry",
  getParentRoute: () => Route$6
});
const BillingFormatRoute = Route$2.update({
  id: "/billing-format",
  path: "/billing-format",
  getParentRoute: () => Route$6
});
const BillingRoute = Route$1.update({
  id: "/billing",
  path: "/billing",
  getParentRoute: () => Route$6
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$6
});
const rootRouteChildren = {
  IndexRoute,
  BillingRoute,
  BillingFormatRoute,
  DailyEntryRoute,
  PrintedBillsRoute,
  SearchRoute
};
const routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  COMPANIES as C,
  MATERIALS as M,
  VEHICLES as V,
  MONTHS as a,
  router as r,
  supabase as s,
  useStore as u
};
