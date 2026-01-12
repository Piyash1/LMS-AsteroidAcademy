"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { fixedWindow } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchemas";
import { request } from "@arcjet/next";

const aj = arcjet.withRule(
  fixedWindow({
    mode: "LIVE",
    window: "1m",
    max: 5,
  })
);

export async function createCourse(
  values: CourseSchemaType
): Promise<ApiResponse> {
  const session = await requireAdmin();

  if (!session || !session.user) {
    return { status: "error", message: "Unauthorized" };
  }

  const req = await request();
  const decision = await aj.protect(req, {
    fingerprint: session.user.id,
  });

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return {
        status: "error",
        message: "You have been blocked due to too many requests",
      };
    } else {
      return { status: "error", message: "Too many requests" };
    }
  }

  // Double check validation
  const validatedFields = courseSchema.safeParse(values);

  if (!validatedFields.success) {
    return { status: "error", message: "Invalid fields" };
  }

  const data = await stripe.products.create({
    name: validatedFields.data.title,
    description: validatedFields.data.smallDescription,
    default_price_data: {
      currency: "usd",
      unit_amount: validatedFields.data.price * 100,
    },
  });
  await prisma.course.create({
    data: {
      ...validatedFields.data,
      userId: session?.user.id as string,
      stripePriceId: data.default_price as string,
    },
  });

  return { status: "success", message: "Course created successfully" };
}
