import { LoadingIcon } from "@/components/ui/custom-loading";

export default function Loading() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center pt-64">
      <LoadingIcon size={128} />
    </div>
  );
}
