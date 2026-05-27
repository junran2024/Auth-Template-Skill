# Toast Notifications (Sonner)

## Installation

```bash
npm install sonner
```

## Setup

Add Toaster to root layout (`app/layout.tsx`):

```tsx
import { Toaster } from "sonner";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

## Basic Usage

```tsx
import { toast } from "sonner";

toast.success("Operation successful!");
toast.error("Operation failed");
toast.info("Information message");
toast.warning("Warning message");
toast("Custom message");
```

## With Description

```tsx
toast.error("Login failed", {
  description: "Invalid email or password",
});
```

## Position Control

```tsx
toast.success("Success", {
  position: "top-center",
});
```

Available positions:
- `top-left` | `top-center` | `top-right`
- `bottom-left` | `bottom-center` | `bottom-right`

## Project Conventions

This template uses `position: "top-center"` for all auth-related toasts:

```tsx
// Login success
toast.success("Login successful!", { position: "top-center" });

// Login failure
toast.error("Login failed", {
  position: "top-center",
  description: result.message,
});

// Google redirect
toast.success("Redirect to Google...", { position: "top-center" });
```

## Advanced Usage

### Promise Toast

```tsx
toast.promise(saveData(), {
  loading: "Saving...",
  success: "Saved!",
  error: "Failed to save",
});
```

### Custom Duration

```tsx
toast.success("Success", {
  duration: 5000,  // 5 seconds (default: 4000ms)
});
```

### Manual Dismiss

```tsx
const toastId = toast.loading("Processing...");
// Later
toast.dismiss(toastId);
```
