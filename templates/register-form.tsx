"use client";
import { useState, type SyntheticEvent } from "react"
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signUp } from "@/server/users"
import { toast } from "sonner"

interface RegisterFormProps extends React.ComponentProps<"div"> {
  onSwitchToLogin?: () => void;
  redirectTo?: string;
}

export function RegisterForm({
  className,
  onSwitchToLogin,
  redirectTo = "/",
  ...props
}: RegisterFormProps) {
  const [email, setEmail] = useState("")
  const isEmailFormatValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  const handleSignUp = async (e: SyntheticEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const result = await signUp(email, password, name)
      if (result.success) {
        toast.success("Registration successful! Redirecting...", { position: "top-center" })
        router.push(redirectTo);
      } else {
        toast.error("Registration failed", {
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

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <FieldGroup>
              <Field>
                <FieldLabel>Username</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Field>

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
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 8 characters"
                  minLength={8}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password.length > 1 && password.length < 8 && (
                  <p className="text-xs mt-1 text-destructive">Password must be at least 8 characters</p>
                )}
              </Field>
              
              <Field>
                <Button type="submit" disabled={isLoading || password.length < 8 || !isEmailFormatValid || name.length < 1} className="cursor-pointer">
                  {isLoading ? "Loading..." : "Register"}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="font-medium text-primary hover:underline focus:outline-none bg-transparent border-none p-0 cursor-pointer"
                  >
                    Sign in
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
