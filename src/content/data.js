export const siteMeta = {
  name: 'Swayam Gupta',
  role: 'Backend Engineer',
}

export const hero = {
  label: 'Backend engineer · AI agents',
  headline: 'Backend engineer building AI agents — production multi-agent systems to open-source MCP tooling',
  description:
    "I ship production agent systems — a multi-agent orchestrator with ~30 tools, a custom Zep-compatible memory layer, an in-app multimodal concierge on LiveKit, and a voice telephony foundation handling 30K+ daily AI calls at ixigo. Open source: MCP OAuth Framework, AgentRelay, macOS Intelligence MCP.",
}

export const experience = [
  {
    role: 'Software Engineer 2 — AI Products',
    company: 'ixigo',
    companyUrl: 'https://www.ixigo.com',
    period: "Aug'24 — present",
    description:
      "Lead engineer on the in-app multimodal AI agent — multi-agent orchestrator on LiveKit (p50 ~800ms), ~30 tools, custom Zep-compatible memory layer, full LLM tracing via Langfuse. Architected the voice telephony foundation that now powers 30K+ AI-handled calls per day. Shipped the production MCP server (live on ChatGPT Apps) and `@ixigo/ixi-skills`, the company-wide skill package manager for Claude Code and Codex.",
  },
  {
    role: 'Founding Engineer',
    company: 'Overlayy AI',
    companyUrl: 'https://overlayy.com',
    period: "Apr'24 — Aug'24",
    description:
      'First engineer at company-zero. Solo-built the entire stack: Elixir/Phoenix microservices, Python FastAPI RAG service, AWS DevOps end-to-end, and the embeddable JS widget. Onboarded multiple paying B2B clients with real-time WebSocket messaging and a ClickHouse-backed analytics warehouse.',
  },
]

export const sections = [
  {
    id: 'projects',
    title: 'Selected Work',
    intro: 'Five projects, reverse-chronological. Named products, named stacks, real numbers.',
    items: [
      {
        slug: 'agentrelay',
        title: 'AgentRelay',
        meta: 'Open Source · A2A Protocol · v0.1.0-rc1',
        summary:
          'Peer-to-peer agent communication on the Linux Foundation A2A protocol. TypeScript relay (Hono + Postgres + Drizzle) plus an MCP server, with a four-layer trust model gating every cross-developer handoff and idempotent state-machine handoff routing.',
        stack: ['TypeScript', 'Hono', 'Postgres', 'Drizzle ORM', '@modelcontextprotocol/sdk', 'A2A protocol'],
        status: 'v0.1.0-rc1, feature-complete; demo videos and CI/CD pending v1.0',
        links: [
          { label: 'GitHub', href: 'https://github.com/swayamg20/AgentRelay' },
        ],
        content: {
          whatItIs:
            'AgentRelay solves the cross-developer handoff problem. When Bob (backend) finishes an API change, his Claude Code agent packages a structured handoff — file diffs, contract, tests, open questions — and routes it through a Postgres-backed relay to Frank (frontend). Provenance, audit trails, human approval gates. Built on the Linux Foundation A2A protocol.',
          architecture:
            'Hono on Node 20+, ESM-only, Drizzle ORM against Postgres 16. The MCP server runs over stdio transport and exposes six tools — handoff_to_teammate, check_inbox, accept_handoff, send_message, complete_handoff, list_teammates — with zod validation at every boundary. Full A2A JSON-RPC surface (message/send, tasks/get/list/update/cancel) is implemented; agent registry served from .well-known/agent-card.json. State machine moves proposed → in_progress → completed with idempotency replay; intents are tagged inform / ask_question / propose_action.',
          trustModel:
            'Layer 1: provenance wrapping — every inbound message carries a sender preamble before the receiving agent sees it. Layer 2: Claude Code + Codex permission overlay, auto-installed by `agentrelay install`. Layer 3: per-teammate rules in ~/.agentrelay/trust.yaml. Layer 4: audit log + `agentrelay block` enforcement. CLI also covers register, rotate-key, doctor, and audit; Slack webhooks fire on inbox arrival; per-agent API keys rotate with bearer auth.',
          status:
            'v0.1.0-rc1, feature-complete and runnable end-to-end: `docker compose up -d` for local Postgres, then `pnpm install` and the full handoff flow works against real Claude Code + Codex agents. Pending v1.0: demo videos, CI/CD, npm publishing, A2A TCK conformance, and a real shipped feature through a 3-person handoff chain.',
        },
      },
      {
        slug: 'murmur',
        title: 'Murmur',
        meta: 'Personal · Pre-launch · Voice AI Tutor',
        summary:
          'A voice-first AI tutor that explains by drawing. WebRTC + Deepgram STT + Kokoro TTS + Silero VAD + pipecat Smart Turn. A custom Scene Description Language compiles ~80 LLM tokens into hand-drawn SVG synced with TTS in real time.',
        stack: ['Python FastAPI', 'Next.js 14', 'WebRTC', 'Deepgram', 'Kokoro / ElevenLabs', 'Silero VAD', 'pipecat Smart Turn', 'Rough.js + GSAP'],
        status: 'Feature-complete, pre-launch — integration + hardening only',
        links: [
          { label: 'GitHub', href: 'https://github.com/swayamg20/vad-based-conv-ai' },
          { label: 'Deep dive', href: '/entry/projects/murmur' },
        ],
        content: {
          whatItIs:
            'A voice-first AI tutor that explains by drawing. A student speaks a physics or math question, the system transcribes in real time, reasons through the answer with a multi-provider LLM, and simultaneously renders hand-drawn diagrams, equations, and charts on a shared SVG canvas while speaking the explanation back. Interruption-capable, multi-turn, persistent across sessions.',
          architecture:
            'Python FastAPI + SQLModel + SQLite on the backend; Next.js 14 + React 18 + TypeScript on the frontend. Voice runs over WebRTC (aiortc) with Deepgram Nova for streaming STT, Kokoro local ONNX for TTS (ElevenLabs as fallback), and a turn-detection stack of Silero VAD v6 + pipecat-ai Smart Turn v3 — ML-aware, not silence-only. LLM routing is multi-provider with auto-fallback across OpenAI GPT-4o-mini, Gemini Flash, and Groq. Auth via Firebase + JWT.',
          sceneDescriptionLanguage:
            'The novel core. The LLM emits ~80 tokens of semantic scene description; a client-side compiler turns that into precise SVG layout. This separates *what to show* (LLM) from *how to render* (deterministic compiler), keeps the LLM cheap, and lets hand-drawn rendering (Rough.js + GSAP + KaTeX) stay synchronized with TTS playback in real time.',
          features:
            'Sentence-pipelined TTS with server-side VAD interruption. 15+ visual components. Persona-to-prompt compiler so students create their own custom tutors. Cross-session memory with topic-mastery extraction. A struggle heatmap that color-codes concept mastery from conversations. Polished design system. Tools include Tavily web search, PDF / URL ingestion, and a RestrictedPython sandbox.',
          status:
            'Pre-launch. Remaining work is integration testing and edge-case hardening, not feature gaps. Export / quiz mode is the only deferred capability.',
        },
      },
      {
        slug: 'mcp-oauth-framework',
        title: '@sg20/mcp-oauth-framework',
        meta: 'Open Source · MIT · TypeScript',
        summary:
          'TypeScript framework that turns 200+ lines of OAuth boilerplate for MCP servers into ~20 lines via a BaseMCPServer abstraction. PKCE (SHA-256), AES-256-CBC encryption, automated refresh, multi-provider patterns.',
        stack: ['TypeScript 5.3+', 'Pure ESM', 'Express', '@modelcontextprotocol/sdk', 'Node crypto'],
        status: 'v0.1.1 · MIT license · example-validated, dedicated test suite next',
        links: [
          { label: 'GitHub', href: 'https://github.com/swayamg20/mcp-framework' },
        ],
        content: {
          whatItIs:
            'Building an OAuth-backed MCP server typically means writing 200+ lines of token storage, PKCE plumbing, refresh logic, and provider-specific glue. @sg20/mcp-oauth-framework reduces that to ~20 lines: extend BaseMCPServer, hand it a provider config, register your tools, run.',
          architecture:
            'TypeScript 5.3+, pure ESM (`type: "module"`), transpiled via tsc. Thin dependencies: Express 4.18, @modelcontextprotocol/sdk 1.17, Node crypto. Modular exports via ./auth, ./base, ./shared. Types emitted to dist/index.d.ts. Node ≥18.',
          authSurface:
            'PKCE with SHA-256 (code_challenge_method: S256). AES-256-CBC token encryption with random IV per encrypt. Refresh-token grant with auto-store and expiry calculation. Machine-specific key derivation for the default encryption key. Scope validation, structured errors.',
          providers:
            'Built-in patterns for GitHub, Google, Microsoft, plus a generic custom OAuth 2.0 path for any PKCE-compatible provider. The GitHub example is fully implemented with 15+ API tools.',
          status:
            'CI runs lint, type-check, build, and export validation across Node 18 / 20 / 22. Branch protection, codeowners, dependabot. Real-world surface validated by the GitHub example — the dedicated test suite is the next step.',
        },
      },
      {
        slug: 'reel2trip',
        title: 'Reel2Trip',
        meta: 'Live in production at ixigo · Hackweek 2025 (2nd place)',
        summary:
          'FastAPI service turning Instagram Reels into structured trip itineraries — Gemini 2.0 Flash + GPT-4o + Zep memory. Cuts AI cost ~70% via MySQL `reel_cache` keyed by reel_id.',
        stack: ['Python FastAPI', 'Gemini 2.0 Flash', 'GPT-4o', 'Zep Cloud', 'MySQL', 'Redis', 'Apify', 'Instagram Graph API'],
        status: 'Live in production at ixigo; led 2nd-place team at Hackweek 2025',
        links: [],
        content: {
          whatItIs:
            'A production service inside ixigo that turns travel Reels into structured itineraries. Built for Hackweek 2025; led the team that finished 2nd out of ~500 employees. Now live in production.',
          architecture:
            'FastAPI on Python 3.13 with Uvicorn, SQLAlchemy 2.0 + PyMySQL against MySQL, Redis, websockets, pydantic. Dockerized (Python 3.13-alpine, port 3001), deployed via GitLab CI + Helm to AWS ECR.',
          ingestion:
            'Two paths the resume used to conflate: (1) reel video download via Apify scraper through ApifyClient — Instagram Graph API does not expose reel video data; (2) DM webhook ingestion via Hookdeck + Instagram Graph API at `/v1/instagram/webhook`.',
          aiPipeline:
            'Gemini 2.0 Flash takes the video → base64 → Vision API and emits structured JSON (title, day-by-day itinerary, destination, route codes like DEL-BLR). GPT-4o handles main chat; GPT-4o-mini does quick caption fact extraction; async filler messages stream every 3 seconds during long Gemini calls. The ~70% cost reduction comes from a MySQL `reel_cache` table keyed by reel_id with hash-based dedup. Memory is Zep Cloud capped at 10 messages per session.',
          status:
            'In production, serving ixigo users today.',
        },
      },
      {
        slug: 'macos-intelligence-mcp',
        title: 'macOS Intelligence MCP',
        meta: 'Open Source · Multi-server MCP · Medium article',
        summary:
          'Multi-server MCP framework turning macOS into an AI-controllable desktop. Five specialized servers — screen, system, power, usage, shortcuts — with natural-language → Apple Automator workflow generation.',
        stack: ['Node 18+', '@modelcontextprotocol/sdk', 'AppleScript', 'PyObjC + Apple Vision OCR', 'RobotJS', 'SQLite'],
        status: 'Open source on GitHub; published Medium article; active commits',
        links: [
          { label: 'GitHub', href: 'https://github.com/swayamg20/mac-os-automation-mcp' },
          { label: 'Medium article', href: 'https://swayamgupta20.medium.com' },
        ],
        content: {
          whatItIs:
            'A multi-server MCP framework that turns macOS into an AI-controllable desktop. Five specialized servers all launched together with auto-restart by `launcher.js`, designed for Claude Desktop integration.',
          servers:
            'mcp-screen (~550 LOC) — full / region / window capture, native Apple Vision OCR, active-window detection, UI element analysis. mcp-system — click / move / type at coordinates, keyboard shortcuts, app launch / quit, AppleScript execution, notifications, volume. mcp-power — battery health, thermal, optimize-for-battery / performance, sleep prevention, per-app energy impact. mcp-usage (~997 LOC, the most complex) — sessions with auto-screenshot OCR, CPU / memory / disk thresholds, WiFi monitoring, intelligent disk cleanup, behavioral pattern correlation.',
          shortcutsServer:
            'mcp-shortcuts (~718 LOC) is the novel piece: natural-language → Apple Automator workflow generation with pattern recognition. Tell it "screenshot, OCR, send WhatsApp" and you get a working shortcut with a Siri trigger.',
          status:
            'Active project — README and a published Medium article on swayamgupta20.medium.com walk through the architecture; STATUS.md tracks per-server completion. Pending: mcp-context (memory module) and mcp-files (advanced file ops).',
        },
      },
    ],
  },
]

export const contactInfo = [
  {
    label: 'Email',
    value: 'gupta.swayam123@gmail.com',
    href: 'mailto:gupta.swayam123@gmail.com',
  },
  {
    label: 'GitHub',
    value: 'github.com/swayamg20',
    href: 'https://github.com/swayamg20',
  },
  {
    label: 'X',
    value: 'x.com/swayamg20',
    href: 'https://x.com/swayamg20',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/swayamgupta20',
    href: 'https://linkedin.com/in/swayamgupta20',
  },
]

const sectionMap = Object.fromEntries(sections.map((section) => [section.id, section]))

export function getSectionById(sectionId) {
  return sectionMap[sectionId] ?? null
}

export function findSectionItemBySlug(sectionId, slug) {
  const section = getSectionById(sectionId)
  return section?.items.find((item) => item.slug === slug) ?? null
}
