import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useParams,
} from 'react-router-dom'
import './App.css'
import {
  articles,
  contactInfo,
  findArticleBySlug,
  findSectionItemBySlug,
  getSectionById,
  hero,
  sections,
  siteMeta,
} from './content/data'

function Layout({ children }) {
  return (
    <main className="studio">
      <header className="top-nav">
        <Link className="brand mono" to="/">
          {siteMeta.name.toUpperCase()} / {siteMeta.role.toUpperCase()}
        </Link>
        <nav className="mono nav-links" aria-label="Primary">
          <a href="/#projects">WORK</a>
          <a href="/#portfolio">PORTFOLIO</a>
          <a href="/#interests">INTERESTS</a>
          <Link to="/articles">ARTICLES</Link>
          <a href="/#contact">CONTACT</a>
        </nav>
      </header>
      {children}
    </main>
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
        <p className="mono section-label">{hero.label.toUpperCase()}</p>
        <h1>{hero.headline}</h1>
        <div className="rule" />
        <p className="description">{hero.description}</p>
      </section>

      <section className="content-wrap">
        {sections.map((section) => (
          <article className={`section-block section-${section.id}`} id={section.id} key={section.id}>
            <div className="section-header">
              <p className="mono section-title">{section.title.toUpperCase()}</p>
              <p className="mono section-intro">{section.intro}</p>
            </div>
            {renderSectionItems(section)}
          </article>
        ))}

        <article className="section-block" id="articles">
          <div className="section-header">
            <p className="mono section-title">ARTICLES</p>
            <Link className="mono item-link section-cta" to="/articles">
              SEE ALL
            </Link>
          </div>

          <div className="article-list">
            {articles.map((article) => (
              <Link className="article-row" to={`/articles/${article.slug}`} key={article.slug}>
                <p className="mono article-meta">
                  {article.date} / {article.readTime}
                </p>
                <h3>{article.title}</h3>
                <p className="article-summary">{article.summary}</p>
                <span className="mono article-cta">READ ARTICLE →</span>
              </Link>
            ))}
          </div>
        </article>

        <article className="section-block contact-block" id="contact">
          <div className="section-header">
            <p className="mono section-title">CONTACT</p>
          </div>
          <div className="contact-grid">
            {contactInfo.map((entry) => (
              <a className="contact-link" href={entry.href} key={entry.label} target="_blank" rel="noreferrer">
                <p className="mono item-meta">{entry.label.toUpperCase()}</p>
                <p>{entry.value}</p>
              </a>
            ))}
          </div>
        </article>
      </section>
    </>
  )
}

function ArticlesPage() {
  return (
    <section className="content-wrap standalone-page">
      <div className="section-header">
        <p className="mono section-title">ALL ARTICLES</p>
      </div>
      <div className="article-list">
        {articles.map((article) => (
          <Link className="article-row" to={`/articles/${article.slug}`} key={article.slug}>
            <p className="mono article-meta">
              {article.date} / {article.readTime}
            </p>
            <h3>{article.title}</h3>
            <p className="article-summary">{article.summary}</p>
            <span className="mono article-cta">READ ARTICLE →</span>
          </Link>
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

function ArticleEntryPage() {
  const { slug } = useParams()
  const article = findArticleBySlug(slug)

  if (!article) {
    return <Navigate to="/404" replace />
  }

  return (
    <section className="detail-page">
      <div className="detail-wrap">
        <p className="mono detail-kicker">
          ARTICLE / {article.date} / {article.readTime}
        </p>
        <h2>{article.title}</h2>
        <p className="detail-summary">{article.summary}</p>
        <div className="detail-body">
          {article.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Link className="mono item-link" to="/articles">
          BACK TO ARTICLES
        </Link>
      </div>
    </section>
  )
}

function NotFoundPage() {
  return (
    <section className="detail-page">
      <div className="detail-wrap">
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
