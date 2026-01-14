"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";
import { UserDropdown } from "./UserDropdown";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center mx-auto px-4 md:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 mr-12 lg:mr-20"
        >
          <Image
            src={Logo}
            alt="Logo"
            className="size-10 rounded-md"
            suppressHydrationWarning
          />
          <span className="text-xl font-bold whitespace-nowrap">
            Asteroid Academy
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <div className="flex items-center gap-6">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {isPending ? null : session ? (
              <UserDropdown
                user={{
                  email: session.user.email,
                  image:
                    session.user.image ??
                    `https://avatar.vercel.sh/${session.user.email}`,
                  name: session.user.name || session.user.email.split("@")[0],
                }}
              />
            ) : (
              <>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "secondary" })}
                >
                  Sign in
                </Link>
                <Link href="/login" className={buttonVariants()}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex flex-1 items-center justify-end md:hidden gap-4">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="size-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Image
                    src={Logo}
                    alt="Logo"
                    className="size-8 rounded-md"
                    suppressHydrationWarning
                  />
                  <span>Asteroid Academy</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-6 mt-10">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex flex-col gap-4 pt-6 border-t">
                  {isPending ? null : session ? (
                    <div className="flex items-center gap-4">
                      <UserDropdown
                        user={{
                          email: session.user.email,
                          image:
                            session.user.image ??
                            `https://avatar.vercel.sh/${session.user.email}`,
                          name:
                            session.user.name ||
                            session.user.email.split("@")[0],
                        }}
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {session.user.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {session.user.email}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className={buttonVariants({
                          variant: "secondary",
                          className: "w-full justify-center",
                        })}
                      >
                        Sign in
                      </Link>
                      <Link
                        href="/login"
                        className={buttonVariants({
                          className: "w-full justify-center",
                        })}
                      >
                        Get Started
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
