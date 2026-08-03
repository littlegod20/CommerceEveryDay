import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/auth-card";
import { AdminLoginForm } from "@/components/admin/admin-login-form";

export const metadata: Metadata = { title: "Sign In" };

export default function AdminLoginPage() {
  return (
    <AuthCard
      title="Admin Sign In"
      description="Manage products and orders."
      footer="This area is restricted to store administrators."
    >
      <AdminLoginForm />
    </AuthCard>
  );
}
