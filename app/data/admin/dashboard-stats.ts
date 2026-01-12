import { prisma } from "@/lib/db";

export async function getDashboardStats() {
  const [
    totalRevenue,
    totalStudents,
    totalCourses,
    activeEnrollments,
    recentSales,
  ] = await Promise.all([
    prisma.enrollment.aggregate({
      where: { status: "ACTIVE" },
      _sum: { amount: true },
    }),
    prisma.user.count({
      where: {
        enrollments: {
          some: { status: "ACTIVE" },
        },
      },
    }),
    prisma.course.count(),
    prisma.enrollment.count({
      where: { status: "ACTIVE" },
    }),
    prisma.enrollment.findMany({
      where: { status: "ACTIVE" },
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        course: {
          select: {
            title: true,
          },
        },
      },
    }),
  ]);

  // Fetch chart data (enrollments per day for the last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const rawEnrollments = await prisma.enrollment.findMany({
    where: {
      status: "ACTIVE",
      createdAt: { gte: thirtyDaysAgo },
    },
    select: {
      createdAt: true,
      amount: true,
    },
    orderBy: { createdAt: "asc" },
  });

  // Group by day
  const enrollmentMap = new Map<
    string,
    { date: string; revenue: number; sales: number }
  >();

  // Initialize last 30 days
  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    enrollmentMap.set(dateStr, { date: dateStr, revenue: 0, sales: 0 });
  }

  rawEnrollments.forEach((enrollment) => {
    const dateStr = enrollment.createdAt.toISOString().split("T")[0];
    const current = enrollmentMap.get(dateStr) || {
      date: dateStr,
      revenue: 0,
      sales: 0,
    };
    enrollmentMap.set(dateStr, {
      ...current,
      revenue: current.revenue + enrollment.amount,
      sales: current.sales + 1,
    });
  });

  const chartData = Array.from(enrollmentMap.values()).sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  return {
    totalRevenue: totalRevenue._sum.amount || 0,
    totalStudents,
    totalCourses,
    activeEnrollments,
    recentSales,
    chartData,
  };
}
