# Environment Variables Setup

## 1.1 Create .env file

Create a `.env` file in the project root with the following content:

```env
# Auth - Required
BETTER_AUTH_SECRET=<random secret, at least 32 characters>
BETTER_AUTH_URL=<your domain, or http://localhost:3000>
NEXT_PUBLIC_APP_URL=<your domain, or http://localhost:3000>

# Database - Neon PostgreSQL (Required)
DATABASE_URL=<your Neon database connection string>

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=<Google OAuth Client ID>
GOOGLE_CLIENT_SECRET=<Google OAuth Client Secret>

# Resend (Optional, for password reset emails)
RESEND_API_KEY=<Resend API Key>
```

## 1.2 Generate BETTER_AUTH_SECRET

```bash
openssl rand -base64 32
```

## 1.3 Setup Neon Database

1. Visit [Neon](https://neon.tech/) and register
2. Create a new project
3. Copy the database connection string to `DATABASE_URL`

## 1.4 Setup Google OAuth (Optional)

### Get Google Credentials

To use Google as a social login provider, you need Google credentials from Google Cloud Console.

In Google Cloud Console > Credentials > Authorized redirect URIs, set:
- Local dev: `http://localhost:3000/api/auth/callback/google`
- Production: `https://your-domain.com/api/auth/callback/google`

### Create OAuth Credentials

1. Open [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials
2. Click Create Credentials → OAuth client ID
3. Select Web application
4. Add redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (local)
   - `https://your-domain.com/api/auth/callback/google` (production)
5. Copy Client ID and Client Secret to environment variables

> **Note**: These steps help avoid common issues like `redirect_uri_mismatch`.

## 1.5 Setup Resend (Optional)

1. Visit [Resend](https://resend.com/) and register
2. Get API Key from dashboard
