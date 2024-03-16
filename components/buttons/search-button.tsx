"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tag } from "@prisma/client";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

type Props = {
  tags: Tag[];
};

export const SearchTags = ({ tags }: Props) => {
  const [focus, setFocus] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSelectTag = (tagName: string) => () => {
    setSearchValue(tagName);
    setFocus(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchValue);
  };

  return (
    <form className="flex items-start gap-2" onSubmit={handleSubmit}>
      <div className="relative">
        <Input
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => setSearchValue(e.target.value)}
          autoComplete="off"
          value={searchValue}
          type="text"
          name="searchValue"
          placeholder="Etiket gir..."
          className="h-7 bg-background focus:text-accent-foreground dark:bg-secondary dark:focus:bg-accent"
        />
        {focus && (
          <div className="absolute mt-1 min-w-full rounded-md border border-input bg-background p-1 shadow-sm">
            {tags
              .filter((tag) => tag.name.toLowerCase().indexOf(searchValue) > -1)
              .map((tag) => {
                return (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={handleSelectTag(tag.name)}
                    className="flex w-full cursor-pointer rounded-sm px-3 py-1 text-sm transition-colors hover:bg-accent"
                  >
                    {tag.name}
                  </button>
                );
              })}
          </div>
        )}
      </div>
      <Button type="submit" size="sm_icon" variant="custom_search">
        <SearchIcon size={14} />
      </Button>
    </form>
  );
};
