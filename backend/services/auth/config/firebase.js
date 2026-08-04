import "dotenv/config";
import { cert, initializeApp } from "firebase-admin";
import { existsSync, readFileSync } from "node:fs";

const localServiceAccountPath = new URL("../serviceAccountKey.json", import.meta.url);

function loadServiceAccount() {
  const configuredAccount = process.env.FIREBASE_SERVICE_ACCOUNT?.trim();

  if (configuredAccount) {
    try {
      return JSON.parse(configuredAccount);
    } catch {
      if (!existsSync(localServiceAccountPath)) {
        throw new Error(
          "FIREBASE_SERVICE_ACCOUNT must be a single-line valid JSON value.",
        );
      }

      console.warn(
        "FIREBASE_SERVICE_ACCOUNT is invalid; using local serviceAccountKey.json.",
      );
    }
  }

  if (existsSync(localServiceAccountPath)) {
    return JSON.parse(readFileSync(localServiceAccountPath, "utf8"));
  }

  throw new Error(
    "Firebase credentials are missing. Set FIREBASE_SERVICE_ACCOUNT in the deployment environment.",
  );
}

export const app = initializeApp({
  credential: cert(loadServiceAccount()),
});
