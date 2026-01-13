"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { CourseSidebar } from "./CourseSidebar";

interface MobileSidebarProps {
  course: any; // Assuming course object shape from CourseSidebar
}

export function MobileSidebar({ course }: MobileSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-80">
        <SheetHeader className="sr-only">
          <SheetTitle>Course Content</SheetTitle>
        </SheetHeader>
        <CourseSidebar course={course} />
      </SheetContent>
    </Sheet>
  );
}
