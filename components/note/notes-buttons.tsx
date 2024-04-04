"use client";
import { BookSettings } from "@/components/book/book-settings-form";
import { CreateBookButton } from "@/components/book/create-book";
import { LinkButton } from "@/components/link-button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookType } from "@/lib/types";
import { toSnakeCase } from "@/lib/utils";
import { HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const NotesButtons = ({ currentBook }: { currentBook: BookType }) => {
  const router = useRouter();
  const handleSelect = (value: string) => {
    const searchValueSnake = toSnakeCase(value);
    console.log(searchValueSnake);
    router.push(`#${searchValueSnake}`);
  };
  return (
    <nav className="mb-4 mt-2 flex flex-wrap justify-start gap-2 px-2 md:px-4">
      <LinkButton
        className="w-max justify-start space-x-3 bg-background text-foreground"
        variant="outline"
        href="/dash"
      >
        <HomeIcon size={14} className="shrink-0" />
        <span className="hidden sm:inline">Kütüphane</span>
      </LinkButton>
      <CreateBookButton />
      <BookSettings mode="full" book={currentBook} />
      <Select name="redirect" onValueChange={(value) => handleSelect(value)}>
        <SelectTrigger className="h-9 w-max text-sm">
          <SelectValue placeholder="Gruba git" />
        </SelectTrigger>
        <SelectContent>
          {currentBook.groups?.map((group) => (
            <SelectItem key={group.id} value={group.title} onClick={(e) => e.preventDefault()}>
              {group.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </nav>
  );
};
