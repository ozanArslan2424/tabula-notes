export type BookType = {
  id: string;
  title: string;
  description: string | null;
  hasTasks?: boolean;
  createdAt: Date;
  updatedAt: Date;
  groups: GroupType[];
  tasks: TaskType[];
};

export type TaskType = {
  id: number;
  name: string;
  completed: boolean;
  bookId: string;
};

export type GroupType = {
  id: number;
  title: string;
  notes: NoteType[];
};

export type NoteType = {
  id: number;
  content: string | null;
  tags: TagType[];
};

export type TagType = {
  id?: number;
  name: string;
};
