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
import { Button } from "../ui/button";
import { DropdownMenuItem } from "../ui/dropdown-menu";

type Props = {
  onClick: () => void;
};

export const DeleteNoteButton = ({ onClick }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem className="space-x-2 text-red-500">
          <Trash2Icon size={14} />
          <span>Grubu sil</span>
        </DropdownMenuItem>
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
            className="bg-destructive text-destructive-foreground hover:text-red-500"
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
        <Button size="sm_icon" variant="ghost" className="hover:text-red-500">
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
            className="bg-destructive text-destructive-foreground hover:text-red-500"
          >
            Sil
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
