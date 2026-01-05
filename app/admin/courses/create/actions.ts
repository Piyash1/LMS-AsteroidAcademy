"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchemas";
import { request } from "@arcjet/next";

const aj = arcjet
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    })
  )
  .withRule(
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

  const {
    title,
    description,
    fileKey,
    price,
    duration,
    level,
    category,
    smallDescription,
    slug,
    status,
  } = validatedFields.data;

  await prisma.course.create({
    data: {
      title,
      description,
      fileKey,
      price,
      duration,
      level,
      category,
      smallDescription,
      slug,
      status,
      userId: session.user.id,
    },
  });

  return { status: "success", message: "Course created successfully" };
}
