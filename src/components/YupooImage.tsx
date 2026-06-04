"use client";

import Image from "next/image";
import { useState } from "react";

interface YupooImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

export default function YupooImage({
  src,
  alt,
  width = 400,
  height = 400,
  fill = false,
  sizes,
  className = "",
  priority = false,
}: YupooImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isYupooImage = src.includes("photo.yupoo.com");
  const imageSrc = isYupooImage
    ? `/api/proxy-image?url=${encodeURIComponent(src)}`
    : src;

  const Placeholder = ({ absolute }: { absolute: boolean }) => (
    <div
      className={`bg-gray-800 flex items-center justify-center ${absolute ? "absolute inset-0" : ""}`}
      {...(!absolute && { style: { width, height } })}
    >
      <div className="text-center text-gray-500">
        <div className="text-4xl mb-2">⚽</div>
        <div className="text-sm">{imageError ? "Image not available" : "Loading..."}</div>
      </div>
    </div>
  );

  if (imageError) {
    return <Placeholder absolute={fill} />;
  }

  const sharedProps = {
    src: imageSrc,
    alt,
    priority,
    onLoad: () => setIsLoading(false),
    onError: () => setImageError(true),
  };

  return (
    <>
      {fill ? (
        <Image
          {...sharedProps}
          fill
          sizes={sizes ?? "100vw"}
          className={`transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"} ${className}`}
        />
      ) : (
        <Image
          {...sharedProps}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"} ${className}`}
        />
      )}
      {isLoading && <Placeholder absolute={fill} />}
    </>
  );
}
