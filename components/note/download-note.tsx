"use client";
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

type Props = {
  note: NoteType;
};

export default function DownloadNoteButton({ note }: Props) {
  const markdown = `# ${note.title} \n\n---\n\n ${note.content}`;

  const downloadMarkdownFile = () => {
    const link = document.createElement("a");
    const file = new Blob([markdown], { type: "text/plain" });
    link.href = URL.createObjectURL(file);
    link.download = `${note.title}.md`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm_icon" variant="outline">
          <DownloadIcon size={14} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="capitalize">{note.title} adlı not indirilecek.</AlertDialogTitle>
          <AlertDialogDescription>
            Bu notu bilgisayarına <code>.md</code> dosyası olarak indirmek istediğine emin misin?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Vazgeç</AlertDialogCancel>
          <AlertDialogAction onClick={downloadMarkdownFile} className="hover:bg-success hover:text-success-foreground">
            İndir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
