"use client";
import { TodoItem } from "@/components/todo/todo-item";
import { TaskType } from "@/lib/types";
import { useMemo } from "react";
import { TodoForm } from "./todo-form";

export default function TodoList({ tasks, bookId }: { tasks: TaskType[]; bookId: string }) {
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
    <>
      <TodoForm bookId={bookId} />
      {tasksMemo.map((task) => (
        <TodoItem key={task.id} task={task} bookId={bookId} />
      ))}
    </>
  );
}
