"use client";
import { updateNote } from "@/lib/actions/update";
import { NoteType } from "@/lib/types";
import { cn, getCharacterCount, getWordCount } from "@/lib/utils";
import { CheckIcon, SaveIcon, XIcon } from "lucide-react";
import { useState, useTransition } from "react";
import ReactMarkdown from "react-markdown";
import TextareaAutosize from "react-textarea-autosize";
import remarkGfm from "remark-gfm";
import { remarkMark } from "remark-mark-highlight";
import { useDoubleTap } from "use-double-tap";
import { LoadingIcon } from "../custom-loading";
import { Button } from "../ui/button";
import DeleteNoteButton from "./delete-note";
import DownloadNoteButton from "./download-note";
import NoteTitle from "./note-title";

type Props = {
  note: NoteType;
};

export default function NoteItem({ note }: Props) {
  const [focused, setFocused] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "fail">("idle");
  const [markdown, setMarkdown] = useState(note.content || "");
  const [isPending, startTransition] = useTransition();

  const doubleTap = useDoubleTap((e) => {
    e.preventDefault();
    setFocused(true);
  });

  function moveCaretAtEnd(e: React.FocusEvent<HTMLTextAreaElement>) {
    var temp_value = e.target.value;
    e.target.value = "";
    e.target.value = temp_value;
  }

  const handleSave = () => {
    setFocused(false);
    startTransition(() => {
      updateNote(note.id, markdown).then((data) => {
        setStatus(data.success ? "success" : "fail");
      });
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "s") {
      e.preventDefault();
      handleSave();
    }
  };

  const convertedMarkdown = markdown.replace(/(?:\r\n|\r|\n)/g, "  \n");
  const characterCount = getCharacterCount(markdown);
  const wordCount = getWordCount(markdown);

  return (
    // <div className="grid h-full grid-flow-row grid-cols-1 grid-rows-[61px_auto]">
    <>
      <div className="sticky top-0 z-10 flex h-[61px] items-center justify-between border-b border-primary/10 bg-background px-6">
        <NoteTitle noteTitle={note.title} noteId={note.id} />

        <div className="flex items-center gap-2">
          {!focused &&
            (isPending ? (
              <LoadingIcon size={16} />
            ) : status === "success" ? (
              <CheckIcon size={16} strokeWidth={4} className="text-success/70" />
            ) : (
              status === "fail" && <XIcon size={32} strokeWidth={4} className="animate-pulse text-destructive" />
            ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFocused(!focused)}
            className={focused ? "border border-primary/10 hover:bg-primary/10" : "border border-transparent"}
          >
            {focused ? "Vazgeç" : "Yazıyı Düzenle"}
          </Button>

          {!focused && <DownloadNoteButton note={note} />}
          {!focused && <DeleteNoteButton note={note} bookId={note.bookId} />}

          {focused && (
            <Button
              variant="outline"
              size="sm_icon"
              onClick={handleSave}
              className="border-primary/10 hover:bg-primary/10"
            >
              <SaveIcon size={16} />
            </Button>
          )}
        </div>
      </div>

      <article className={cn("max-h-screen px-8 py-4", focused ? "bg-accent" : "bg-background")}>
        {focused ? (
          <TextareaAutosize
            className="w-full resize-none appearance-none overflow-hidden hyphens-auto text-wrap break-words border-none bg-transparent py-2 text-sm leading-relaxed outline-none"
            autoFocus={focused}
            value={markdown}
            onKeyDown={handleKeyDown}
            onChange={(e) => setMarkdown(e.target.value)}
            onFocus={moveCaretAtEnd}
          />
        ) : (
          <ReactMarkdown
            {...doubleTap}
            remarkPlugins={[remarkGfm, remarkMark]}
            className={
              markdown
                ? "prose-xs prose w-full max-w-full pb-4 dark:prose-invert sm:prose-sm prose-p:hyphens-auto prose-p:text-wrap prose-p:break-words prose-em:text-yellow-600 prose-table:m-0 prose-table:text-xs prose-hr:my-4 prose-hr:border-primary/70 dark:prose-em:text-yellow-500"
                : "w-full pb-4 italic text-muted-foreground/70"
            }
          >
            {markdown ? convertedMarkdown : "Not içeriği bulunmuyor. Düzenlemek için çift tıkla."}
          </ReactMarkdown>
        )}
      </article>
    </>
  );
}

{
  /* <pre className="absolute bottom-2 right-6 text-xs text-muted-foreground">
            <span className="mr-1 rounded-sm bg-background px-1 py-0.5">{wordCount ? wordCount : "0"}</span>
            kelime /<span className="ml-2 mr-1 rounded-sm bg-background px-1 py-0.5">{characterCount}</span>
            karakter
          </pre> */
}
