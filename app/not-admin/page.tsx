import { ShieldX, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotAdminPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-muted/30 to-background p-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-destructive/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-md w-full">
        {/* Main Card */}
        <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl p-8 text-center space-y-6">
          {/* Icon Container */}
          <div className="mx-auto w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center ring-4 ring-destructive/20">
            <ShieldX className="w-10 h-10 text-destructive" strokeWidth={1.5} />
          </div>

          {/* Text Content */}
          <div className="space-y-3">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Access Denied
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              You don&apos;t have administrator privileges to access this page.
              Please contact your system administrator if you believe this is an
              error.
            </p>
          </div>

          {/* Error Code Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
            Error 403 — Forbidden
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button asChild variant="outline" className="flex-1 gap-2">
              <Link href="/">
                <Home className="w-4 h-4" />
                Go Home
              </Link>
            </Button>
            <Button asChild className="flex-1 gap-2">
              <Link href="/login">
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </Button>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Need help?{" "}
          <Link
            href="/support"
            className="text-primary hover:underline underline-offset-2"
          >
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}
