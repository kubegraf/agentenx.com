/* Every repeated string on the page. Headings stay next to their section; the
   arrays live here so a wording change is one edit, not a hunt.

   HONESTY RULE for anything added to this file: no customers, no user counts,
   no revenue, no uptime figures, no certifications, no compliance claims, no
   benchmarks, no funding, no testimonials, and no prices, unless the real thing
   exists and someone has checked it. AgentenX has not launched. An invented
   number on an infrastructure site is a promise the product has to keep. */

export const BRAND = {
  name: "AgentenX",
  domain: "agentenx.com",
  tagline: "Your infrastructure, run by agents.",
  description:
    "AgentenX is an AI-native infrastructure platform for deploying and running modern applications without managing the underlying infrastructure.",
  legal: "AgentenX is operated by Orkastor Limited.",
  contact: "hello@agentenx.com",
};

export const NAV = [
  { label: "Platform", href: "#platform" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Infrastructure", href: "#infrastructure" },
  { label: "AI", href: "#ai" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#developers" },
];

/* The pipeline shown in the hero and again, in full, in "How it works".
   Same seven stages both times: two different diagrams of the same product
   would leave a developer unsure which one is real. */
export const PIPELINE = [
  { key: "git", label: "GitHub", detail: "push to main" },
  { key: "detect", label: "Detect", detail: "runtime identified" },
  { key: "build", label: "Build", detail: "dependencies resolved" },
  { key: "image", label: "Container", detail: "image pushed to registry" },
  { key: "provision", label: "Infrastructure", detail: "compute, storage, database" },
  { key: "deploy", label: "Deploy", detail: "rollout started" },
  { key: "live", label: "Live", detail: "health checks passed" },
] as const;

export const PLATFORM_CARDS = [
  { icon: "compute", title: "Compute", body: "Run containerised workloads on managed compute. Set CPU and memory per service." },
  { icon: "registry", title: "Container registry", body: "Images are built and stored in the platform registry. No external registry to wire up." },
  { icon: "volume", title: "Persistent volumes", body: "Attach durable disks to a service so state survives a redeploy." },
  { icon: "storage", title: "Object storage", body: "S3-compatible storage for assets, uploads and build artefacts." },
  { icon: "database", title: "PostgreSQL", body: "Provision a managed Postgres database and connect it to your services." },
  { icon: "network", title: "Networking", body: "Expose a service publicly, or keep it internal and reachable only inside your project." },
  { icon: "environments", title: "Environments", body: "Separate development, staging and production, each with its own configuration." },
  { icon: "deploy", title: "Deployments", body: "Every push to a connected branch builds and deploys, with history you can roll back to." },
] as const;

export const RUNTIMES = ["Node.js", "Python", "Go", "Java", "Ruby", "PHP"] as const;

/* Terminal scripts. Written as data so the typing animation and the
   reduced-motion static rendering read from exactly one source. */
export const DEPLOY_SCRIPT = {
  command: "agentenx deploy",
  lines: [
    { label: "Repository detected", detail: "github.com/acme/orders-api" },
    { label: "Application identified", detail: "Node.js 22 · pnpm" },
    { label: "Dockerfile generated", detail: "no Dockerfile in repository" },
    { label: "Image built", detail: "orders-api:8f3a92c · 142 MB" },
    { label: "Infrastructure ready", detail: "compute · postgres · volume" },
    { label: "Deployment successful", detail: "3 replicas healthy" },
  ],
  final: "https://orders-api.acme.agentenx.app",
};

export const CLI_COMMANDS = [
  { cmd: "agentenx deploy", desc: "Build and deploy the current project." },
  { cmd: "agentenx logs --follow", desc: "Stream logs from a running service." },
  { cmd: "agentenx env set DATABASE_URL=…", desc: "Read and write environment variables." },
  { cmd: "agentenx status", desc: "Show services, health and the current release." },
] as const;

export const BUILD_LOG = [
  "Cloning repository…",
  "Detecting application…",
  "Dockerfile found.",
  "Building image…",
  "Pushing image to registry…",
  "Provisioning compute…",
  "Starting container…",
  "Health check passed.",
  "",
  "Deployment successful.",
] as const;

export const USE_CASES = [
  { title: "Startups", body: "Ship a product without hiring an infrastructure team first." },
  { title: "Indie developers", body: "Run a real production application without becoming an operator." },
  { title: "Engineering teams", body: "Give every service the same shape, so onboarding is one command." },
  { title: "AI applications", body: "Run the API, the workers, the queue and the database side by side." },
  { title: "Internal platforms", body: "Offer developers a shorter path to production than a ticket." },
] as const;

export const RELIABILITY = [
  { icon: "shield", title: "Isolated workloads", body: "Each service runs in its own container with its own resource limits." },
  { icon: "volume", title: "Durable storage", body: "Volumes and object storage persist across deploys and restarts." },
  { icon: "network", title: "Controlled exposure", body: "A service is internal until you publish it. Public is a decision, not a default." },
  { icon: "logs", title: "Deployment history", body: "Every release is recorded with its commit, so you can see what changed and roll back." },
  { icon: "terminal", title: "Logs", body: "Build and runtime logs for every service, streamed live or read after the fact." },
  { icon: "environments", title: "Environment separation", body: "Configuration and data stay inside the environment they belong to." },
  { icon: "gauge", title: "Resource controls", body: "Set CPU and memory per service and change them without a rebuild." },
  { icon: "database", title: "Usage visibility", body: "See what each service is consuming, per environment." },
] as const;

type Tier = {
  name: string;
  for: string;
  points: readonly string[];
  /** Optional, so the two plainer tiers don't need to carry `featured: false`. */
  featured?: boolean;
};

export const PRICING_TIERS: readonly Tier[] = [
  {
    name: "Developer",
    for: "For individuals building and shipping applications.",
    points: ["One project", "Public and internal services", "Managed Postgres", "Deploy from Git"],
  },
  {
    name: "Team",
    for: "For teams running multiple services and environments.",
    points: ["Multiple projects", "Separate environments", "Shared access", "Deployment history"],
    featured: true,
  },
  {
    name: "Scale",
    for: "For production workloads with heavier requirements.",
    points: ["Higher resource limits", "Larger volumes", "Priority support", "Custom requirements"],
  },
];

export const FOOTER = {
  Product: ["Platform", "Deployments", "Compute", "Storage", "Databases", "AI"],
  Developers: ["Docs", "CLI", "API", "MCP", "Changelog", "Status"],
  Company: ["About", "Careers", "Contact"],
  Legal: ["Privacy", "Terms", "Security"],
} as const;
