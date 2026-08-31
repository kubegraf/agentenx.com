/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        raised: "var(--raised)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        "ink-3": "var(--ink-3)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "accent-text": "var(--accent-text)",
        "accent-soft": "var(--accent-soft)",
        ok: "var(--ok)",
        warn: "var(--warn)",
      },
      fontFamily: {
        sans: ["Geist", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["GeistMono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      maxWidth: { shell: "1200px", prose: "68ch" },
      borderRadius: { xl: "12px", "2xl": "16px", "3xl": "22px" },
      boxShadow: {
        card: "var(--shadow-card)",
        lift: "var(--shadow-lift)",
      },
      transitionTimingFunction: { out: "cubic-bezier(.22,.61,.36,1)" },
      keyframes: {
        rise: { from: { opacity: "0", transform: "translateY(14px)" }, to: { opacity: "1", transform: "none" } },
        caret: { "0%,49%": { opacity: "1" }, "50%,100%": { opacity: "0" } },
        dash: { to: { strokeDashoffset: "0" } },
        pulseDot: { "0%,100%": { opacity: ".35" }, "50%": { opacity: "1" } },
      },
      animation: {
        rise: "rise .55s cubic-bezier(.22,.61,.36,1) both",
        caret: "caret 1.05s steps(1) infinite",
        pulseDot: "pulseDot 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
