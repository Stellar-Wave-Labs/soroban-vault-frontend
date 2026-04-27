import Head from 'next/head'
import { FormEvent, useState } from 'react'

type SubmissionState = 'idle' | 'success' | 'error'

const WAITLIST_STORAGE_KEY = 'soroban-vault-waitlist'

const UPDATES = [
  {
    date: '2026-04-27',
    title: 'Landing page and waitlist are live',
    detail: 'Added a clear value proposition, social share CTA, and early-access signup to capture demand.',
  },
  {
    date: '2026-04-30',
    title: 'Weekly metrics dashboard planned',
    detail: 'Publishing weekly totals for visits, waitlist signups, contributors, and testnet actions.',
  },
  {
    date: '2026-05-05',
    title: 'First contributor sprint',
    detail: 'Opening starter issues and running an onboarding session for new maintainers.',
  },
]

function trackEvent(eventName: string, payload: Record<string, string | number> = {}) {
  if (typeof window === 'undefined') {
    return
  }

  const analyticsWindow = window as Window & {
    dataLayer?: Array<Record<string, unknown>>
    gtag?: (...args: unknown[]) => void
  }

  window.dispatchEvent(new CustomEvent('soroban_vault_event', { detail: { eventName, ...payload } }))

  if (analyticsWindow.dataLayer) {
    analyticsWindow.dataLayer.push({ event: eventName, ...payload })
  }

  if (analyticsWindow.gtag) {
    analyticsWindow.gtag('event', eventName, payload)
  }
}

export default function Home() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<SubmissionState>('idle')
  const [message, setMessage] = useState('')

  const handleWaitlistSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!isEmailValid) {
      setState('error')
      setMessage('Enter a valid email so we can invite you.')
      trackEvent('waitlist_submit_error', { reason: 'invalid_email' })
      return
    }

    try {
      const existingEntries = JSON.parse(localStorage.getItem(WAITLIST_STORAGE_KEY) ?? '[]') as string[]
      const normalizedEmail = email.trim().toLowerCase()

      if (!existingEntries.includes(normalizedEmail)) {
        localStorage.setItem(
          WAITLIST_STORAGE_KEY,
          JSON.stringify([...existingEntries, normalizedEmail])
        )
        trackEvent('waitlist_submit_success', { status: 'new_signup' })
      } else {
        trackEvent('waitlist_submit_success', { status: 'existing_signup' })
      }

      setState('success')
      setMessage('You are in. We will send updates and early access invites soon.')
      setEmail('')
    } catch {
      setState('error')
      setMessage('Could not save your signup right now. Please try again.')
      trackEvent('waitlist_submit_error', { reason: 'storage_unavailable' })
    }
  }

  const handleShare = async () => {
    const pageUrl = typeof window !== 'undefined' ? window.location.href : 'https://soroban-vault.app'

    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          title: 'Soroban Vault',
          text: 'Self-custody vaults on Soroban with timelocks and transparent execution.',
          url: pageUrl,
        })
        trackEvent('share_click', { method: 'native_share' })
        return
      }

      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(pageUrl)
        setState('success')
        setMessage('Share link copied. Post it on X and tag #Soroban #DripsWave.')
        trackEvent('share_click', { method: 'clipboard_copy' })
      }
    } catch {
      setState('error')
      setMessage('Share failed. Please copy the URL and share manually.')
      trackEvent('share_click_error', { method: 'unknown' })
    }
  }

  return (
    <>
      <Head>
        <title>Soroban Vault | Timelocked Self-Custody on Soroban</title>
        <meta
          name="description"
          content="Soroban Vault helps builders and DAOs lock funds with transparent rules, timelocks, and verifiable execution on Soroban."
        />
        <meta property="og:title" content="Soroban Vault" />
        <meta
          property="og:description"
          content="Transparent vault contracts with timelocks, audit trails, and DAO-friendly controls on Soroban."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Soroban Vault" />
        <meta
          name="twitter:description"
          content="Build trust with self-custody vaults and policy-based execution on Soroban."
        />
      </Head>

      <main className="page">
        <section className="hero">
          <p className="eyebrow">Built for Soroban teams shipping in public</p>
          <h1>Make treasury moves boring, predictable, and verifiable.</h1>
          <p className="lead">
            Soroban Vault gives protocols, teams, and grant squads a timelocked self-custody layer with
            transparent execution history.
          </p>

          <div className="ctaRow">
            <a
              className="button primary"
              href="https://github.com/Stellar-Wave-Labs/soroban-vault"
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('cta_click', { target: 'github_repo' })}
            >
              View Source
            </a>
            <button className="button ghost" type="button" onClick={handleShare}>
              Share Project
            </button>
          </div>

          <form className="waitlist" onSubmit={handleWaitlistSubmit}>
            <label htmlFor="email">Join the early-access list</label>
            <div className="waitlistRow">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@team.xyz"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
              <button type="submit">Get Invite</button>
            </div>
            {message ? (
              <p className={state === 'error' ? 'status error' : 'status success'}>{message}</p>
            ) : null}
          </form>
        </section>

        <section className="grid">
          <article className="card">
            <h2>What users get</h2>
            <ul>
              <li>Timelocked withdrawals for safer treasury operations.</li>
              <li>Role-based permissions for teams and DAO ops.</li>
              <li>Clear onchain history for trust and accountability.</li>
            </ul>
          </article>

          <article className="card">
            <h2>Why this helps traction</h2>
            <ul>
              <li>One-click share CTA to increase social distribution.</li>
              <li>Waitlist capture to prove demand and retention intent.</li>
              <li>Sharper value proposition for first-time visitors.</li>
            </ul>
          </article>
        </section>

        <section className="roadmap">
          <h2>Public Build Roadmap</h2>
          <ol>
            <li>Deploy testnet demo contracts and publish transaction links.</li>
            <li>Ship contributor guide and first set of good-first-issues.</li>
            <li>Publish usage metrics weekly (visits, signups, contributors).</li>
          </ol>
        </section>

        <section className="updates" aria-label="Project updates">
          <div className="updatesHeader">
            <h2>Build In Public Updates</h2>
            <a
              href="https://github.com/Stellar-Wave-Labs/soroban-vault/issues"
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('cta_click', { target: 'issues_board' })}
            >
              Open Issues Board
            </a>
          </div>

          <div className="updateList">
            {UPDATES.map((entry) => (
              <article key={entry.date + entry.title} className="updateItem">
                <p className="updateDate">{entry.date}</p>
                <h3>{entry.title}</h3>
                <p>{entry.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}