"use server";

import { SearchResult } from "@/app/gallery/page";
import cloudinary from "cloudinary";

export async function addImageToAlbum(image: SearchResult, album: string) {




  cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, // Replace with your Cloudinary cloud_name
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,       // Replace with your Cloudinary API key
    api_secret: process.env.CLOUDINARY_API_SECRET, // Replace with your Cloudinary API secret
  });

  
  await cloudinary.v2.api.create_folder(album);

  let parts = image.public_id.split("/");
  if (parts.length > 1) {
    parts = parts.slice(1);
  }
  const publicId = parts.join("/");

  await cloudinary.v2.uploader.rename(image.public_id, `${album}/${publicId}`);
}
