import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import admin from '../config/firebaseAdmin.js';


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


export async function firebaseLogin(req, res) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Authorization token is required'
      });
    }

    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Invalid authorization format'
      });
    }

    const firebaseToken = authHeader.substring(7);

    if (!firebaseToken) {
      return res.status(401).json({
        success: false,
        message: 'Firebase token is missing'
      });
    }


    // Verify the token with Firebase Admin
    const decodedToken =
      await admin.auth().verifyIdToken(firebaseToken);


    const firebasePhone =
      decodedToken.phone_number;


    if (!firebasePhone) {
      return res.status(401).json({
        success: false,
        message: 'Verified phone number not found'
      });
    }


    // Firebase gives something like:
    // +919876543210
    //
    // Store only:
    // 9876543210

    const mobile =
      firebasePhone.replace(/\D/g, '').slice(-10);


    // Find existing customer
    let user = await User.findOne({
      mobile
    });


    // Create customer on first login
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


    // Create your existing application JWT
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

    console.error('firebaseLogin:', error);

    return res.status(401).json({
      success: false,
      message: 'Firebase authentication failed'
    });
  }
}