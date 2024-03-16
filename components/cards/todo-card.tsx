"use client";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Props = {};

export const TodoCard = (props: Props) => {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  const handleTodoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos([...todos, input]);
    setInput("");
  };
  return (
    <div className="flex w-96 flex-col gap-2">
      <div className="flex w-full items-center justify-between rounded-lg border bg-card p-2 text-card-foreground shadow">
        <p className="px-2 text-lg font-semibold">Yapılacaklar</p>
      </div>
      <div className="flex flex-col gap-4 rounded-lg border bg-card p-2 text-card-foreground shadow">
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
      </div>
      {todos.length !== 0 && (
        <div className="flex flex-col gap-1 rounded-lg border bg-card p-2 text-card-foreground shadow">
          {todos.map((todo, index) => {
            return (
              <div key={index} className="flex items-center gap-2 rounded-sm px-2 hover:bg-accent">
                <Checkbox id={todo} name={todo} className="peer" />
                <Label
                  className="custom-checked w-full cursor-pointer py-2 transition-all peer-data-[state=checked]:text-muted-foreground peer-data-[state=checked]:line-through"
                  htmlFor={todo}
                >
                  {todo}
                </Label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
