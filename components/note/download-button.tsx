"use client";
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

export const DownloadNoteButton = ({ markdown, noteId }: { markdown: string; noteId: number }) => {
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
