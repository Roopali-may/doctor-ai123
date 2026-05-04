# Doctor Appointment — Backend (Express + MongoDB)

Local MERN backend that matches the frontend service layer
(`src/services/*`) mounted under `/api/v1`.

## Quick start

1. **Install MongoDB Community + MongoDB Compass** (already done).
2. Make sure `mongod` is running. Default URI: `mongodb://localhost:27017`.
3. Copy `backend/` into your `server-with-client/` folder (or use as-is).
4. Inside `backend/`:

```bash
cp .env.example .env
npm install
npm run dev          # starts on http://localhost:8080
node seed.js         # (optional) seed admin/patient/doctor + sample doctors
```

5. Open **MongoDB Compass** → connect to `mongodb://localhost:27017` →
   you'll see the database `doctor_appointment` with all collections.

## .env

```
PORT=8080
NODE_ENV=development
MONGO_LOCAL_URI=mongodb://localhost:27017
MONGO_DB_NAME=doctor_appointment
JWT_SECRET=yoursecretKey
JWT_EXPIRES_IN=7d
CLIENT_ORIGIN=http://localhost:5173
```

## Frontend `.env.local` (project root)

```
VITE_BASEURL=http://localhost:8080/api/v1
```

## Seed credentials

| Role    | Email             | Password    |
| ------- | ----------------- | ----------- |
| Admin   | admin@hms.com     | admin123    |
| Patient | patient@hms.com   | patient123  |
| Doctor  | doctor@hms.com    | doctor123   |

## Routes (mounted at `/api/v1`)

- `auth/*` — register, login, logout, me, forgot-password
- `doctors` — CRUD
- `appointments` — book, list, status, cancel
- `patients/me` — profile + medical records (file upload via multer)
- `prescriptions`, `vitals`, `payments` (INR mock)

## Folder layout

```
backend/
├─ config/db.js
├─ controllers/
├─ middlewares/  (auth, errorHandler, upload)
├─ models/       (User, Doctor, Appointment, Patient, Prescription, Vital, Payment)
├─ routes/
├─ uploads/      (created on first upload)
├─ server.js
├─ seed.js
└─ .env.example
```

## Notes

- The Lovable cloud preview cannot reach `localhost:8080` — test on your
  machine with `bun dev` (frontend) + `npm run dev` (backend) running.
- Swap the mock payment controller with Razorpay for real INR payments.
