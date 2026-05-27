import Link from "next/link";
import { getCurrentUser } from "@/server/users";
import { buttonVariants } from "@/components/ui/button";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl mb-8">Auth Template</h1>
      {user ? (
        <div className="text-2xl">
          Welcome, {user.name || user.email}
        </div>
      ) : (
        <div className="flex gap-4">
          <Link
            href="/login"
            className={buttonVariants({ size: "lg" })}
          >
            Go to Login
          </Link>
        </div>
      )}
    </main>
  );
}
