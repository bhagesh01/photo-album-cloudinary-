"use client";

import { ImageGrid } from "@/components/image-grid";
import { SearchResult } from "./page";
import { CloudinaryImage } from "@/components/cloudinary-image";
import { useRouter } from "next/navigation";

export default function GalleryGrid({ images }: { images: SearchResult[] }) {
  const router = useRouter();
  if(images.length == 0)
    {
      setTimeout(()=>{
        router.push("/gallery");
      },3000)

      return <span className="text-4xl animate-pulse">NO Images found of this tag name.</span>
    }
  return (
    <ImageGrid
      images={images}
      getImage={(imagedata: SearchResult) => {
        return (
          <CloudinaryImage
            key={imagedata.public_id}
            imageData={imagedata}
            width="400"
            height="300"
            alt="an image of something"
          />
        );
      }}
    />

  );
}
