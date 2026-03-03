const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

export function initGA() {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false })
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)
}

export function pageview(path) {
  if (!GA_MEASUREMENT_ID || typeof window?.gtag !== 'function') return
  window.gtag('config', GA_MEASUREMENT_ID, { page_path: path })
}

/**
 * Send a custom event to GA4. Params show up in Reports → Engage → Events (and in custom dimensions if you map them).
 * @param {string} name - Event name (e.g. 'click_nav', 'contact_form_submit')
 * @param {Record<string, string|number|boolean>} [params] - Optional event parameters
 */
export function trackEvent(name, params = {}) {
  if (!GA_MEASUREMENT_ID || typeof window?.gtag !== 'function') return
  window.gtag('event', name, params)
}
