"use client";
import { getBookContents } from "@/lib/actions/read";
import { NoteType } from "@/lib/types";
import { DownloadIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

export const DownloadMarkdownButton = ({ markdown, noteId }: { markdown: string; noteId: number }) => {
  const downloadMarkdownFile = () => {
    const link = document.createElement("a");
    const file = new Blob([markdown], { type: "text/plain" });
    link.href = URL.createObjectURL(file);
    link.download = `${noteId}.md`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm_icon" variant="ghost">
          <DownloadIcon size={14} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Not indirilecek.</AlertDialogTitle>
          <AlertDialogDescription>
            Bu notu bilgisayarına <code>.md</code> dosyası olarak indirmek istediğine emin misin?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Vazgeç</AlertDialogCancel>
          <AlertDialogAction
            onClick={downloadMarkdownFile}
            className="sm:hover:bg-success sm:hover:text-success-foreground"
          >
            İndir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const DownloadGroupButton = async ({
  groupTitle,
  groupNotes,
}: {
  groupTitle: string;
  groupNotes: NoteType[];
}) => {
  const markdown = `# ${groupTitle} \n\n---\n\n ${groupNotes.map((note) => note.content).join("\n\n")}`;

  const downloadMarkdownFile = () => {
    const link = document.createElement("a");
    const file = new Blob([markdown], { type: "text/plain" });
    link.href = URL.createObjectURL(file);
    link.download = `${groupTitle}.md`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm_icon" variant="ghost">
          <DownloadIcon size={14} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Gruptaki bütün notlar indirilecek.</AlertDialogTitle>
          <AlertDialogDescription>
            Bu gruptaki notları bilgisayarına <code>.md</code> dosyası olarak indirmek istediğine emin misin?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Vazgeç</AlertDialogCancel>
          <AlertDialogAction
            onClick={downloadMarkdownFile}
            className="sm:hover:bg-success sm:hover:text-success-foreground"
          >
            İndir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const DownloadBookButton = ({ bookId }: { bookId: string }) => {
  const downloadMarkdownFile = async () => {
    const book = await getBookContents(bookId);

    const markdown = `${book?.groups
      .map((group) => {
        "#" + group.title + "\n\n" + group.notes.map((note) => note.content).join("\n\n");
      })
      .join("\n\n")}`;

    const link = document.createElement("a");
    const file = new Blob([markdown], { type: "text/plain" });
    link.href = URL.createObjectURL(file);
    link.download = `${book?.title}.md`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm_icon" variant="ghost">
          <DownloadIcon size={14} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Kitaptaki bütün notlar indirilecek.</AlertDialogTitle>
          <AlertDialogDescription>
            Bu kitaptaki notları bilgisayarına <code>.md</code> dosyası olarak indirmek istediğine emin misin?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <form className="space-x-2" action={downloadMarkdownFile}>
            <AlertDialogCancel>Vazgeç</AlertDialogCancel>
            <AlertDialogAction type="submit" className="sm:hover:bg-success sm:hover:text-success-foreground">
              İndir
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
