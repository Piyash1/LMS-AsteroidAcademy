"use server";

import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function markLessonCompleted(lessonId: string) {
  const user = await requireUser();

  // Check if progress exists
  const progress = await prisma.lessonProgress.findUnique({
    where: {
      lessonId_userId: {
        lessonId: lessonId,
        userId: user.id,
      },
    },
  });

  if (progress) {
    // Toggle completion
    await prisma.lessonProgress.update({
      where: {
        id: progress.id,
      },
      data: {
        isCompleted: !progress.isCompleted,
      },
    });
  } else {
    // Create new progress record
    await prisma.lessonProgress.create({
      data: {
        lessonId: lessonId,
        userId: user.id,
        isCompleted: true,
      },
    });
  }

  revalidatePath("/dashboard/[slug]");
}
