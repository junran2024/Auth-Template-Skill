# Auth Template Skill

Start from an empty folder — this skill generates a complete authentication solution for Next.js 16 applications, including email/password login, Google OAuth, password reset, and session management.

## Quick Start

### 1. Use AI

Copy and paste the following prompt to your AI assistant:
> Build an authentication system with UI, toast notifications, database and route protection.

### 2. Environment Setup

```env
# Auth - Required
BETTER_AUTH_SECRET=<random secret, at least 32 characters>
BETTER_AUTH_URL=<your domain, or http://localhost:3000>
NEXT_PUBLIC_APP_URL=<your domain, or http://localhost:3000>

# Database - Neon PostgreSQL (Required)
DATABASE_URL=<your Neon database connection string>

# Google OAuth 
GOOGLE_CLIENT_ID=<Google OAuth Client ID>
GOOGLE_CLIENT_SECRET=<Google OAuth Client Secret>

# Resend (for password reset emails)
RESEND_API_KEY=<Resend API Key>
```

### 3. Start the App

```bash
npm run dev
```

Run database migrations:

```bash
npm run db:generate
npm run db:migrate
```

## Features

- Email/password login and registration
- Google OAuth social login
- Password reset via email (Resend)
- Session management and route protection
- Hand-written shadcn-style UI components (no shadcn installation needed)
- Toast notifications with Sonner

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Auth | Better Auth v1.4+ |
| Database | Drizzle ORM + PostgreSQL (Neon) |
| UI | Tailwind CSS + custom shadcn-style components |
| Email | Resend (optional, for password reset) |
| Notifications | Sonner |

## Implementation Rules

- Never combine all parts in one response
- Always confirm each step before proceeding
- Use Sonner for all toast notifications (position: "top-center")
- Use hand-written shadcn-style components (no Radix UI dependency)
- All form components support `onSwitchTo*` callbacks for form switching
- Password minimum length: 8 characters
- Email validation via regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT
