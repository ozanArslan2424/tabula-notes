import { updateGroupTitle } from "@/lib/actions/update";
import { PencilLineIcon } from "lucide-react";
import React, { useState } from "react";
import { ErrorMessage } from "../errors";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";

type Props = {
  groupId: number;
  groupTitle: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

export const EditGroup = ({ groupId, groupTitle, setTitle }: Props) => {
  const [open, setOpen] = useState(false);
  const [titleState, setTitleState] = useState(groupTitle);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (titleState === groupTitle) return;

    if (titleState === "" || titleState.length < 2 || titleState.length > 20) {
      setError("Grup adı 2-20 karakter arasında olmalıdır.");
      return;
    }

    updateGroupTitle(groupId, titleState).then((data) => {
      if (data?.success) {
        setError("");
        setTitle(titleState);
        setOpen(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button size="sm_icon" variant="ghost">
          <PencilLineIcon size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Grup adı değiştir.</DialogTitle>
        </DialogHeader>
        {error !== "" && <ErrorMessage>{error}</ErrorMessage>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input type="text" name="group-title" value={titleState} onChange={(e) => setTitleState(e.target.value)} />
          <DialogFooter>
            <Button size="sm" variant="custom_destructive" type="reset" onClick={() => setOpen(false)}>
              İptal
            </Button>
            <Button size="sm" type="submit">
              Kaydet
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
