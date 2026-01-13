import "server-only";
import { requireUser } from "./require-user";
import { prisma } from "@/lib/db";

export async function getEnrolledCourses() {
  const user = await requireUser();

  const data = await prisma.enrollment.findMany({
    where: {
      userId: user.id,
      status: "ACTIVE",
    },
    select: {
      course: {
        select: {
          id: true,
          title: true,
          smallDescription: true,
          slug: true,
          fileKey: true,
          level: true,
          duration: true,
          chapter: {
            select: {
              id: true,
              lesson: {
                select: {
                  id: true,
                  lessonProgress: {
                    where: {
                      userId: user.id,
                    },
                    select: {
                      isCompleted: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return data;
}
