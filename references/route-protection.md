# Route Protection

## Proxy Configuration

Create `proxy.ts` in project root:

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const sessionToken = request.cookies.get("better-auth.session_token")?.value;
  
  const protectedPaths = ["/dashboard", "/profile", "/settings"];
  const isProtected = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !sessionToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"],
};
```

## How It Works

1. Checks for `better-auth.session_token` cookie
2. Matches against protected routes
3. Redirects to `/login` if no session found
4. Preserves original URL in `from` query parameter

## Customization

### Add Protected Routes

Edit the `protectedPaths` array:

```typescript
const protectedPaths = ["/dashboard", "/profile", "/settings", "/admin"];
```

Update the matcher:

```typescript
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*", "/admin/:path*"],
};
```

### Custom Redirect

Change the login URL:

```typescript
const loginUrl = new URL("/auth/login", request.url);
```

## Alternative: Server-Side Check

For page-level protection, use `getCurrentUser()`:

```tsx
import { getCurrentUser } from "@/server/users";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/login");
  }
  
  return <div>Welcome, {user.name}</div>;
}
```

## Session Token

The session token cookie name is `better-auth.session_token`. This is set by Better Auth automatically after successful authentication.
