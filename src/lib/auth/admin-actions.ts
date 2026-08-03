"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { clearAdminSessionCookie, setAdminSessionCookie } from "@/lib/auth/admin-cookies";

export type AdminAuthActionState = { error?: string } | undefined;

export async function adminLoginAction(
  _prevState: AdminAuthActionState,
  formData: FormData,
): Promise<AdminAuthActionState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  const expectedUsername = process.env.ADMIN_USERNAME;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedUsername || !passwordHash) {
    return { error: "Admin credentials are not configured." };
  }
  if (!username || !password) {
    return { error: "Username and password are required." };
  }
  if (username !== expectedUsername) {
    return { error: "Invalid username or password." };
  }

  const isValid = await bcrypt.compare(password, passwordHash);
  if (!isValid) {
    return { error: "Invalid username or password." };
  }

  await setAdminSessionCookie();
  redirect("/admin");
}

export async function adminLogoutAction() {
  await clearAdminSessionCookie();
  redirect("/admin/login");
}
