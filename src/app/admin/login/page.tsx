import { redirect } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import { adminSetupIssue, isSignedIn } from "@/lib/admin/auth";
import { SignInForm } from "../_components";

/** Always rendered fresh: whether sign-in is available depends on runtime settings. */
export const dynamic = "force-dynamic";

const SETUP_MESSAGES = {
  credentials: (
    <>
      Sign-in is not set up on this deployment yet: the <code>ADMIN_PASSWORD</code> and{" "}
      <code>ADMIN_SESSION_SECRET</code> settings must be added first.
    </>
  ),
  "shared-storage": (
    <>
      Sign-in is switched off until the dates database (Upstash Redis) is connected. It keeps the sign-in attempt
      limit and the dates shared across the whole website.
    </>
  ),
} as const;

export default async function AdminLoginPage() {
  if (await isSignedIn()) redirect("/admin");
  const issue = adminSetupIssue();

  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <Logo className="mx-auto h-11 w-auto" />
        <div className="mt-8 rounded-3xl border border-surface-border bg-white p-7 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.25)] sm:p-8">
          <h1 className="font-display text-2xl font-medium">Aruba dates</h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-500">
            Private area for the Dentacare team to publish the dates the dentist works in Aruba.
          </p>
          {issue === null ? (
            <SignInForm />
          ) : (
            <p role="alert" className="mt-6 rounded-2xl bg-gold-50 p-4 text-sm leading-relaxed text-gold-800">
              {SETUP_MESSAGES[issue]} See docs/ARUBA-DATES.md.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
