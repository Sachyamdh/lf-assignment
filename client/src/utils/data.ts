// Dummy data for folders and recent items with dropdown options
export const recentItems = [
  {
    id: 1,
    title: "Resume",
    date: "11/4/2025",
    subInfo: "This is test response ...",
  },
  {
    id: 2,
    title: "Vacation ",
    date: "12/4/2025",
    subInfo: "This is test response ...",
  },
  {
    id: 3,
    title: "Song",
    date: "13/4/2025",
    subInfo: "This is test response ...",
  },
  {
    id: 4,
    title: "Song 2",
    date: "13/4/2025",
    subInfo: "This is test response ...",
  },
  {
    id: 5,
    title: "Song 4 ",
    date: "13/4/2025",
    subInfo: "This is test response adfdafd fdafa ...",
  },
];
export const folders = [
  {
    id: 1,
    name: "Work",
  },
  {
    id: 2,
    name: "Personal",
  },
  {
    id: 3,
    name: "Travel",
  },
  {
    id: 4,
    name: "Events",
    dropdown: recentItems,
  },
];

export const more = [
  {
    id: "deleted-item",
    title: "Deleted",
  },
  {
    id: "archieved-items",
    title: "Archieved",
  },
];
