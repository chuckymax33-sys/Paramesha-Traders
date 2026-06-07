import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, e as useLocation, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useStore } from "./router-B5aOr_WX.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { L as Layers, h as ClipboardList, F as FileText, S as Search, i as Printer, j as LogOut } from "../_libs/lucide-react.mjs";
const items = [
  { to: "/daily-entry", label: "Daily Entry", icon: ClipboardList },
  { to: "/billing", label: "Billing", icon: FileText },
  { to: "/search", label: "Search", icon: Search },
  { to: "/printed-bills", label: "Printed Bills", icon: Printer }
];
function GlassNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout } = useStore();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "glass-nav fixed top-0 inset-x-0 z-40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/daily-entry", className: "flex items-center gap-2 mr-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-2xl bg-gradient-to-br from-primary to-chart-2 grid place-items-center shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-5 w-5 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold tracking-tight hidden sm:inline", children: "CrusherFlow" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex items-center justify-center gap-1 sm:gap-2", children: items.map((it) => {
      const active = pathname.startsWith(it.to);
      const Icon = it.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: it.to,
          className: `relative inline-flex items-center gap-2 rounded-2xl px-3 sm:px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
          children: [
            active && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.span,
              {
                layoutId: "nav-pill",
                className: "absolute inset-0 rounded-2xl glass-button",
                transition: { type: "spring", stiffness: 350, damping: 30 }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 relative" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative", children: it.label })
          ]
        }
      ) }, it.to);
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => {
          logout();
          navigate({ to: "/" });
        },
        className: "glass-button rounded-2xl px-3 py-2 text-sm font-medium inline-flex items-center gap-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Sign out" })
        ]
      }
    )
  ] }) });
}
function AppLayout({ children, title, subtitle }) {
  const { authed } = useStore();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!authed) navigate({ to: "/" });
  }, [authed, navigate]);
  if (!authed) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen print:bg-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "print:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassNav, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.main,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
        className: "pt-24 pb-16 px-4 sm:px-6 mx-auto max-w-7xl print:p-0 print:m-0 print:max-w-none",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 sm:mb-8 print:hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl sm:text-4xl font-semibold tracking-tight", children: title }),
            subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: subtitle })
          ] }),
          children
        ]
      },
      title
    )
  ] });
}
export {
  AppLayout as A
};
