import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-12 md:pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Newsletter */}
          <div className="col-span-1 md:col-span-1 space-y-4">
            <Link
              href="/"
              className="font-bold text-2xl flex items-center gap-2"
            >
              <span className="text-primary">Asteroid</span>Academy
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering learners worldwide with cutting-edge courses and a
              supportive community.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/courses"
                  className="hover:text-primary transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Mentorship
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  For Business
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
          <div className="flex-1 hidden md:block" />

          <p className="text-xs text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Asteroid Academy. All rights
            reserved.
            <span className="mx-2">|</span>
            Created with ❤️ by{" "}
            <Link
              href="https://moniruzzamanpiyash.netlify.app/"
              className="underline hover:text-primary transition-colors font-medium"
            >
              Moniruzzaman Piyash
            </Link>
          </p>

          <div className="flex-1 flex justify-center md:justify-end items-center gap-4">
            <Link
              href="https://x.com/MoniruzzamanPi3"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter className="size-5" />
            </Link>
            <Link
              href="https://github.com/piyash1"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="size-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/moniruzzamanpiyash/"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
