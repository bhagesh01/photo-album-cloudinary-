import cloudinary from "cloudinary";
import AlbumGrid from "./album-grid";
import { SearchResult } from "@/app/gallery/page";
import { ForceRefresh } from "@/components/force-refresh";

// No need for custom Props if Next.js handles params correctly
export default async function GalleryPage({
  params,
}: {
  params: {
    albumName: string;
  };
}) {
  const { albumName } = params;

  // Configure Cloudinary
  cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
  });

  // Fetch results from Cloudinary
  const results = (await cloudinary.v2.search
    .expression(`resource_type:image AND folder=${albumName}`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(30)
    .execute()) as { resources: SearchResult[] };

  return (
    <section>
      <ForceRefresh />

      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Album {albumName}</h1>
        </div>

        <AlbumGrid images={results.resources} />
      </div>
    </section>
  );
}
