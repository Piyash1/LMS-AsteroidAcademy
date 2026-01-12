import { getDashboardStats } from "@/app/data/admin/dashboard-stats";
import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
import { SectionCards } from "@/components/sidebar/section-cards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default async function AdminIndexPage() {
  const stats = await getDashboardStats();

  return (
    <>
      <SectionCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ChartAreaInteractive data={stats.chartData} />
        </div>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>Recent Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {stats.recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center gap-4">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>
                      {sale.user.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      {sale.user.name}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {sale.course.title}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    +
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(sale.amount)}
                  </div>
                </div>
              ))}
              {stats.recentSales.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No recent enrollments found.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
