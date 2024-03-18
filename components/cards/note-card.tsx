"use client";
import { deleteNote } from "@/actions/delete";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { NoteType } from "@/lib/types";
import { getCharacterCount, getWordCount } from "@/lib/utils";
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

  const [wordCount, setWordCount] = useState(note.content ? getWordCount(note.content) : 0);
  const [charCount, setCharCount] = useState(note.content ? getCharacterCount(note.content) : 0);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setMarkdown(value);
    setWordCount(value ? getWordCount(value) : 0);
    setCharCount(getCharacterCount(value));
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

  return (
    <Card className={`flex w-full max-w-[576px] flex-col ${focused ? "bg-accent" : "bg-card"}`}>
      <CardContent className="rounded-t-lg px-4 py-2">
        {focused ? (
          <TextareaAutosize
            value={markdown}
            onChange={handleChange}
            onBlur={() => setFocused(false)}
            autoFocus={focused}
            className="w-full resize-none appearance-none border-none bg-transparent font-mono text-sm outline-none"
          />
        ) : (
          <div onClick={() => setFocused(true)}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className={
                markdown
                  ? "prose prose-sm w-full max-w-full dark:prose-invert prose-headings:m-0 prose-p:my-0 prose-ul:my-0 prose-table:m-0 prose-hr:my-4 prose-hr:border-primary/70"
                  : "w-full italic text-muted-foreground/70"
              }
            >
              {markdown ? convertedMarkdown : "Not içeriği bulunmuyor. Düzenlemek için tıkla."}
            </ReactMarkdown>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between justify-self-end rounded-b-lg px-4 py-0.5 font-mono text-xs text-muted-foreground">
        <div>
          {wordCount} Kelime {charCount} Karakter
        </div>
        <div className="space-x-2">
          <SavingButton noteId={note.id} markdown={markdown} />
          <DownloadMarkdownButton noteId={note.id} markdown={markdown} />
          <DeleteNoteButton onClick={handleDeleteNote} />
        </div>
      </CardFooter>
    </Card>
  );
};
