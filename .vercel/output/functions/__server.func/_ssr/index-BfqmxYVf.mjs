import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useStore } from "./router-B5aOr_WX.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { k as Lock, l as Sparkles, L as Layers, X, U as User } from "../_libs/lucide-react.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
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
function Landing() {
  const [open, setOpen] = reactExports.useState(false);
  const {
    authed,
    login
  } = useStore();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (authed) navigate({
      to: "/daily-entry"
    });
  }, [authed, navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed top-4 left-4 z-30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen(true), className: "glass-button rounded-2xl px-4 py-2 text-sm font-semibold inline-flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4" }),
      "Admin Login"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute top-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-chart-2/25 blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-chart-3/20 blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "relative min-h-screen flex items-center justify-center px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 24
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }, className: "text-center max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-primary" }),
        "Apple-inspired liquid glass experience"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 h-16 w-16 rounded-3xl bg-gradient-to-br from-primary to-chart-2 grid place-items-center shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-8 w-8 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-5xl sm:text-6xl font-semibold tracking-tight bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent", children: "CrusherFlow" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg text-muted-foreground", children: "A premium management system for building material suppliers — daily entries, billing, and GST invoices in one elegant dashboard." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex items-center justify-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOpen(true), className: "rounded-2xl bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all", children: "Get Started" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(LoginModal, { onClose: () => setOpen(false), onLogin: (u, p) => {
      if (login(u, p)) {
        toast.success("Welcome back, admin");
        setOpen(false);
        navigate({
          to: "/daily-entry"
        });
      } else {
        toast.error("Invalid credentials");
      }
    } }) })
  ] });
}
function LoginModal({
  onClose,
  onLogin
}) {
  const [username, setUsername] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
    opacity: 0
  }, animate: {
    opacity: 1
  }, exit: {
    opacity: 0
  }, className: "fixed inset-0 z-50 grid place-items-center px-4", style: {
    background: "rgba(15, 30, 60, 0.25)",
    backdropFilter: "blur(8px)"
  }, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    scale: 0.95,
    y: 20
  }, animate: {
    opacity: 1,
    scale: 1,
    y: 0
  }, exit: {
    opacity: 0,
    scale: 0.95,
    y: 20
  }, transition: {
    duration: 0.25,
    ease: [0.22, 1, 0.36, 1]
  }, className: "glass-strong rounded-3xl w-full max-w-md p-7 relative", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "absolute top-4 right-4 glass-button rounded-full h-9 w-9 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-chart-2 grid place-items-center shadow-md mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-6 w-6 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold tracking-tight", children: "Admin Login" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Sign in to manage your supplier dashboard." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      onLogin(username, password);
    }, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium text-muted-foreground mb-1.5 block", children: "Username" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: username, onChange: (e) => setUsername(e.target.value), className: "glass-input w-full rounded-2xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40", placeholder: "Phone number" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium text-muted-foreground mb-1.5 block", children: "Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "glass-input w-full rounded-2xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40", placeholder: "••••••" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "flex-1 rounded-2xl bg-primary text-primary-foreground px-4 py-3 text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all", children: "Login" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "flex-1 glass-button rounded-2xl px-4 py-3 text-sm font-semibold", children: "Cancel" })
      ] })
    ] })
  ] }) });
}
export {
  Landing as component
};
