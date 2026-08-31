import { useEffect, useRef, useState } from "react";
import { Logo } from "./Mark";
import { IconClose, IconMenu, IconMoon, IconSun } from "./Icons";
import { NAV } from "../content/site";
import { useTheme } from "../lib/hooks";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { resolved, toggle } = useTheme();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the menu and returns focus to the control that opened it,
  // rather than dropping the caret at the top of the document.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); buttonRef.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="sticky top-0 z-50 border-b transition-colors duration-200"
      style={{
        borderColor: scrolled ? "var(--line)" : "transparent",
        background: scrolled ? "color-mix(in srgb, var(--bg) 82%, transparent)" : "var(--bg)",
        backdropFilter: scrolled ? "saturate(1.6) blur(12px)" : undefined,
      }}
    >
      <nav className="shell flex h-16 items-center justify-between gap-4" aria-label="Main">
        <a href="#top" className="rounded-md text-ink" aria-label="AgentenX, back to top">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <li key={n.label}>
              <a
                href={n.href}
                className="rounded-lg px-3 py-2 text-[14px] text-ink-2 transition-colors hover:text-ink"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggle}
            className="btn-ghost h-9 w-9 px-0"
            aria-label={resolved === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {resolved === "dark" ? <IconSun className="h-[18px] w-[18px]" /> : <IconMoon className="h-[18px] w-[18px]" />}
          </button>

          <a href="#start" className="btn-ghost hidden sm:inline-flex">Sign in</a>
          <a href="#start" className="btn-primary hidden h-9 px-4 sm:inline-flex">Start building</a>

          <button
            ref={buttonRef}
            type="button"
            className="btn-ghost h-9 w-9 px-0 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu: a real panel with its own rhythm, not the desktop list
          squeezed into a column. */}
      {open ? (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="border-t border-line lg:hidden"
          style={{ background: "var(--bg)" }}
        >
          <div className="shell py-4">
            <ul className="flex flex-col">
              {NAV.map((n) => (
                <li key={n.label}>
                  <a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-line py-3.5 text-[16px] text-ink"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-col gap-2.5">
              <a href="#start" onClick={() => setOpen(false)} className="btn-primary w-full">Start building</a>
              <a href="#start" onClick={() => setOpen(false)} className="btn-secondary w-full">Sign in</a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
