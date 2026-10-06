// import React, { useEffect, useRef, useState } from "react";
// import "./FirebasePhoneLogin.css";
// import {
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
//   onAuthStateChanged,
//   signOut,
// } from "firebase/auth";

// import { auth } from "../firebase";

// export default function FirebasePhoneLogin({ onLogin }) {
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");

//   const [otpSent, setOtpSent] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [user, setUser] = useState(null);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const [timer, setTimer] = useState(0);

//   const confirmationResultRef = useRef(null);
//   const recaptchaVerifierRef = useRef(null);

//   // --------------------------------------------------
//   // Firebase authentication state
//   // --------------------------------------------------

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);

//       if (currentUser) {
//         onLogin?.(currentUser);
//       }
//     });

//     return () => unsubscribe();
//   }, [onLogin]);

//   // --------------------------------------------------
//   // OTP countdown
//   // --------------------------------------------------

//   useEffect(() => {
//     if (timer <= 0) return;

//     const interval = setInterval(() => {
//       setTimer((previous) => previous - 1);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [timer]);

//   // --------------------------------------------------
//   // Create reCAPTCHA
//   // --------------------------------------------------

//   const setupRecaptcha = () => {
//     if (recaptchaVerifierRef.current) {
//       return recaptchaVerifierRef.current;
//     }

//     const verifier = new RecaptchaVerifier(
//       auth,
//       "recaptcha-container",
//       {
//         size: "invisible",

//         callback: () => {
//           console.log("reCAPTCHA verified");
//         },

//         "expired-callback": () => {
//           setError("reCAPTCHA expired. Please try again.");
//         },
//       }
//     );

//     recaptchaVerifierRef.current = verifier;

//     return verifier;
//   };

//   // --------------------------------------------------
//   // Send OTP
//   // --------------------------------------------------

//   const sendOTP = async () => {
//     setError("");
//     setSuccess("");

//     if (!phone.trim()) {
//       setError("Please enter your mobile number.");
//       return;
//     }

//     if (!/^[6-9]\d{9}$/.test(phone)) {
//       setError("Please enter a valid 10-digit Indian mobile number.");
//       return;
//     }

//     if (timer > 0) {
//       setError(`Please wait ${timer} seconds before requesting another OTP.`);
//       return;
//     }

//     setLoading(true);

//     try {
//       const fullPhoneNumber = `+91${phone}`;

//       const appVerifier = setupRecaptcha();

//       const confirmationResult = await signInWithPhoneNumber(
//         auth,
//         fullPhoneNumber,
//         appVerifier
//       );

//       confirmationResultRef.current = confirmationResult;

//       setOtpSent(true);
//       setTimer(60);
//       setSuccess("OTP sent successfully to your mobile number.");

//     } catch (error) {
//       console.error("Firebase OTP error:", error);

//       setError(getFirebaseErrorMessage(error));

//       // Reset reCAPTCHA
//       if (recaptchaVerifierRef.current) {
//         try {
//           const widgetId =
//             await recaptchaVerifierRef.current.render();

//           if (window.grecaptcha) {
//             window.grecaptcha.reset(widgetId);
//           }
//         } catch (recaptchaError) {
//           console.error(recaptchaError);
//         }
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --------------------------------------------------
//   // Verify OTP
//   // --------------------------------------------------

//   const verifyOTP = async () => {
//     setError("");
//     setSuccess("");

//     if (!otp.trim()) {
//       setError("Please enter the OTP.");
//       return;
//     }

//     if (!/^\d{6}$/.test(otp)) {
//       setError("OTP must contain 6 digits.");
//       return;
//     }

//     if (!confirmationResultRef.current) {
//       setError("Please request a new OTP.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const result =
//         await confirmationResultRef.current.confirm(otp);

//       const firebaseUser = result.user;

//       console.log("Firebase user:", firebaseUser);

//       setUser(firebaseUser);

//       setSuccess("Mobile number verified successfully.");

//       // Send user information to parent
//       onLogin?.(firebaseUser);

//     } catch (error) {
//       console.error("OTP verification error:", error);

//       if (error.code === "auth/invalid-verification-code") {
//         setError("Incorrect OTP. Please try again.");
//       } else if (error.code === "auth/code-expired") {
//         setError("OTP expired. Please request a new OTP.");
//       } else {
//         setError(getFirebaseErrorMessage(error));
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --------------------------------------------------
//   // Change mobile number
//   // --------------------------------------------------

//   const changeNumber = () => {
//     setOtpSent(false);
//     setOtp("");
//     setError("");
//     setSuccess("");

//     confirmationResultRef.current = null;

//     setTimer(0);
//   };

//   // --------------------------------------------------
//   // Logout
//   // --------------------------------------------------

//   const logout = async () => {
//     try {
//       await signOut(auth);

//       setUser(null);
//       setPhone("");
//       setOtp("");
//       setOtpSent(false);
//       setSuccess("");
//       setError("");

//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // --------------------------------------------------
//   // Already logged in
//   // --------------------------------------------------

//   if (user) {
//     return (
//       <div className="otp-login-container">
//         <div className="otp-card">

//           <h2>Login Successful</h2>

//           <p>
//             Mobile number verified:
//           </p>

//           <strong>
//             {user.phoneNumber}
//           </strong>

//           <button
//             type="button"
//             onClick={logout}
//             className="otp-button"
//           >
//             Logout
//           </button>

//         </div>
//       </div>
//     );
//   }

//   // --------------------------------------------------
//   // Login UI
//   // --------------------------------------------------

//   return (
//     <div className="otp-login-container">

//       <div className="otp-card">

//         <h2>
//           {otpSent
//             ? "Verify OTP"
//             : "Login with Mobile Number"}
//         </h2>

//         <p className="otp-subtitle">
//           {otpSent
//             ? `Enter the 6-digit OTP sent to +91 ${phone}`
//             : "Enter your mobile number to continue"}
//         </p>

//         {!otpSent ? (
//           <>
//             <div className="phone-input-wrapper">

//               <span className="country-code">
//                 +91
//               </span>

//               <input
//                 type="tel"
//                 value={phone}
//                 onChange={(e) =>
//                   setPhone(
//                     e.target.value.replace(/\D/g, "").slice(0, 10)
//                   )
//                 }
//                 placeholder="Enter mobile number"
//                 maxLength={10}
//               />

//             </div>

//             <button
//               id="send-otp-button"
//               type="button"
//               onClick={sendOTP}
//               disabled={loading}
//               className="otp-button"
//             >
//               {loading
//                 ? "Sending OTP..."
//                 : "Send OTP"}
//             </button>
//           </>
//         ) : (
//           <>
//             <input
//               type="text"
//               value={otp}
//               onChange={(e) =>
//                 setOtp(
//                   e.target.value.replace(/\D/g, "").slice(0, 6)
//                 )
//               }
//               placeholder="Enter 6-digit OTP"
//               maxLength={6}
//               className="otp-input"
//               inputMode="numeric"
//               autoComplete="one-time-code"
//             />

//             <button
//               type="button"
//               onClick={verifyOTP}
//               disabled={loading}
//               className="otp-button"
//             >
//               {loading
//                 ? "Verifying..."
//                 : "Verify OTP"}
//             </button>

//             <div className="otp-actions">

//               <button
//                 type="button"
//                 onClick={changeNumber}
//                 className="text-button"
//               >
//                 Change Number
//               </button>

//               {timer > 0 ? (
//                 <span>
//                   Resend in {timer}s
//                 </span>
//               ) : (
//                 <button
//                   type="button"
//                   onClick={sendOTP}
//                   className="text-button"
//                 >
//                   Resend OTP
//                 </button>
//               )}

//             </div>
//           </>
//         )}

//         {error && (
//           <div className="otp-error">
//             {error}
//           </div>
//         )}

//         {success && (
//           <div className="otp-success">
//             {success}
//           </div>
//         )}

//         {/* Firebase reCAPTCHA */}
//         <div id="recaptcha-container"></div>

//         <p className="otp-terms">
//           By continuing, you agree to receive an SMS
//           verification code on your mobile number.
//         </p>

//       </div>

//     </div>
//   );
// }

// // --------------------------------------------------
// // Firebase error messages
// // --------------------------------------------------

// function getFirebaseErrorMessage(error) {
//   switch (error?.code) {

//     case "auth/invalid-phone-number":
//       return "Invalid mobile number.";

//     case "auth/too-many-requests":
//       return "Too many attempts. Please try again later.";

//     case "auth/quota-exceeded":
//       return "SMS quota exceeded. Please try again later.";

//     case "auth/captcha-check-failed":
//       return "reCAPTCHA verification failed.";

//     case "auth/network-request-failed":
//       return "Network error. Please check your internet connection.";

//     case "auth/app-not-authorized":
//       return "This domain is not authorized in Firebase.";

//     case "auth/operation-not-allowed":
//       return "Phone authentication is not enabled in Firebase.";

//     default:
//       return error?.message || "Something went wrong. Please try again.";
//   }
// }