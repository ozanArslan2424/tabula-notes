"use client";
import { createNewTask } from "@/actions/create";
import { deleteTask } from "@/actions/delete";
import { updateTask } from "@/actions/update";
import { TaskType } from "@/lib/types";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { LoadingIcon2 } from "../ui/custom-loading";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Props = {
  tasks: TaskType[];
  bookId: string;
};

export const TodoCard = ({ tasks, bookId }: Props) => {
  const [input, setInput] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const handleTodoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      createNewTask({
        bookId: bookId,
        name: input,
      });
    });
    setInput("");
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full items-center justify-between rounded-lg bg-card p-2 text-card-foreground shadow">
        <p className="text-md px-2 font-semibold">Yapılacaklar</p>
      </div>
      <div className="flex flex-col gap-1 rounded-lg border bg-card p-2 text-card-foreground shadow">
        <form className="mb-3 flex items-center gap-2" onSubmit={handleTodoSubmit}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            name="todo"
            id="todo"
            placeholder="Yapılacak ekle"
            className="h-7 w-full bg-accent text-accent-foreground"
          />
          <Button type="submit" size="sm_icon" variant="custom_submit">
            <span className="sr-only">Yapılacak ekle</span>
            <PlusCircleIcon size={14} />
          </Button>
        </form>
        {tasks.length !== 0 && (
          <>
            {tasks.map((task) => {
              return <TaskItem key={task.id} task={task} bookId={bookId} />;
            })}
            {isPending && (
              <div className="mx-auto">
                <LoadingIcon2 />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const TaskItem = ({
  task,
  bookId,
  disabled,
}: {
  task: TaskType;
  bookId: string;
  disabled?: boolean;
}) => {
  const [completed, setCompleted] = useState<boolean>(task.completed);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const timer = setTimeout(() => {
      updateTask({ taskId: task.id, completed: completed });
    }, 1000);

    return () => clearTimeout(timer);
  }, [completed, task.id]);

  const handleDeleteTask = (id: number) => {
    startTransition(() => {
      deleteTask({ taskId: id, bookId: bookId });
    });
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex w-full items-center gap-2 rounded-sm px-2 hover:bg-accent">
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
        className="hover:text-red-500"
        onClick={() => handleDeleteTask(task.id)}
      >
        <Trash2Icon size={14} />
      </Button>
    </div>
  );
};
