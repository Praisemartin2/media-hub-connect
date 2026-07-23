import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Video, PenLine, Newspaper, CalendarDays, Compass, FileText } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { mediaItems, type MediaType } from "@/data/media";
import { events } from "@/data/events";
import { programs } from "@/data/programs";
import { navLinks } from "@/data/site";
import { formatDateShort } from "@/lib/format";

const typeIcon: Record<MediaType, typeof Video> = {
  vlog: Video,
  blog: PenLine,
  news: Newspaper,
};

/** Global site search over pages, programs, stories and events (⌘K / Ctrl-K). */
export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const go = (to: string) => {
    setOpen(false);
    navigate(to);
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        aria-label="Search the site"
        className="rounded-full font-medium text-foreground/70"
      >
        <Search className="h-4 w-4 sm:mr-1.5" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="pointer-events-none ml-2 hidden rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground lg:inline-block">
          ⌘K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search stories, events, programs…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {navLinks.map((l) => (
              <CommandItem key={l.to} value={`page ${l.label}`} onSelect={() => go(l.to)}>
                <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                {l.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Programs">
            {programs.map((p) => (
              <CommandItem
                key={p.slug}
                value={`program ${p.title} ${p.summary}`}
                onSelect={() => go(`/programs/${p.slug}`)}
              >
                <Compass className="mr-2 h-4 w-4 text-primary" />
                {p.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Stories & News">
            {mediaItems.map((m) => {
              const Icon = typeIcon[m.type];
              return (
                <CommandItem
                  key={m.id}
                  value={`${m.type} ${m.title} ${m.category} ${m.excerpt}`}
                  onSelect={() => go(`/media/${m.id}`)}
                >
                  <Icon className="mr-2 h-4 w-4 text-primary" />
                  <span className="truncate">{m.title}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
          <CommandGroup heading="Events">
            {events.map((e) => (
              <CommandItem
                key={e.id}
                value={`event ${e.title} ${e.location} ${e.category}`}
                onSelect={() => go("/events")}
              >
                <CalendarDays className="mr-2 h-4 w-4 text-primary" />
                <span className="truncate">{e.title}</span>
                <span className="ml-auto pl-3 text-xs text-muted-foreground">
                  {formatDateShort(e.date)}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
