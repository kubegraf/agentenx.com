/* One icon set, drawn on one 24x24 grid with one stroke weight.
   Hand-drawn rather than pulled from a library: mixing icon packs is the
   fastest way to make a page look assembled instead of designed, and this
   keeps the dependency count at zero. */
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

function I({ children, ...p }: P & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...p}
    >
      {children}
    </svg>
  );
}

export const IconCompute = (p: P) => (
  <I {...p}>
    <rect x="3.5" y="6" width="17" height="5" rx="1.5" />
    <rect x="3.5" y="13" width="17" height="5" rx="1.5" />
    <path d="M7 8.5h.01M7 15.5h.01" />
  </I>
);

export const IconRegistry = (p: P) => (
  <I {...p}>
    <path d="M12 3.2 20 7v10l-8 3.8L4 17V7l8-3.8Z" />
    <path d="M4 7l8 3.8L20 7M12 10.8V20.8" />
  </I>
);

export const IconVolume = (p: P) => (
  <I {...p}>
    <ellipse cx="12" cy="6.5" rx="7.5" ry="3" />
    <path d="M4.5 6.5v11c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-11" />
    <path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
  </I>
);

export const IconStorage = (p: P) => (
  <I {...p}>
    <path d="M4 8.5 12 4l8 4.5-8 4.5-8-4.5Z" />
    <path d="M4 12.5 12 17l8-4.5M4 16.5 12 21l8-4.5" />
  </I>
);

export const IconDatabase = (p: P) => (
  <I {...p}>
    <ellipse cx="12" cy="6" rx="7" ry="2.8" />
    <path d="M5 6v12c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8V6" />
    <path d="M5 12c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8" />
  </I>
);

export const IconNetwork = (p: P) => (
  <I {...p}>
    <circle cx="12" cy="5" r="2.2" />
    <circle cx="5.5" cy="18.5" r="2.2" />
    <circle cx="18.5" cy="18.5" r="2.2" />
    <path d="M12 7.2v4.3M10.6 12.6 7 16.7M13.4 12.6 17 16.7" />
  </I>
);

export const IconEnvironments = (p: P) => (
  <I {...p}>
    <rect x="3.5" y="4.5" width="8" height="6" rx="1.5" />
    <rect x="12.5" y="4.5" width="8" height="6" rx="1.5" />
    <rect x="3.5" y="13.5" width="8" height="6" rx="1.5" />
    <rect x="12.5" y="13.5" width="8" height="6" rx="1.5" />
  </I>
);

export const IconDeploy = (p: P) => (
  <I {...p}>
    <circle cx="6.5" cy="6" r="2.2" />
    <circle cx="6.5" cy="18" r="2.2" />
    <circle cx="17.5" cy="12" r="2.2" />
    <path d="M6.5 8.2v7.6M8.7 6.6c4 0 6.6 1.8 6.8 5.1M15.4 13.2c-1.1 2.6-3.6 4.1-6.8 4.1" />
  </I>
);

export const IconAgent = (p: P) => (
  <I {...p}>
    <path d="M12 3.2 13.9 8 18.8 9.9 13.9 11.8 12 16.6 10.1 11.8 5.2 9.9 10.1 8Z" />
    <path d="M18 16.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8Z" />
  </I>
);

export const IconTerminal = (p: P) => (
  <I {...p}>
    <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
    <path d="M7.5 9.5 10.5 12l-3 2.5M12.5 15h4" />
  </I>
);

export const IconGit = (p: P) => (
  <I {...p}>
    <circle cx="12" cy="5.5" r="2.3" />
    <circle cx="12" cy="18.5" r="2.3" />
    <path d="M12 7.8v8.4" />
    <path d="M12 12h4.2a2 2 0 0 0 2-2V8.4" />
    <circle cx="18.2" cy="6.4" r="1.6" />
  </I>
);

export const IconShield = (p: P) => (
  <I {...p}>
    <path d="M12 3.2 19 6v6c0 4-2.9 7.1-7 8.8-4.1-1.7-7-4.8-7-8.8V6l7-2.8Z" />
    <path d="m9 12 2.2 2.2L15.4 10" />
  </I>
);

export const IconLogs = (p: P) => (
  <I {...p}>
    <rect x="3.5" y="4" width="17" height="16" rx="2.5" />
    <path d="M7.5 9h9M7.5 12.5h9M7.5 16h5" />
  </I>
);

export const IconGauge = (p: P) => (
  <I {...p}>
    <path d="M4 17a8 8 0 1 1 16 0" />
    <path d="M12 17l3.6-4.6" />
    <circle cx="12" cy="17" r="1.1" fill="currentColor" stroke="none" />
  </I>
);

export const IconCheck = (p: P) => (
  <I {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </I>
);

export const IconArrowRight = (p: P) => (
  <I {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </I>
);

export const IconArrowDown = (p: P) => (
  <I {...p}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </I>
);

export const IconMenu = (p: P) => (
  <I {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </I>
);

export const IconClose = (p: P) => (
  <I {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </I>
);

export const IconSun = (p: P) => (
  <I {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.8v2.1M12 19.1v2.1M4.6 4.6l1.5 1.5M17.9 17.9l1.5 1.5M2.8 12h2.1M19.1 12h2.1M4.6 19.4l1.5-1.5M17.9 6.1l1.5-1.5" />
  </I>
);

export const IconMoon = (p: P) => (
  <I {...p}>
    <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4 8.4 8.4 0 1 0 20 14.2Z" />
  </I>
);

export const IconGithub = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M12 1.8a10.2 10.2 0 0 0-3.2 19.9c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10.2 10.2 0 0 0 12 1.8Z" />
  </svg>
);

export const IconX = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M17.2 3h3.3l-7.2 8.2L21.8 21h-6.6l-5.2-6.7L4.1 21H.8l7.7-8.8L.5 3h6.8l4.7 6.2L17.2 3Zm-1.2 16h1.8L7.9 4.8H6L16 19Z" />
  </svg>
);

export const IconLinkedIn = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M4.8 3.5a2.3 2.3 0 1 0 0 4.6 2.3 2.3 0 0 0 0-4.6ZM2.9 9.8h3.8V21H2.9V9.8Zm6.2 0h3.6v1.5h.1c.5-.9 1.7-1.9 3.5-1.9 3.7 0 4.4 2.4 4.4 5.6V21h-3.8v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.4-2 2.8V21H9.1V9.8Z" />
  </svg>
);
