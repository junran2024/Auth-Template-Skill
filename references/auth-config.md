# Authentication Configuration

## Server Config (lib/auth.ts)

See `templates/auth.ts` for the complete file.

Key configurations:
- **Social Providers**: Google OAuth with account linking
- **Email/Password**: Enabled with reset password support
- **Database**: Drizzle adapter for PostgreSQL
- **Plugins**: nextCookies for cookie management

## Client Config (lib/auth-client.ts)

See `templates/auth-client.ts` for the complete file.

Uses `createAuthClient` from `better-auth/react` with the app URL.

## Account Linking

The template enables automatic account linking for users with the same email:

```typescript
account: {
    accountLinking: {
        enabled: true,
        trustedProviders: ["google"],
        allowUnverifiedEmail: true,
    },
},
```

## Password Reset

The template includes password reset via email:

1. User requests reset → `sendResetPassword` function called
2. Reset link generated with token
3. Email sent via Resend (if API key configured)
4. Link logged to console in development mode

## Environment Variables Required

| Variable | Required | Purpose |
|----------|----------|---------|
| BETTER_AUTH_SECRET | Yes | JWT signing secret |
| BETTER_AUTH_URL | Yes | Auth server URL |
| NEXT_PUBLIC_APP_URL | Yes | Client-side app URL |
| GOOGLE_CLIENT_ID | No | Google OAuth |
| GOOGLE_CLIENT_SECRET | No | Google OAuth |
| RESEND_API_KEY | No | Password reset emails |
