import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function CourseSlugLoading() {
  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      {/* Video Player Skeleton */}
      <div className="w-full aspect-video rounded-2xl overflow-hidden border relative">
        <Skeleton className="w-full h-full bg-muted/60" />
      </div>

      {/* Content Skeleton */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-10 w-64 md:w-96" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-16" />
              <div className="size-1 rounded-full bg-muted-foreground/30" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          {/* Button Skeleton */}
          <Skeleton className="h-10 w-40" />
        </div>

        <Separator />

        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    </div>
  );
}
