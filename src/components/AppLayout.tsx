import { motion } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { GlassNav } from "./GlassNav";
import { useStore } from "@/lib/store";

export function AppLayout({ children, title, subtitle }: { children: ReactNode; title: string; subtitle?: string }) {
  const { authed, isAuthLoading } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthLoading && !authed) {
      navigate({ to: "/" });
    }
  }, [authed, isAuthLoading, navigate]);

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground animate-pulse font-medium">Checking session...</p>
        </div>
      </div>
    );
  }

  if (!authed) return null;

  return (
    <div className="min-h-screen print:bg-white">
      <div className="print:hidden">
        <GlassNav />
      </div>
      <motion.main
        key={title}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="pt-24 pb-16 px-4 sm:px-6 mx-auto max-w-7xl print:p-0 print:m-0 print:max-w-none"
      >
        <div className="mb-6 sm:mb-8 print:hidden">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h1>
          {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
        </div>
        {children}
      </motion.main>
    </div>
  );
}
