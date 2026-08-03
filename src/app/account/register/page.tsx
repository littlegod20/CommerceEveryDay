import type { Metadata } from "next";
import { AuthCard, AuthSwitchLink } from "@/components/auth/auth-card";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = { title: "Create Account" };

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create Account"
      description="Save your details for faster checkout and order tracking."
      footer={
        <>
          Already have an account? <AuthSwitchLink href="/account/login" label="Sign in" />
        </>
      }
    >
      <RegisterForm />
    </AuthCard>
  );
}
