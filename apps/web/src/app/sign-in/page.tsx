import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";
import { Container } from "@/components/container";

// Placeholder until apps/dashboard ships sign-in (set NEXT_PUBLIC_DASHBOARD_URL to link there instead).
export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false },
};

export default function SignInPage() {
  return (
    <Container className="flex justify-center py-24">
      <div className="w-full max-w-md rounded-2xl border border-line bg-white p-8 text-center shadow-sm">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand-50">
          <LogIn aria-hidden className="size-6 text-brand-600" />
        </span>
        <h1 className="mt-5 text-2xl font-bold">Accounts are coming soon</h1>
        <p className="mt-3 text-sm text-muted">
          Signing in for customers and creators opens with the WIHARD dashboard. Until then, you can explore products
          and tell us what you need.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/templates"
            className="flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-sm font-medium text-white hover:bg-brand-700"
          >
            Explore templates <ArrowRight aria-hidden className="size-4" />
          </Link>
          <Link href="/contact" className="rounded-lg border border-line px-5 py-3 text-sm font-medium hover:bg-surface">
            Contact us
          </Link>
        </div>
      </div>
    </Container>
  );
}
