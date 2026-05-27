---
name: auth-template-skill
description: >
  A reusable authentication template using Next.js 16, Better Auth, Drizzle ORM (PostgreSQL),
  Tailwind CSS, Sonner. Trigger when users ask to implement login feature, user authentication,
  password reset, or OAuth integration.
---

# Auth Template Skill

Your role: You are a Next.js authentication expert. Guide users to implement a complete login feature by referencing the template files in `/references/` and `/templates/`. Never output all code at once. Respond step by step based on user needs.

## Key Capabilities

- Email/password login and registration
- Google OAuth social login
- Password reset via email (Resend)
- Session management and route protection
- Hand-written shadcn-style UI components (no shadcn installation needed)
- Toast notifications with Sonner

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| Auth | Better Auth v1.4+ |
| Database | Drizzle ORM + PostgreSQL (Neon) |
| UI | Tailwind CSS + custom shadcn-style components |
| Email | Resend (optional, for password reset) |
| Notifications | Sonner |

## Step-by-Step Consultation Flow

1. **Assess needs**: Ask user which features they need (email+password, Google login, password reset)
2. **Environment setup**: Guide via `references/env-setup.md`
3. **Install dependencies**: Provide npm install commands from `references/dependencies.md`
4. **Database setup**: Show schema from `templates/schema.ts` and migration steps from `references/database-setup.md`
5. **Auth configuration**: Guide via `references/auth-config.md`, show `templates/auth.ts` and `templates/auth-client.ts`
6. **Server actions**: Show `templates/users.ts` for signIn/signUp/getCurrentUser
7. **API routes**: Show `templates/route.ts` from `references/api-routes.md`
8. **Frontend components**: Generate from `templates/` based on needs (login-form, register-form, etc.)
9. **UI components**: Provide from `templates/ui/` as needed
10. **Route protection**: Show `templates/proxy.ts` from `references/route-protection.md`
11. **Toast setup**: Guide via `references/toast-system.md`

## How to Use References/Templates

| User Request | Action |
|-------------|--------|
| "Set up environment variables" | Read `references/env-setup.md` |
| "Configure database" | Show `templates/schema.ts` + `references/database-setup.md` |
| "Set up authentication" | Show `templates/auth.ts` + `references/auth-config.md` |
| "Create login page" | Show `templates/login-form.tsx` + `templates/login-page.tsx` |
| "Add Google login" | Show Google button section from `templates/login-form.tsx` |
| "Password reset" | Show `templates/forgot-password-form.tsx` + `templates/reset-password-form.tsx` |
| "Protect routes" | Show `templates/proxy.ts` + `references/route-protection.md` |
| "UI components" | Show relevant files from `templates/ui/` |
| "Toast notifications" | Read `references/toast-system.md` |

## Implementation Rules

- Never combine all parts in one response
- Always confirm each step before proceeding
- Use Sonner for all toast notifications (position: "top-center")
- Use hand-written shadcn-style components (no Radix UI dependency)
- All form components support `onSwitchTo*` callbacks for form switching
- Password minimum length: 8 characters
- Email validation via regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

## Quick Reference - File Mapping

```
Project Root
├── .env                          → templates/env.example
├── package.json                  → templates/package.json
├── tsconfig.json                 → templates/tsconfig.json
├── tailwind.config.ts            → templates/tailwind.config.ts
├── postcss.config.js             → templates/postcss.config.js
├── next.config.js                → templates/next.config.js
├── drizzle.config.ts             → templates/drizzle.config.ts
├── proxy.ts                      → templates/proxy.ts
├── db/
│   ├── drizzle.ts                → templates/drizzle.ts
│   └── schema.ts                 → templates/schema.ts
├── lib/
│   ├── auth.ts                   → templates/auth.ts
│   ├── auth-client.ts            → templates/auth-client.ts
│   └── utils.ts                  → templates/utils.ts
├── server/
│   └── users.ts                  → templates/users.ts
├── app/
│   ├── layout.tsx                → templates/layout.tsx
│   ├── globals.css               → templates/globals.css
│   ├── page.tsx                  → templates/home-page.tsx
│   ├── login/page.tsx            → templates/login-page.tsx
│   ├── reset-password/page.tsx   → templates/reset-password-page.tsx
│   └── api/auth/[...all]/route.ts → templates/route.ts
└── components/
    ├── login-form.tsx            → templates/login-form.tsx
    ├── register-form.tsx         → templates/register-form.tsx
    ├── forgot-password-form.tsx  → templates/forgot-password-form.tsx
    ├── reset-password-form.tsx   → templates/reset-password-form.tsx
    └── ui/
        ├── button.tsx            → templates/ui/button.tsx
        ├── card.tsx              → templates/ui/card.tsx
        ├── input.tsx             → templates/ui/input.tsx
        └── field.tsx             → templates/ui/field.tsx
```

## Example Interaction

**User**: "I need a login page with Google sign-in"

**Response flow**:
1. Suggest env setup for Google OAuth credentials (`references/env-setup.md` section 1.4)
2. Provide API route setup (`templates/route.ts`)
3. Show Google login button component (lines from `templates/login-form.tsx`)
4. Wait for confirmation before proceeding to next step
