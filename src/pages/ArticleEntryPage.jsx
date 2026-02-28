import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import ContactForm from '../components/ContactForm'

function BackButton({ fallback, label }) {
  const navigate = useNavigate()
  const hasHistory = useRef(false)
  const location = useLocation()
  useEffect(() => {
    if (location.key !== 'default') hasHistory.current = true
  }, [location.key])
  function handleClick(e) {
    e.preventDefault()
    if (hasHistory.current) navigate(-1)
    else navigate(fallback)
  }
  return (
    <a className="mono page-back-link" href={fallback} onClick={handleClick}>
      ← {label}
    </a>
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

export default function ArticleEntryPage({ article }) {
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
          {article.summary && article.summary !== article.subtitle ? (
            <p className="detail-summary">{article.summary}</p>
          ) : null}
          {article.authorName || article.authorMeta ? (
            <div className="article-author-block">
              <div className="article-author-avatar">{(article.authorName || 'A').charAt(0)}</div>
              <div className="article-author-info">
                {article.authorName ? (
                  <p className="mono article-author-name">{article.authorName}</p>
                ) : null}
                {article.authorMeta ? (
                  <p className="mono article-author-meta">{article.authorMeta}</p>
                ) : null}
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
        <ContactForm subject={`Re: ${article.title}`} className="contact-form-bordered" />
        <a
          className="mono item-link"
          href="/articles"
          onClick={(e) => {
            e.preventDefault()
            window.history.back()
          }}
        >
          ← BACK
        </a>
      </div>
    </section>
  )
}
