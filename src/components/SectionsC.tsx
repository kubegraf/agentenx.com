import { PRICING_TIERS, RELIABILITY, USE_CASES, BRAND, FOOTER } from "../content/site";
import { Reveal, Section, SectionHead, StatusDot } from "./ui/Primitives";
import { Logo, Mark } from "./Mark";
import {
  IconArrowRight, IconCheck, IconDatabase, IconEnvironments, IconGauge, IconGithub,
  IconLinkedIn, IconLogs, IconNetwork, IconShield, IconStorage, IconTerminal, IconVolume, IconX,
} from "./Icons";

/* ── Architecture ─────────────────────────────────────────────────────── */

export function Architecture() {
  return (
    <Section id="architecture" tint>
      <SectionHead
        eyebrow="Architecture"
        title="One platform, three ways in, one place your application runs."
        lead="Deploy, AI and control all reach the same resources. Nothing is bolted on the side."
        align="center"
      />

      <Reveal delay={80}>
        <div className="card mx-auto mt-12 max-w-3xl p-6 sm:p-10">
          <Tier>
            <Box tone="brand" wide>
              <Mark className="h-4 w-4" /> AgentenX
            </Box>
          </Tier>

          <Branch />

          <Tier cols={3}>
            <Box>Deploy</Box>
            <Box>AI</Box>
            <Box>Control</Box>
          </Tier>

          <Branch />

          <Tier cols={3}>
            <Box>Compute</Box>
            <Box>Storage</Box>
            <Box>Database</Box>
          </Tier>

          <Connector />

          <Tier>
            <Box tone="outline" wide>Applications</Box>
          </Tier>
        </div>
      </Reveal>
    </Section>
  );
}

function Tier({ children, cols = 1 }: { children: React.ReactNode; cols?: number }) {
  return (
    <div className={`grid gap-3 ${cols === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1"}`}>{children}</div>
  );
}

function Connector() {
  return (
    <div className="flex justify-center py-3" aria-hidden="true">
      <span className="h-6 w-px" style={{ background: "var(--line-strong)" }} />
    </div>
  );
}

/** Branch from one box into a row of three. Collapses to the plain spine below
 *  sm, where the boxes stack and a rail across would point at nothing. */
function Branch() {
  const rail = { background: "var(--line-strong)" };
  return (
    <div className="py-3" aria-hidden="true">
      <div className="flex justify-center sm:hidden">
        <span className="h-6 w-px" style={rail} />
      </div>
      <div className="hidden sm:block">
        <div className="flex justify-center">
          <span className="h-4 w-px" style={rail} />
        </div>
        {/* Rail spans the centres of the outer columns: 1/6 in from each edge. */}
        <div className="mx-auto h-px" style={{ ...rail, width: "66.6667%" }} />
        <div className="grid grid-cols-3">
          {[0, 1, 2].map((i) => (
            <span key={i} className="flex justify-center">
              <span className="h-4 w-px" style={rail} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Box({
  children, tone = "plain", wide = false,
}: { children: React.ReactNode; tone?: "plain" | "brand" | "outline"; wide?: boolean }) {
  const style =
    tone === "brand"
      ? { background: "var(--accent-soft)", borderColor: "transparent", color: "var(--accent-text)" }
      : tone === "outline"
        ? { background: "transparent", borderColor: "var(--line-strong)", color: "var(--ink)" }
        : { background: "var(--raised)", borderColor: "var(--line)", color: "var(--ink-2)" };
  return (
    <div
      className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3.5 font-mono text-[13px] ${wide ? "mx-auto w-full sm:w-1/2" : ""}`}
      style={style}
    >
      {children}
    </div>
  );
}

/* ── Use cases ────────────────────────────────────────────────────────── */

export function UseCases() {
  return (
    <Section id="use-cases">
      <SectionHead eyebrow="Use cases" title="Built for the way developers actually work." />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {USE_CASES.map((u, i) => (
          <Reveal key={u.title} delay={(i % 3) * 70}>
            <div className="card h-full p-6">
              <h3 className="text-[16px] font-semibold">{u.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-2">{u.body}</p>
            </div>
          </Reveal>
        ))}
        <Reveal delay={140}>
          <a
            href="#start"
            className="card flex h-full flex-col justify-between p-6 transition-colors hover:border-line-strong"
          >
            <h3 className="text-[16px] font-semibold">Something else?</h3>
            <span className="mt-2 inline-flex items-center gap-2 text-[14px]" style={{ color: "var(--accent-text)" }}>
              Tell us what you want to run <IconArrowRight className="h-4 w-4" />
            </span>
          </a>
        </Reveal>
      </div>
    </Section>
  );
}

/* ── Reliability ──────────────────────────────────────────────────────── */

const R_ICONS = {
  shield: IconShield, volume: IconVolume, network: IconNetwork, logs: IconLogs,
  terminal: IconTerminal, environments: IconEnvironments, gauge: IconGauge, database: IconDatabase,
  storage: IconStorage,
} as const;

export function Reliability() {
  return (
    <Section id="reliability" tint>
      <SectionHead
        eyebrow="Running in production"
        title="What you get to rely on."
        lead="What the platform gives you today, described plainly. Where something isn't built yet, it isn't listed."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {RELIABILITY.map((r, i) => {
          const Icon = R_ICONS[r.icon as keyof typeof R_ICONS];
          return (
            <Reveal key={r.title} delay={(i % 4) * 60}>
              <div className="card h-full p-5">
                <Icon className="h-[18px] w-[18px]" style={{ color: "var(--accent-text)" }} />
                <h3 className="mt-3 text-[14.5px] font-semibold">{r.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">{r.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={120}>
        <p className="mt-6 max-w-prose text-[13.5px] leading-relaxed text-ink-3">
          AgentenX has not launched publicly. There are no compliance certifications or uptime
          commitments to quote yet, so this page does not quote any.
        </p>
      </Reveal>
    </Section>
  );
}

/* ── Pricing ──────────────────────────────────────────────────────────── */

export function Pricing() {
  return (
    <Section id="pricing">
      <SectionHead
        eyebrow="Pricing"
        title="Pay for what you run."
        lead="Three plans, plus the cost of the infrastructure your application actually uses. Final pricing is being set before launch, so there are no numbers here to get wrong."
        align="center"
      />
      <div className="mx-auto mt-12 grid max-w-5xl gap-4 lg:grid-cols-3">
        {PRICING_TIERS.map((t, i) => (
          <Reveal key={t.name} delay={i * 80}>
            <div
              className="card flex h-full flex-col p-6"
              style={t.featured ? { borderColor: "var(--line-strong)", boxShadow: "var(--shadow-lift)" } : undefined}
            >
              <div className="flex items-center gap-2">
                <h3 className="text-[17px] font-semibold">{t.name}</h3>
                {t.featured ? (
                  <span
                    className="rounded-full px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-wider"
                    style={{ background: "var(--accent-soft)", color: "var(--accent-text)" }}
                  >
                    Most teams
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-2">{t.for}</p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {t.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-[13.5px] text-ink-2">
                    <IconCheck className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--accent-text)" }} />
                    {p}
                  </li>
                ))}
              </ul>
              <a href="#start" className={`mt-6 w-full ${t.featured ? "btn-primary" : "btn-secondary"}`}>
                {t.featured ? "Start building" : "Get in touch"}
              </a>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={140}>
        <p className="mx-auto mt-6 max-w-prose text-center text-[13.5px] leading-relaxed text-ink-3">
          Compute, storage and databases are billed on usage. You are charged for the resources your
          services are running, not for a seat.
        </p>
      </Reveal>
    </Section>
  );
}

/* ── Final CTA ────────────────────────────────────────────────────────── */

export function FinalCTA() {
  return (
    <Section id="start">
      <Reveal>
        <div className="card relative overflow-hidden p-8 text-center sm:p-14">
          <div
            className="pointer-events-none absolute inset-0 grid-bg"
            aria-hidden="true"
            style={{
              maskImage: "radial-gradient(90% 100% at 50% 0%, #000 10%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(90% 100% at 50% 0%, #000 10%, transparent 70%)",
            }}
          />
          <div className="relative">
            <Mark className="mx-auto h-8 w-8" style={{ color: "var(--accent-text)" }} />
            <h2 className="mx-auto mt-6 max-w-xl text-[28px] font-semibold leading-[1.15] sm:text-[36px]">
              Ship your next application with AgentenX.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[16px] leading-relaxed text-ink-2">
              Connect your repository, deploy your application, and let the infrastructure handle itself.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={`mailto:${BRAND.contact}?subject=AgentenX%20early%20access`} className="btn-primary w-full sm:w-auto">
                Request early access <IconArrowRight className="h-4 w-4" />
              </a>
              <a href="#developers" className="btn-secondary w-full sm:w-auto">See the developer tools</a>
            </div>
            <p className="mt-5 flex items-center justify-center gap-2 font-mono text-[12px] text-ink-3">
              <StatusDot tone="accent" pulse /> Not open to the public yet. Early access is by request.
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ── Footer ───────────────────────────────────────────────────────────── */

export function Footer() {
  return (
    <footer className="border-t border-line py-14" style={{ background: "var(--surface)" }}>
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2.6fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-ink-2">
              AI-native infrastructure for developers.
            </p>
            <div className="mt-5 flex gap-2">
              {[
                { Icon: IconGithub, label: "GitHub" },
                { Icon: IconX, label: "X" },
                { Icon: IconLinkedIn, label: "LinkedIn" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#start"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink-2 transition-colors hover:text-ink"
                >
                  <Icon className="h-[16px] w-[16px]" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(FOOTER).map(([group, items]) => (
              <div key={group}>
                <h3 className="eyebrow">{group}</h3>
                <ul className="mt-3.5 space-y-2.5">
                  {items.map((it) => (
                    <li key={it}>
                      <a href="#start" className="text-[13.5px] text-ink-2 transition-colors hover:text-ink">
                        {it}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-ink-3">{BRAND.legal}</p>
          <p className="font-mono text-[12px] text-ink-3">© {new Date().getFullYear()} {BRAND.domain}</p>
        </div>
      </div>
    </footer>
  );
}
