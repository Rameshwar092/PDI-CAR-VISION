
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import {
  sendOtp as sendOtpSms,
  verifyOtp as verifyOtpSms
} from '../services/msg91.js';


const MOBILE_RE = /^[6-9]\d{9}$/;

function normalizeMobile(mobile) {
  return mobile.replace(/\D/g, '');
}


function createToken(user) {
  return jwt.sign(
    {
      userId: user._id.toString(),
      mobile: user.mobile
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d'
    }
  );
}


export async function sendOtp(req, res) {
  try {
    let { mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number is required'
      });
    }

    mobile = normalizeMobile(mobile);

    if (!MOBILE_RE.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: 'Enter a valid Indian mobile number'
      });
    }

    const internationalMobile = `91${mobile}`;

    const result = await sendOtpSms(internationalMobile);

    return res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      data: {
        mobile
      }
    });

  } catch (error) {
    console.error('sendOtp:', error);

    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to send OTP'
    });
  }
}


export async function verifyOtp(req, res) {
  try {
    let { mobile, otp } = req.body;

    if (!mobile || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number and OTP are required'
      });
    }

    mobile = normalizeMobile(mobile);

    if (!MOBILE_RE.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid mobile number'
      });
    }

    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        success: false,
        message: 'OTP must be 6 digits'
      });
    }

    const internationalMobile = `91${mobile}`;

    const verification = await verifyOtpSms(
      internationalMobile,
      otp
    );

    const verificationMessage =
      verification?.message?.toLowerCase?.() || '';

    const verified =
      verification?.type === 'success' ||
      verificationMessage.includes('verified') ||
      verificationMessage.includes('success');

    if (!verified) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    let user = await User.findOne({
      mobile
    });

    if (!user) {
      user = await User.create({
        mobile,
        mobileVerified: true,
        lastLogin: new Date()
      });
    } else {
      user.mobileVerified = true;
      user.lastLogin = new Date();

      await user.save();
    }

    const token = createToken(user);

    return res.status(200).json({
      success: true,
      message: 'Mobile number verified successfully',

      data: {
        token,

        user: {
          id: user._id,
          mobile: user.mobile,
          mobileVerified: user.mobileVerified
        }
      }
    });

  } catch (error) {
    console.error('verifyOtp:', error);

    return res.status(401).json({
      success: false,
      message: error.message || 'OTP verification failed'
    });
  }
}