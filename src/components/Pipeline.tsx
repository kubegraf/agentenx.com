import { PIPELINE } from "../content/site";
import { StatusDot } from "./ui/Primitives";
import { IconCheck } from "./Icons";

/* The seven-stage pipeline, shared by the hero and by "How it works".
   `active` is the index currently running: everything before it is done,
   everything after is pending. One component means the two places on the page
   that show this flow can never disagree about what the product does. */

export function PipelineStepper({ active, dense = false }: { active: number; dense?: boolean }) {
  return (
    <ol className={`flex flex-col gap-0 md:flex-row md:items-start ${dense ? "" : "md:gap-1"}`}>
      {PIPELINE.map((s, i) => {
        const done = i < active;
        const now = i === active;
        const state = done ? "done" : now ? "now" : "todo";
        return (
          <li key={s.key} className="relative flex flex-1 gap-3 md:block">
            {/* Connector. Vertical on mobile, horizontal from md up. */}
            <div className="flex flex-col items-center md:hidden" aria-hidden="true">
              <Node state={state} />
              {i < PIPELINE.length - 1 ? (
                <span
                  className="w-px flex-1 transition-colors duration-500"
                  style={{ background: done ? "var(--accent)" : "var(--line)" }}
                />
              ) : null}
            </div>

            <div className="mb-5 md:mb-0 md:w-full">
              <div className="hidden items-center md:flex" aria-hidden="true">
                <Node state={state} />
                {i < PIPELINE.length - 1 ? (
                  <span
                    className="ml-1.5 h-px flex-1 transition-colors duration-500"
                    style={{ background: done ? "var(--accent)" : "var(--line)" }}
                  />
                ) : null}
              </div>

              <div className="md:mt-3">
                <div
                  className="text-[13px] font-medium transition-colors duration-300"
                  style={{ color: state === "todo" ? "var(--ink-3)" : "var(--ink)" }}
                >
                  {s.label}
                </div>
                <div className="mt-0.5 font-mono text-[11px] leading-snug text-ink-3">
                  {state === "todo" ? "waiting" : s.detail}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function Node({ state }: { state: "done" | "now" | "todo" }) {
  if (state === "done") {
    return (
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
        style={{ background: "var(--accent)" }}
      >
        <IconCheck className="h-3 w-3" strokeWidth={2.5} />
      </span>
    );
  }
  if (state === "now") {
    return (
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
        style={{ background: "var(--accent-soft)", boxShadow: "0 0 0 1px var(--accent)" }}
      >
        <StatusDot tone="accent" pulse />
      </span>
    );
  }
  return (
    <span
      className="h-5 w-5 shrink-0 rounded-full border"
      style={{ borderColor: "var(--line-strong)", background: "var(--bg)" }}
    />
  );
}
