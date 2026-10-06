import { useEffect, useRef, useState } from 'react';

import {
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';

import { auth } from '../firebase.js';
import { loginWithFirebase } from '../auth.js';

const MOBILE_RE = /^[6-9]\d{9}$/;

export default function LoginModal({ open, onClose }) {
  const [step, setStep] = useState('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [wait, setWait] = useState(0);

  const inputRef = useRef(null);
  const confirmationResult = useRef(null);
  const recaptchaVerifier = useRef(null);

  useEffect(() => {
    if (!open) return;

    setStep('mobile');
    setMobile('');
    setOtp('');
    setError('');
    setWait(0);

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';

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

  const getErrorMessage = (error) => {
    console.error('Firebase OTP error:', error);

    switch (error?.code) {
      case 'auth/invalid-phone-number':
        return 'Please enter a valid Indian mobile number.';

      case 'auth/too-many-requests':
        return 'Too many attempts. Please wait and try again later.';

      case 'auth/quota-exceeded':
        return 'Firebase SMS quota has been exceeded.';

      case 'auth/captcha-check-failed':
        return 'reCAPTCHA verification failed. Please refresh and try again.';

      case 'auth/invalid-app-credential':
        return 'Firebase reCAPTCHA verification failed. Please refresh the page.';

      case 'auth/app-not-authorized':
        return 'This website is not authorized in Firebase. Add localhost to Authorized Domains.';

      case 'auth/operation-not-allowed':
        return 'Phone Authentication is not enabled in Firebase Console.';

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
        callback: () => {
          console.log('reCAPTCHA verified');
        },
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

      console.log('Sending OTP to:', `+91${mobile}`);

      const result = await signInWithPhoneNumber(
        auth,
        `+91${mobile}`,
        appVerifier
      );

      confirmationResult.current = result;

      console.log('OTP sent successfully');

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
      console.log('Verifying OTP...');

      const result = await confirmationResult.current.confirm(otp);

      const firebaseUser = result.user;

      console.log(
        'Firebase user:',
        firebaseUser.phoneNumber
      );

      const firebaseToken = await firebaseUser.getIdToken();

      await loginWithFirebase(firebaseToken);

      console.log('Backend login successful');

      setStep('done');
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setBusy(false);
    }
  };

  const resendOtp = async () => {
    if (wait > 0 || busy) return;

    await sendOtp();
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
        className="modal-card"
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
              Log in to get your PDI report
            </h2>

            <p className="login-subtitle">
              Enter your mobile number to receive a secure OTP.
            </p>

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
                : 'Verify and continue'}
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

        {step === 'done' && (
          <div className="login-success">
            <h2>
              You are logged in
            </h2>

            <p>
              +91 {mobile} has been verified successfully.
            </p>

            <button
              className="btn full"
              onClick={onClose}
              type="button"
            >
              Continue
            </button>
          </div>
        )}

        {/* Firebase reCAPTCHA */}
        <div id="recaptcha-container"></div>

      </div>
    </div>
  );
}