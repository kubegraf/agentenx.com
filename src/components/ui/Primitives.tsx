import type { ReactNode } from "react";
import { useInView } from "../../lib/hooks";

/** Fades a block in the first time it is scrolled to. The CSS reduced-motion
 *  block neutralises the animation globally, and `seen` still flips, so the
 *  content is never left at opacity 0. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, seen } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`${className} ${seen ? "animate-rise" : "opacity-0"}`}
      style={seen ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
  tint = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tint?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative border-t border-line py-20 sm:py-24 lg:py-28 ${className}`}
      style={tint ? { background: "var(--surface)" } : undefined}
    >
      <div className="shell">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-[28px] font-semibold leading-[1.15] sm:text-[34px] lg:text-[40px]">
        {title}
      </h2>
      {lead ? <p className="mt-4 text-[16px] leading-relaxed text-ink-2 sm:text-[17px]">{lead}</p> : null}
    </Reveal>
  );
}

/** The window chrome shared by every product mock. */
export function Mock({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mock ${className}`}>
      <div className="mock-bar">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--line-strong)" }} />
          <i className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--line-strong)" }} />
          <i className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--line-strong)" }} />
        </span>
        <span className="ml-1 font-mono text-[11px] text-ink-3">{title}</span>
      </div>
      {children}
    </div>
  );
}

export function StatusDot({ tone = "ok", pulse = false }: { tone?: "ok" | "idle" | "accent"; pulse?: boolean }) {
  const color = tone === "ok" ? "var(--ok)" : tone === "accent" ? "var(--accent-text)" : "var(--ink-3)";
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${pulse ? "animate-pulseDot" : ""}`}
      style={{ background: color }}
    />
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-ink-2">
      {children}
    </span>
  );
}

/** Small labelled metric used inside the product mocks. */
export function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[11px] uppercase tracking-wider text-ink-3">{label}</div>
      <div className="mt-1 text-[15px] font-medium tabular-nums">{value}</div>
    </div>
  );
}
