"use client";
import { batchCreate } from "@/lib/actions/batch";
import { BadgePlusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";

type Props = {};

export default function BatchCreate({ userId }: { userId: string }) {
  const [noteTitles, setNoteTitles] = useState<string[]>([]);
  const [noteTitle, setNoteTitle] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hasTasks, setHasTasks] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCreate = () => {
    batchCreate(title, description, hasTasks, noteTitles, userId).then((res) => {
      setOpen(false);
      if (res?.error) {
        return toast.error(res.error);
      } else {
        toast.success(res.success);
        setTitle("");
        setDescription("");
        setHasTasks(false);
        setNoteTitles([]);
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setDescription("");
    setHasTasks(false);
    setNoteTitles([]);
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 bg-background">
          <BadgePlusIcon size={16} className="shrink-0" />
          <span>Toplu Oluştur</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col gap-2">
          <label htmlFor="title">
            <span>Kitap Başlığı</span>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              id="title"
              name="title"
              className="capitalize"
              required
              placeholder="Kitap Adı"
            />
          </label>
          <label htmlFor="description">
            <span>Kitap Açıklaması</span>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              id="description"
              name="description"
              placeholder="Kısa Bir Açıklama"
            />
          </label>
          <label htmlFor="hasTasks" className="flex items-center gap-2">
            <Checkbox id="hasTasks" name="hasTasks" onCheckedChange={() => setHasTasks(!hasTasks)} checked={hasTasks} />
            <span>Yapılacaklar listesi</span>
          </label>

          <form
            className="my-6"
            onSubmit={(e) => {
              e.preventDefault();
              setNoteTitles([...noteTitles, noteTitle]);
              setNoteTitle("");
            }}
          >
            <label htmlFor="noteTitle">
              <span>Not Başlığı</span>
            </label>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                id="noteTitle"
                name="noteTitle"
                onChange={(e) => setNoteTitle(e.target.value)}
                value={noteTitle}
              />
              <button
                className="flex aspect-square h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
                type="submit"
              >
                <PlusIcon size={16} />
              </button>
            </div>
            <ol className="px-8 py-2">
              {noteTitles.map((noteTitle, index) => (
                <li className="list-decimal" key={index}>
                  {noteTitle}
                </li>
              ))}
            </ol>
          </form>
        </div>
        <DialogFooter className="mt-4">
          <Button onClick={handleClose} variant="custom_destructive" type="button">
            Vazgeç
          </Button>

          <Button onClick={handleCreate} type="button">
            Oluştur
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
