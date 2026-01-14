import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  GraduationCap,
  Users,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

const features: FeatureProps[] = [
  {
    title: "Comprehensive Courses",
    description:
      "Access to a wide range of courses covering various topics and skill levels, carefully curated for your growth.",
    icon: BookOpen,
  },
  {
    title: "Expert Instructors",
    description:
      "Learn directly from industry experts and experienced professionals who have been there and done that.",
    icon: GraduationCap,
  },
  {
    title: "Flexible Learning",
    description:
      "Study at your own pace, on your own schedule, with lifetime access to all your enrolled courses.",
    icon: Clock,
  },
  {
    title: "Community Support",
    description:
      "Join a vibrant community of learners to share knowledge, collaborate on projects, and grow together.",
    icon: Users,
  },
];

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="container relative z-10 flex flex-col items-center text-center space-y-8">
          <Badge
            variant="outline"
            className="px-4 py-2 text-sm backdrop-blur-sm border-primary/20 bg-primary/5 text-primary animate-in fade-in slide-in-from-bottom-4 duration-1000"
          >
            <Sparkles className="size-3 mr-2 inline-block" />
            The Future of Online Education
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            Elevate your <span className="text-primary">Learning</span>
            <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-blue-600">
              Experience Today
            </span>
          </h1>

          <p className="max-w-[700px] text-muted-foreground md:text-xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Discover the power of interactive learning with our cutting-edge
            platform. Whether you're a student, educator, or professional, we've
            got you covered.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Link
              className={buttonVariants({
                size: "lg",
                className: "h-12 px-8 text-base shadow-lg shadow-primary/20",
              })}
              href="/courses"
            >
              Explore Courses
              <ArrowRight className="ml-2 size-4" />
            </Link>
            {session ? (
              <Link
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                  className:
                    "h-12 px-8 text-base bg-background/50 backdrop-blur-sm",
                })}
                href="/dashboard"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                  className:
                    "h-12 px-8 text-base bg-background/50 backdrop-blur-sm",
                })}
                href="/login"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30 border-y border-border/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <h3 className="text-3xl font-bold text-primary">1k+</h3>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                Students
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-bold text-primary">50+</h3>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                Courses
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-bold text-primary">20+</h3>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                Instructors
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-bold text-primary">4.9</h3>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                Rating
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose Asteroid Academy?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We provide everything you need to master new skills and advance
              your career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/30 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <CardHeader>
                  <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="size-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden bg-primary px-6 py-16 sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <svg
                viewBox="0 0 1024 1024"
                className="absolute left-1/2 top-1/2 -z-10 h-256 w-5xl -translate-y-1/2 mask-[radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                aria-hidden="true"
              >
                <circle cx="512" cy="512" r="512" fill="url(#gradient)" />
                <defs>
                  <radialGradient id="gradient">
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" />
                  </radialGradient>
                </defs>
              </svg>
            </div>

            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left relative z-10">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to start your journey?
                <br />
                Join us today.
              </h2>
              <p className="mt-6 text-lg leading-8 text-primary-foreground/80">
                Unlock your potential with our extensive library of courses. Get
                started for free and upgrade as you grow.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <Link
                  href={session ? "/dashboard" : "/courses"}
                  className={buttonVariants({
                    size: "lg",
                    variant: "secondary",
                    className: "h-12 px-8",
                  })}
                >
                  {session ? "Go to Dashboard" : "Get Started"}
                </Link>
                <Link
                  href="/courses"
                  className="text-sm font-semibold leading-6 text-white hover:text-white/80 transition-colors flex items-center gap-1"
                >
                  Learn more <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            {/* Decorative Image/Shape */}
            <div className="relative mt-16 h-80 lg:mt-8">
              <div className="absolute left-0 top-0 w-228 max-w-none rounded-md bg-white/5 ring-1 ring-white/10 p-2 lg:-ml-16">
                <Image
                  src="/dashboard-preview.png"
                  alt="Dashboard Preview"
                  width={1824}
                  height={1080}
                  className="w-full rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
