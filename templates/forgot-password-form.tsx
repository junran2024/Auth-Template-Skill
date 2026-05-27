"use client";
import { useState, type SyntheticEvent } from "react";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ForgotPasswordFormProps extends React.ComponentProps<"div"> {
    onSwitchToLogin?: () => void;
}

export function ForgotPasswordForm({
    className,
    onSwitchToLogin,
    ...props
}: ForgotPasswordFormProps) {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { data, error } = await authClient.requestPasswordReset({
                email,
                redirectTo: "/reset-password",
            });
            
            if (!error) {
                setIsSubmitted(true);
                toast.success("Reset email sent!", { position: "top-center" });
            } else {
                toast.error(error.message || "Failed to send reset email", { position: "top-center" });
            }
        } catch (error) {
            toast.error("Network error", { position: "top-center" });
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className={cn("flex flex-col gap-6", className)} {...props}>
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Check Your Email</CardTitle>
                        <CardDescription>
                            We&apos;ve sent a password reset link to {email}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            variant="outline"
                            className="w-full cursor-pointer"
                            onClick={onSwitchToLogin}
                        >
                            Back to Login
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Forgot Password</CardTitle>
                    <CardDescription>
                        Enter your email to receive a reset link
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
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
                            </Field>
                            <Field>
                                <Button type="submit" disabled={isLoading} className="cursor-pointer">
                                    {isLoading ? "Sending..." : "Send Reset Link"}
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                    <p className="text-center text-sm text-muted-foreground mt-4">
                        Remember your password?{" "}
                        <button
                            type="button"
                            onClick={onSwitchToLogin}
                            className="font-medium text-primary hover:underline focus:outline-none bg-transparent border-none p-0 cursor-pointer"
                        >
                            Sign in
                        </button>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
