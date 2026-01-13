import { getLesson } from "@/app/data/course/get-lesson";
import parse from "html-react-parser";
import { getindividualCourse } from "@/app/data/course/get-course";
import { EmptyState } from "@/components/general/EmptyState";
import { Separator } from "@/components/ui/separator";
import { LessonCompleteButton } from "./_components/LessonCompleteButton";
import { VideoPlayer } from "./_components/VideoPlayer";

export default async function CourseSlugPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lessonId?: string }>;
}) {
  const { slug } = await params;
  const { lessonId } = await searchParams;
  const course = await getindividualCourse(slug);

  // If no lessonId, show intro or first lesson
  const activeLessonId = lessonId || course.chapter[0]?.lesson[0]?.id;

  if (!activeLessonId) {
    return (
      <EmptyState
        title="No Lessons Yet"
        description="This course doesn't have any lessons published yet."
        buttonText="Back to Dashboard"
        href="/dashboard"
      />
    );
  }

  const lesson = await getLesson(activeLessonId);

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      {/* Video Player Section */}
      <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border relative group">
        {lesson.videoKey ? (
          <VideoPlayer
            videoKey={lesson.videoKey}
            thumbnailKey={lesson.thumbnailKey}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/50 flex-col gap-4">
            <div className="p-4 rounded-full bg-white/5 border border-white/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
              </svg>
            </div>
            <p className="font-medium">
              No video content available for this lesson
            </p>
          </div>
        )}
      </div>
      {/* Content Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-foreground">
              {lesson.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium uppercase tracking-wider">
              <span>Module</span>
              <span className="size-1 rounded-full bg-muted-foreground/30" />
              <span className="text-primary italic">{course.title}</span>
            </div>
          </div>

          <LessonCompleteButton
            lessonId={lesson.id}
            isCompleted={lesson.lessonProgress?.[0]?.isCompleted || false}
          />
        </div>
        <Separator />
        <div className="prose prose-stone dark:prose-invert max-w-none">
          {lesson.description ? (
            parse(lesson.description)
          ) : (
            <p className="text-muted-foreground leading-relaxed text-lg">
              No description provided for this lesson.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
