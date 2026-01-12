import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function DashboardSkeleton() {
  return (
    <div className="space-y-4">
      {/* Metric Cards Skeleton */}
      <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart Skeleton */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-2 w-full">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-3 w-[200px]" />
              </div>
            </CardHeader>
            <CardContent className="pl-2 pt-4">
              <Skeleton className="h-[250px] w-full" />
            </CardContent>
          </Card>
        </div>

        {/* Recent Sales Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-[140px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                  <Skeleton className="h-4 w-[60px]" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function CoursesSkeleton() {
  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[150px]" />
        <Skeleton className="h-10 w-[130px]" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="aspect-video w-full relative">
              <Skeleton className="h-full w-full" />
            </div>
            <CardHeader className="p-5">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-24" />
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-24" />
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-20" />
                  <Skeleton className="h-9 w-20" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
