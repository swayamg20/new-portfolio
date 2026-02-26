export const siteMeta = {
  name: 'Swayam Gupta',
  role: 'Engineer',
}

export const hero = {
  label: 'Portfolio',
  headline: 'Engineer.',
  description:
    'Currently working on production voice AI at ixigo. I also build applied LLM products, automation tooling, and performance-focused web systems.',
}

export const sections = [
  {
    id: 'projects',
    title: 'Projects',
    intro: 'Selected shipped work across AI products and platform engineering.',
    items: [
      {
        slug: 'voice-ai-realtime-assistant',
        title: 'Voice AI - Real-time Voice Assistant',
        meta: 'Production / Voice AI / Realtime',
        summary:
          'Production conversational voice platform with interruption handling and low-latency streaming.',
        content: [
          'Built STT + VAD + LLM + TTS orchestration over WebRTC with robust turn control.',
          'Scaled to 30K+ daily calls with sub-500ms latency and lower operating costs.',
        ],
      },
      {
        slug: 'reel2trip-ixigo',
        title: "Reel2Trip (ixigo Hackweek '25)",
        meta: 'Applied AI Product',
        summary:
          'Converts travel reels into ready-to-use itineraries through social and chat flows.',
        content: [
          'Shipped a full ingestion-to-itinerary pipeline fast during hackweek.',
          'Moved users from inspiration to planning with lower manual effort.',
        ],
      },
      {
        slug: 'macos-intelligence-mcp-framework',
        title: 'macOS Intelligence MCP Framework',
        meta: 'Automation / Tooling / Open Source',
        summary:
          'Local-first automation framework with multiple MCP servers for OCR, system control, shortcuts, and usage analytics.',
        content: [
          'Built modular services for desktop automation and natural-language system actions.',
          'Designed privacy-first workflows with local data boundaries and practical developer ergonomics.',
        ],
      },
    ],
  },
]

export const about = {
  tagline: 'Engineer / IIT Kanpur 2024',
  bio: 'I build useful systems quickly, then harden them for production. My work sits at the intersection of product thinking, applied AI, and systems engineering. I enjoy teams where ownership is high and iteration cycles are fast.',
  currentRole: 'SWE II @ ixigo',
  currentFocus:
    'Shipping production voice AI systems with a focus on latency, reliability, and user experience.',
}

export const experience = [
  {
    role: 'SWE II — Voice AI',
    company: 'ixigo',
    period: 'Jul 2024 — Present',
    description:
      'Built and scaled the production voice AI platform — STT/LLM/TTS orchestration, tool calling, real-time interruption handling. 30K+ daily calls at sub-500ms latency.',
  },
  {
    role: 'SDE Intern — Platform',
    company: 'ixigo',
    period: 'Jan 2024 — Jun 2024',
    description:
      'Built the multi-target JavaScript SDK for web, React Native, and Node. Worked on animation performance, IndexedDB caching, and frontend infrastructure.',
  },
  {
    role: 'B.Tech — Electrical Engineering',
    company: 'IIT Kanpur',
    period: '2020 — 2024',
    description:
      'Focused on signal processing, ML coursework, and building side projects across web, mobile, and automation.',
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
    label: 'LinkedIn',
    value: 'linkedin.com/in/swayamgupta20',
    href: 'https://linkedin.com/in/swayamgupta20',
  },
  {
    label: 'Twitter',
    value: 'x.com/swayamg20',
    href: 'https://x.com/swayamg20',
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