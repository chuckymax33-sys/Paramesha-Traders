import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Lock, User, X, Sparkles } from "lucide-react";
import { useStore } from "@/lib/store";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        throw redirect({ to: "/daily-entry" });
      }
    } catch (err) {
      // Re-throw router redirects; on SSR errors just show the login page
      if (err && typeof err === "object" && "isRedirect" in err) throw err;
      // No redirect needed — just show the login page
    }
  },
  head: () => ({
    meta: [
      { title: "Shanku Chakram — Sign in" },
      { name: "description", content: "Admin sign-in for the Shanku Chakram building material supplier dashboard." },
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
          <img src="/pt.logo.png" alt="Shanku Chakram Logo" className="mx-auto mb-4 h-36 sm:h-48 w-auto object-contain mix-blend-multiply" />
          <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
            Shanku Chakram
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
          </div>
        </motion.div>
      </main>

      <AnimatePresence>
        {open && (
          <LoginModal
            onClose={() => setOpen(false)}
            onLogin={async (email, password) => {
              const res = await login(email, password);
              if (res.success) {
                toast.success("Welcome back, admin");
                setOpen(false);
                navigate({ to: "/daily-entry" });
              } else {
                toast.error(res.error || "Invalid credentials");
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function LoginModal({
  onClose,
  onLogin,
}: {
  onClose: () => void;
  onLogin: (email: string, p: string) => Promise<void>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await onLogin(email, password);
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

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
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
            <div className="relative">
              <User className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-input w-full rounded-2xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="admin@example.com"
                required
                disabled={loading}
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
                required
                disabled={loading}
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-2xl bg-primary text-primary-foreground px-4 py-3 text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 glass-button rounded-2xl px-4 py-3 text-sm font-semibold disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
