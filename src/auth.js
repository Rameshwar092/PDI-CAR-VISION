
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