import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import { schema } from "@/db/schema";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },

    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ["google"],
            allowUnverifiedEmail: true,
        },
    },

    emailAndPassword: {
        enabled: true,
        
        sendResetPassword: async ({ user, token }) => {
            const resetLink = `${process.env.BETTER_AUTH_URL}/reset-password?token=${token}`;
            
            console.log(`\n=========================================`);
            console.log(`🔐 [Local Dev] Reset password link for ${user.email}:`);
            console.log(`${resetLink}`);
            console.log(`=========================================\n`);
            
            if (!resend) {
                console.warn("RESEND_API_KEY is not set. Skipping email send.");
                return;
            }
            
            const { data, error } = await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: user.email,
                subject: 'Reset your password',
                html: `<p>Hello ${user.name || 'User'},</p><p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
            });
            
            if (error) {
                console.error("Resend API Error:", error);
            }
        },
    },
    
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
    plugins: [nextCookies()]
});
