# Auth Template Skill

A reusable authentication template skill for Next.js 16 applications. This skill provides a complete authentication solution with email/password login, Google OAuth, password reset, and session management.

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

## Project Structure

```
auth-template-skill/
├── references/                    # Documentation and guides
│   ├── api-routes.md
│   ├── auth-config.md
│   ├── database-setup.md
│   ├── dependencies.md
│   ├── env-setup.md
│   ├── route-protection.md
│   ├── toast-system.md
│   └── ui-components.md
├── templates/                     # Ready-to-use code templates
│   ├── ui/                        # UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── field.tsx
│   │   └── input.tsx
│   ├── auth.ts                    # Server-side auth config
│   ├── auth-client.ts             # Client-side auth config
│   ├── schema.ts                  # Database schema
│   ├── users.ts                   # Server actions
│   ├── route.ts                   # API routes
│   ├── proxy.ts                   # Route protection
│   ├── login-form.tsx             # Login form component
│   ├── register-form.tsx          # Registration form
│   ├── forgot-password-form.tsx   # Forgot password form
│   ├── reset-password-form.tsx    # Reset password form
│   └── ...                        # Other template files
└── SKILL.md                       # Skill definition and usage guide
```

## Quick Start

### 1. Install Dependencies

```bash
npm install better-auth drizzle-orm @neondatabase/serverless sonner class-variance-authority clsx tailwind-merge
npm install -D drizzle-kit tailwindcss @tailwindcss/postcss postcss
```

For password reset emails:
```bash
npm install resend
```

### 2. Environment Setup

Copy `templates/env.example` to `.env` and configure:

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

### 3. Database Setup

1. Copy `templates/schema.ts` to your project
2. Run database migrations:
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

### 4. Authentication Configuration

1. Copy `templates/auth.ts` and `templates/auth-client.ts` to your project
2. Configure your auth providers in `auth.ts`

### 5. API Routes

Copy `templates/route.ts` to `app/api/auth/[...all]/route.ts`

### 6. UI Components

Copy the UI components from `templates/ui/` to your project's `components/ui/` directory.

## Usage

This skill is designed to be used with OpenCode. When users request authentication features, the skill will:

1. Assess their needs (email+password, Google login, password reset)
2. Guide them through environment setup
3. Provide step-by-step implementation guidance
4. Supply ready-to-use code templates

## Implementation Rules

- Never combine all parts in one response
- Always confirm each step before proceeding
- Use Sonner for all toast notifications (position: "top-center")
- Use hand-written shadcn-style components (no Radix UI dependency)
- All form components support `onSwitchTo*` callbacks for form switching
- Password minimum length: 8 characters
- Email validation via regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

## File Mapping

The templates are designed to be copied to specific locations in your Next.js project:

| Template File | Target Location |
|---------------|-----------------|
| `templates/env.example` | `.env` |
| `templates/package.json` | `package.json` |
| `templates/schema.ts` | `db/schema.ts` |
| `templates/auth.ts` | `lib/auth.ts` |
| `templates/auth-client.ts` | `lib/auth-client.ts` |
| `templates/users.ts` | `server/users.ts` |
| `templates/route.ts` | `app/api/auth/[...all]/route.ts` |
| `templates/proxy.ts` | `proxy.ts` |
| `templates/login-form.tsx` | `components/login-form.tsx` |
| `templates/register-form.tsx` | `components/register-form.tsx` |
| `templates/ui/*` | `components/ui/*` |

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT