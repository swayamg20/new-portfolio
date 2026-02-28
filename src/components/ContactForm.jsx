import { useRef, useState } from 'react'

export default function ContactForm({ subject, heading, subtext, className }) {
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
