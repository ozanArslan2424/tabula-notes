import { BookSelector } from "@/components/book-select";
import { HomeLink, SettingsLink } from "@/components/buttons/action-btns";
import { CreateBookButton } from "@/components/buttons/create-book";
import { BookType } from "@/lib/types";
import { CalendarIcon, ClockIcon, TextIcon } from "lucide-react";
import { NewGroupButton } from "../buttons/new-group";
import { NoteGroupCard } from "../cards/group-card";
import { NoteCard } from "../cards/note-card";
import { TodoCard } from "../cards/todo-card";

type Props = {
  currentBook: BookType;
};

export const GroupCardsGrid = ({ currentBook }: Props) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <nav className="flex items-center gap-2">
        <HomeLink />
        <SettingsLink />
        <CreateBookButton />
        <BookSelector bookTitle={currentBook.title} />
        <div className="flex h-7 min-w-40 items-center gap-2 rounded-md border border-input bg-muted px-3 text-xs font-semibold text-muted-foreground shadow-sm">
          <TextIcon size={14} />
          {currentBook.description}
        </div>
        <div className="flex h-7 w-max items-center gap-2 rounded-md border border-input bg-muted px-3 text-xs font-semibold text-muted-foreground shadow-sm">
          <CalendarIcon size={14} />
          {currentBook.createdAt.toLocaleDateString()}
        </div>
        <div className="flex h-7 w-max items-center gap-2 rounded-md border border-input bg-muted px-3 text-xs font-semibold text-muted-foreground shadow-sm">
          <ClockIcon size={14} />
          {currentBook.updatedAt.toLocaleDateString()}
        </div>
      </nav>
      <div className="flex gap-2">
        <TodoCard />
        <div className="flex min-h-screen gap-2 overflow-scroll">
          {currentBook.groups.length >= 1 &&
            currentBook.groups.map((group) => {
              return (
                <NoteGroupCard group={group} bookId={currentBook.id} key={group.id}>
                  {group.notes
                    .sort((a, b) => a.id.toString().localeCompare(b.id.toString()))
                    .map((note) => {
                      return (
                        <NoteCard
                          key={group.notes.indexOf(note) + 1}
                          bookId={currentBook.id}
                          groupId={group.id}
                          note={note}
                        />
                      );
                    })}
                </NoteGroupCard>
              );
            })}

          <NewGroupButton bookId={currentBook.id} />
        </div>
      </div>
    </div>
  );
};
