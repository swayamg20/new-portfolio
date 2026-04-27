// Inline-SVG visuals for project deep-dive pages.
// Each one demonstrates the project mechanic, not decoration.
// Uses theme tokens: --bg, --ink, --ink-soft, --accent, --hairline.

const INK = '#EDE6DA'
const INK_SOFT = 'rgba(237, 230, 218, 0.74)'
const INK_FAINT = 'rgba(237, 230, 218, 0.5)'
const ACCENT = '#FF7A45'
const HAIRLINE = 'rgba(237, 230, 218, 0.22)'

function Box({ x, y, w, h, label, sublabel, accent }) {
  const stroke = accent ? ACCENT : HAIRLINE
  const fill = accent ? 'rgba(255, 122, 69, 0.06)' : 'rgba(237, 230, 218, 0.03)'
  const lineH = sublabel ? 12 : 0
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={6} ry={6} fill={fill} stroke={stroke} strokeWidth="1" />
      <text x={x + w / 2} y={y + h / 2 + (sublabel ? -2 : 4)} fill={INK} fontSize="11" fontFamily="DM Sans, sans-serif" textAnchor="middle">
        {label}
      </text>
      {sublabel ? (
        <text x={x + w / 2} y={y + h / 2 + 12} fill={INK_FAINT} fontSize="9" fontFamily="DM Sans, sans-serif" textAnchor="middle">
          {sublabel}
        </text>
      ) : (lineH ? null : null)}
    </g>
  )
}

function Arrow({ x1, y1, x2, y2, label, dashed = false }) {
  const headSize = 5
  const angle = Math.atan2(y2 - y1, x2 - x1)
  const ax = x2 - headSize * Math.cos(angle - Math.PI / 7)
  const ay = y2 - headSize * Math.sin(angle - Math.PI / 7)
  const bx = x2 - headSize * Math.cos(angle + Math.PI / 7)
  const by = y2 - headSize * Math.sin(angle + Math.PI / 7)
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK_FAINT} strokeWidth="1" strokeDasharray={dashed ? '3 3' : undefined} />
      <polygon points={`${x2},${y2} ${ax},${ay} ${bx},${by}`} fill={INK_FAINT} />
      {label ? (
        <text x={mx} y={my - 5} fill={INK_SOFT} fontSize="9" fontFamily="DM Sans, sans-serif" textAnchor="middle">
          {label}
        </text>
      ) : null}
    </g>
  )
}

/* ─── 1. AgentRelay — handoff state machine ─── */
export function AgentRelayVisual() {
  return (
    <figure className="project-visual">
      <svg viewBox="0 0 600 180" role="img" aria-label="AgentRelay handoff flow" preserveAspectRatio="xMidYMid meet">
        <Box x={20} y={70} w={120} h={48} label="Bob's agent" sublabel="backend" />
        <Box x={230} y={70} w={140} h={48} label="Postgres relay" sublabel="provenance + audit" accent />
        <Box x={460} y={70} w={120} h={48} label="Frank's agent" sublabel="frontend" />

        <Arrow x1={140} y1={86} x2={230} y2={86} label="handoff_to_teammate" />
        <Arrow x1={370} y1={86} x2={460} y2={86} label="check_inbox" />
        <Arrow x1={460} y1={102} x2={370} y2={102} label="accept_handoff" dashed />

        <text x={300} y={150} fill={INK_SOFT} fontSize="10" fontFamily="DM Sans, sans-serif" textAnchor="middle">
          state: proposed → in_progress → completed · idempotent · audit-logged
        </text>
      </svg>
      <figcaption className="project-visual-caption mono">A2A handoff over Postgres-backed relay</figcaption>
    </figure>
  )
}

/* ─── 2. Murmur — Scene Description Language preview ─── */
export function MurmurVisual() {
  // Hand-drawn-ish parabola: deliberate slight irregularity in the path
  const parabolaPath = 'M 30 70 Q 70 -10 110 60 T 170 70'
  return (
    <figure className="project-visual">
      <svg viewBox="0 0 600 200" role="img" aria-label="Murmur Scene Description Language to hand-drawn render" preserveAspectRatio="xMidYMid meet">
        {/* Left: prompt + SDL */}
        <text x={20} y={28} fill={INK_FAINT} fontSize="9" fontFamily="DM Sans, sans-serif" letterSpacing="1">STUDENT</text>
        <text x={20} y={48} fill={INK} fontSize="13" fontFamily="Newsreader, serif" fontStyle="italic">
          "Explain projectile motion."
        </text>

        <text x={20} y={78} fill={INK_FAINT} fontSize="9" fontFamily="DM Sans, sans-serif" letterSpacing="1">LLM EMITS (SDL, ~80 tokens)</text>
        <g fontFamily="JetBrains Mono, monospace" fontSize="11" fill={INK_SOFT}>
          <text x={20} y={98}>draw_axes(t_max=2s, h_max=20m)</text>
          <text x={20} y={114}>plot_parabola(launch=(0,0), peak=(1,18), land=(2,0))</text>
          <text x={20} y={130}>label_points("launch", "peak", "landing")</text>
          <text x={20} y={146}>annotate("g = 9.8 m/s²", arrow=down)</text>
        </g>

        {/* Right: rendered hand-drawn output */}
        <g transform="translate(380, 30)">
          <rect x={0} y={0} width={200} height={150} rx={6} fill="rgba(237, 230, 218, 0.03)" stroke={HAIRLINE} strokeWidth="1" />
          {/* axes */}
          <line x1={20} y1={130} x2={180} y2={130} stroke={INK_SOFT} strokeWidth="1" strokeLinecap="round" />
          <line x1={20} y1={130} x2={20} y2={20} stroke={INK_SOFT} strokeWidth="1" strokeLinecap="round" />
          {/* parabola — orange accent */}
          <path d={parabolaPath} transform="translate(20, 70)" fill="none" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* points */}
          <circle cx={50} cy={130} r={2.5} fill={ACCENT} />
          <circle cx={100} cy={64} r={2.5} fill={ACCENT} />
          <circle cx={150} cy={130} r={2.5} fill={ACCENT} />
          {/* labels */}
          <text x={50} y={144} fill={INK_FAINT} fontSize="8" fontFamily="DM Sans, sans-serif" textAnchor="middle">launch</text>
          <text x={100} y={56} fill={INK_FAINT} fontSize="8" fontFamily="DM Sans, sans-serif" textAnchor="middle">peak</text>
          <text x={150} y={144} fill={INK_FAINT} fontSize="8" fontFamily="DM Sans, sans-serif" textAnchor="middle">landing</text>
        </g>

        {/* arrow connecting the two sides */}
        <Arrow x1={350} y1={100} x2={376} y2={100} />
      </svg>
      <figcaption className="project-visual-caption mono">SDL → hand-drawn render (synced with TTS in real time)</figcaption>
    </figure>
  )
}

/* ─── 3. MCP OAuth Framework — before / after ─── */
export function McpOAuthVisual() {
  return (
    <figure className="project-visual">
      <div className="oauth-compare">
        <div className="oauth-col oauth-before">
          <p className="mono oauth-label">BEFORE — ~200 LINES</p>
          <pre className="oauth-code">{`// PKCE setup
const codeVerifier = generateCodeVerifier()
const codeChallenge = await sha256(codeVerifier)

// Authorize URL builder
function buildAuthUrl(provider, scopes) {
  const url = new URL(provider.authEndpoint)
  url.searchParams.set('client_id', ...)
  url.searchParams.set('redirect_uri', ...)
  url.searchParams.set('code_challenge', codeChallenge)
  url.searchParams.set('code_challenge_method', 'S256')
  // ... 30 more lines
}

// Token storage (encrypted)
function encryptToken(token) {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-cbc', ...)
  // ... another 40 lines
}

// Refresh logic, scope validation,
// callback handler, tool registration ...
// (≈140 more lines)`}</pre>
        </div>
        <div className="oauth-arrow" aria-hidden="true">→</div>
        <div className="oauth-col oauth-after">
          <p className="mono oauth-label oauth-label-accent">AFTER — ~20 LINES</p>
          <pre className="oauth-code oauth-code-accent">{`import { BaseMCPServer } from '@sg20/mcp-oauth-framework'

class GitHubMCP extends BaseMCPServer {
  provider = 'github'
  scopes  = ['repo', 'read:user']

  tools = {
    list_repos: async () =>
      this.fetch('/user/repos'),
    create_issue: async ({ repo, title, body }) =>
      this.fetch(\`/repos/\${repo}/issues\`,
                 { method: 'POST', body }),
  }
}

new GitHubMCP().run()`}</pre>
        </div>
      </div>
      <figcaption className="project-visual-caption mono">PKCE · AES-256 · refresh · multi-provider — handled</figcaption>
    </figure>
  )
}

/* ─── 4. Reel2Trip — 3-step pipeline ─── */
export function Reel2TripVisual() {
  return (
    <figure className="project-visual">
      <svg viewBox="0 0 600 180" role="img" aria-label="Reel2Trip pipeline" preserveAspectRatio="xMidYMid meet">
        {/* Stage 1: Reel */}
        <g>
          <rect x={20} y={50} width={120} height={80} rx={10} fill="rgba(237, 230, 218, 0.03)" stroke={HAIRLINE} strokeWidth="1" />
          <rect x={36} y={64} width={88} height={52} rx={4} fill="rgba(237, 230, 218, 0.04)" stroke={HAIRLINE} strokeWidth="1" />
          <polygon points="72,80 72,104 92,92" fill={INK_SOFT} />
          <text x={80} y={144} fill={INK} fontSize="11" fontFamily="DM Sans, sans-serif" textAnchor="middle">Instagram Reel</text>
          <text x={80} y={158} fill={INK_FAINT} fontSize="9" fontFamily="DM Sans, sans-serif" textAnchor="middle">via Apify scraper</text>
        </g>

        <Arrow x1={150} y1={90} x2={210} y2={90} />

        {/* Stage 2: AI box */}
        <g>
          <rect x={220} y={50} width={160} height={80} rx={10} fill="rgba(255, 122, 69, 0.06)" stroke={ACCENT} strokeWidth="1" />
          <text x={300} y={82} fill={INK} fontSize="12" fontFamily="DM Sans, sans-serif" textAnchor="middle" fontWeight="500">Gemini 2.0 Flash</text>
          <text x={300} y={98} fill={INK_FAINT} fontSize="9" fontFamily="DM Sans, sans-serif" textAnchor="middle">vision API → JSON</text>
          <text x={300} y={144} fill={INK_FAINT} fontSize="9" fontFamily="DM Sans, sans-serif" textAnchor="middle">+ GPT-4o chat · Zep memory</text>
        </g>

        <Arrow x1={390} y1={90} x2={450} y2={90} />

        {/* Stage 3: Itinerary */}
        <g>
          <rect x={460} y={50} width={120} height={80} rx={10} fill="rgba(237, 230, 218, 0.03)" stroke={HAIRLINE} strokeWidth="1" />
          <line x1={478} y1={66} x2={562} y2={66} stroke={INK_FAINT} strokeWidth="1" />
          <line x1={478} y1={78} x2={550} y2={78} stroke={INK_FAINT} strokeWidth="1" />
          <line x1={478} y1={90} x2={562} y2={90} stroke={INK_FAINT} strokeWidth="1" />
          <line x1={478} y1={102} x2={544} y2={102} stroke={INK_FAINT} strokeWidth="1" />
          <line x1={478} y1={114} x2={562} y2={114} stroke={INK_FAINT} strokeWidth="1" />
          <text x={520} y={144} fill={INK} fontSize="11" fontFamily="DM Sans, sans-serif" textAnchor="middle">Itinerary</text>
          <text x={520} y={158} fill={INK_FAINT} fontSize="9" fontFamily="DM Sans, sans-serif" textAnchor="middle">day-by-day, routes</text>
        </g>

        <text x={300} y={20} fill={INK_FAINT} fontSize="9" fontFamily="DM Sans, sans-serif" textAnchor="middle" letterSpacing="1">
          ~70% AI COST REDUCTION VIA MYSQL `REEL_CACHE` BY REEL_ID
        </text>
      </svg>
      <figcaption className="project-visual-caption mono">Production pipeline at ixigo · Hackweek 2025</figcaption>
    </figure>
  )
}

/* ─── 5. macOS Intelligence MCP — natural-language → workflow ─── */
export function MacOsMcpVisual() {
  return (
    <figure className="project-visual">
      <svg viewBox="0 0 600 200" role="img" aria-label="macOS Intelligence MCP workflow generation" preserveAspectRatio="xMidYMid meet">
        {/* Prompt at top */}
        <text x={20} y={22} fill={INK_FAINT} fontSize="9" fontFamily="DM Sans, sans-serif" letterSpacing="1">PROMPT (CLAUDE DESKTOP)</text>
        <text x={20} y={42} fill={INK} fontSize="13" fontFamily="Newsreader, serif" fontStyle="italic">
          "screenshot, OCR the text, send it to my WhatsApp"
        </text>

        {/* Arrow down */}
        <Arrow x1={300} y1={56} x2={300} y2={82} />

        {/* Three workflow boxes */}
        <Box x={40} y={90} w={130} h={60} label="mcp-screen" sublabel="capture + Vision OCR" />
        <Arrow x1={170} y1={120} x2={235} y2={120} />
        <Box x={235} y={90} w={130} h={60} label="mcp-shortcuts" sublabel="Automator workflow" accent />
        <Arrow x1={365} y1={120} x2={430} y2={120} />
        <Box x={430} y={90} w={130} h={60} label="mcp-system" sublabel="WhatsApp open + paste" />

        {/* Bottom result */}
        <text x={300} y={180} fill={INK_SOFT} fontSize="11" fontFamily="DM Sans, sans-serif" textAnchor="middle">
          → Siri shortcut registered: "Send screenshot text"
        </text>
      </svg>
      <figcaption className="project-visual-caption mono">Five MCP servers · pattern-recognized chains</figcaption>
    </figure>
  )
}

/* ─── Slug → Visual mapping ─── */
export function ProjectVisualBySlug({ slug }) {
  switch (slug) {
    case 'agentrelay':
      return <AgentRelayVisual />
    case 'murmur':
      return <MurmurVisual />
    case 'mcp-oauth-framework':
      return <McpOAuthVisual />
    case 'reel2trip':
      return <Reel2TripVisual />
    case 'macos-intelligence-mcp':
      return <MacOsMcpVisual />
    default:
      return null
  }
}
