export const siteMeta = {
  name: 'Swayam Gupta',
  role: 'AI Engineer',
}

export const hero = {
  label: 'Portfolio 2026',
  headline: 'Engineering systems that understand and evolve.',
  description:
    'I design and build intelligent systems that bridge human intent and machine capability. Specialized in NLP, agent systems, and multimodal applications.',
}

export const sections = [
  {
    id: 'projects',
    title: 'Projects',
    intro: 'Production systems with measurable business impact.',
    items: [
      {
        slug: 'adaptive-retrieval-engine',
        title: 'Adaptive Retrieval Engine',
        meta: 'RAG / Evals / Cost Optimized',
        summary:
          'Dynamic chunk routing and retrieval policies that cut inference cost while preserving factuality.',
        content: [
          'Built a retrieval layer that chooses chunking strategy and vector index by query intent rather than static pipeline defaults.',
          'Added an automatic eval harness with golden sets and failure clustering to catch regressions before deployment.',
          'Result: 41 percent lower infra spend and improved answer faithfulness across long-context queries.',
        ],
      },
      {
        slug: 'agentic-incident-copilot',
        title: 'Agentic Incident Copilot',
        meta: 'Tool Calling / Prod Ops',
        summary:
          'An on-call copilot that triages incidents, runs diagnostics, and proposes mitigations with citations.',
        content: [
          'Implemented tool-driven planning for runbook lookup, logs analysis, and metrics correlation across services.',
          'Added guardrails for action approval and confidence thresholds to prevent unsafe automation.',
          'Result: reduced average MTTR by 31 percent across sev-2 incidents.',
        ],
      },
    ],
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    intro: 'Selected collaborations, shipping records, and writing.',
    items: [
      {
        slug: 'multimodal-assistant-suite',
        title: 'Multimodal Assistant Suite',
        meta: 'Voice / Vision / Web',
        summary:
          'Cross-platform assistant stack with shared policy logic and latency-aware orchestration.',
        content: [
          'Designed reusable orchestration primitives for mobile and web clients to standardize tool invocation.',
          'Introduced stream-aware response shaping to keep perceived responsiveness high under heavy load.',
        ],
      },
      {
        slug: 'evaluation-framework',
        title: 'Evaluation Framework',
        meta: 'Offline + Online Metrics',
        summary:
          'Unified framework for regression tracking, qualitative failure review, and rollout scoring.',
        content: [
          'Connected offline benchmark runs with online quality metrics to close the experiment-to-production loop.',
          'Established release gates based on weighted quality dimensions rather than single score thresholds.',
        ],
      },
    ],
  },
  {
    id: 'interests',
    title: 'Interests',
    intro: 'What I explore outside immediate deliverables.',
    items: [
      {
        slug: 'self-improving-agents',
        title: 'Self-Improving Agents',
        meta: 'Research Direction',
        summary:
          'Learning loops where agents refine policies from post-task feedback and counterfactual analysis.',
        content: [
          'Exploring lightweight memory and critique loops that improve task success without heavyweight finetuning.',
        ],
      },
      {
        slug: 'realtime-voice-systems',
        title: 'Realtime Voice Systems',
        meta: 'Latency + UX',
        summary:
          'Human-grade turn taking, interruption handling, and low-latency speech pipelines.',
        content: [
          'Experimenting with buffering and speculative decoding strategies to reduce conversational lag.',
        ],
      },
    ],
  },
]

export const articles = [
  {
    slug: 'designing-agent-evals',
    title: 'Designing Agent Evals That Actually Predict Production Behavior',
    date: 'Jan 14, 2026',
    readTime: '8 min read',
    summary:
      'How to move from toy benchmark scores to eval suites that capture workflow-level reliability.',
    body: [
      'Most eval stacks fail because they optimize for convenience over representativeness. The benchmark set is easy to run but not coupled to real user workflows.',
      'The fix is scenario-first: define operational scenarios, decompose them into atomic checks, and score each stage with weighted business impact.',
      'Then track failure slices over time. Accuracy alone hides regressions in rare-but-critical pathways.',
    ],
  },
  {
    slug: 'latency-budgeting-for-voice-ai',
    title: 'Latency Budgeting for Voice AI Interfaces',
    date: 'Feb 02, 2026',
    readTime: '6 min read',
    summary:
      'A practical latency budget model for speech recognition, reasoning, and synthesis.',
    body: [
      'Perceived intelligence drops fast after 700ms turn delay. You need hard budgets per stage and automatic backpressure.',
      'A useful architecture is stream-everything: partial ASR, incremental reasoning, and progressive TTS with interruption support.',
      'This lets you optimize perceived responsiveness even when total compute remains constant.',
    ],
  },
]

export const contactInfo = [
  { label: 'Email', value: 'swayam@yourdomain.com', href: 'mailto:swayam@yourdomain.com' },
  { label: 'GitHub', value: 'github.com/swayam', href: 'https://github.com/swayam' },
  { label: 'LinkedIn', value: 'linkedin.com/in/swayam', href: 'https://linkedin.com/in/swayam' },
]

const sectionMap = Object.fromEntries(sections.map((section) => [section.id, section]))

export function getSectionById(sectionId) {
  return sectionMap[sectionId] ?? null
}

export function findSectionItemBySlug(sectionId, slug) {
  const section = getSectionById(sectionId)
  return section?.items.find((item) => item.slug === slug) ?? null
}

export function findArticleBySlug(slug) {
  return articles.find((article) => article.slug === slug) ?? null
}
