import { cookies } from "next/headers";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createAdminSessionToken,
  verifyAdminSessionToken,
} from "@/lib/auth/admin-session";

export async function setAdminSessionCookie(): Promise<void> {
  const token = await createAdminSessionToken();
  const store = await cookies();
  store.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
    path: "/",
  });
}

export async function clearAdminSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_SESSION_COOKIE);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ADMIN_SESSION_COOKIE)?.value;
  return token ? verifyAdminSessionToken(token) : false;
}
