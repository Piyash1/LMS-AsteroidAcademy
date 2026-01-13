"use client";

import { markLessonCompleted } from "@/app/actions/markLessonCompleted";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle } from "lucide-react";
import { useTransition } from "react";
import confetti from "canvas-confetti";
import { toast } from "sonner";

interface iAppProps {
  lessonId: string;
  isCompleted: boolean;
}

export function LessonCompleteButton({ lessonId, isCompleted }: iAppProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      try {
        await markLessonCompleted(lessonId);
        if (!isCompleted) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
          toast.success("Lesson marked as completed! Nice work! 🎉");
        } else {
          toast.info("Lesson progress updated.");
        }
      } catch (error) {
        toast.error("Failed to update lesson progress.");
      }
    });
  };

  return (
    <Button
      onClick={handleToggle}
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
