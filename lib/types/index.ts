export type BookType = {
  id: string;
  title: string;
  description: string | null;
  hasTasks?: boolean;
  createdAt: Date;
  updatedAt: Date;
  groups?: GroupType[];
  tasks?: TaskType[];
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
};

export type QuickNoteType = {
  id: number;
  content: string;
};

export type UserTableType = {
  id: string;
  email: string | null;
  username: string | null;
  image: string | null;
  role: "USER" | "ADMIN";
  _count: {
    accounts: number;
    sessions: number;
    books: number;
    quicknotes: number;
  };
};
