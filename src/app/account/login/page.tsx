import type { Metadata } from "next";
import { AuthCard, AuthSwitchLink } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = { title: "Sign In" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;
  const registerHref = callbackUrl
    ? `/account/register?callbackUrl=${encodeURIComponent(callbackUrl)}`
    : "/account/register";

  return (
    <AuthCard
      title="Sign In"
      description="Access your order history."
      footer={
        <>
          New here? <AuthSwitchLink href={registerHref} label="Create an account" />
        </>
      }
    >
      <LoginForm callbackUrl={callbackUrl} />
    </AuthCard>
  );
}
