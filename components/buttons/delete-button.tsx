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
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

type Props = {
  onClick: () => void;
};

export const DeleteNoteButton = ({ onClick }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm_icon" variant="ghost" className="sm:hover:text-red-500">
          <Trash2Icon size={14} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">Bu işlem geri alınamaz!</AlertDialogTitle>
          <AlertDialogDescription>Notu silmek istediğine emin misin?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Vazgeç</AlertDialogCancel>
          <AlertDialogAction
            onClick={onClick}
            className="bg-destructive text-destructive-foreground sm:hover:text-red-500"
          >
            Sil
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const DeleteGroupButton = ({ onClick }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm_icon" variant="ghost" className="sm:hover:text-red-500">
          <Trash2Icon size={14} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">Bu işlem geri alınamaz!</AlertDialogTitle>
          <AlertDialogDescription>Grubu silmek istediğine emin misin?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Vazgeç</AlertDialogCancel>
          <AlertDialogAction
            onClick={onClick}
            className="bg-destructive text-destructive-foreground sm:hover:text-red-500"
          >
            Sil
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const DeleteBookButton = ({ onClick }: { onClick: () => void }) => {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
      <AlertDialogTrigger asChild>
        <Button
          size="sm_icon"
          variant="ghost"
          className="absolute right-4 top-4 gap-2 sm:hover:bg-destructive sm:hover:text-destructive-foreground"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen(true);
          }}
        >
          <Trash2Icon size={14} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Kitabı sil.</AlertDialogTitle>
          <AlertDialogDescription>
            Kitabı silmek istediğine emin misin? Bu işlem geri alınamaz.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Vazgeç</AlertDialogCancel>
          <AlertDialogAction
            onClick={onClick}
            className="bg-destructive text-destructive-foreground sm:hover:text-red-500"
          >
            Sil
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
