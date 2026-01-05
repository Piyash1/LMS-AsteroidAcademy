import { FilePlus, LayoutGrid, PlusCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export function EmptyState({
  buttonText,
  description,
  href,
  title,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/50 bg-card/30 p-12 text-center animate-in fade-in zoom-in duration-500 min-h-[400px]">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl animate-pulse" />
        <div className="relative flex items-center justify-center size-20 rounded-2xl bg-primary/10 border border-primary/20 shadow-inner">
          <LayoutGrid className="size-10 text-primary opacity-80" />
          <div className="absolute -bottom-2 -right-2 flex size-8 items-center justify-center rounded-lg bg-background border border-border shadow-lg animate-bounce duration-3000">
            <PlusCircle className="size-5 text-primary" />
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold tracking-tight text-foreground mb-2">
        {title}
      </h3>
      <p className="max-w-sm text-muted-foreground mb-8 leading-relaxed">
        {description}
      </p>

      <Link
        href={href}
        className={buttonVariants({
          variant: "default",
          className:
            "px-8 shadow-lg shadow-primary/20 hover:scale-105 transition-all duration-300",
        })}
      >
        <FilePlus className="mr-2 size-4" />
        {buttonText}
      </Link>
    </div>
  );
}
