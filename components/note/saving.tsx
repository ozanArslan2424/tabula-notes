import { updateNote } from "@/lib/actions/update";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { CheckIcon, SaveIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { LoadingIcon } from "../ui/custom-loading";

export const SavingButton = ({ noteId, markdown }: { noteId: number; markdown: string | null }) => {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "fail">("idle");

  const debouncedEditorContent = useDebounce(markdown || "", 500);
  useEffect(() => {
    if (debouncedEditorContent === "") return;
    setStatus("saving");
    updateNote(noteId, debouncedEditorContent).then((data) => {
      if (data?.error) {
        setStatus("fail");
      }
      if (data?.success) {
        setStatus("saved");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedEditorContent]);

  let icon = <SaveIcon size={16} />;
  switch (status) {
    case "idle":
      icon = <SaveIcon size={16} />;
      break;
    case "saving":
      icon = <LoadingIcon size={16} />;
      break;
    case "saved":
      icon = <CheckIcon size={16} strokeWidth={4} className="text-success" />;
      break;
    case "fail":
      icon = <XIcon size={16} className="text-destructive" />;
      break;
  }

  return (
    <Button variant="unstyled" size="sm_icon" disabled>
      {icon}
    </Button>
  );
};
