# Frontend Service Layer (MERN backend)

This folder contains the axios-based API client used to talk to your local
Express + MongoDB backend.

## Local setup

1. Run your backend on `http://localhost:8080` with routes mounted at `/api/v1`.
2. Make sure MongoDB is running on `mongodb://127.0.0.1:27017`.
3. In the project root, create a file named **`.env.local`** with:

   ```
   VITE_BASEURL=http://localhost:8080/api/v1
   ```

   > Vite automatically loads `.env.local` in development. The Lovable-managed
   > `.env` file is reserved for Lovable Cloud and should NOT be edited.

4. Run the frontend with `npm run dev` / `bun dev`.

## Why this only works locally

`http://localhost:8080` resolves to **your machine**. The deployed/preview
Lovable site cannot reach it. To make the deployed app work, host your
backend publicly (Render, Railway, Fly.io, etc.) and update `VITE_BASEURL`.

## Expected backend routes

| Method | Path                                 | Purpose                       |
| ------ | ------------------------------------ | ----------------------------- |
| POST   | `/auth/register`                     | Signup                        |
| POST   | `/auth/login`                        | Login (returns `{user,token}`)|
| POST   | `/auth/logout`                       | Logout                        |
| GET    | `/auth/me`                           | Current user                  |
| POST   | `/auth/forgot-password`              | Request password reset        |
| GET    | `/doctors`                           | List doctors                  |
| GET    | `/doctors/:id`                       | Doctor details                |
| POST   | `/doctors`                           | Create (admin)                |
| PUT    | `/doctors/:id`                       | Update                        |
| DELETE | `/doctors/:id`                       | Delete (admin)                |
| GET    | `/appointments`                      | My appointments               |
| GET    | `/appointments/all`                  | All (admin/doctor)            |
| POST   | `/appointments`                      | Book                          |
| PATCH  | `/appointments/:id/status`           | Approve/reject/complete       |
| DELETE | `/appointments/:id`                  | Cancel                        |
| GET    | `/patients/me`                       | My profile                    |
| PUT    | `/patients/me`                       | Update profile                |
| GET    | `/patients/me/records`               | List medical records          |
| POST   | `/patients/me/records`               | Upload record (multipart)     |
| DELETE | `/patients/me/records/:id`           | Delete record                 |
| GET    | `/prescriptions`                     | List                          |
| POST   | `/prescriptions`                     | Create (doctor)               |
| GET    | `/vitals`                            | List vitals                   |
| POST   | `/vitals`                            | Add vital reading             |
| POST   | `/payments`                          | Process payment               |
| GET    | `/payments/:id`                      | Payment status                |

Auth uses `Authorization: Bearer <token>` from `localStorage.auth_token`,
plus `withCredentials: true` if your backend prefers cookie sessions.

## Usage

```ts
import { authService, doctorService } from "@/services";

const doctors = await doctorService.getAll();
const { user } = await authService.login(email, password, "patient");
```
