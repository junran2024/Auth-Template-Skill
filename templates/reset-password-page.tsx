import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/reset-password-form";

export default function ResetPasswordPage() {
    return (
        <main className="flex w-full flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full px-6 md:w-[470px]">
                <Suspense fallback={<div>Loading...</div>}>
                    <ResetPasswordForm />
                </Suspense>
            </div>
        </main>
    );
}
