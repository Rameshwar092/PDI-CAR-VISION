import { useEffect, useRef, useState } from 'react';

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut
} from 'firebase/auth';

import { auth } from '../firebase.js';
import { loginWithFirebase } from '../auth.js';
import {
  pdiConfigured,
  getPdiSession,
  clearPdiSession,
  startPdiSession,
  listMyReports,
  reportLink
} from '../pdiReports.js';

const MOBILE_RE = /^[6-9]\d{9}$/;
const TONE = { PASS: 'ok', 'PASS WITH OBSERVATIONS': 'warn', FAIL: 'bad' };

export default function LoginModal({ open, onClose }) {
  const [step, setStep] = useState('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [wait, setWait] = useState(0);
  const [reports, setReports] = useState(null);

  const inputRef = useRef(null);
  const confirmationResult = useRef(null);
  const recaptchaVerifier = useRef(null);

  useEffect(() => {
    if (!open) return;

    // Already verified in this browser tab? Go straight to the reports.
    setStep(getPdiSession() ? 'reports' : 'mobile');
    setMobile('');
    setOtp('');
    setError('');
    setWait(0);

    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);

      if (recaptchaVerifier.current) {
        try {
          recaptchaVerifier.current.clear();
        } catch (e) {
          console.warn('reCAPTCHA cleanup:', e);
        }

        recaptchaVerifier.current = null;
      }
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open, step]);

  useEffect(() => {
    if (wait <= 0) return;

    const timer = setTimeout(() => {
      setWait((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [wait]);

  // Load the customer's reports once they are verified
  useEffect(() => {
    if (!open || step !== 'reports') return;
    let alive = true;
    setReports(null);
    setError('');
    listMyReports()
      .then((list) => alive && setReports(list))
      .catch((e) => {
        if (!alive) return;
        if (e.status === 401) { setStep('mobile'); setError(e.message); } else setError(e.message);
      });
    return () => { alive = false; };
  }, [open, step]);

  const getErrorMessage = (error) => {
    console.error('Firebase OTP error:', error);

    switch (error?.code) {
      case 'auth/invalid-phone-number':
        return 'Please enter a valid Indian mobile number.';

      case 'auth/invalid-verification-code':
        return 'Incorrect OTP. Please check the code and try again.';

      case 'auth/code-expired':
        return 'This OTP has expired. Please request a new one.';

      case 'auth/too-many-requests':
        return 'Too many attempts. Please wait and try again later.';

      case 'auth/quota-exceeded':
        return 'SMS limit reached for today. Please try again later.';

      case 'auth/captcha-check-failed':
        return 'reCAPTCHA verification failed. Please refresh and try again.';

      case 'auth/invalid-app-credential':
        return 'Verification failed. Please refresh the page and try again.';

      case 'auth/app-not-authorized':
        return 'This website is not authorized for phone login yet. Please try again later.';

      case 'auth/operation-not-allowed':
        return 'Phone login is not enabled yet. Please try again later.';

      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection.';

      case 'auth/missing-phone-number':
        return 'Please enter your mobile number.';

      default:
        return error?.message || 'Unable to send OTP. Please try again.';
    }
  };

  const setupRecaptcha = () => {
    if (recaptchaVerifier.current) {
      return recaptchaVerifier.current;
    }

    const verifier = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
      {
        size: 'invisible',
        'expired-callback': () => {
          setError('reCAPTCHA expired. Please try again.');
        }
      }
    );

    recaptchaVerifier.current = verifier;

    return verifier;
  };

  const sendOtp = async () => {
    if (!MOBILE_RE.test(mobile)) {
      setError('Enter a valid 10-digit Indian mobile number.');
      return;
    }

    setBusy(true);
    setError('');

    try {
      const appVerifier = setupRecaptcha();

      const result = await signInWithPhoneNumber(
        auth,
        `+91${mobile}`,
        appVerifier
      );

      confirmationResult.current = result;

      setStep('otp');
      setOtp('');
      setWait(30);
    } catch (error) {
      setError(getErrorMessage(error));

      if (recaptchaVerifier.current) {
        try {
          recaptchaVerifier.current.clear();
        } catch (e) {
          console.warn(e);
        }

        recaptchaVerifier.current = null;
      }
    } finally {
      setBusy(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();

    if (!confirmationResult.current) {
      setError('OTP session expired. Please request a new OTP.');
      setStep('mobile');
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError('Enter the 6-digit OTP.');
      return;
    }

    setBusy(true);
    setError('');

    try {
      const result = await confirmationResult.current.confirm(otp);
      const firebaseToken = await result.user.getIdToken();

      // Website's own customer account (optional: never blocks the report)
      loginWithFirebase(firebaseToken).catch((err) =>
        console.warn('Website login skipped:', err.message)
      );

      // PDI report access
      await startPdiSession(firebaseToken);

      // We only needed Firebase to prove the phone number; don't keep it signed in.
      signOut(auth).catch(() => {});

      setStep('reports');
    } catch (error) {
      setError(error?.code ? getErrorMessage(error) : error.message);
    } finally {
      setBusy(false);
    }
  };

  const resendOtp = async () => {
    if (wait > 0 || busy) return;

    await sendOtp();
  };

  const useOtherNumber = () => {
    clearPdiSession();
    setReports(null);
    setError('');
    setStep('mobile');
  };

  if (!open) {
    return null;
  }

  return (
    <div
      className="modal"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={'modal-card' + (step === 'reports' ? ' wide' : '')}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
      >

        <button
          className="modal-x"
          aria-label="Close"
          onClick={onClose}
          type="button"
        >
          ×
        </button>

        {step === 'mobile' && (
          <form onSubmit={(e) => {
            e.preventDefault();
            sendOtp();
          }}>
            <h2 id="login-title">
              Get your PDI report
            </h2>

            <p className="login-subtitle">
              Enter the mobile number you gave at the time of your car's inspection. We'll send you a secure OTP.
            </p>

            {!pdiConfigured() && (
              <div className="err" role="alert">
                Report access is not configured yet (VITE_PDI_API_URL / VITE_PDI_APP_URL).
              </div>
            )}

            <label htmlFor="mob">
              Mobile number
            </label>

            <div className="mob">
              <span>+91</span>

              <input
                id="mob"
                ref={inputRef}
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={10}
                placeholder="10-digit number"
                value={mobile}
                onChange={(e) => {
                  setMobile(
                    e.target.value
                      .replace(/\D/g, '')
                      .slice(0, 10)
                  );
                  setError('');
                }}
              />
            </div>

            {error && (
              <div className="err" role="alert">
                {error}
              </div>
            )}

            <button
              className="btn full"
              type="submit"
              disabled={busy || mobile.length !== 10}
            >
              {busy ? 'Sending OTP...' : 'Get OTP'}
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={verifyOtp}>
            <h2 id="login-title">
              Enter the OTP
            </h2>

            <p>
              We sent a 6-digit code to
              <br />
              <strong>+91 {mobile}</strong>
            </p>

            <button
              type="button"
              className="link"
              onClick={() => {
                setStep('mobile');
                setError('');
              }}
            >
              Change number
            </button>

            <label htmlFor="otp">
              OTP
            </label>

            <input
              id="otp"
              className="otp"
              ref={inputRef}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="••••••"
              value={otp}
              onChange={(e) => {
                setOtp(
                  e.target.value
                    .replace(/\D/g, '')
                    .slice(0, 6)
                );
                setError('');
              }}
            />

            {error && (
              <div className="err" role="alert">
                {error}
              </div>
            )}

            <button
              className="btn full"
              type="submit"
              disabled={busy || otp.length !== 6}
            >
              {busy
                ? 'Verifying...'
                : 'Verify & see my report'}
            </button>

            <button
              type="button"
              className="link resend"
              disabled={wait > 0 || busy}
              onClick={resendOtp}
            >
              {wait > 0
                ? `Resend OTP in ${wait}s`
                : 'Resend OTP'}
            </button>
          </form>
        )}

        {step === 'reports' && (
          <div className="reports">
            <h2 id="login-title">
              Your PDI reports
            </h2>

            <p className="login-subtitle">
              Verified: <strong>+91 {getPdiSession()?.mobile || ''}</strong>
            </p>

            {error && (
              <div className="err" role="alert">
                {error}
              </div>
            )}

            {!reports && !error && (
              <p className="login-subtitle">Loading your reports...</p>
            )}

            {reports && reports.length === 0 && (
              <p className="empty">
                No PDI report is linked to this number yet. If your inspection was done recently,
                please check again later or chat with us on WhatsApp.
              </p>
            )}

            {reports && reports.length > 0 && (
              <ul className="rlist">
                {reports.map((r) => (
                  <li key={r.id}>
                    <div className="rinfo">
                      <b>{r.vehicle}</b>
                      <span>Report {r.id} · {r.date}</span>
                      {r.vin && r.vin !== '-' && <span>VIN {r.vin}</span>}
                    </div>
                    <span className={'rres ' + (TONE[r.result] || '')}>{r.result}</span>
                    <a className="btn" href={reportLink(r.id)}>View &amp; download</a>
                  </li>
                ))}
              </ul>
            )}

            <button type="button" className="link" onClick={useOtherNumber}>
              Use a different mobile number
            </button>
          </div>
        )}

        {/* Firebase reCAPTCHA */}
        <div id="recaptcha-container"></div>

      </div>
    </div>
  );
}
