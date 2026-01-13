"use client";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { TimerIcon, LayoutDashboardIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
  data: {
    id: string;
    title: string;
    smallDescription: string;
    slug: string;
    fileKey: string;
    duration: number;
    chapter: {
      lesson: {
        id: string;
      }[];
    }[];
  };
  progress?: number;
}

export function EnrolledCourseCard({ data, progress }: iAppProps) {
  const thumbnailUrl = useConstructUrl(data.fileKey);
  const totalLessons = data.chapter.reduce(
    (acc, chap) => acc + chap.lesson.length,
    0
  );

  return (
    <Card className="group relative overflow-hidden border-2 transition-all hover:border-primary/50">
      <div className="relative aspect-video">
        <Image
          src={thumbnailUrl}
          alt={data.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          suppressHydrationWarning
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        <Badge className="absolute top-2 right-2 bg-primary/90 hover:bg-primary">
          Enrolled
        </Badge>
        <div className="absolute bottom-2 left-2 text-white">
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <TimerIcon className="size-3" />
            <span>{data.duration}h Total</span>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-bold text-lg leading-tight line-clamp-1 mb-1 group-hover:text-primary transition-colors">
          {data.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
          {data.smallDescription}
        </p>

        {progress !== undefined && (
          <div className="mb-4 space-y-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-center w-full sm:w-auto gap-2 sm:gap-0">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Lessons
            </span>
            <span className="text-sm font-bold">{totalLessons} Modules</span>
          </div>

          <Link
            href={`/dashboard/${data.slug}`}
            className={buttonVariants({
              size: "sm",
              className: "gap-2 w-full sm:w-auto",
            })}
          >
            <LayoutDashboardIcon className="size-4" />
            Continue
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
