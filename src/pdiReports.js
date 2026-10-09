// Connects the website's Firebase phone login to the PDI report system.
//
// After Firebase verifies the customer's OTP, we send the Firebase ID token to the
// PDI backend, which checks it with Google and returns a short-lived customer token
// for that phone number. With it we list the customer's reports and open the one
// they pick in the PDI web app (where they can view, download and print it).
//
// .env (website):
//   VITE_PDI_API_URL=https://<your-pdi-backend>/api
//   VITE_PDI_APP_URL=https://<your-pdi-web-app>      e.g. https://report.pdicarvision.in

const API = (import.meta.env.VITE_PDI_API_URL || '').replace(/\/$/, '');
const APP = (import.meta.env.VITE_PDI_APP_URL || '').replace(/\/$/, '');
const KEY = 'pdi_customer_session';

export const pdiConfigured = () => Boolean(API && APP);

function save(s) { try { sessionStorage.setItem(KEY, JSON.stringify(s)); } catch { /* private mode */ } }
export function getPdiSession() {
  try {
    const s = JSON.parse(sessionStorage.getItem(KEY) || 'null');
    return s && s.expiresAt > Date.now() + 60_000 ? s : null;
  } catch { return null; }
}
export function clearPdiSession() { try { sessionStorage.removeItem(KEY); } catch { /* ignore */ } }

async function call(path, { method = 'GET', body, token } = {}) {
  if (!API) throw new Error('Report service is not configured yet (VITE_PDI_API_URL).');
  let res;
  try {
    res = await fetch(API + path, {
      method,
      headers: { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }) },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error('Could not reach the report server. Please check your internet and try again.');
  }
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 && token) clearPdiSession();
  if (!res.ok) {
    const e = new Error(typeof data.detail === 'string' ? data.detail : 'Something went wrong. Please try again.');
    e.status = res.status;
    throw e;
  }
  return data;
}

/** Exchange the Firebase ID token for a PDI customer session. */
export async function startPdiSession(firebaseIdToken) {
  const r = await call('/customer/firebase-login', { method: 'POST', body: { idToken: firebaseIdToken } });
  const s = { token: r.access_token, mobile: r.mobile, expiresAt: Date.now() + (r.expiresIn || 1800) * 1000 };
  save(s);
  return s;
}

export async function listMyReports() {
  const s = getPdiSession();
  if (!s) throw Object.assign(new Error('Your session has expired. Please verify your mobile number again.'), { status: 401 });
  return call('/customer/reports', { token: s.token });
}

/** Link that opens one report in the PDI web app, already signed in. */
export function reportLink(id) {
  const s = getPdiSession();
  return `${APP}/get-report/${encodeURIComponent(id)}#t=${s ? s.token : ''}`;
}
