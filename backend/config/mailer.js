const nodemailer = require("nodemailer");

// Only builds a transporter if SMTP credentials are present. This lets the
// booking API still work (and save to the database) even before email is
// configured — it just skips sending, instead of crashing the request.
function getTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, // true for port 465, false for 587 (STARTTLS)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function sendBookingNotification(booking) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("SMTP not configured — skipping email notification.");
    return;
  }

  const to = process.env.NOTIFY_EMAIL || process.env.SMTP_USER;

  await transporter.sendMail({
    from: `"Checkpoint Website" <${process.env.SMTP_USER}>`,
    to,
    subject: `New inspection booking — ${booking.name}`,
    text: [
      `New booking request received:`,
      ``,
      `Name: ${booking.name}`,
      `Phone: ${booking.phone}`,
      `City: ${booking.city || "—"}`,
      `Car: ${booking.car || "—"}`,
      `Submitted: ${booking.createdAt}`,
    ].join("\n"),
  });
}

module.exports = { sendBookingNotification };
