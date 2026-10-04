import { useEffect, useRef, useState } from 'react';
import { sendOtp, verifyOtp } from '../auth.js';

const MOBILE_RE = /^[6-9]\d{9}$/;   // 10-digit Indian mobile number

export default function LoginModal({ open, onClose }) {
  const [step, setStep] = useState('mobile');   // 'mobile' | 'otp' | 'done'
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [wait, setWait] = useState(0);          // seconds until "Resend OTP" works
  const input = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  // each time it opens: start fresh, close on Esc, stop the page behind from scrolling
  useEffect(() => {
    if (!open) return;
    setStep('mobile'); setMobile(''); setOtp(''); setError(''); setWait(0);
    const onKey = (e) => e.key === 'Escape' && closeRef.current();
    addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => { if (open) input.current?.focus(); }, [open, step]);
  useEffect(() => {
    if (wait <= 0) return;
    const t = setTimeout(() => setWait(wait - 1), 1000);
    return () => clearTimeout(t);
  }, [wait]);

  const run = async (job) => {
    setBusy(true); setError('');
    try { await job(); } catch (err) { setError(err.message); } finally { setBusy(false); }
  };

  const getOtp = (e) => {
    e.preventDefault();
    if (!MOBILE_RE.test(mobile)) return setError('Enter a valid 10-digit mobile number.');
    run(async () => { await sendOtp(mobile); setStep('otp'); setOtp(''); setWait(30); });
  };
  const verify = (e) => {
    e.preventDefault();
    if (otp.length !== 6) return setError('Enter the 6-digit OTP.');
    run(async () => {
      const result = await verifyOtp(mobile, otp);
      console.log('Login successful:', result);
       setStep('done');
    });
  };
  const resend = () => run(async () => { await sendOtp(mobile); setWait(30); });

  if (!open) return null;
  return (
    <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="login-title">
        <button className="modal-x" aria-label="Close" onClick={onClose}>×</button>

        {step === 'mobile' && (
          <form onSubmit={getOtp} noValidate>
            <h2 id="login-title">Log in to get your PDI report</h2>
            <label htmlFor="mob">Mobile number</label>
            <div className="mob">
              <span>+91</span>
              <input id="mob" ref={input} type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={10}
                     placeholder="10-digit number" value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))} />
            </div>
            <div className="err" role="alert">{error}</div>
            <button className="btn full" type="submit" disabled={busy}>{busy ? 'Sending…' : 'Get OTP'}</button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={verify} noValidate>
            <h2 id="login-title">Enter the OTP</h2>
            <p>We sent a 6-digit code to +91 {mobile}. <button type="button" className="link" onClick={() => setStep('mobile')}>Change number</button></p>
            <label htmlFor="otp">OTP</label>
            <input id="otp" className="otp" ref={input} type="text" inputMode="numeric" autoComplete="one-time-code" maxLength={6}
                   placeholder="••••••" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} />
            <div className="err" role="alert">{error}</div>
            <button className="btn full" type="submit" disabled={busy}>{busy ? 'Checking…' : 'Verify and continue'}</button>
            <button type="button" className="link resend" disabled={wait > 0 || busy} onClick={resend}>
              {wait > 0 ? `Resend OTP in ${wait}s` : 'Resend OTP'}
            </button>
          </form>
        )}

        {step === 'done' && (
          <div>
            <h2 id="login-title">You are logged in</h2>
            <p>+91 {mobile} is verified. {/* TODO: send the person to their reports page here */}</p>
            <button className="btn full" onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}