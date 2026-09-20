# Checkpoint PDI — Backend API

Node.js + Express + MongoDB backend for the Checkpoint car pre-delivery
inspection website. Currently handles the contact/booking form; the
customer report-portal login is stubbed out for later.

## What's here

```
checkpoint-pdi-backend/
├── server.js              Express app entry point
├── config/
│   ├── db.js               MongoDB connection
│   └── mailer.js            Sends a notification email on new bookings
├── models/
│   └── Booking.js           Mongoose schema for booking submissions
├── routes/
│   └── bookings.js          POST /api/bookings, GET /api/bookings
├── middleware/
│   ├── rateLimiter.js        Caps booking submissions (5 / 15 min / IP)
│   └── auth.js                Placeholder for future JWT auth
├── .env.example
└── package.json
```

## Setup

1. **Install dependencies:**
   ```bash
   cd checkpoint-pdi-backend
   npm install
   ```

2. **Create a free MongoDB Atlas cluster** at [mongodb.com/atlas](https://www.mongodb.com/atlas) if you don't have a database yet. Copy the connection string it gives you.

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and fill in:
   - `MONGODB_URI` — your Atlas connection string
   - `FRONTEND_ORIGIN` — where your React dev server runs (default `http://localhost:5173`)
   - `SMTP_*` and `NOTIFY_EMAIL` — only needed if you want email notifications on new bookings. If left blank, bookings still save to the database, they just won't trigger an email. For Gmail, you need an [App Password](https://myaccount.google.com/apppasswords), not your normal password.

4. **Run it:**
   ```bash
   npm run dev
   ```
   This starts the API at `http://localhost:5000` and auto-restarts on file changes (via `nodemon`). Use `npm start` for a plain run without auto-restart.

5. **Confirm it's alive:** visit `http://localhost:5000/api/health` in a browser — you should see `{"success":true,"message":"Checkpoint API is running"}`.

## API

### `POST /api/bookings`
Creates a new booking from the contact form.

Request body:
```json
{ "name": "Karan Mehta", "phone": "9876543210", "city": "Gurgaon", "car": "New Creta" }
```

`name` and `phone` are required; `city` and `car` are optional. Returns `201` on success, `400` with validation errors on bad input, `429` if rate-limited.

### `GET /api/bookings`
Returns the 200 most recent bookings, newest first. **This has no authentication yet** — before deploying, put this behind an admin login (see `middleware/auth.js` for a starting point) so random people can't view your customer list.

## Connecting the frontend

`CarPDISite.jsx`'s `ContactPage` already calls this API — look for `API_BASE_URL` near the top of the `ContactPage` component. It defaults to `http://localhost:5000` for local development. When you deploy the backend (Render, Railway, etc.), update that constant to your deployed API URL, and update `FRONTEND_ORIGIN` in the backend's `.env` to your deployed frontend URL.

## Still to build

- **Report portal login** — the "Get PDI Report" modal on the frontend is UI-only. A simple v1 approach: customers look up their report by booking ID + phone number (no password needed), rather than a full account system. `middleware/auth.js` has notes on a JWT approach for an admin/staff login instead, if that's what you need.
- **Admin auth on `GET /api/bookings`** — currently open to anyone who knows the URL. Fine for local development, not for production.
- **Deployment** — Render and Railway both have free tiers that work well for a small Express + MongoDB app like this.

## Tech notes

- Validation is handled with `express-validator` on the booking route — reject bad input before it ever touches the database.
- Rate limiting (`express-rate-limit`) caps booking submissions per IP to prevent spam.
- Email sending is "fire and forget" — if SMTP fails or isn't configured, the booking still saves successfully; only the notification email is skipped.
