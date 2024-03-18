import { updateNote } from "@/actions/update";
import { useDebounce } from "@/hooks/use-debounce";
import { CheckIcon } from "lucide-react";
import { useEffect, useTransition } from "react";
import { Button } from "../ui/button";
import { LoadingIcon } from "../ui/custom-loading";

export const SavingButton = ({ noteId, markdown }: { noteId: number; markdown: string | null }) => {
  const [isPending, startTransition] = useTransition();

  const debouncedEditorContent = useDebounce(markdown || "", 500);
  useEffect(() => {
    if (debouncedEditorContent === "") return;
    startTransition(() => {
      updateNote(noteId, debouncedEditorContent);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedEditorContent]);

  return (
    <Button variant="unstyled" size="sm_icon" disabled>
      {isPending ? <LoadingIcon size={14} /> : <CheckIcon size={14} className="text-submit" />}
    </Button>
  );
};
