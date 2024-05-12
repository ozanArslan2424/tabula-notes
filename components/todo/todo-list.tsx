"use client";
import TodoItem from "@/components/todo/todo-item";
import { TaskType } from "@/lib/types";
import { useMemo } from "react";
import TodoForm from "./todo-form";

export default function TodoList({ tasks, bookId, userId }: { tasks: TaskType[]; bookId: string; userId: string }) {
  const tasksMemo = useMemo(
    () =>
      tasks.map((task) => {
        return {
          ...task,
        };
      }),
    [tasks],
  );
  return (
    <div className="flex flex-col gap-1 p-2">
      <TodoForm bookId={bookId} userId={userId} />
      {tasksMemo.map((task) => (
        <TodoItem key={task.id} task={task} bookId={bookId} />
      ))}
    </div>
  );
}
