import { useEffect, useRef, useState } from "react";

/** True once the element has been scrolled into view. Latches on, so a section
 *  does not re-animate every time it passes the viewport edge. */
export function useInView<T extends HTMLElement>(rootMargin = "-12% 0px -12% 0px") {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) { setSeen(true); io.disconnect(); }
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen, rootMargin]);

  return { ref, seen };
}

export function prefersReducedMotion() {
  return typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Steps 0..steps-1 once `active` is true, then holds on the last step.
 *
 *  Under prefers-reduced-motion it jumps straight to the final step rather than
 *  animating quickly — a sped-up animation is still an animation. The end state
 *  is the informative one, so that is what gets shown. */
export function useSequence(active: boolean, steps: number, intervalMs = 900) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion()) { setI(steps - 1); return; }
    setI(0);
    let n = 0;
    const t = setInterval(() => {
      n += 1;
      if (n >= steps - 1) clearInterval(t);
      setI(Math.min(n, steps - 1));
    }, intervalMs);
    return () => clearInterval(t);
  }, [active, steps, intervalMs]);

  return i;
}

type Theme = "light" | "dark";

/** Theme with three states on disk: "light", "dark", or absent meaning follow
 *  the system. Kept deliberately small — a dependency for one class on <html>
 *  is not worth the bytes. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("agentenx-theme") as Theme | null;
    setTheme(stored);
  }, []);

  const resolved: Theme =
    theme ??
    (typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  function toggle() {
    const next: Theme = resolved === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("agentenx-theme", next);
    document.documentElement.dataset.theme = next;
  }

  return { resolved, toggle };
}
