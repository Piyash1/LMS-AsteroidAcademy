"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { CheckCircle2, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

interface CourseSidebarProps {
  course: {
    title: string;
    progressPercentage: number;
    chapter: {
      id: string;
      title: string;
      lesson: {
        id: string;
        title: string;
        lessonProgress: {
          isCompleted: boolean;
        }[];
      }[];
    }[];
  };
}

export function CourseSidebar({ course }: CourseSidebarProps) {
  const params = useParams();
  const searchParams = useSearchParams();
  const currentLessonId = searchParams.get("lessonId");

  return (
    <div className="flex h-full flex-col border-r bg-muted/20">
      <div className="p-6 border-b space-y-4">
        <div>
          <h2 className="font-bold text-lg line-clamp-1">{course.title}</h2>
          <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold">
            Course Content
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-medium">
            <span>{Math.round(course.progressPercentage)}% Completed</span>
          </div>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 ease-in-out"
              style={{ width: `${course.progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <Accordion
          type="multiple"
          defaultValue={course.chapter.map((c) => c.id)}
          className="w-full space-y-2"
        >
          {course.chapter.map((chapter, index) => (
            <AccordionItem
              key={chapter.id}
              value={chapter.id}
              className="border-none"
            >
              <AccordionTrigger className="hover:no-underline py-2 px-3 rounded-lg hover:bg-muted/50 transition-all">
                <div className="flex items-center gap-2 text-left">
                  <span className="bg-primary/10 text-primary text-[10px] font-bold size-5 flex items-center justify-center rounded-full">
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold line-clamp-1">
                    {chapter.title}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-1 pb-2 space-y-1 ml-4 pl-4 border-l-2">
                {chapter.lesson.map((lesson) => {
                  const isActive = currentLessonId === lesson.id;
                  const isCompleted = lesson.lessonProgress?.[0]?.isCompleted;

                  return (
                    <Link
                      key={lesson.id}
                      href={`/dashboard/${params.slug}?lessonId=${lesson.id}`}
                      className={cn(
                        "flex items-center justify-between px-3 py-2 text-sm rounded-md transition-all group",
                        isActive
                          ? "bg-primary text-primary-foreground font-medium shadow-sm"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <PlayCircle
                          className={cn(
                            "size-4 shrink-0",
                            isActive
                              ? "text-primary-foreground"
                              : "text-muted-foreground group-hover:text-primary"
                          )}
                        />
                        <span className="line-clamp-1 text-xs">
                          {lesson.title}
                        </span>
                      </div>

                      {isCompleted && (
                        <CheckCircle2
                          className={cn(
                            "size-4 shrink-0",
                            isActive
                              ? "text-primary-foreground"
                              : "text-green-500"
                          )}
                        />
                      )}
                    </Link>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
