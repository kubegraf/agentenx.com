import { PIPELINE, BUILD_LOG } from "../content/site";
import { useInView, useSequence } from "../lib/hooks";
import { PipelineStepper } from "./Pipeline";
import { Mock, Metric, StatusDot } from "./ui/Primitives";
import { IconGithub, IconArrowRight, IconCompute, IconDatabase, IconVolume, IconAgent } from "./Icons";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* A faint grid, fading out before it reaches the content. Structure
          rather than decoration: no glow, no blobs. */}
      <div
        className="pointer-events-none absolute inset-0 grid-bg"
        aria-hidden="true"
        style={{ maskImage: "radial-gradient(120% 70% at 50% 0%, #000 30%, transparent 72%)",
                 WebkitMaskImage: "radial-gradient(120% 70% at 50% 0%, #000 30%, transparent 72%)" }}
      />

      <div className="shell relative pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow animate-rise">AI-native developer infrastructure</p>

          <h1
            className="animate-rise mt-5 text-[38px] font-semibold leading-[1.06] tracking-[-0.03em] sm:text-[54px] lg:text-[64px]"
            style={{ animationDelay: "60ms" }}
          >
            Your infrastructure,
            <br className="hidden sm:block" /> run by agents.
          </h1>

          <p
            className="animate-rise mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-ink-2 sm:text-[19px]"
            style={{ animationDelay: "120ms" }}
          >
            Connect your GitHub repository, deploy your application, and let AgentenX handle the
            infrastructure behind it.
          </p>

          <div
            className="animate-rise mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "180ms" }}
          >
            <a href="#start" className="btn-primary w-full sm:w-auto">
              Start building
              <IconArrowRight className="h-4 w-4" />
            </a>
            <a href="#platform" className="btn-secondary w-full sm:w-auto">Explore the platform</a>
          </div>

          <p className="animate-rise mt-5 font-mono text-[12px] text-ink-3" style={{ animationDelay: "240ms" }}>
            No Kubernetes expertise required.
          </p>
        </div>

        <div className="animate-rise mt-14 sm:mt-16" style={{ animationDelay: "300ms" }}>
          <DeployConsole />
        </div>
      </div>
    </section>
  );
}

/** The hero's product mock: one deployment, running. */
function DeployConsole() {
  const { ref, seen } = useInView<HTMLDivElement>("0px");
  const step = useSequence(seen, PIPELINE.length + 1, 850);
  const done = step >= PIPELINE.length;
  const visibleLogs = Math.min(BUILD_LOG.length, Math.round((step / PIPELINE.length) * BUILD_LOG.length));

  return (
    <div ref={ref}>
      <Mock title="agentenx — acme / orders-api">
        {/* Repo header */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line px-4 py-3 sm:px-5">
          <IconGithub className="h-4 w-4 shrink-0 text-ink-2" />
          <span className="font-mono text-[12.5px] text-ink">acme/orders-api</span>
          <span className="font-mono text-[11.5px] text-ink-3">main · 8f3a92c</span>
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[11.5px] text-ink-3">
            <StatusDot tone={done ? "ok" : "accent"} pulse={!done} />
            {done ? "deployed" : "deploying"}
          </span>
        </div>

        {/* Pipeline */}
        <div className="border-b border-line px-4 py-6 sm:px-6">
          <PipelineStepper active={step} />
        </div>

        {/* Logs + resources */}
        <div className="grid gap-0 lg:grid-cols-[1.35fr_1fr]">
          <div className="min-w-0 border-b border-line p-4 sm:p-5 lg:border-b-0 lg:border-r">
            <div className="eyebrow mb-3">Build log</div>
            <pre className="min-h-[168px] overflow-x-auto font-mono text-[12px] leading-[1.85] text-ink-2">
{BUILD_LOG.slice(0, visibleLogs).map((l, i) => (
  <div key={i} className={l === "Deployment successful." ? "font-medium" : ""}
       style={l === "Deployment successful." ? { color: "var(--ok)" } : undefined}>
    {l || " "}
  </div>
))}
{!done ? <span className="animate-caret" style={{ color: "var(--accent-text)" }}>▍</span> : null}
            </pre>
          </div>

          <div className="p-4 sm:p-5">
            <div className="eyebrow mb-3">Resources</div>
            <ul className="space-y-2.5">
              <ResourceRow icon={<IconCompute className="h-4 w-4" />} name="compute" meta="2 × 512 MB" on={step >= 4} />
              <ResourceRow icon={<IconDatabase className="h-4 w-4" />} name="postgres" meta="16 · 10 GB" on={step >= 4} />
              <ResourceRow icon={<IconVolume className="h-4 w-4" />} name="volume" meta="uploads · 20 GB" on={step >= 4} />
            </ul>

            <div className="mt-4 grid grid-cols-3 gap-3 border-t border-line pt-4">
              <Metric label="CPU" value={done ? "34%" : "—"} />
              <Metric label="Memory" value={done ? "512 MB" : "—"} />
              <Metric label="Req/min" value={done ? "12.4k" : "—"} />
            </div>
          </div>
        </div>

        {/* Agent line */}
        <div
          className="flex flex-wrap items-center gap-2 border-t border-line px-4 py-3 sm:px-5"
          style={{ background: "var(--surface)" }}
        >
          <IconAgent className="h-4 w-4 shrink-0" style={{ color: "var(--accent-text)" }} />
          <span className="text-[12.5px] text-ink-2">
            {done ? "Deployment healthy. Watching for the next push." : "Provisioning what this application needs."}
          </span>
          {done ? (
            <a
              href="#start"
              className="ml-auto font-mono text-[12px] underline underline-offset-4"
              style={{ color: "var(--accent-text)" }}
            >
              orders-api.acme.agentenx.app
            </a>
          ) : null}
        </div>
      </Mock>
    </div>
  );
}

function ResourceRow({ icon, name, meta, on }: { icon: React.ReactNode; name: string; meta: string; on: boolean }) {
  return (
    <li
      className="flex items-center gap-2.5 rounded-lg border px-3 py-2 transition-all duration-500"
      style={{
        borderColor: on ? "var(--line-strong)" : "var(--line)",
        background: on ? "var(--surface)" : "transparent",
        opacity: on ? 1 : 0.45,
      }}
    >
      <span style={{ color: on ? "var(--accent-text)" : "var(--ink-3)" }}>{icon}</span>
      <span className="font-mono text-[12.5px]">{name}</span>
      <span className="ml-auto font-mono text-[11.5px] text-ink-3">{meta}</span>
    </li>
  );
}
