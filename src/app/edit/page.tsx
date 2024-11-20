"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CldImage } from "next-cloudinary";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Correct import
import { Loader } from "lucide-react";

export default function EditPage() {
  const searchParams = useSearchParams(); // Use searchParams hook
  const publicId = searchParams.get('publicId') ?? ''; // Unwrap the 'publicId' dynamically

  const [transformation, setTransformation] = useState<
    "generative-fill" | "blur" | "grayscale" | "pixelate" | "bg-remove" | undefined
  >(undefined);

  const [pendingPrompt, setPendingPrompt] = useState("");
  const [prompt, setPrompt] = useState("");

  // Ensure publicId is present before rendering
  if (!publicId) {
    return <div>Public ID is missing</div>;
  }

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Edit {publicId}</h1>
        </div>

        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => setTransformation(undefined)}>
            Clear All
          </Button>

          <div className="flex flex-col gap-4">
            <Button
              onClick={() => {
                setTransformation("generative-fill");
                setPrompt(pendingPrompt);
              }}
            >
              Apply Generative Fill
            </Button>
            <Label>Prompt</Label>
            <Input
              value={pendingPrompt}
              onChange={(e) => setPendingPrompt(e.currentTarget.value)}
            />
          </div>

          <Button onClick={() => setTransformation("blur")}>Apply Blur</Button>
          <Button onClick={() => setTransformation("grayscale")}>
            Convert to Gray
          </Button>
          <Button onClick={() => setTransformation("pixelate")}>
            Pixelate
          </Button>

          {/* <Button onClick={() => setTransformation("bg-remove")}>
            Remove Background
          </Button> */}
        </div>

        <div className="grid grid-cols-2 gap-12">
          {/* Regular Image */}
          <CldImage
            src={publicId}
            width="400"
            height="300"
            alt="some image"
          />

          {/* Conditional Rendered Transformed Images */}
          {transformation === "generative-fill" && (
            <CldImage
              src={publicId}
              width="1400"
              height="900"
              alt="some image"
              crop="pad" // Ensure this prop is valid for your version of Cloudinary
              fillBackground={{
                prompt, // This needs to match the Cloudinary transformation API
              }}
            />
          )}

          {transformation === "blur" && (
            <CldImage
              src={publicId}
              width="1200"
              height="1400"
              blur="800" // Ensure this prop is valid
              alt="some image"
            />
          )}

          {transformation === "grayscale" && (
            <CldImage
              src={publicId}
              width="1200"
              height="1400"
              grayscale // Ensure this prop is valid
              alt="some image"
            />
          )}

          {transformation === "pixelate" && (
            <CldImage
              src={publicId}
              width="1200"
              height="1400"
              pixelate // Ensure this prop is valid
              alt="some image"
            />
          )}

          {transformation === "bg-remove" && (
            <CldImage
              src={publicId}
              width="1200"
              height="700"
              removeBackground // Ensure this prop is valid
              alt="some image"
            />
          )}
        </div>
      </div>
    </section>
  );
}
