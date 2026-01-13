import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export async function getLesson(lessonId: string) {
  const user = await requireUser();
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      videoKey: true,
      thumbnailKey: true,
      chapter: {
        select: {
          course: {
            select: {
              slug: true,
            },
          },
        },
      },
      lessonProgress: {
        where: {
          userId: user.id,
        },
        select: {
          isCompleted: true,
        },
      },
    },
  });

  if (!lesson) {
    return notFound();
  }

  return lesson;
}
