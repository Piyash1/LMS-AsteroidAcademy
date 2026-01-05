"use client";

import { AdminCourse } from "@/app/data/admin/admin-get-courses";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConstructUrl } from "@/hooks/use-construct-url";
import {
  Clock,
  DollarSign,
  Edit,
  Eye,
  MoreVertical,
  Signal,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { deleteCourse } from "../actions";
import { useTransition } from "react";

interface AdminCourseCardProps {
  data: AdminCourse;
}

const levelConfig = {
  BEGINNER: {
    label: "Beginner",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  INTERMEDIATE: {
    label: "Intermediate",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  ADVANCED: {
    label: "Advanced",
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
};

const statusConfig = {
  DRAFT: { label: "Draft", color: "bg-muted text-muted-foreground" },
  PUBLISHED: { label: "Published", color: "bg-primary/10 text-primary" },
  ARCHIVED: {
    label: "Archived",
    color: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400",
  },
};

export function AdminCourseCard({ data }: AdminCourseCardProps) {
  const [isPending, startTransition] = useTransition();
  const thumbnailUrl = useConstructUrl(data.fileKey);
  const level = levelConfig[data.level];
  const status = statusConfig[data.status];

  const onDelete = () => {
    startTransition(async () => {
      try {
        const result = await deleteCourse(data.id);
        if (result.status === "success") {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 py-0 gap-0">
      {/* Thumbnail Section */}
      <div className="relative overflow-hidden">
        <Image
          src={thumbnailUrl}
          alt={data.title}
          width={600}
          height={400}
          className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Status Badge */}
        <Badge
          className={`absolute top-3 left-3 ${status.color} border-0 font-medium shadow-sm`}
        >
          {status.label}
        </Badge>

        {/* Quick Actions - visible on hover */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Button
            asChild
            size="sm"
            variant="secondary"
            className="bg-white/90 hover:bg-white text-foreground shadow-md"
          >
            <Link href={`/courses/${data.slug}`}>
              <Eye className="w-4 h-4 mr-1.5" />
              Preview
            </Link>
          </Button>

          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  className="bg-white/90 hover:bg-white text-foreground shadow-md h-8 w-8"
                  disabled={isPending}
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href={`/admin/courses/${data.id}/edit`}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Course
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/courses/${data.slug}`}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Public Page
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem className="text-destructive focus:text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Course
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  course <strong>{data.title}</strong> and all associated
                  chapters and lessons.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Content Section */}
      <CardContent className="p-4 space-y-3">
        {/* Title */}
        <Link
          href={`/admin/courses/${data.id}`}
          className="block font-semibold text-lg leading-tight line-clamp-2 hover:text-primary transition-colors"
        >
          {data.title}
        </Link>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {data.smallDescription}
        </p>

        {/* Metadata Row */}
        <div className="flex items-center gap-3 pt-1">
          <Badge
            variant="outline"
            className={`${level.color} border-0 text-xs`}
          >
            <Signal className="w-3 h-3 mr-1" />
            {level.label}
          </Badge>

          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5 mr-1" />
            {data.duration}h
          </div>
        </div>

        {/* Footer with Price */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center font-semibold text-primary">
            <DollarSign className="w-4 h-4" />
            <span className="text-lg">{data.price}</span>
          </div>

          <Button asChild size="sm" variant="ghost" className="text-xs h-8">
            <Link href={`/admin/courses/${data.id}/edit`}>
              Manage
              <Edit className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
