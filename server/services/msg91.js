import axios from 'axios';

const MSG91_BASE_URL = 'https://control.msg91.com/api/v5';

export async function sendOtp(mobile) {
  try {
    const response = await axios.post(
      `${MSG91_BASE_URL}/otp`,
      {},
      {
        params: {
          template_id: process.env.MSG91_TEMPLATE_ID,
          mobile
        },

        headers: {
          authkey: process.env.MSG91_AUTHKEY,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      'MSG91 Send OTP Error:',
      error.response?.data || error.message
    );

    throw new Error('Unable to send OTP');
  }
}


export async function verifyOtp(mobile, otp) {
  try {
    const response = await axios.get(
      `${MSG91_BASE_URL}/otp/verify`,
      {
        params: {
          mobile,
          otp
        },

        headers: {
          authkey: process.env.MSG91_AUTHKEY
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      'MSG91 Verify OTP Error:',
      error.response?.data || error.message
    );

    throw new Error('OTP verification failed');
  }
}