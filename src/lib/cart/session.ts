import { cookies } from "next/headers";
import { randomUUID } from "crypto";

const CART_COOKIE = "cart_session_id";
const CART_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

/** Read-only: safe to call from Server Components that only render. */
export async function getCartSessionId(): Promise<string | null> {
  const store = await cookies();
  return store.get(CART_COOKIE)?.value ?? null;
}

/** Mutates cookies, so only callable from Server Actions or Route Handlers. */
export async function getOrCreateCartSessionId(): Promise<string> {
  const store = await cookies();
  const existing = store.get(CART_COOKIE)?.value;
  if (existing) {
    return existing;
  }

  const sessionId = randomUUID();
  store.set(CART_COOKIE, sessionId, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: CART_COOKIE_MAX_AGE,
    path: "/",
  });
  return sessionId;
}
