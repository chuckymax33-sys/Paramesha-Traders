import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ClipboardList, FileText, Search, Printer, LogOut, Layers } from "lucide-react";
import { useStore } from "@/lib/store";

const items = [
  { to: "/daily-entry", label: "Daily Entry", icon: ClipboardList },
  { to: "/billing", label: "Billing", icon: FileText },
  { to: "/search", label: "Search", icon: Search },
  { to: "/printed-bills", label: "Printed Bills", icon: Printer },
] as const;

export function GlassNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout } = useStore();

  return (
    <header className="glass-nav fixed top-0 inset-x-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center gap-3">
        <Link to="/daily-entry" className="flex items-center gap-2 mr-2">
          <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-primary to-chart-2 grid place-items-center shadow-md">
            <Layers className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-semibold tracking-tight hidden sm:inline">CrusherFlow</span>
        </Link>

        <nav className="flex-1 overflow-x-auto">
          <ul className="flex items-center justify-center gap-1 sm:gap-2">
            {items.map((it) => {
              const active = pathname.startsWith(it.to);
              const Icon = it.icon;
              return (
                <li key={it.to} className="relative">
                  <Link
                    to={it.to}
                    className={`relative inline-flex items-center gap-2 rounded-2xl px-3 sm:px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                      active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-2xl glass-button"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <Icon className="h-4 w-4 relative" />
                    <span className="relative">{it.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          onClick={() => {
            logout();
            navigate({ to: "/" });
          }}
          className="glass-button rounded-2xl px-3 py-2 text-sm font-medium inline-flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Sign out</span>
        </button>
      </div>
    </header>
  );
}
