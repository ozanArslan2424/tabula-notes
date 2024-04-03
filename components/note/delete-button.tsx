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

type Props = {
  onClick: () => void;
};

export const DeleteNoteButton = ({ onClick }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm_icon" variant="ghost" className="hover:text-destructive">
          <Trash2Icon size={14} />
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
