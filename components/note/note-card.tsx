"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { deleteNote } from "@/lib/actions/delete";
import { updateNote } from "@/lib/actions/update";
import { NoteType } from "@/lib/types";
import { getCharacterCount, getWordCount } from "@/lib/utils";
import { CheckIcon, PencilLineIcon, SaveIcon, XIcon } from "lucide-react";
import { useState, useTransition } from "react";
import ReactMarkdown from "react-markdown";
import TextareaAutosize from "react-textarea-autosize";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import { useDoubleTap } from "use-double-tap";
import { LoadingIcon } from "../custom-loading";
import { Button } from "../ui/button";
import { DeleteNoteButton } from "./delete-button";

type Props = {
  bookId?: string;
  groupId: number;
  note: NoteType;
};

export const NoteCard = ({ bookId, groupId, note }: Props) => {
  const [focused, setFocused] = useState(false);
  const [markdown, setMarkdown] = useState(note.content || "");
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "fail">("idle");

  const doubleTap = useDoubleTap((event) => {
    event.preventDefault();
    setFocused(true);
  });

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
          setStatus("fail");
        }
        if (data.success) {
          setStatus("success");
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
        {!focused && isPending && <LoadingIcon size={16} />}
        {!focused && !isPending && status === "success" && (
          <CheckIcon size={16} strokeWidth={4} className="text-success/70" />
        )}
        {!focused && !isPending && status === "fail" && (
          <XIcon size={32} strokeWidth={4} className="animate-pulse text-destructive" />
        )}
      </div>
      <div className="flex items-center justify-between p-1">
        <p className="pl-2 text-sm italic text-muted-foreground">
          {note.updatedAt
            ? note.updatedAt.toLocaleDateString("tr-TR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : note.createdAt.toLocaleDateString("tr-TR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
        </p>
        {focused ? (
          <ActionButtons onCancel={() => setFocused(false)} onSave={handleSave} />
        ) : (
          <div className="flex items-center gap-1">
            <Button size="sm_icon" variant="ghost" onClick={() => setFocused(true)}>
              <PencilLineIcon size={14} />
            </Button>
            <DeleteNoteButton onClick={handleDeleteNote} />
          </div>
        )}
      </div>
      <CardContent className="px-6 pb-3 pt-0">
        {focused ? (
          <TextareaAutosize
            className="h-full w-full resize-none appearance-none overflow-hidden border-none bg-transparent py-2 text-sm leading-relaxed outline-none"
            autoFocus={focused}
            value={markdown}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            onFocus={moveCaretAtEnd}
          />
        ) : (
          <div {...doubleTap}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className={
                markdown
                  ? "prose prose-sm w-full max-w-full dark:prose-invert prose-p:mb-0 prose-p:hyphens-auto prose-p:text-wrap prose-p:break-words prose-ul:my-0 prose-table:m-0 prose-table:text-xs prose-hr:my-4 prose-hr:border-primary/70 dark:prose-em:text-yellow-500"
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
          <ActionButtons onCancel={() => setFocused(false)} onSave={handleSave} />
        </CardFooter>
      )}
    </Card>
  );
};

const ActionButtons = ({ onCancel, onSave }: { onCancel: () => void; onSave: () => void }) => {
  return (
    <div className="flex items-center gap-3">
      <Button variant="ghost" className="h-7 border border-primary" size="sm" onClick={onCancel}>
        Vazgeç
      </Button>
      <Button variant="default" size="sm_icon" onClick={onSave}>
        <SaveIcon size={16} />
      </Button>
    </div>
  );
};
