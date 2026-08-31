import { useState } from "react";
import { CLI_COMMANDS } from "../content/site";
import { useInView, useSequence } from "../lib/hooks";
import { Mock, Reveal, Section, SectionHead, StatusDot } from "./ui/Primitives";
import { Mark } from "./Mark";
import { IconAgent, IconArrowDown, IconCheck, IconTerminal, IconGit, IconArrowRight } from "./Icons";

/* ── AI console ───────────────────────────────────────────────────────── */

type Turn = { role: "user" | "agent"; text: string; steps?: string[]; note?: string };

const CONVERSATIONS: { id: string; label: string; turns: Turn[] }[] = [
  {
    id: "deploy",
    label: "Deploy",
    turns: [
      { role: "user", text: "Deploy the latest main branch to production." },
      {
        role: "agent",
        text: "New commit on main: 8f3a92c. Building and rolling out to production.",
        steps: ["Build complete", "Image published", "Database connection verified", "Production updated", "Health checks passed"],
        note: "api · worker · postgres are healthy.",
      },
    ],
  },
  {
    id: "investigate",
    label: "Investigate",
    turns: [
      { role: "user", text: "Why is my API slow?" },
      {
        role: "agent",
        text: "Response latency is up 38% over the last 10 minutes. Two things line up with it:",
        steps: ["CPU utilisation at 91% on api", "Database connections at 47 of 50"],
        note: "Suggested: raise api from 1 to 2 instances. Say the word and I'll apply it.",
      },
    ],
  },
];

export function AIConsole() {
  const [tab, setTab] = useState(0);
  const { ref, seen } = useInView<HTMLDivElement>();
  const conv = CONVERSATIONS[tab];
  const totalSteps = (conv.turns[1].steps?.length ?? 0) + 2;
  const step = useSequence(seen, totalSteps, 620);

  return (
    <Section id="ai">
      <SectionHead
        eyebrow="AI console"
        title="Talk to your infrastructure."
        lead="Use the AgentenX console to understand, deploy, troubleshoot and manage your infrastructure in plain language. It reports what it did, not just that it finished."
      />

      <div ref={ref} className="mt-12">
        <Reveal>
          <div className="mb-4 flex gap-1.5" role="tablist" aria-label="Console examples">
            {CONVERSATIONS.map((c, i) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={tab === i}
                onClick={() => setTab(i)}
                className="rounded-lg border px-3.5 py-2 text-[13px] font-medium transition-colors"
                style={{
                  borderColor: tab === i ? "var(--line-strong)" : "var(--line)",
                  background: tab === i ? "var(--raised)" : "transparent",
                  color: tab === i ? "var(--ink)" : "var(--ink-3)",
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          <Mock title="agentenx console — acme / production">
            <div className="space-y-5 p-4 sm:p-6">
              {/* User turn */}
              <div className="flex gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line font-mono text-[11px] text-ink-3">
                  You
                </span>
                <p className="pt-1 text-[15px] leading-relaxed text-ink">{conv.turns[0].text}</p>
              </div>

              {/* Agent turn */}
              {step >= 1 ? (
                <div className="flex gap-3">
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "var(--accent-soft)", color: "var(--accent-text)" }}
                  >
                    <Mark className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1 pt-1">
                    <p className="text-[15px] leading-relaxed text-ink-2">{conv.turns[1].text}</p>

                    <ul className="mt-3 space-y-1.5">
                      {(conv.turns[1].steps ?? []).slice(0, Math.max(0, step - 1)).map((s) => (
                        <li key={s} className="flex items-center gap-2 font-mono text-[12.5px] text-ink-2">
                          <IconCheck className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--ok)" }} />
                          {s}
                        </li>
                      ))}
                    </ul>

                    {step >= totalSteps - 1 ? (
                      <p
                        className="mt-3 rounded-lg border px-3 py-2.5 text-[13.5px] leading-relaxed"
                        style={{ borderColor: "var(--line)", background: "var(--surface)", color: "var(--ink-2)" }}
                      >
                        {conv.turns[1].note}
                      </p>
                    ) : (
                      <span className="mt-2 inline-block animate-caret font-mono" style={{ color: "var(--accent-text)" }}>▍</span>
                    )}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="flex items-center gap-2 border-t border-line px-4 py-3 sm:px-6" style={{ background: "var(--surface)" }}>
              <IconAgent className="h-4 w-4 shrink-0 text-ink-3" />
              <span className="font-mono text-[12px] text-ink-3">Ask about a service, an environment or a deployment…</span>
            </div>
          </Mock>
        </Reveal>
      </div>
    </Section>
  );
}

/* ── Autonomous ───────────────────────────────────────────────────────── */

const TRADITIONAL = ["Developer", "CLI", "Terraform", "Kubernetes", "Networking", "Storage", "Monitoring", "Debugging"];
const WITH_AGENTS = ["Developer", "AgentenX", "Infrastructure"];

export function Autonomous() {
  return (
    <Section id="autonomous" tint>
      <SectionHead
        eyebrow="Autonomous infrastructure"
        title="Infrastructure should do more than wait for commands."
        lead="Agents can provision, deploy, configure, investigate and tune the things they run. You describe the outcome. The work underneath still happens, it just isn't yours to assemble."
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <div className="card h-full p-6">
            <p className="eyebrow">Traditional</p>
            <p className="mt-2 text-[15px] font-medium">You manage the infrastructure.</p>
            <ol className="mt-5 space-y-0">
              {TRADITIONAL.map((t, i) => (
                <li key={t}>
                  <div className="flex items-center gap-3 rounded-lg border border-line px-3.5 py-2 font-mono text-[12.5px] text-ink-2">
                    {t}
                  </div>
                  {i < TRADITIONAL.length - 1 ? (
                    <div className="flex justify-center py-1" aria-hidden="true">
                      <IconArrowDown className="h-3.5 w-3.5 text-ink-3" />
                    </div>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <div className="card flex h-full flex-col p-6" style={{ borderColor: "var(--line-strong)" }}>
            <p className="eyebrow" style={{ color: "var(--accent-text)" }}>With AgentenX</p>
            <p className="mt-2 text-[15px] font-medium">You define the outcome. Agents do the work.</p>
            <ol className="mt-5 flex flex-1 flex-col justify-center space-y-0">
              {WITH_AGENTS.map((t, i) => (
                <li key={t}>
                  <div
                    className="flex items-center gap-3 rounded-lg border px-3.5 py-3 font-mono text-[12.5px]"
                    style={{
                      borderColor: i === 1 ? "transparent" : "var(--line-strong)",
                      background: i === 1 ? "var(--accent-soft)" : "var(--raised)",
                      color: i === 1 ? "var(--accent-text)" : "var(--ink)",
                    }}
                  >
                    {i === 1 ? <Mark className="h-4 w-4" /> : null}
                    {t}
                  </div>
                  {i < WITH_AGENTS.length - 1 ? (
                    <div className="flex justify-center py-2" aria-hidden="true">
                      <IconArrowDown className="h-3.5 w-3.5" style={{ color: "var(--accent-text)" }} />
                    </div>
                  ) : null}
                </li>
              ))}
            </ol>
            <p className="mt-6 border-t border-line pt-5 text-[13.5px] leading-relaxed text-ink-3">
              The layers underneath do not disappear. AgentenX operates them so you don&rsquo;t have to.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ── Developers: CLI, MCP, four interfaces ───────────────────────────── */

export function Developers() {
  return (
    <Section id="developers">
      <SectionHead
        eyebrow="Developer experience"
        title="Your infrastructure belongs in your workflow."
        lead="The console is one way in, not the only one. The CLI, Git and the API reach the same platform."
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <Mock title="terminal" className="h-full">
            <div className="p-4 font-mono text-[12.5px] leading-[1.9] sm:p-5">
              {CLI_COMMANDS.map((c) => (
                <div key={c.cmd} className="mb-3 last:mb-0">
                  <div className="text-ink">
                    <span style={{ color: "var(--accent-text)" }}>$</span> {c.cmd}
                  </div>
                  <div className="pl-3.5 text-[12px] text-ink-3">{c.desc}</div>
                </div>
              ))}
            </div>
          </Mock>
        </Reveal>

        <Reveal delay={90}>
          <div className="grid h-full gap-4 sm:grid-cols-2">
            {[
              { icon: IconTerminal, t: "CLI", b: "Deploy, read logs and set variables without leaving the terminal." },
              { icon: IconGit, t: "Git", b: "A push to the connected branch is a deployment." },
              { icon: IconArrowRight, t: "API", b: "Drive the same operations from your own tooling." },
              { icon: IconAgent, t: "Console", b: "Ask in plain language and watch what it does." },
            ].map((x) => (
              <div key={x.t} className="card p-5">
                <x.icon className="h-[18px] w-[18px]" style={{ color: "var(--accent-text)" }} />
                <h3 className="mt-3 text-[15px] font-semibold">{x.t}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">{x.b}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* MCP */}
      <div className="mt-16">
        <SectionHead
          eyebrow="MCP"
          title="Infrastructure, available to your AI tools."
          lead="AgentenX exposes its operations over the Model Context Protocol, so an assistant or an agent workflow can work with your infrastructure through structured tools instead of scraped screens."
        />
        <Reveal delay={80}>
          <div className="card mt-8 p-6 sm:p-8">
            <ol className="flex flex-col items-stretch gap-0 md:flex-row md:items-center md:gap-3">
              {["AI assistant", "MCP", "AgentenX", "Infrastructure"].map((n, i, arr) => (
                <li key={n} className="flex flex-1 flex-col items-stretch md:flex-row md:items-center">
                  <div
                    className="flex-1 rounded-lg border px-4 py-3 text-center font-mono text-[12.5px]"
                    style={{
                      borderColor: i === 2 ? "transparent" : "var(--line)",
                      background: i === 2 ? "var(--accent-soft)" : "var(--surface)",
                      color: i === 2 ? "var(--accent-text)" : "var(--ink-2)",
                    }}
                  >
                    {n}
                  </div>
                  {i < arr.length - 1 ? (
                    <span className="flex justify-center py-2 md:px-3 md:py-0" aria-hidden="true">
                      <IconArrowDown className="h-4 w-4 text-ink-3 md:hidden" />
                      <IconArrowRight className="hidden h-4 w-4 text-ink-3 md:block" />
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
            <p className="mt-5 flex items-center gap-2 font-mono text-[12px] text-ink-3">
              <StatusDot tone="idle" /> An open integration point. Any client that speaks MCP can use it.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
