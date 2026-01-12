"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";
import { useConfetti } from "@/hooks/useConfetti";

export default function PaymentSuccessPage() {
  const { triggerConfetti } = useConfetti();

  useEffect(() => {
    triggerConfetti();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md border-2 border-emerald-500/20 bg-card shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
            <CheckCircle2 className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            Payment Successful!
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Thank you for your purchase. You're now officially enrolled!
          </p>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-sm leading-relaxed text-muted-foreground">
            We've sent a confirmation email to your inbox. You can now start
            learning and accessing all the course materials.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button
            asChild
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Link href="/dashboard">Go to My Courses</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Return Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
