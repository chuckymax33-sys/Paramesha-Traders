import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Lock, User, X, Sparkles } from "lucide-react";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CrusherFlow — Sign in" },
      { name: "description", content: "Admin sign-in for the CrusherFlow building material supplier dashboard." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [open, setOpen] = useState(false);
  const { authed, login } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (authed) navigate({ to: "/daily-entry" });
  }, [authed, navigate]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Top-left admin login */}
      <div className="fixed top-4 left-4 z-30">
        <button
          onClick={() => setOpen(true)}
          className="glass-button rounded-2xl px-4 py-2 text-sm font-semibold inline-flex items-center gap-2"
        >
          <Lock className="h-4 w-4" />
          Admin Login
        </button>
      </div>

      {/* Floating glass orbs */}
      <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute top-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-chart-2/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-chart-3/20 blur-3xl" />

      <main className="relative min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground mb-6">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Apple-inspired liquid glass experience
          </div>
          <div className="mx-auto mb-6 h-16 w-16 rounded-3xl bg-gradient-to-br from-primary to-chart-2 grid place-items-center shadow-xl">
            <Layers className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
            CrusherFlow
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A premium management system for building material suppliers — daily entries, billing, and GST invoices in one elegant dashboard.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="rounded-2xl bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Get Started
            </button>
            <span className="text-xs text-muted-foreground">Use <code className="px-1.5 py-0.5 rounded bg-muted">9959315999</code> / <code className="px-1.5 py-0.5 rounded bg-muted">0126</code></span>
          </div>
        </motion.div>
      </main>

      <AnimatePresence>
        {open && (
          <LoginModal
            onClose={() => setOpen(false)}
            onLogin={(u, p) => {
              if (login(u, p)) {
                toast.success("Welcome back, admin");
                setOpen(false);
                navigate({ to: "/daily-entry" });
              } else {
                toast.error("Invalid credentials");
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function LoginModal({ onClose, onLogin }: { onClose: () => void; onLogin: (u: string, p: string) => void }) {
  const [username, setUsername] = useState("9959315999");
  const [password, setPassword] = useState("0126");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 grid place-items-center px-4"
      style={{ background: "rgba(15, 30, 60, 0.25)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong rounded-3xl w-full max-w-md p-7 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 glass-button rounded-full h-9 w-9 grid place-items-center">
          <X className="h-4 w-4" />
        </button>
        <div className="mb-6">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-chart-2 grid place-items-center shadow-md mb-3">
            <Lock className="h-6 w-6 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">Admin Login</h2>
          <p className="text-sm text-muted-foreground mt-1">Sign in to manage your supplier dashboard.</p>
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); onLogin(username, password); }}
          className="space-y-4"
        >
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Username</label>
            <div className="relative">
              <User className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="glass-input w-full rounded-2xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="admin"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Password</label>
            <div className="relative">
              <Lock className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-input w-full rounded-2xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="••••••"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 rounded-2xl bg-primary text-primary-foreground px-4 py-3 text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              Login
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 glass-button rounded-2xl px-4 py-3 text-sm font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
