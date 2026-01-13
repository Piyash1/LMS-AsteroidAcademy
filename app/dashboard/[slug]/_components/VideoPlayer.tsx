"use client";

import { useConstructUrl } from "@/hooks/use-construct-url";

interface iAppProps {
  videoKey: string;
  thumbnailKey?: string | null;
}

export function VideoPlayer({ videoKey, thumbnailKey }: iAppProps) {
  // Simple check for YouTube ID vs S3 Key
  // YouTube IDs are 11 chars. S3 keys from uploadthing/etc might be longer/contain slashes/dots.
  // This is a heuristic. A better way would be a type field in DB.
  const isYouTube =
    videoKey.length === 11 &&
    !videoKey.includes(".") &&
    !videoKey.includes("/");

  const videoUrl = useConstructUrl(videoKey);
  const posterUrl = thumbnailKey ? useConstructUrl(thumbnailKey) : undefined;

  if (isYouTube) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoKey}`}
        className="w-full h-full rounded-2xl"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    );
  }

  // Assuming S3/Uploaded Video
  return (
    <video
      controls
      className="w-full h-full rounded-2xl object-cover"
      poster={posterUrl}
    >
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
