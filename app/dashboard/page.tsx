import { EmptyState } from "@/components/general/EmptyState";
import { getAllCourses } from "../data/course/get-all-courses";
import { getEnrolledCourses } from "../data/user/get-enrolled-courses";
import PublicCourseCard from "../(public)/_components/PublicCourseCard";
import { EnrolledCourseCard } from "./_components/EnrolledCourseCard";
import { requireUser } from "../data/user/require-user";
import { Separator } from "@/components/ui/separator";

export default async function DashboardPage() {
  const user = await requireUser();
  const [courses, enrolledCourses] = await Promise.all([
    getAllCourses(),
    getEnrolledCourses(),
  ]);

  return (
    <div className="max-w-7xl mx-auto w-full space-y-10 pb-10">
      {/* Header Section */}
      <section className="bg-muted/40 rounded-2xl border p-6 md:p-8 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">
              Welcome back, {user.name}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-lg">
              You have{" "}
              <span className="text-primary font-semibold">
                {enrolledCourses.length} active courses
              </span>{" "}
              in your academy. Let's continue your learning journey today.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end border-l pl-6 border-border">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Overall Progress
              </span>
              <span className="text-lg font-bold">
                {Math.round(
                  (() => {
                    let totalLessons = 0;
                    let completedLessons = 0;

                    enrolledCourses.forEach((enrollment) => {
                      enrollment.course.chapter.forEach((chapter) => {
                        totalLessons += chapter.lesson.length;
                        chapter.lesson.forEach((lesson) => {
                          if (
                            lesson.lessonProgress &&
                            lesson.lessonProgress.length > 0 &&
                            lesson.lessonProgress[0].isCompleted
                          ) {
                            completedLessons++;
                          }
                        });
                      });
                    });

                    return totalLessons > 0
                      ? (completedLessons / totalLessons) * 100
                      : 0;
                  })()
                )}
                % Completed
              </span>
            </div>
          </div>
        </div>

        {/* Subtle decorative element */}
        <div className="absolute top-0 right-0 w-32 h-full bg-linear-to-l from-primary/5 to-transparent pointer-events-none" />
      </section>

      {/* Enrolled Courses Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">Your Learning</h2>
            <p className="text-muted-foreground">
              Pick up right where you left off.
            </p>
          </div>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="bg-muted/50 rounded-2xl border-2 border-dashed p-12">
            <EmptyState
              title="No Enrolled Courses"
              description="You have not enrolled in any courses yet. Start your journey today!"
              buttonText="Browse All Courses"
              href="/courses"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {enrolledCourses.map((item) => {
              // Calculate progress for this specific course
              let totalLessons = 0;
              let completedLessons = 0;

              item.course.chapter.forEach((chapter) => {
                totalLessons += chapter.lesson.length;
                chapter.lesson.forEach((lesson) => {
                  if (
                    lesson.lessonProgress &&
                    lesson.lessonProgress.length > 0 &&
                    lesson.lessonProgress[0].isCompleted
                  ) {
                    completedLessons++;
                  }
                });
              });

              const progress =
                totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

              return (
                <EnrolledCourseCard
                  key={item.course.id}
                  data={item.course}
                  progress={progress}
                />
              );
            })}
          </div>
        )}
      </section>

      <Separator className="opacity-50" />

      {/* Available Courses Section */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">
            Expand Your Skills
          </h2>
          <p className="text-muted-foreground">
            Recommended courses just for you.
          </p>
        </div>

        {courses.filter(
          (course) =>
            !enrolledCourses.some(
              ({ course: enrolled }) => enrolled.id === course.id
            )
        ).length === 0 ? (
          <div className="bg-muted/50 rounded-2xl border-2 border-dashed p-12">
            <EmptyState
              title="No New Courses"
              description="Wow! You've seen everything we have to offer right now. Check back soon!"
              buttonText="See Your Dashboard"
              href="/dashboard"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses
              .filter(
                (course) =>
                  !enrolledCourses.some(
                    ({ course: enrolled }) => enrolled.id === course.id
                  )
              )
              .map((course) => (
                <PublicCourseCard key={course.id} data={course} />
              ))}
          </div>
        )}
      </section>
    </div>
  );
}
