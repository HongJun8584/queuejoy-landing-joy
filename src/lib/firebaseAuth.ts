// Firebase Auth REST helper — uses the Identity Toolkit signUp endpoint.
// The Firebase Web API key is a *publishable* identifier (safe to ship to the
// browser). Set it in the project's environment as VITE_FIREBASE_API_KEY.
// If absent, signUp() resolves to null and callers should gracefully skip the
// Firebase user-creation step (the legacy createBusiness backend will still
// run so the purchase flow is never blocked).

const FIREBASE_API_KEY: string =
  (import.meta as any).env?.VITE_FIREBASE_API_KEY || "";

export interface FirebaseSignUpResult {
  uid: string;
  idToken: string;
  refreshToken: string;
  email: string;
  expiresIn: string;
}

export const isFirebaseAuthConfigured = (): boolean =>
  Boolean(FIREBASE_API_KEY);

/**
 * Create a brand-new Firebase Auth user (email + password).
 * Throws on hard failures (invalid email, weak password, already-registered).
 * Returns null only when the API key is not configured.
 */
export async function firebaseSignUp(
  email: string,
  password: string
): Promise<FirebaseSignUpResult | null> {
  if (!FIREBASE_API_KEY) return null;

  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${encodeURIComponent(
    FIREBASE_API_KEY
  )}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, returnSecureToken: true }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const code = data?.error?.message || "FIREBASE_SIGNUP_FAILED";
    // Friendly mapping for the most common cases.
    const friendly =
      code === "EMAIL_EXISTS"
        ? "That email is already in use. Try signing in or use a different address."
        : code === "WEAK_PASSWORD : Password should be at least 6 characters"
          ? "Please pick a stronger password (at least 6 characters)."
          : code === "INVALID_EMAIL"
            ? "That email address looks invalid."
            : "We couldn't create your account. Please try again.";
    const err = new Error(friendly);
    (err as any).code = code;
    throw err;
  }

  return {
    uid: data.localId,
    idToken: data.idToken,
    refreshToken: data.refreshToken,
    email: data.email,
    expiresIn: data.expiresIn,
  };
}
