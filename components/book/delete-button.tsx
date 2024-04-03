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
import { DropdownMenuItem } from "../ui/dropdown-menu";

type Props = {
  onClick: () => void;
};

export const DeleteBookButton = ({ onClick }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
          className="flex items-center gap-2 hover:bg-destructive hover:text-destructive-foreground"
        >
          <Trash2Icon size={14} className="shrink-0" />
          Sil
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Kitabı sil.</AlertDialogTitle>
          <AlertDialogDescription>Kitabı silmek istediğine emin misin? Bu işlem geri alınamaz.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Vazgeç</AlertDialogCancel>
          <AlertDialogAction
            onClick={onClick}
            className="bg-destructive text-destructive-foreground hover:text-destructive"
          >
            Sil
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
