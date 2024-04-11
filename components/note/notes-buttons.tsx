"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookType } from "@/lib/types";
import { toSnakeCase } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const NotesButtons = ({ currentBook }: { currentBook: BookType }) => {
  const router = useRouter();
  const handleSelect = (value: string) => {
    const searchValueSnake = toSnakeCase(value);
    console.log(searchValueSnake);
    router.push(`#${searchValueSnake}`);
  };
  return (
    <Select name="redirect" onValueChange={(value) => handleSelect(value)}>
      <SelectTrigger className="h-9 w-max text-sm shadow-sm hover:bg-accent">
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
  );
};
