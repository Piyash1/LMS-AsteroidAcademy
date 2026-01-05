import { cn } from "@/lib/utils";
import { CloudUpload, FileIcon, ImageIcon, Loader2, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Progress } from "../ui/progress";

export function RenderEmptyState({ isDragActive }: { isDragActive: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 animate-in fade-in zoom-in duration-300">
      <div className="flex items-center justify-center size-14 rounded-full bg-primary/10 mb-4 border border-primary/20 shadow-sm">
        <CloudUpload
          className={cn(
            "size-7 text-muted-foreground transition-all duration-300",
            isDragActive && "text-primary scale-110"
          )}
        />
      </div>
      <p className="text-sm font-medium text-foreground">
        Drop your file here or{" "}
        <span className="text-primary font-bold cursor-pointer hover:underline">
          click to upload
        </span>
      </p>
      <Button
        type="button"
        size="sm"
        className="mt-4 shadow-sm hover:-translate-y-px transition-transform"
      >
        Select File
      </Button>
    </div>
  );
}

export function RenderErrorState({ error }: { error: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="flex items-center justify-center size-14 rounded-full bg-destructive/10 mb-4 border border-destructive/20 shadow-sm">
        <ImageIcon className="size-7 text-destructive" />
      </div>
      <p className="text-sm font-semibold text-destructive">Upload Failed</p>
      <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">
        {error}
      </p>
    </div>
  );
}

export function RenderUploadedState({
  previewUrl,
  isDeleting,
  handleRemoveFile,
  fileType,
}: {
  previewUrl: string;
  isDeleting: boolean;
  handleRemoveFile: () => void;
  fileType: "image" | "video";
}) {
  return (
    <div className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in duration-500">
      {fileType === "image" ? (
        <Image
          src={previewUrl}
          alt="Uploaded File"
          fill
          className="object-contain p-2 rounded-lg"
        />
      ) : (
        <video
          src={previewUrl}
          controls
          className="max-h-full max-w-full rounded-lg shadow-md"
        />
      )}
      <Button
        variant="destructive"
        size="icon"
        className={cn(
          "absolute top-4 right-4 shadow-lg hover:scale-110 transition-transform",
          isDeleting && "opacity-50 pointer-events-none"
        )}
        onClick={(e) => {
          e.stopPropagation();
          handleRemoveFile();
        }}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <XIcon className="size-4" />
        )}
      </Button>
    </div>
  );
}

export function RenderUploadingState({
  progress,
  file,
}: {
  progress: number;
  file: File;
}) {
  return (
    <div className="w-full flex flex-col items-center justify-center p-8 space-y-4 animate-in fade-in duration-300">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
        <div className="relative flex items-center justify-center size-16 rounded-2xl bg-primary/10 border border-primary/20 shadow-inner overflow-hidden">
          <FileIcon className="size-8 text-primary animate-bounce duration-2000" />
          <div
            className="absolute bottom-0 left-0 right-0 bg-primary/20 transition-all duration-300 ease-out"
            style={{ height: `${progress}%` }}
          />
        </div>
      </div>

      <div className="w-full max-w-[240px] flex flex-col items-center">
        <div className="w-full flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
          <span className="animate-pulse">Uploading...</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-1.5 shadow-sm" />
        <p className="text-[11px] text-muted-foreground mt-3 truncate w-full text-center font-medium px-2 italic">
          {file.name}
        </p>
      </div>
    </div>
  );
}
