"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import {
  chapterSchema,
  ChapterSchemaType,
  courseSchema,
  CourseSchemaType,
  lessonSchema,
  LessonSchemaType,
} from "@/lib/zodSchemas";
import { request } from "@arcjet/next";
import { revalidatePath } from "next/cache";

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

export async function editCourse(
  data: CourseSchemaType,
  courseId: string
): Promise<ApiResponse> {
  const user = await requireAdmin();

  try {
    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: user.user.id,
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
    const result = courseSchema.safeParse(data);

    if (!result.success) {
      return {
        status: "error",
        message: "Invalid course data",
      };
    }

    await prisma.course.update({
      where: {
        id: courseId,
        userId: user.user.id,
      },
      data: {
        ...result.data,
      },
    });

    return {
      status: "success",
      message: "Course updated successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to update course",
    };
  }
}

export async function reorderChapters(
  courseId: string,
  chapters: { id: string; position: number }[]
): Promise<ApiResponse> {
  const user = await requireAdmin();

  try {
    await prisma.$transaction(
      chapters.map((chapter) =>
        prisma.chapter.update({
          where: {
            id: chapter.id,
            courseId: courseId,
          },
          data: {
            position: chapter.position,
          },
        })
      )
    );

    return {
      status: "success",
      message: "Chapters reordered successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to reorder chapters",
    };
  }
}

export async function reorderLessons(
  chapterId: string,
  lessons: { id: string; position: number }[]
): Promise<ApiResponse> {
  const user = await requireAdmin();

  try {
    await prisma.$transaction(
      lessons.map((lesson) =>
        prisma.lesson.update({
          where: {
            id: lesson.id,
            chapterId: chapterId,
          },
          data: {
            position: lesson.position,
          },
        })
      )
    );

    return {
      status: "success",
      message: "Lessons reordered successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to reorder lessons",
    };
  }
}

export async function createChapter(
  data: ChapterSchemaType
): Promise<ApiResponse> {
  await requireAdmin();
  try {
    const result = chapterSchema.safeParse(data);

    if (!result.success) {
      return {
        status: "error",
        message: "Invalid chapter data",
      };
    }

    await prisma.$transaction(async (tx) => {
      const maxPos = await tx.chapter.findFirst({
        where: {
          courseId: result.data.courseId,
        },
        select: {
          position: true,
        },
        orderBy: {
          position: "desc",
        },
      });

      await tx.chapter.create({
        data: {
          title: result.data.name,
          courseId: result.data.courseId,
          position: (maxPos?.position ?? 0) + 1,
        },
      });
    });

    revalidatePath(`/admin/courses/${result.data.courseId}/edit`);

    return {
      status: "success",
      message: "Chapter created successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to create chapter",
    };
  }
}

export async function createLesson(
  data: LessonSchemaType
): Promise<ApiResponse> {
  await requireAdmin();
  try {
    const result = lessonSchema.safeParse(data);

    if (!result.success) {
      return {
        status: "error",
        message: "Invalid lesson data",
      };
    }

    await prisma.$transaction(async (tx) => {
      const maxPos = await tx.lesson.findFirst({
        where: {
          chapterId: result.data.chapterId,
        },
        select: {
          position: true,
        },
        orderBy: {
          position: "desc",
        },
      });

      await tx.lesson.create({
        data: {
          title: result.data.name,
          description: result.data.description,
          chapterId: result.data.chapterId,
          thumbnailKey: result.data.thumbnailKey,
          videoKey: result.data.videoKey,
          position: (maxPos?.position ?? 0) + 1,
        },
      });
    });

    revalidatePath(`/admin/courses/${result.data.courseId}/edit`);

    return {
      status: "success",
      message: "Lesson created successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to create lesson",
    };
  }
}

export async function deleteChapter(
  chapterId: string,
  courseId: string
): Promise<ApiResponse> {
  await requireAdmin();
  try {
    await prisma.$transaction(async (tx) => {
      // 1. Delete the chapter
      await tx.chapter.delete({
        where: { id: chapterId },
      });

      // 2. Fetch remaining chapters ordered by current position
      const remainingChapters = await tx.chapter.findMany({
        where: { courseId },
        orderBy: { position: "asc" },
      });

      // 3. Update positions to ensure sequence is continuous (1, 2, 3...)
      await Promise.all(
        remainingChapters.map((chapter, index) =>
          tx.chapter.update({
            where: { id: chapter.id },
            data: { position: index + 1 },
          })
        )
      );
    });

    revalidatePath(`/admin/courses/${courseId}/edit`);

    return {
      status: "success",
      message: "Chapter deleted successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to delete chapter",
    };
  }
}

export async function deleteLesson(
  lessonId: string,
  courseId: string
): Promise<ApiResponse> {
  await requireAdmin();
  try {
    await prisma.$transaction(async (tx) => {
      // 1. Find the lesson to get its chapterId
      const lessonToDelete = await tx.lesson.findUnique({
        where: { id: lessonId },
        select: { chapterId: true },
      });

      if (!lessonToDelete) return;

      // 2. Delete the lesson
      await tx.lesson.delete({
        where: { id: lessonId },
      });

      // 3. Fetch remaining lessons in that chapter
      const remainingLessons = await tx.lesson.findMany({
        where: { chapterId: lessonToDelete.chapterId },
        orderBy: { position: "asc" },
      });

      // 4. Update positions to be continuous
      await Promise.all(
        remainingLessons.map((lesson, index) =>
          tx.lesson.update({
            where: { id: lesson.id },
            data: { position: index + 1 },
          })
        )
      );
    });

    revalidatePath(`/admin/courses/${courseId}/edit`);

    return {
      status: "success",
      message: "Lesson deleted successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to delete lesson",
    };
  }
}
