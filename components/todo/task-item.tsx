"use client";
import { deleteTask } from "@/lib/actions/delete";
import { updateTask } from "@/lib/actions/update";
import { TaskType } from "@/lib/types";
import { Trash2Icon } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { LoadingIcon2 } from "../custom-loading";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export const TaskItem = ({ task, bookId }: { task: TaskType; bookId: string }) => {
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
    <div className="flex items-center gap-2">
      <div className="flex w-full items-center gap-2 rounded-sm px-2 py-1 hover:bg-accent">
        <Checkbox
          disabled={isPending}
          id={task.name}
          name={task.name}
          className="peer"
          checked={completed}
          onCheckedChange={() => setCompleted(!completed)}
        />
        <Label
          className="custom-checked w-full cursor-pointer py-2 transition-all peer-data-[state=checked]:text-muted-foreground peer-data-[state=checked]:line-through"
          htmlFor={task.name}
        >
          {isPending ? <LoadingIcon2 /> : task.name}
        </Label>
      </div>
      <Button
        disabled={isPending}
        size="sm_icon"
        variant="ghost"
        className="hover:text-destructive"
        onClick={() => handleDeleteTask(task.id)}
      >
        <Trash2Icon size={14} />
      </Button>
    </div>
  );
};
