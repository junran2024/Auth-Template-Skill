# API Routes

## Auth Route

Create `app/api/auth/[...all]/route.ts`:

```typescript
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);
```

This single route handles all Better Auth endpoints:
- `/api/auth/sign-in/email` - Email/password login
- `/api/auth/sign-up/email` - Email registration
- `/api/auth/sign-in/social` - Social login (Google)
- `/api/auth/sign-out` - Logout
- `/api/auth/reset-password` - Password reset
- And more...

## Server Actions

Create `server/users.ts` for server-side auth operations.

See `templates/users.ts` for the complete file.

### Available Functions

| Function | Purpose |
|----------|---------|
| `signIn(email, password)` | Email/password login |
| `signUp(email, password, name)` | User registration |
| `getCurrentUser()` | Get current session user |

### Return Types

```typescript
type SignInResult = {
    success: boolean;
    message?: string;
    data?: any;
};

type SignUpResult = {
    success: boolean;
    message?: string;
    data?: any;
};
```

## Error Handling

All server actions return `{ success: boolean, message?: string }` pattern:
- `success: true` with `data` on success
- `success: false` with `message` on failure
- Error messages extracted from Better Auth error body
