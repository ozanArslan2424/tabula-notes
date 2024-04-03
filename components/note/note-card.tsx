"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { deleteNote } from "@/lib/actions/delete";
import { updateNote } from "@/lib/actions/update";
import { NoteType } from "@/lib/types";
import { getCharacterCount, getWordCount } from "@/lib/utils";
import { CheckIcon, XIcon } from "lucide-react";
import { useState, useTransition } from "react";
import ReactMarkdown from "react-markdown";
import TextareaAutosize from "react-textarea-autosize";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import { LoadingIcon } from "../ui/custom-loading";
import { DeleteNoteButton } from "./delete-button";
import { SaveButton } from "./saving";

type Props = {
  bookId?: string;
  groupId: number;
  note: NoteType;
};

export const NoteCard = ({ bookId, groupId, note }: Props) => {
  const [focused, setFocused] = useState(false);
  const [markdown, setMarkdown] = useState(note.content || "");
  const [isSaved, setIsSaved] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPending, startTransition] = useTransition();

  function moveCaretAtEnd(e: React.FocusEvent<HTMLTextAreaElement>) {
    var temp_value = e.target.value;
    e.target.value = "";
    e.target.value = temp_value;
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMarkdown(value);
  };

  const handleSave = () => {
    setFocused(false);
    startTransition(() => {
      updateNote(note.id, markdown).then((data) => {
        if (data.error) {
          toast.error(data.error);
          setHasError(true);
        }
        if (data.success) {
          setIsSaved(true);
        }
      });
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "s") {
      e.preventDefault();
      handleSave();
    }
  };

  const handleDeleteNote = () => {
    deleteNote({
      noteId: note.id,
      groupId: groupId,
      bookId: bookId!,
    }).then((data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.success);
      }
    });
  };

  const convertedMarkdown = markdown.replace(/(?:\r\n|\r|\n)/g, "  \n");
  const characterCount = getCharacterCount(markdown);
  const wordCount = getWordCount(markdown);

  return (
    <Card className={`z-5 relative mt-2 flex w-full flex-col ${focused ? "bg-accent" : "bg-card"}`}>
      <div className="absolute bottom-1 right-1">
        {!focused && isPending && !isSaved && <LoadingIcon size={16} />}
        {!focused && !isPending && isSaved && <CheckIcon size={16} strokeWidth={4} className="text-success/70" />}
        {!focused && !isPending && hasError && (
          <XIcon size={32} strokeWidth={4} className="animate-pulse text-destructive" />
        )}
      </div>
      <div className="absolute right-1 top-1">{!focused && <DeleteNoteButton onClick={handleDeleteNote} />}</div>
      <CardContent className="px-6 py-3">
        {focused ? (
          <TextareaAutosize
            className="h-full w-full resize-none appearance-none border-none bg-transparent py-2 text-sm leading-relaxed outline-none"
            autoFocus={focused}
            value={markdown}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            onFocus={moveCaretAtEnd}
            // onBlur={() => setFocused(false)}
          />
        ) : (
          <div onClick={() => setFocused(true)}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className={
                markdown
                  ? "prose prose-sm w-full max-w-full dark:prose-invert prose-headings:m-0 prose-p:my-0 prose-p:hyphens-auto prose-p:text-wrap prose-p:break-words prose-ul:my-0 prose-table:m-0 prose-hr:my-4 prose-hr:border-primary/70 dark:prose-em:text-yellow-500"
                  : "w-full italic text-muted-foreground/70"
              }
            >
              {markdown ? convertedMarkdown : "Not içeriği bulunmuyor. Düzenlemek için tıkla."}
            </ReactMarkdown>
          </div>
        )}
      </CardContent>
      {focused && (
        <CardFooter className="justify-between">
          <pre className="text-xs text-muted-foreground">
            <span className="mr-1 rounded-sm bg-background px-1 py-0.5">{wordCount}</span>
            kelime /<span className="ml-2 mr-1 rounded-sm bg-background px-1 py-0.5">{characterCount}</span>
            karakter
          </pre>
          <SaveButton onClick={handleSave} />
        </CardFooter>
      )}
    </Card>
  );
};
