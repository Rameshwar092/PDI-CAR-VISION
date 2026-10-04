// // OTP calls go to YOUR backend. Put VITE_API_URL=https://api.yourdomain.com in a .env file.
// const API = import.meta.env.VITE_API_URL;

// async function post(path, body) {
//   if (!API) throw new Error('OTP service is not connected yet.');
//   const res = await fetch(`${API}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
//   const data = await res.json().catch(() => ({}));
//   if (!res.ok) throw new Error(data.message || 'Something went wrong. Please try again.');
//   return data;
// }

// export async function sendOtp(mobile) {
//   if (import.meta.env.DEV && !API) return;                       // dev-only mock: no SMS is sent
//   await post('/api/otp/send', { mobile: '+91' + mobile });
// }

// export async function verifyOtp(mobile, otp) {
//   if (import.meta.env.DEV && !API) {                              // dev-only mock: OTP is always 123456
//     if (otp === '123456') return { token: 'dev' };
//     throw new Error('Wrong OTP. In development use 123456.');
//   }
//   return post('/api/otp/verify', { mobile: '+91' + mobile, otp });
// }



const API_URL = import.meta.env.VITE_API_URL;


async function request(endpoint, options = {}) {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,

      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || 'Something went wrong'
    );
  }

  return data;
}


export async function sendOtp(mobile) {
  return request(
    '/api/auth/send-otp',
    {
      method: 'POST',

      body: JSON.stringify({
        mobile
      })
    }
  );
}


export async function verifyOtp(mobile, otp) {
  const result = await request(
    '/api/auth/verify-otp',
    {
      method: 'POST',

      body: JSON.stringify({
        mobile,
        otp
      })
    }
  );


  if (result?.data?.token) {
    localStorage.setItem(
      'pdi_token',
      result.data.token
    );
  }


  if (result?.data?.user) {
    localStorage.setItem(
      'pdi_user',
      JSON.stringify(result.data.user)
    );
  }


  return result;
}


export function getToken() {
  return localStorage.getItem('pdi_token');
}


export function getCurrentUser() {
  const user = localStorage.getItem('pdi_user');

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}


export function logout() {
  localStorage.removeItem('pdi_token');
  localStorage.removeItem('pdi_user');
}


export function isLoggedIn() {
  return Boolean(
    localStorage.getItem('pdi_token')
  );
}