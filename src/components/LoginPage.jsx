import { useState } from 'react';

const DEMO_EMAIL = 'student@example.com';
const DEMO_PASSWORD = 'password123';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setError('Invalid email or password.');
      return;
    }

    onLogin(email);
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        {/* icon */}
        <div className="login-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </div>

        <h1>Welcome Back</h1>
        <p className="login-subtitle">Sign in to manage your todos</p>

        {error && <div className="error-message">{error}</div>}

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="student@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <button type="submit" className="btn-primary">Sign In</button>

        <p className="login-hint">
          Demo: <strong>student@example.com</strong> / <strong>password123</strong>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
