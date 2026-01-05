import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/client";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. Get an existing user
  const user = await prisma.user.findFirst();

  if (!user) {
    console.error(
      "❌ No users found in the database. Please create a user (e.g., via sign-in) before running the seed script."
    );
    process.exit(1);
  }

  console.log(`Using existing user: ${user.name} (${user.email})`);

  // 2. Create a dummy course
  const courses = [
    {
      title: "Mastering Next.js 15",
      description:
        "Learn the latest features of Next.js 15 including Server Actions, Parallel Routes, and more.",
      smallDescription: "Complete guide to modern Next.js development.",
      slug: "mastering-nextjs-15",
      category: "Web Development",
      fileKey: "course-nextjs-banner.jpg",
      price: 4900,
      duration: 120,
      level: "INTERMEDIATE" as const,
      status: "PUBLISHED" as const,
      userId: user.id,
    },
    {
      title: "Advanced TypeScript Patterns",
      description:
        "Deep dive into generics, utility types, and advanced type manipulation.",
      smallDescription: "Level up your TypeScript skills.",
      slug: "advanced-typescript",
      category: "Programming",
      fileKey: "course-ts-banner.jpg",
      price: 3500,
      duration: 90,
      level: "ADVANCED" as const,
      status: "PUBLISHED" as const,
      userId: user.id,
    },
  ];

  for (const courseData of courses) {
    const course = await prisma.course.create({
      data: {
        ...courseData,
        chapter: {
          create: [
            {
              title: "Introduction",
              position: 1,
              lesson: {
                create: [
                  {
                    title: "Getting Started",
                    description: "Overview of what we will build.",
                    position: 1,
                    videoKey: "intro-video-key",
                  },
                  {
                    title: "Project Setup",
                    description: "Setting up the environment.",
                    position: 2,
                    videoKey: "setup-video-key",
                  },
                ],
              },
            },
            {
              title: "Core Concepts",
              position: 2,
              lesson: {
                create: [
                  {
                    title: "Server Components vs Client Components",
                    description: "Deep dive into the architecture.",
                    position: 1,
                    videoKey: "concepts-video-key",
                  },
                ],
              },
            },
          ],
        },
      },
    });
    console.log(`Created course: ${course.title}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
