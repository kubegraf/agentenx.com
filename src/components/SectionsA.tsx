import { useState } from "react";
import { DEPLOY_SCRIPT, PLATFORM_CARDS, PIPELINE, RUNTIMES } from "../content/site";
import { useInView, useSequence } from "../lib/hooks";
import { Mock, Reveal, Section, SectionHead, StatusDot } from "./ui/Primitives";
import { PipelineStepper } from "./Pipeline";
import {
  IconCheck, IconCompute, IconDatabase, IconDeploy, IconEnvironments,
  IconNetwork, IconRegistry, IconStorage, IconVolume,
} from "./Icons";

/* ── How it works ─────────────────────────────────────────────────────── */

export function HowItWorks() {
  const { ref, seen } = useInView<HTMLDivElement>();
  const step = useSequence(seen, PIPELINE.length + 1, 780);

  return (
    <Section id="how-it-works" tint>
      <SectionHead
        eyebrow="How it works"
        title="From GitHub to production in minutes."
        lead="Connect a repository once. Every push after that follows the same path, and you can watch it happen."
      />
      <div ref={ref} className="mt-12">
        <Reveal>
          <div className="card p-6 sm:p-8">
            <PipelineStepper active={step} />
          </div>
        </Reveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Connect", b: "Authorise GitHub and pick a repository." },
            { t: "Detect", b: "AgentenX identifies the runtime and how the app starts." },
            { t: "Provision", b: "Compute, database and storage are created to match." },
            { t: "Deploy", b: "Every push to the connected branch ships the same way." },
          ].map((s, i) => (
            <Reveal key={s.t} delay={i * 70}>
              <div className="card h-full p-5">
                <div className="font-mono text-[11px] text-ink-3">0{i + 1}</div>
                <h3 className="mt-2 text-[15px] font-semibold">{s.t}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-ink-2">{s.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── Containers ───────────────────────────────────────────────────────── */

export function Containers() {
  const { ref, seen } = useInView<HTMLDivElement>();
  const shown = useSequence(seen, DEPLOY_SCRIPT.lines.length + 2, 520);

  return (
    <Section id="containers">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHead
            eyebrow="Containers"
            title={<>Bring your code. We&rsquo;ll figure out the container.</>}
            lead="If your repository has a Dockerfile, AgentenX uses it. If it doesn't, AgentenX generates one that matches the application it found."
          />
          <Reveal delay={80}>
            <ul className="mt-7 space-y-3">
              {[
                "Detects an existing Dockerfile and builds it unchanged.",
                "Generates one when there isn't a Dockerfile to use.",
                "Builds the image and stores it in the platform registry.",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-ink-2">
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--accent-text)" }} />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-7">
              <p className="eyebrow mb-3">Runtimes detected today</p>
              <div className="flex flex-wrap gap-2">
                {RUNTIMES.map((r) => (
                  <span key={r} className="rounded-lg border border-line px-2.5 py-1.5 font-mono text-[12px] text-ink-2">
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div ref={ref}>
            <Mock title="terminal">
              <div className="p-4 font-mono text-[12.5px] leading-[1.9] sm:p-5">
                <div className="text-ink">
                  <span style={{ color: "var(--accent-text)" }}>$</span> {DEPLOY_SCRIPT.command}
                </div>
                <div className="mt-2 space-y-1">
                  {DEPLOY_SCRIPT.lines.slice(0, shown).map((l) => (
                    <div key={l.label} className="flex gap-2 text-ink-2">
                      <IconCheck className="mt-[3px] h-3.5 w-3.5 shrink-0" style={{ color: "var(--ok)" }} />
                      {/* Two columns that hold their alignment. Below sm they
                          stack, because a 22ch label column does not fit. */}
                      <span className="flex min-w-0 flex-1 flex-col gap-x-3 sm:flex-row">
                        <span className="shrink-0 text-ink sm:w-[21ch]">{l.label}</span>
                        <span className="min-w-0 break-words text-ink-3">{l.detail}</span>
                      </span>
                    </div>
                  ))}
                </div>
                {shown > DEPLOY_SCRIPT.lines.length ? (
                  <div className="mt-3 border-t border-line pt-3 text-ink">
                    Live → <span style={{ color: "var(--accent-text)" }}>{DEPLOY_SCRIPT.final}</span>
                  </div>
                ) : (
                  <div className="mt-3 animate-caret" style={{ color: "var(--accent-text)" }}>▍</div>
                )}
              </div>
            </Mock>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ── Platform grid ────────────────────────────────────────────────────── */

const ICONS = {
  compute: IconCompute, registry: IconRegistry, volume: IconVolume, storage: IconStorage,
  database: IconDatabase, network: IconNetwork, environments: IconEnvironments, deploy: IconDeploy,
} as const;

export function Platform() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <Section id="platform" tint>
      <SectionHead
        eyebrow="Platform"
        title="Everything your application needs to run."
        lead="The pieces most applications need, provisioned and connected for you rather than assembled by hand."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PLATFORM_CARDS.map((c, i) => {
          const Icon = ICONS[c.icon];
          const on = hover === c.title;
          return (
            <Reveal key={c.title} delay={(i % 4) * 60}>
              <div
                className="card h-full p-5 transition-all duration-300"
                style={{
                  borderColor: on ? "var(--line-strong)" : undefined,
                  boxShadow: on ? "var(--shadow-lift)" : undefined,
                  transform: on ? "translateY(-2px)" : undefined,
                }}
                onMouseEnter={() => setHover(c.title)}
                onMouseLeave={() => setHover(null)}
              >
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors duration-300"
                  style={{
                    borderColor: on ? "transparent" : "var(--line)",
                    background: on ? "var(--accent-soft)" : "transparent",
                    color: on ? "var(--accent-text)" : "var(--ink-2)",
                  }}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <h3 className="mt-3.5 text-[15px] font-semibold">{c.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">{c.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={120}>
        <p className="mt-6 flex items-center gap-2 font-mono text-[12px] text-ink-3">
          <StatusDot tone="idle" /> Each service can use any combination of these.
        </p>
      </Reveal>
    </Section>
  );
}
