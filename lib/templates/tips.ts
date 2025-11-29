import { TipDefinition } from "./types";

export const tips: TipDefinition[] = [
  {
    title: "Type / for commands",
    description: "Access block menu to insert headings, lists, and more",
    shortcut: ["/"],
  },
  {
    title: "Create headings quickly",
    description: "Type # for H1, ## for H2, ### for H3",
    shortcut: ["#", "Space"],
  },
  {
    title: "Make a bullet list",
    description: "Type - or * followed by space",
    shortcut: ["-", "Space"],
  },
  {
    title: "Checklist items",
    description: "Type [] followed by space for tasks",
    shortcut: ["[", "]", "Space"],
  },
];
