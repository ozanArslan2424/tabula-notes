"use client";
import { deleteNote, deleteUnusedTags } from "@/actions/delete";
import { updateNoteTags } from "@/actions/update";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { NoteType } from "@/lib/types";
import { getCharacterCount, getWordCount } from "@/lib/utils";
import { MoreHorizontalIcon, PencilLineIcon, PlusCircleIcon, X } from "lucide-react";
import { useState, useTransition } from "react";
import ReactMarkdown from "react-markdown";
import TextareaAutosize from "react-textarea-autosize";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import { DeleteNoteButton } from "../buttons/delete-button";
import { DownloadMarkdownButton } from "../buttons/download-button";
import { SavingButton } from "../buttons/saving-button";
import { LoadingIcon } from "../custom-loading";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Props = {
  bookId?: string;
  groupId: number;
  note: NoteType;
};

export const NoteCard = ({ bookId, groupId, note }: Props) => {
  const [focused, setFocused] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [markdown, setMarkdown] = useState(note.content || "");

  const [wordCount, setWordCount] = useState(note.content ? getWordCount(note.content) : 0);
  const [charCount, setCharCount] = useState(note.content ? getCharacterCount(note.content) : 0);

  const [editing, setEditing] = useState(false);
  const [tagName, setTagName] = useState("");

  const [allTags, setAllTags] = useState(note.tags || []);
  const [deletedTags, setDeletedTags] = useState<{ name: string }[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setMarkdown(value);
    setWordCount(value ? getWordCount(value) : 0);
    setCharCount(getCharacterCount(value));
  };

  const handleDeleteNote = () => {
    startTransition(() => {
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
    });
  };

  const handleCreateTag = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAllTags((prev) => [...prev, { name: tagName }]);
    setTagName("");
  };

  const handleDeleteTag = (tagName: string) => {
    setAllTags((prev) => prev.filter((tag) => tag.name !== tagName));
    setDeletedTags((prev) => [...prev, { name: tagName }]);
  };

  const handleTagChanges = () => {
    const onlyNewTags = allTags.filter((tag) => !note.tags?.some((t) => t.name === tag.name));
    setEditing(false);

    if (onlyNewTags.length === 0 && deletedTags.length === 0) return;

    updateNoteTags({ noteId: note.id, tags: onlyNewTags, deletedTags }).then((data) => {
      if (data?.error) {
        toast.error(data.error);
      }
    });
    deleteUnusedTags(deletedTags);
  };

  const convertedMarkdown = markdown.replace(/(?:\r\n|\r|\n)/g, "  \n");

  if (editing) {
    return (
      <Card className="relative flex w-full flex-col items-center justify-center gap-4 bg-background pb-8 pt-4">
        <Button className="absolute right-4 top-4" type="button" variant="custom_submit" onClick={handleTagChanges}>
          Kaydet
        </Button>
        <form className="mx-auto w-1/2 space-y-2" onSubmit={handleCreateTag}>
          <Label htmlFor="addtags">Etiket ekle:</Label>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              id="addtags"
              name="addtags"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              autoFocus={editing}
              autoComplete="off"
            />

            <Button type="submit" size="icon" variant="outline" disabled={!tagName}>
              <PlusCircleIcon size={16} />
            </Button>
          </div>
        </form>

        <div className="flex w-1/2 flex-wrap justify-start gap-2">
          {allTags &&
            allTags.map((tag) => (
              <div
                key={tag.name.replace(" ", "_")}
                className="flex items-center justify-center gap-2 rounded-md border p-2 text-sm shadow-sm"
              >
                <span>{tag.name}</span>
                <Button
                  className="size-min p-1"
                  variant="custom_destructive"
                  size="circle"
                  onClick={() => handleDeleteTag(tag.name)}
                >
                  <X size={12} />
                </Button>
              </div>
            ))}
        </div>
      </Card>
    );
  }

  if (!editing) {
    return (
      <Card className={`flex w-full flex-col ${focused ? "bg-accent" : "bg-card"}`}>
        <CardContent className="relative rounded-t-lg p-4">
          <div className="absolute right-2 top-2 space-x-2">
            <SavingButton noteId={note.id} markdown={markdown} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm_icon" variant="custom_action" disabled={isPending}>
                  {isPending ? <LoadingIcon size={14} /> : <MoreHorizontalIcon size={14} />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DownloadMarkdownButton noteId={note.id} markdown={markdown} />

                <DropdownMenuItem className="space-x-2" onClick={() => setEditing(true)}>
                  <PencilLineIcon size={14} />
                  <span>Etiketleri düzenle</span>
                </DropdownMenuItem>

                <DeleteNoteButton onClick={handleDeleteNote} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
        <CardFooter className="flex items-center justify-between justify-self-end rounded-b-lg px-4 py-2 font-mono text-xs text-muted-foreground">
          <div>
            {wordCount} Kelime {charCount} Karakter
          </div>
          <div className="flex max-w-[70%] flex-wrap items-center gap-1">
            #
            {allTags &&
              allTags.map((tag) => (
                <Badge key={tag.name.replace(" ", "_")} variant="custom_tag">
                  {tag.name}
                </Badge>
              ))}
          </div>
        </CardFooter>
      </Card>
    );
  }
};
