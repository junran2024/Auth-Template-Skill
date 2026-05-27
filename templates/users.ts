"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type SignUpResult = {
    success: boolean;
    message?: string;
    data?: any;
};

type SignInResult = {
    success: boolean;
    message?: string;
    data?: any;
};

export const signIn = async (email: string, password: string): Promise<SignInResult> => {
    try {
        const res = await auth.api.signInEmail({
            body: { email, password }
        });
        return { success: true, data: res };
    } catch (error: any) {
        console.error("Sign in error:", error);
        const errorMessage = error?.body?.message || error.message || "登录失败";
        return { success: false, message: errorMessage };
    }
}

export const signUp = async (email: string, password: string, name: string): Promise<SignUpResult> => {
    try {
        const res = await auth.api.signUpEmail({
            body: { email, password, name }
        });
        return { success: true, data: res };
    } catch (error: any) {
        console.error("Sign up error:", error);
        const errorMessage = error?.body?.message || error.message || "注册失败，请稍后重试";
        return { success: false, message: errorMessage };
    }
}

export async function getCurrentUser() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return null;
    }

    return session.user;
  } catch (error) {
    console.error("Failed to get session:", error);
    return null;
  }
}
