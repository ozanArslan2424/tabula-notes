"use client";
import { Card, CardContent } from "@/components/ui/card";
import { deleteNote } from "@/lib/actions/delete";
import { NoteType } from "@/lib/types";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import TextareaAutosize from "react-textarea-autosize";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import { DeleteNoteButton } from "../buttons/delete-button";
import { DownloadMarkdownButton } from "../buttons/download-button";
import { SavingButton } from "../buttons/saving-button";

type Props = {
  bookId?: string;
  groupId: number;
  note: NoteType;
};

export const NoteCard = ({ bookId, groupId, note }: Props) => {
  const [focused, setFocused] = useState(false);
  const [markdown, setMarkdown] = useState(note.content || "");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setMarkdown(value);
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

  function moveCaretAtEnd(e: React.FocusEvent<HTMLTextAreaElement>) {
    var temp_value = e.target.value;
    e.target.value = "";
    e.target.value = temp_value;
  }

  const convertedMarkdown = markdown.replace(/(?:\r\n|\r|\n)/g, "  \n");

  return (
    <Card className={`z-5 relative mt-2 flex w-full flex-col ${focused ? "bg-accent" : "bg-card"}`}>
      <div className="absolute bottom-0.5 right-2 flex flex-row items-center gap-2">
        <SavingButton noteId={note.id} markdown={markdown} />
        {!focused && <DownloadMarkdownButton noteId={note.id} markdown={markdown} />}
        {!focused && <DeleteNoteButton onClick={handleDeleteNote} />}
      </div>
      <CardContent className="rounded-b-lg px-4 py-2">
        {focused ? (
          <TextareaAutosize
            value={markdown}
            onChange={handleChange}
            onFocus={moveCaretAtEnd}
            onBlur={() => setFocused(false)}
            autoFocus={focused}
            className="h-full w-full resize-none appearance-none border-none bg-transparent py-2 text-sm leading-relaxed outline-none"
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
    </Card>
  );
};
