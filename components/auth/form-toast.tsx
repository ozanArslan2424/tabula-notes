import { AlertTriangle, CheckCircle } from "lucide-react";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div className="flex w-80 items-center gap-x-2 rounded-md bg-emerald-500/15 px-6 py-4 text-sm text-emerald-500">
      <CheckCircle className="mr-2 h-6 w-6 shrink-0" />
      <p>{message}</p>
    </div>
  );
};

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="flex w-80 items-center gap-x-2 rounded-md bg-destructive/15 px-6 py-4 text-sm text-destructive dark:text-destructive-foreground">
      <AlertTriangle className="mr-2 h-6 w-6 shrink-0" />
      <p>{message}</p>
    </div>
  );
};

interface FormActionRequiredProps {
  message?: string;
}

export const FormActionRequired = ({ message }: FormActionRequiredProps) => {
  if (!message) return null;
  return (
    <div className="flex w-80 items-center gap-x-2 rounded-md bg-yellow-500/15 px-6 py-4 text-sm text-yellow-500">
      <AlertTriangle className="mr-2 h-6 w-6 shrink-0" />
      <p>{message}</p>
    </div>
  );
};
