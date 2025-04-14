export type NoteType = {
  title: string;
  content: string;
  createdAt: string;
};

export type NoteResponse = {
  id: number;
  slug: string;
  title: string;
  content: string;
  updatedAt: string;
};
