"use client";
import { deleteTask } from "@/lib/actions/delete";
import { updateTask } from "@/lib/actions/update";
import { TaskType } from "@/lib/types";
import { Trash2Icon } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { LoadingIcon } from "../custom-loading";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

export const TodoItem = ({ task, bookId }: { task: TaskType; bookId: string }) => {
  const [completed, setCompleted] = useState<boolean>(task.completed);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const timer = setTimeout(() => {
      updateTask(task.id, completed);
    }, 10000);

    return () => clearTimeout(timer);
  }, [completed, task.id]);

  const handleDeleteTask = (taskId: number) => {
    startTransition(() => {
      deleteTask(taskId, bookId);
    });
  };

  return (
    <div className="group flex w-full items-center justify-between gap-2 rounded-md border py-1 pl-3 pr-1">
      <Checkbox
        disabled={isPending}
        id={task.id.toString()}
        name={task.id.toString()}
        className="peer"
        checked={completed}
        onCheckedChange={() => setCompleted(!completed)}
      />
      <label
        className="custom-checked w-full cursor-pointer transition-all peer-data-[state=checked]:text-muted-foreground peer-data-[state=checked]:line-through"
        htmlFor={task.id.toString()}
      >
        {task.name}
      </label>

      <Button
        size="sm_icon"
        variant="outline"
        className="bg-background text-foreground opacity-25 transition-all group-hover:opacity-100"
        onClick={() => handleDeleteTask(task.id)}
      >
        {isPending ? <LoadingIcon /> : <Trash2Icon size={14} className="shrink-0 text-destructive" />}
      </Button>
    </div>
  );
};
