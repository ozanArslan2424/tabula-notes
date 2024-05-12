"use client";
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
} from "@/components/ui/alert-dialog";
import { deleteNote } from "@/lib/actions/delete";
import { NoteType } from "@/lib/types";
import { Trash2Icon } from "lucide-react";
import { useTransition } from "react";
import { LoadingIcon } from "../custom-loading";
import { Button } from "../ui/button";

type Props = {
  note: NoteType;
  bookId: string;
};

export default function DeleteNoteButton({ note, bookId }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleDeleteNote = () => {
    startTransition(() => {
      deleteNote(note.id, bookId);
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm_icon" variant="outline" className="hover:text-destructive">
          {isPending ? <LoadingIcon /> : <Trash2Icon size={14} />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">Bu işlem geri alınamaz!</AlertDialogTitle>
          <AlertDialogDescription>Notu silmek istediğine emin misin?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Vazgeç</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteNote}
            className="bg-destructive text-destructive-foreground hover:text-destructive"
          >
            Sil
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
