"use client";
import { useState, type SyntheticEvent } from "react"
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signIn } from "@/server/users"
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner"

interface LoginFormProps extends React.ComponentProps<"div"> {
  onSwitchToRegister?: () => void;
  onForgotPassword?: () => void;
  redirectTo?: string;
}

export function LoginForm({
  className,
  onSwitchToRegister,
  onForgotPassword,
  redirectTo = "/",
  ...props
}: LoginFormProps) {
  const [email, setEmail] = useState("")
  const isEmailFormatValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const router = useRouter();

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const result = await signIn(email, password)
      if (result.success) {
        toast.success("Login successful!", { position: "top-center" })
        router.push(redirectTo);
      } else {
        toast.error("Login failed", {
          position: "top-center",
          description: result.message,
        })
      }
    } catch (networkError) {
      console.error("Network Error", networkError)
      toast.error("Network Error")
    } finally {
      setIsLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    setIsGoogleLoading(true)
    try {
      await authClient.signIn.social({ provider: "google" })
      toast.success("Redirect to Google...", { position: "top-center" })
    } catch (error) {
      console.error("Login with Google failed", error)
      toast.error("Login with Google failed", {
        position: "top-center",
        description: error instanceof Error ? error.message : "Please try it later",
      })
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>Login with your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <FieldGroup>
              <Field>
                <Button
                  variant="outline"
                  type="button"
                  onClick={signInWithGoogle}
                  disabled={isGoogleLoading || isLoading}
                  className="cursor-pointer"
                >
                  {isGoogleLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Connecting
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="currentColor" />
                      </svg>
                      Login with Google
                    </>
                  )}
                </Button>
              </Field>
              
              <FieldSeparator>Or continue with</FieldSeparator>
              
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {email && !isEmailFormatValid && (
                  <p className="text-xs mt-1 text-destructive">Invalid email address</p>
                )}
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <button
                    type="button"
                    onClick={onForgotPassword}
                    className="ml-auto text-sm underline-offset-4 hover:underline bg-transparent border-none p-0 cursor-pointer"
                  >
                    Forgot your password?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password.length > 1 && password.length < 8 && (
                  <p className="text-xs mt-1 text-destructive">Password must be at least 8 characters</p>
                )}
              </Field>
              
              <Field>
                <Button type="submit" disabled={isLoading || password.length < 8 || !isEmailFormatValid} className="cursor-pointer">
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={onSwitchToRegister}
                    className="font-medium text-primary hover:underline focus:outline-none bg-transparent border-none p-0 cursor-pointer"
                  >
                    Register
                  </button>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
