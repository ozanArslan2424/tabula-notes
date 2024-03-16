export type BookType = {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  groups: GroupType[];
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
