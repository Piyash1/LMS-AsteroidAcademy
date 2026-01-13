"use client";

import { markLessonCompleted } from "@/app/actions/markLessonCompleted";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle } from "lucide-react";
import { useTransition } from "react";

interface iAppProps {
  lessonId: string;
  isCompleted: boolean;
}

export function LessonCompleteButton({ lessonId, isCompleted }: iAppProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      onClick={() => {
        startTransition(() => {
          markLessonCompleted(lessonId);
        });
      }}
      disabled={isPending}
      variant={isCompleted ? "default" : "outline"}
      className={cn(
        "gap-2 transition-all",
        isCompleted
          ? "bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700"
          : "hover:bg-primary/5"
      )}
    >
      {isCompleted ? (
        <>
          <CheckCircle2 className="size-4" />
          Completed
        </>
      ) : (
        <>
          <Circle className="size-4" />
          Mark as Complete
        </>
      )}
    </Button>
  );
}
