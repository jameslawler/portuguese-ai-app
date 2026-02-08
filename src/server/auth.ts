import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import type { DrizzleClient } from "./db";

const encoder = new TextEncoder();

async function sha256(input: string): Promise<string> {
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function hashPassword(password: string) {
  const salt = crypto.randomUUID();
  const hash = await sha256(`${salt}:${password}`);

  return `${salt}:${hash}`;
}

export async function verifyPassword({
  password,
  hash,
}: {
  password: string;
  hash: string;
}) {
  const [salt, storedHash] = hash.split(":");

  if (!salt || !storedHash) {
    return false;
  }

  const candidate = await sha256(`${salt}:${password}`);
  return candidate === storedHash;
}

export function getAuth(db: DrizzleClient) {
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "sqlite",
    }),
    emailAndPassword: {
      enabled: true,
      password: {
        hash: hashPassword,
        verify: verifyPassword,
      },
    },
  });
}

export type BetterAuth = ReturnType<typeof getAuth>;
export type AuthUser = BetterAuth["$Infer"]["Session"]["user"];
export type AuthSession = BetterAuth["$Infer"]["Session"]["session"];
