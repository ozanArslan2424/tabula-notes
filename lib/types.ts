export type UserType = {
  id: string;
  email: string;
  username: string;
  image: string;
  role: string;
} | null;

export type BookType = {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  hasTasks: boolean;
  notes: NoteType[];
  tasks?: TaskType[];
  userId: string;
};

export type BookInfoType = {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  hasTasks: boolean;
  _count: {
    notes: number;
    tasks: number;
  };
};

export type TaskType = {
  id: number;
  name: string;
  completed: boolean;
  bookId: string;
  userId: string;
};

export type NoteType = {
  id: number;
  title: string;
  content: string | null;
  createdAt: Date;
  bookId: string;
};

export type QuickNoteType = {
  id: number;
  content: string;
  userId: string;
};

export type UserTableType = {
  id: string;
  username: string | null;
  email: string | null;
  image: string | null;
  role: "USER" | "ADMIN";
  _count: {
    books: number;
    tasks: number;
    quicknotes: number;
    accounts: number;
    sessions: number;
  };
};

export type BugReportType = {
  id: number;
  subject: string;
  description: string;
  createdAt: Date;
  resolved: boolean;
  userId: string;
};
