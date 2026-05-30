import { LayoutDashboard, Library, MonitorSpeaker, Gamepad2 } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/library", label: "Library", icon: Library, end: false },
  { to: "/devices", label: "Devices", icon: MonitorSpeaker, end: false },
  { to: "/remote", label: "Remote", icon: Gamepad2, end: false },
];

export function AppSidebar() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-sidebar md:flex">
      <div className="flex h-16 items-center gap-2 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand shadow-glow">
          <MonitorSpeaker className="h-4 w-4 text-white" />
        </div>
        <span className="text-lg font-semibold tracking-tight">
          Media<span className="text-gradient-brand">Hub</span>
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
        {nav.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            activeClassName="bg-sidebar-accent text-sidebar-accent-foreground"
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-6 py-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Hub connected
        </span>
      </div>
    </aside>
  );
}

/** Mobile bottom navigation bar shown when the sidebar is hidden. */
export function MobileNav() {
  return (
    <nav className="flex items-center justify-around border-t border-border bg-sidebar md:hidden">
      {nav.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={cn(
            "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-muted-foreground transition-colors",
          )}
          activeClassName="text-foreground"
        >
          <Icon className="h-5 w-5" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
