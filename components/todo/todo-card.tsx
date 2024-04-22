"use client";
import { createNewTask } from "@/lib/actions/create";
import { TaskType } from "@/lib/types";
import { PlusCircleIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { LoadingIcon2 } from "../custom-loading";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TaskItem } from "./task-item";

export const TodoCard = ({ tasks, bookId }: { tasks: TaskType[]; bookId: string }) => {
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
    <div className="mb-4 min-w-48 space-y-2 rounded-lg border bg-card px-2 py-2 text-card-foreground shadow">
      <h2 className="text-md px-2 font-semibold">Yapılacaklar</h2>
      <form className="flex items-center gap-2" onSubmit={handleTodoSubmit}>
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
      <div className="flex max-h-[480px] flex-col gap-1 overflow-y-scroll">
        {tasks.length !== 0 &&
          tasks.map((task) => {
            return <TaskItem key={task.id} task={task} bookId={bookId} />;
          })}

        {isPending && (
          <div className="mx-auto">
            <LoadingIcon2 />
          </div>
        )}
      </div>
    </div>
  );
};
