import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headerList = await headers();

  const signature = headerList.get("Stripe-Signature") as string;

  if (!signature) {
    console.error("No Stripe-Signature header found");
    return new Response("No signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
    console.log(`Webhook event received: ${event.type}`);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new Response(`Webhook error: ${err.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    console.log("Checkout session completed event processing...");
    const courseId = session.metadata?.courseId;
    const userId = session.metadata?.userId;
    const enrollmentId = session.metadata?.enrollmentId;

    console.log(
      `Metadata - courseId: ${courseId}, userId: ${userId}, enrollmentId: ${enrollmentId}`
    );

    if (!courseId || !userId || !enrollmentId) {
      console.error("Missing metadata in Stripe session:", session.metadata);
      return new Response("Missing metadata", { status: 400 });
    }

    try {
      const updatedEnrollment = await prisma.enrollment.update({
        where: {
          id: enrollmentId,
        },
        data: {
          status: "ACTIVE",
          amount: session.amount_total as number,
        },
      });

      console.log(
        `Successfully activated enrollment ${enrollmentId} for user ${userId}. New status: ${updatedEnrollment.status}`
      );
    } catch (error) {
      console.error("Failed to update enrollment in database:", error);
      return new Response("Database update failed", { status: 500 });
    }
  }

  return new Response("Success", { status: 200 });
}
