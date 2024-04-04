import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";

export const SaveButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button variant="default" size="sm_icon" onClick={onClick}>
      <SaveIcon size={16} />
    </Button>
  );
};
