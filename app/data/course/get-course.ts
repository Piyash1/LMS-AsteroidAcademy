import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export async function getindividualCourse(slug: string) {
  const user = await requireUser();
  const course = await prisma.course.findUnique({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      smallDescription: true,
      fileKey: true,
      level: true,
      category: true,
      duration: true,
      price: true,
    },
  });

  if (!course) {
    return notFound();
  }

  const chapters = await prisma.chapter.findMany({
    where: {
      courseId: course.id,
    },
    select: {
      id: true,
      title: true,
      lesson: {
        select: {
          id: true,
          title: true,
          lessonProgress: {
            where: {
              userId: user.id,
            },
            select: {
              isCompleted: true,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
    orderBy: {
      position: "asc",
    },
  });

  // Calculate generic progress
  const totalLessons = chapters.reduce(
    (acc, chapter) => acc + chapter.lesson.length,
    0
  );

  const completedLessons = chapters.reduce((acc, chapter) => {
    return (
      acc +
      chapter.lesson.filter(
        (lesson) =>
          lesson.lessonProgress.length > 0 &&
          lesson.lessonProgress[0].isCompleted
      ).length
    );
  }, 0);

  const progressPercentage =
    totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return {
    ...course,
    chapter: chapters,
    progressPercentage,
  };
}
