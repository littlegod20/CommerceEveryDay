"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { getDataSource } from "@/lib/db/data-source";
import { User } from "@/lib/db/entities/user.entity";
import { signIn, signOut } from "@/lib/auth/auth";

export type AuthActionState = { error?: string } | undefined;

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

async function signInWithCredentials(email: string, password: string): Promise<AuthActionState> {
  try {
    await signIn("credentials", { email, password, redirectTo: "/account/orders" });
    return undefined;
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password." };
    }
    throw error;
  }
}

export async function registerAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || !password) {
    return { error: "All fields are required." };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const dataSource = await getDataSource();
  const userRepo = dataSource.getRepository(User);

  const existing = await userRepo.findOneBy({ email });
  if (existing) {
    return { error: "An account with that email already exists." };
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await userRepo.save(userRepo.create({ name, email, passwordHash }));

  return signInWithCredentials(email, password);
}

export async function loginAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  return signInWithCredentials(email, password);
}
