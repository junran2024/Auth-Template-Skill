# Database Setup

## Connection Setup

Create `db/drizzle.ts`:

```typescript
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema";

export const db = drizzle(process.env.DATABASE_URL!, { schema });
```

> **Note**: Next.js auto-loads `.env` files, no need for `dotenv`.

## Schema

Create `db/schema.ts` with authentication tables (user, session, account, verification).

See `templates/schema.ts` for the complete schema file.

## Drizzle Config

Create `drizzle.config.ts`:

```typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

## Run Migrations

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

## Database Tables

| Table | Purpose |
|-------|---------|
| user | User accounts with email, name, image |
| session | Active sessions with tokens |
| account | OAuth accounts and passwords |
| verification | Email verification tokens |

## Relations

- User has many Sessions
- User has many Accounts
- Session belongs to User
- Account belongs to User
