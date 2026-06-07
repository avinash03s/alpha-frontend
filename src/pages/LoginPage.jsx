import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import '../css/chat.css'
import '../css/auth.css'

export default function LoginPage() {
  const [searchParams] = useSearchParams()
  const hasError = searchParams.has('error')

  /* Auth pages need scroll, not full-height lock */
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

          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-sub">Sign in to continue to Alpha</p>

          {/* Error alert */}
          {hasError && (
            <div className="auth-alert auth-alert-error">
              <i className="ti ti-alert-circle"></i>
              Invalid email or password. Please try again.
            </div>
          )}

          {/* Form — posts to Spring Boot /login */}
          <form className="auth-form" action="/login" method="post">

            <div className="auth-field">
              <label htmlFor="email">Email</label>
              <div className="auth-input-wrap">
                <i className="ti ti-mail"></i>
                <input
                  type="email" id="email" name="username"
                  placeholder="you@example.com"
                  autoComplete="email" required
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <div className="auth-input-wrap">
                <i className="ti ti-lock"></i>
                <input
                  type="password" id="password" name="password"
                  placeholder="Enter your password"
                  autoComplete="current-password" required
                />
                <button
                  type="button" className="toggle-eye"
                  onClick={(e) => togglePwd('password', e.currentTarget)}
                  tabIndex={-1}
                >
                  <i className="ti ti-eye"></i>
                </button>
              </div>
            </div>

            <button type="submit" className="auth-btn">
              <i className="ti ti-login"></i> Sign in
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Create one</Link>
          </p>

        </div>
        <p className="auth-footer-hint">Alpha can make mistakes. Verify important info.</p>
      </div>
    </>
  )
}