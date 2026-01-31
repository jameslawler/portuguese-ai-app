import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import type { DrizzleClient } from "./db"

export function getAuth(db: DrizzleClient) {
    return betterAuth({
        database: drizzleAdapter(db, {
            provider: "sqlite",
        }),
        emailAndPassword: { 
            enabled: true, 
        }
    });
};

export type BetterAuth = ReturnType<typeof getAuth>;
export type AuthUser = BetterAuth["$Infer"]["Session"]["user"];
export type AuthSession = BetterAuth["$Infer"]["Session"]["session"];
