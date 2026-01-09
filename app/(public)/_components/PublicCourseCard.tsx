import { PublicCourseType } from "@/app/data/course/get-all-courses";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { SchoolIcon, TimerIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
  data: PublicCourseType;
}

export default function PublicCourseCard({ data }: iAppProps) {
  const thumbnailUrl = useConstructUrl(data.fileKey);

  return (
    <Card className="group relative py-0 gap-0">
      <Badge className="absolute top-2 right-2 z-10">{data.level}</Badge>

      <Image
        src={thumbnailUrl}
        alt="Thumbnail Image"
        width={600}
        height={400}
        className="w-full rounded-t-xl aspect-video h-full object-cover"
        suppressHydrationWarning
      />

      <CardContent className="p-4">
        <Link
          className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors"
          href={`/courses/${data.slug}`}
        >
          {data.title}
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-2 leading-tight">
          {data.smallDescription}
        </p>

        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <TimerIcon
              className="size-6 p-1 rounded-md text-primary bg-primary/10"
              suppressHydrationWarning
            />
            <p className="text-sm text-muted-foreground font-medium">
              {data.duration}h
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <SchoolIcon
              className="size-6 p-1 rounded-md text-primary bg-primary/10"
              suppressHydrationWarning
            />
            <p className="text-sm text-muted-foreground font-medium">
              {data.category}
            </p>
          </div>
        </div>

        <Link
          href={`/courses/${data.slug}`}
          className={buttonVariants({ className: "w-full mt-4" })}
        >
          Learn More
        </Link>
      </CardContent>
    </Card>
  );
}

export function PublicCourseCardSkeleton() {
  return (
    <Card className="group relative py-0 gap-0">
      <div className="w-full rounded-t-xl aspect-video h-full object-cover">
        <Skeleton className="w-full h-full rounded-t-xl" />
      </div>

      <CardContent className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3" />

        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <Skeleton className="size-8 rounded-md" />
            <Skeleton className="h-4 w-10" />
          </div>
          <div className="flex items-center gap-x-2">
            <Skeleton className="size-8 rounded-md" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        <Skeleton className="h-10 w-full mt-4 rounded-md" />
      </CardContent>
    </Card>
  );
}
