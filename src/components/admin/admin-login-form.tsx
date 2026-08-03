"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/auth/submit-button";
import { adminLoginAction } from "@/lib/auth/admin-actions";

export function AdminLoginForm() {
  const [state, formAction] = useActionState(adminLoginAction, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="username">Username</Label>
        <Input id="username" name="username" type="text" autoComplete="username" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>
      {state?.error ? <p className="text-sm text-destructive">{state.error}</p> : null}
      <SubmitButton>Sign In</SubmitButton>
    </form>
  );
}
