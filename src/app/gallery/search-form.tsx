"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchForm({ initialSearch = "" }: { initialSearch?: string }) {
  const [tagName, setTagName] = useState(initialSearch);
  const router = useRouter();

  useEffect(() => {
    setTagName(initialSearch ?? "");
  }, [initialSearch]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // Perform the search action
        router.replace(`/gallery?search=${encodeURIComponent(tagName)}`);
        router.refresh();
      }}
    >
      <Label htmlFor="tag-name" className="text-right font-semibold text-lg">
        Search By Tag :
      </Label>
      <div className="flex gap-2 mt-4">
        <Input
          id="tag-name"
          value={tagName}
          onChange={(e) => setTagName(e.currentTarget.value)}
        />
        <Button type="submit">Search</Button>
      </div>
    </form>
  );
}
