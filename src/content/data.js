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
  {
    id: 'about',
    title: 'About',
    intro: 'A quick introduction.',
    items: [
      {
        slug: 'who-i-am',
        title: 'Who I Am',
        meta: 'Engineer / IIT Kanpur 2024',
        summary:
          'I am an engineer who likes building useful systems quickly, then hardening them for production.',
        content: [
          'My work usually sits at the intersection of product thinking, applied AI, and systems engineering.',
        ],
      },
      {
        slug: 'current-focus',
        title: 'Current Focus',
        meta: 'Senior AI Engineer @ ixigo',
        summary:
          'Shipping production voice AI systems with a focus on latency, reliability, and user experience.',
        content: [
          'I enjoy teams where ownership is high and iteration cycles are fast.',
        ],
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