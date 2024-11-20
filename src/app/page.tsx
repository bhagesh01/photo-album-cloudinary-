"use client"

import { CldUploadButton, CldImage } from 'next-cloudinary';
import { useState } from "react";

// uploading preset : j0ankcvq
export type UploadResult = {
  info: {
    public_id: string;
  };
  event: "success";
};

export default function Home() {

  const [imageId, setImageId] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <CldUploadButton
        uploadPreset="j0ankcvq"
      onUpload={(result: UploadResult) => {
        setImageId(result.info.public_id);
      }}
    />

    {imageId && (
      <CldImage
        width="500"
        height="300"
        src={imageId}
        sizes="100vw"
        alt="Description of my image"
      />
    )}
  </main>
  );
}
