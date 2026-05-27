"use client";
import { useState } from "react";
import { LoginForm } from "@/components/login-form";
import { RegisterForm } from "@/components/register-form";
import { ForgotPasswordForm } from "@/components/forgot-password-form";
import Link from 'next/link';

export default function LoginPage() {
const [formType, setFormType] = useState<"login" | "register" | "forgot-password">("login");

  return (
    <main className="flex w-full flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="absolute top-6 right-6">
        <Link
          href="/"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-200 hover:bg-gray-300"
        >
          ✕
        </Link>
      </div>

      <div className="w-full px-6 md:w-[470px]">
        {formType === "login" ? (
          <LoginForm
            onSwitchToRegister={() => setFormType("register")}
            onForgotPassword={() => setFormType("forgot-password")}
          />
        ) : formType === "register" ? (
          <RegisterForm
            onSwitchToLogin={() => setFormType("login")}
          />
        ) : (
          <ForgotPasswordForm
            onSwitchToLogin={() => setFormType("login")}
          />
        )}
      </div>
    </main>
  );
}
