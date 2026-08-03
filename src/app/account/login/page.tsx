import type { Metadata } from "next";
import { AuthCard, AuthSwitchLink } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = { title: "Sign In" };

export default function LoginPage() {
  return (
    <AuthCard
      title="Sign In"
      description="Access your order history."
      footer={
        <>
          New here? <AuthSwitchLink href="/account/register" label="Create an account" />
        </>
      }
    >
      <LoginForm />
    </AuthCard>
  );
}
