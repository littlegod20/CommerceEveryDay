import type { Metadata } from "next";
import { AuthCard, AuthSwitchLink } from "@/components/auth/auth-card";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = { title: "Create Account" };

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;
  const loginHref = callbackUrl
    ? `/account/login?callbackUrl=${encodeURIComponent(callbackUrl)}`
    : "/account/login";

  return (
    <AuthCard
      title="Create Account"
      description="Save your details for faster checkout and order tracking."
      footer={
        <>
          Already have an account? <AuthSwitchLink href={loginHref} label="Sign in" />
        </>
      }
    >
      <RegisterForm callbackUrl={callbackUrl} />
    </AuthCard>
  );
}
