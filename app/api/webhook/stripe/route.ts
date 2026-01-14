import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headerList = await headers();

  const signature = headerList.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch {
    return new Response("Webhook error", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const courseId = session.metadata?.courseId;
    const userId = session.metadata?.userId;
    const enrollmentId = session.metadata?.enrollmentId;

    if (!courseId || !userId || !enrollmentId) {
      console.error("Missing metadata in Stripe session:", session.metadata);
      return new Response("Missing metadata", { status: 400 });
    }

    try {
      await prisma.enrollment.update({
        where: {
          id: enrollmentId,
        },
        data: {
          status: "ACTIVE",
          amount: session.amount_total as number,
        },
      });

      console.log(
        `Successfully activated enrollment ${enrollmentId} for user ${userId}`
      );
    } catch (error) {
      console.error("Failed to update enrollment in webhook:", error);
      return new Response("Database update failed", { status: 500 });
    }
  }

  return new Response("Success", { status: 200 });
}
