import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import '../css/chat.css'
import '../css/auth.css'

const STRENGTH_LEVELS = [
  { pct: '0%',   color: '',        label: '' },
  { pct: '25%',  color: '#f87171', label: 'Weak' },
  { pct: '50%',  color: '#fbbf24', label: 'Fair' },
  { pct: '75%',  color: '#38bdf8', label: 'Good' },
  { pct: '100%', color: '#34d399', label: 'Strong' },
]

export default function RegisterPage() {
  const [searchParams] = useSearchParams()
  const errorMsg = searchParams.get('error')

  const [password, setPassword] = useState('')
  const [confirm,  setConfirm]  = useState('')
  const [strength, setStrength] = useState(STRENGTH_LEVELS[0])
  const [matchErr, setMatchErr] = useState('')

  /* Auth pages need scroll */
  useEffect(() => {
    document.body.classList.add('auth-mode')
    document.body.classList.remove('light-theme')
    return () => document.body.classList.remove('auth-mode')
  }, [])

  const togglePwd = (inputId, btn) => {
    const inp  = document.getElementById(inputId)
    const icon = btn.querySelector('i')
    inp.type       = inp.type === 'password' ? 'text' : 'password'
    icon.className = inp.type === 'password' ? 'ti ti-eye' : 'ti ti-eye-off'
  }

  const calcStrength = (v) => {
    let score = 0
    if (v.length >= 8)          score++
    if (/[A-Z]/.test(v))        score++
    if (/[0-9]/.test(v))        score++
    if (/[^A-Za-z0-9]/.test(v)) score++
    return v.length ? STRENGTH_LEVELS[score] : STRENGTH_LEVELS[0]
  }

  const handlePassword = (e) => {
    const v = e.target.value
    setPassword(v)
    setStrength(calcStrength(v))
    setMatchErr(confirm && confirm !== v ? 'Passwords do not match' : '')
  }

  const handleConfirm = (e) => {
    const v = e.target.value
    setConfirm(v)
    setMatchErr(v && v !== password ? 'Passwords do not match' : '')
  }

  const handleSubmit = (e) => {
    if (password !== confirm) {
      e.preventDefault()
      setMatchErr('Passwords do not match')
    }
  }

  const isDisabled = !!matchErr || !password || !confirm

  return (
    <>
      <div className="background"></div>

      <div className="auth-page">
        <div className="auth-card">

          {/* Brand */}
          <div className="auth-brand">
            <img src="/logo.svg" alt="Alpha" className="auth-logo" />
            <span className="auth-brand-name">Alpha</span>
            <span className="auth-badge">Beta</span>
          </div>

          <h1 className="auth-title">Create account</h1>
          <p className="auth-sub">Join Alpha — free, private, and powerful</p>

          {/* Error from backend */}
          {errorMsg && (
            <div className="auth-alert auth-alert-error">
              <i className="ti ti-alert-circle"></i>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form — posts to Spring Boot /register */}
          <form className="auth-form" action="/register" method="post" onSubmit={handleSubmit}>

            {/* Full Name */}
            <div className="auth-field">
              <label htmlFor="name">Full Name</label>
              <div className="auth-input-wrap">
                <i className="ti ti-user"></i>
                <input
                  type="text" id="name" name="name"
                  placeholder="Your name"
                  autoComplete="name" required
                />
              </div>
            </div>

            {/* Email */}
            <div className="auth-field">
              <label htmlFor="email">Email</label>
              <div className="auth-input-wrap">
                <i className="ti ti-mail"></i>
                <input
                  type="email" id="email" name="email"
                  placeholder="you@example.com"
                  autoComplete="email" required
                />
              </div>
            </div>

            {/* Password */}
            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <div className="auth-input-wrap">
                <i className="ti ti-lock"></i>
                <input
                  type="password" id="password" name="password"
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                  required minLength={8}
                  value={password}
                  onChange={handlePassword}
                />
                <button
                  type="button" className="toggle-eye"
                  onClick={(e) => togglePwd('password', e.currentTarget)}
                  tabIndex={-1}
                >
                  <i className="ti ti-eye"></i>
                </button>
              </div>
              {/* Strength bar */}
              <div className="strength-bar">
                <div
                  className="strength-fill"
                  style={{ width: strength.pct, background: strength.color }}
                ></div>
              </div>
              {strength.label && (
                <span className="strength-label" style={{ color: strength.color }}>
                  {strength.label}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="auth-field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="auth-input-wrap">
                <i className="ti ti-lock-check"></i>
                <input
                  type="password" id="confirmPassword" name="confirmPassword"
                  placeholder="Repeat your password"
                  autoComplete="new-password" required
                  value={confirm}
                  onChange={handleConfirm}
                />
                <button
                  type="button" className="toggle-eye"
                  onClick={(e) => togglePwd('confirmPassword', e.currentTarget)}
                  tabIndex={-1}
                >
                  <i className="ti ti-eye"></i>
                </button>
              </div>
              {matchErr && <span className="field-error">{matchErr}</span>}
            </div>

            <button type="submit" className="auth-btn" disabled={isDisabled}>
              <i className="ti ti-user-plus"></i> Create account
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>

        </div>
        <p className="auth-footer-hint">Alpha can make mistakes. Verify important info.</p>
      </div>
    </>
  )
}