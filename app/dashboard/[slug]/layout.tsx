import { getindividualCourse } from "@/app/data/course/get-course";
import { CourseSidebar } from "../_components/CourseSidebar";
import { MobileSidebar } from "../_components/MobileSidebar";

export default async function CourseSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getindividualCourse(slug);

  return (
    <div className="flex h-[calc(100vh-var(--header-height))] overflow-hidden -mx-4 lg:-mx-6 -mt-4 md:-mt-6 relative">
      <div className="hidden md:flex w-80 flex-col shrink-0">
        <CourseSidebar course={course} />
      </div>

      <div className="absolute top-4 left-4 z-20 md:hidden">
        <MobileSidebar course={course} />
      </div>
      <main className="flex-1 overflow-y-auto">
        <div className="h-full p-4 md:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
