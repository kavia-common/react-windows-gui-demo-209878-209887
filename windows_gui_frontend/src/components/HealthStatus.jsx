import React, { useEffect, useState } from 'react';
import { getHealth } from '../lib/api';

/**
 * PUBLIC_INTERFACE
 * HealthStatus component
 * - On mount, calls GET to the backend health endpoint using getHealth()
 * - Displays three states: Loading..., Success (with message), Error (with error message)
 * - Styled using "Ocean Professional" theme cues (rounded card, subtle gradient, primary/amber/red accents)
 */
function HealthStatus() {
  const [state, setState] = useState({
    loading: true,
    ok: false,
    message: '',
    error: '',
    status: 0,
  });

  useEffect(() => {
    let mounted = true;

    async function fetchHealth() {
      setState((s) => ({ ...s, loading: true, error: '' }));
      const res = await getHealth();

      if (!mounted) return;

      if (res.ok) {
        // Try to normalize message from various payload shapes
        let messageText = '';
        if (typeof res.data === 'string') {
          messageText = res.data;
        } else if (res?.data?.message) {
          messageText = res.data.message;
        } else if (res?.data?.status) {
          messageText = String(res.data.status);
        } else {
          messageText = 'Healthy';
        }

        setState({
          loading: false,
          ok: true,
          message: messageText,
          error: '',
          status: res.status,
        });
      } else {
        const errMsg =
          (res?.error && (res.error.message || res.error.detail || res.error.error)) ||
          'Unable to reach health endpoint';
        setState({
          loading: false,
          ok: false,
          message: '',
          error: errMsg,
          status: res.status || 0,
        });
      }
    }

    fetchHealth();

    return () => {
      mounted = false;
    };
  }, []);

  const { loading, ok, message, error, status } = state;

  return (
    <section
      className="health-card"
      role="status"
      aria-live="polite"
    >
      <header className="health-card__header">
        <h2 className="health-card__title">Service Health</h2>
        {!loading && (
          <span
            className={`badge ${ok ? 'badge--ok' : 'badge--error'}`}
            aria-label={ok ? 'Healthy' : 'Unhealthy'}
          >
            {ok ? 'OK' : 'Error'}
          </span>
        )}
      </header>

      <div className="health-card__body">
        {loading && (
          <p className="health-text health-text--loading">
            <span className="dot dot--pulse" aria-hidden="true" /> Loading...
          </p>
        )}

        {!loading && ok && (
          <div className="health-success">
            <p className="health-text">
              <strong className="accent">Status:</strong> {message}
            </p>
            <p className="health-meta">HTTP {status}</p>
          </div>
        )}

        {!loading && !ok && (
          <div className="health-error">
            <p className="health-text">
              <strong className="error">Error:</strong> {error}
            </p>
            <p className="health-meta">HTTP {status || '0'}</p>
            <p className="health-hint">
              Hint: Ensure REACT_APP_API_BASE/REACT_APP_BACKEND_URL and REACT_APP_HEALTHCHECK_PATH are set correctly.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default HealthStatus;
