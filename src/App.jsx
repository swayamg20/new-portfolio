import { useEffect, useRef, useState } from 'react'
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import './App.css'
import {
  about,
  contactInfo,
  experience,
  findSectionItemBySlug,
  getSectionById,
  hero,
  sections,
  siteMeta,
} from './content/data'
import { articles, findArticleBySlug } from './content/articles'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function DocumentTitle() {
  const { pathname } = useLocation()
  const articleSlug = pathname.startsWith('/articles/') && pathname !== '/articles'
    ? pathname.replace(/^\/articles\/?/, '')
    : null
  const article = articleSlug ? findArticleBySlug(articleSlug) : null

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | ${siteMeta.name}`
    } else if (pathname === '/articles') {
      document.title = `Articles | ${siteMeta.name}`
    } else if (pathname === '/') {
      document.title = siteMeta.name
    } else if (pathname === '/404') {
      document.title = `Not found | ${siteMeta.name}`
    } else {
      document.title = siteMeta.name
    }
  }, [pathname, article])
  return null
}

function BackButton({ fallback, label }) {
  const navigate = useNavigate()
  const hasHistory = useRef(false)
  const location = useLocation()

  useEffect(() => {
    if (location.key !== 'default') hasHistory.current = true
  }, [location.key])

  function handleClick(e) {
    e.preventDefault()
    if (hasHistory.current) {
      navigate(-1)
    } else {
      navigate(fallback)
    }
  }

  return (
    <a className="mono page-back-link" href={fallback} onClick={handleClick}>
      ← {label}
    </a>
  )
}

function TopBackLink({ to, label }) {
  return (
    <Link className="mono page-back-link" to={to}>
      ← {label}
    </Link>
  )
}

function NavBar() {
  return (
    <div className="top-nav-wrap">
      <header className="top-nav">
        <Link className="brand mono" to="/">
          {siteMeta.name.toUpperCase()} / {siteMeta.role.toUpperCase()}
        </Link>
        <nav className="mono nav-links" aria-label="Primary">
          <a href="/#about">ABOUT</a>
          <a href="/#projects">WORK</a>
          <Link to="/articles">ARTICLES</Link>
          <a href="/#contact">CONTACT</a>
          <span className="nav-divider" />
          <a href="https://github.com/swayamg20" target="_blank" rel="noreferrer" aria-label="GitHub" className="nav-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6.02 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a href="https://linkedin.com/in/swayamgupta20" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="nav-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>
          </a>
          <a href="https://x.com/swayamg20" target="_blank" rel="noreferrer" aria-label="X" className="nav-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.24 2.25h3.55l-7.76 8.87L23.52 21.75h-7.15l-5.6-7.33-6.41 7.33H.81l8.3-9.49L.48 2.25h7.33l5.07 6.7 5.36-6.7zm-1.25 17.52h1.97L7.08 4.26H4.98l11.01 15.51z"/></svg>
          </a>
        </nav>
      </header>
    </div>
  )
}

function ReadingProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    function onScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setPct(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div className="reading-progress" style={{ width: `${pct}%` }} />
}

function useScrollReveal() {
  const { pathname } = useLocation()
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])
}

function Layout({ children }) {
  useScrollReveal()
  return (
    <main className="studio">
      <NavBar />
      {children}
    </main>
  )
}

function ArticleRow({ article }) {
  const inner = (
    <>
      <p className="mono article-meta">
        {article.date} / {article.readTime}
      </p>
      <h3>{article.title}</h3>
      <p className="article-summary">{article.summary}</p>
      <span className="mono article-cta">
        {article.externalUrl ? 'READ ON MEDIUM ↗' : 'READ ARTICLE →'}
      </span>
    </>
  )

  if (article.externalUrl) {
    return (
      <a className="article-row" href={article.externalUrl} target="_blank" rel="noreferrer" key={article.slug}>
        {inner}
      </a>
    )
  }

  return (
    <Link className="article-row" to={`/articles/${article.slug}`} key={article.slug}>
      {inner}
    </Link>
  )
}

function renderSectionItems(section) {
  if (section.id === 'projects') {
    return (
      <div className="project-list">
        {section.items.map((item, index) => (
          <article className="project-row-card" key={item.slug}>
            <p className="mono project-index">{String(index + 1).padStart(2, '0')}</p>
            <div className="project-main">
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </div>
            <div className="project-aside">
              <p className="mono item-meta">{item.meta}</p>
              <Link className="mono item-link" to={`/entry/${section.id}/${item.slug}`}>
                OPEN ENTRY
              </Link>
            </div>
          </article>
        ))}
      </div>
    )
  }

  if (section.id === 'portfolio') {
    return (
      <div className="portfolio-grid">
        {section.items.map((item) => (
          <article className="portfolio-card" key={item.slug}>
            <p className="mono item-meta">{item.meta}</p>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <Link className="mono item-link" to={`/entry/${section.id}/${item.slug}`}>
              OPEN ENTRY
            </Link>
          </article>
        ))}
      </div>
    )
  }

  if (section.id === 'interests') {
    return (
      <div className="interest-grid">
        {section.items.map((item) => (
          <article className="interest-card" key={item.slug}>
            <div className="interest-topline">
              <h3>{item.title}</h3>
              <p className="mono item-meta">{item.meta}</p>
            </div>
            <p>{item.summary}</p>
            <Link className="mono item-link" to={`/entry/${section.id}/${item.slug}`}>
              READ NOTE
            </Link>
          </article>
        ))}
      </div>
    )
  }

  return (
    <div className="item-grid">
      {section.items.map((item) => (
        <article className="item-card" key={item.slug}>
          <p className="mono item-meta">{item.meta}</p>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
          <Link className="mono item-link" to={`/entry/${section.id}/${item.slug}`}>
            OPEN ENTRY
          </Link>
        </article>
      ))}
    </div>
  )
}

function HomePage() {
  return (
    <>
      <section className="hero" aria-label="Landing hero">
        <div className="hero-content">
          <p className="mono section-label">{hero.label.toUpperCase()}</p>
          <h1 className="hero-heading">
            <span className="hero-heading-intro">Hi, I am </span>
            <span className="hero-heading-name">Swayam Gupta</span>
          </h1>
          <div className="rule" />
          <p className="description">{hero.description}</p>
        </div>
      </section>

      <section className="content-wrap">
        <article className="section-block reveal" id="about">
          <div className="section-header">
            <p className="mono section-title">ABOUT</p>
          </div>
          <p className="mono about-tagline">{about.tagline}</p>
          <p className="about-bio">{about.bio}</p>
          <div className="about-current">
            <p className="mono about-current-role">{about.currentRole}</p>
            <p className="about-current-focus">{about.currentFocus}</p>
          </div>
        </article>

        <article className="section-block reveal" id="experience">
          <div className="section-header">
            <p className="mono section-title">EXPERIENCE</p>
          </div>
          <div className="experience-timeline">
            {experience.map((exp) => (
              <div className="experience-item reveal" key={exp.period}>
                <div className="experience-period">
                  <p className="mono">{exp.period}</p>
                </div>
                <div className="experience-content">
                  <p className="experience-role">{exp.role}</p>
                  <p className="mono experience-company">
                    {exp.companyUrl ? (
                      <a href={exp.companyUrl} target="_blank" rel="noreferrer">{exp.company}</a>
                    ) : exp.company}
                  </p>
                  <p className="experience-desc">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        {sections.map((section) => (
          <article className={`section-block section-${section.id} reveal`} id={section.id} key={section.id}>
            <div className="section-header">
              <p className="mono section-title">{section.title.toUpperCase()}</p>
              <p className="mono section-intro">{section.intro}</p>
            </div>
            {renderSectionItems(section)}
          </article>
        ))}

        <article className="section-block reveal" id="articles">
          <div className="section-header">
            <p className="mono section-title">ARTICLES</p>
            <Link className="mono item-link section-cta" to="/articles">
              SEE ALL
            </Link>
          </div>

          <div className="article-list">
            {articles.map((article) => (
              <ArticleRow article={article} key={article.slug} />
            ))}
          </div>
        </article>

        <article className="section-block contact-block reveal" id="contact">
          <div className="section-header">
            <p className="mono section-title">CONTACT</p>
          </div>
          <div className="contact-layout">
            <ContactForm
              subject="New message from portfolio"
              heading="Say hello."
              subtext="Have a question, idea, or just want to chat? Drop me a message."
            />
            <div className="contact-links-col">
              <p className="mono experience-label">FIND ME</p>
              {contactInfo.map((entry) => (
                <a className="contact-link-row" href={entry.href} key={entry.label} target="_blank" rel="noreferrer">
                  <span className="mono contact-link-label">{entry.label}</span>
                  <span className="contact-link-value">{entry.value}</span>
                </a>
              ))}
            </div>
          </div>
        </article>
      </section>
    </>
  )
}

function ArticlesPage() {
  return (
    <section className="content-wrap standalone-page">
      <TopBackLink to="/" label="BACK TO HOME" />
      <div className="section-header">
        <p className="mono section-title">ALL ARTICLES</p>
      </div>
      <div className="article-list">
        {articles.map((article) => (
          <ArticleRow article={article} key={article.slug} />
        ))}
      </div>
    </section>
  )
}

function SectionEntryPage() {
  const { sectionId, slug } = useParams()
  const section = getSectionById(sectionId)
  const entry = findSectionItemBySlug(sectionId, slug)

  if (!section || !entry) {
    return <Navigate to="/404" replace />
  }

  return (
    <section className="detail-page">
      <div className="detail-wrap">
        <TopBackLink to="/" label="BACK TO HOME" />
        <p className="mono detail-kicker">
          {section.title.toUpperCase()} / {entry.meta}
        </p>
        <h2>{entry.title}</h2>
        <p className="detail-summary">{entry.summary}</p>
        <div className="detail-body">
          {entry.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Link className="mono item-link" to="/">
          BACK TO HOME
        </Link>
      </div>
    </section>
  )
}

function ContactForm({ subject, heading, subtext, className }) {
  const formRef = useRef(null)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  async function handleSend(e) {
    e.preventDefault()
    setSending(true)
    try {
      await fetch('https://formsubmit.co/ajax/gupta.swayam123@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: subject || 'New message from portfolio',
          message: formRef.current.message.value,
          email: formRef.current.email.value || '(not provided)',
          _honey: '',
        }),
      })
      setSent(true)
    } catch {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div className={`contact-form ${className || ''}`}>
        <p className="contact-form-heading">Sent — thank you.</p>
        <p className="contact-form-sub">I'll get back if you left your email.</p>
      </div>
    )
  }

  return (
    <form className={`contact-form ${className || ''}`} ref={formRef} onSubmit={handleSend}>
      <p className="contact-form-heading">{heading || 'Thoughts?'}</p>
      <p className="contact-form-sub">{subtext || 'Drop me a note — I read every one.'}</p>
      <div className="contact-form-fields">
        <textarea name="message" placeholder="Your message..." rows={3} required />
        <input name="email" type="email" placeholder="Your email (optional)" />
        <button type="submit" className="contact-form-send" disabled={sending}>
          {sending ? 'SENDING...' : 'SEND MESSAGE'}
        </button>
      </div>
    </form>
  )
}

function ArticleEntryPage() {
  const { slug } = useParams()
  const article = findArticleBySlug(slug)

  if (!article) {
    return <Navigate to="/404" replace />
  }

  const articleTags =
    typeof article.tags === 'string'
      ? article.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean)
      : []

  return (
    <section className="detail-page">
      <ReadingProgress />
      <div className="detail-wrap article-detail-wrap">
        <BackButton fallback="/articles" label="BACK" />
        <p className="mono detail-kicker">
          ARTICLE / {article.date} / {article.readTime}
        </p>
        <div className="article-page-hero">
          {article.heroLabel ? <p className="mono article-hero-label">{article.heroLabel}</p> : null}
          <h2 className="article-hero-title">{article.title}</h2>
          {article.subtitle ? <p className="article-hero-subtitle">{article.subtitle}</p> : null}
          {article.summary && article.summary !== article.subtitle ? <p className="detail-summary">{article.summary}</p> : null}
          {article.authorName || article.authorMeta ? (
            <div className="article-author-block">
              <div className="article-author-avatar">{(article.authorName || 'A').charAt(0)}</div>
              <div className="article-author-info">
                {article.authorName ? <p className="mono article-author-name">{article.authorName}</p> : null}
                {article.authorMeta ? <p className="mono article-author-meta">{article.authorMeta}</p> : null}
              </div>
            </div>
          ) : null}
        </div>
        {article.coverImage ? (
          <img
            className="article-cover"
            src={article.coverImage}
            alt={`${article.title} cover`}
            loading="lazy"
          />
        ) : null}
        <div className="detail-body article-prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeHighlight]}>
            {article.body}
          </ReactMarkdown>
        </div>
        {articleTags.length ? (
          <div className="article-tags" aria-label="Article tags">
            {articleTags.map((tag) => (
              <span className="mono article-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        <ContactForm
          subject={`Re: ${article.title}`}
          className="contact-form-bordered"
        />
        <a className="mono item-link" href="/articles" onClick={(e) => { e.preventDefault(); window.history.back() }}>
          ← BACK
        </a>
      </div>
    </section>
  )
}

function NotFoundPage() {
  return (
    <section className="detail-page">
      <div className="detail-wrap">
        <TopBackLink to="/" label="BACK TO HOME" />
        <p className="mono detail-kicker">404</p>
        <h2>Page not found.</h2>
        <Link className="mono item-link" to="/">
          BACK TO HOME
        </Link>
      </div>
    </section>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <DocumentTitle />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<ArticleEntryPage />} />
          <Route path="/entry/:sectionId/:slug" element={<SectionEntryPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
