import {
  FileText,
  ListTodo,
  BookOpen,
  Folder,
  Lightbulb,
  Clock,
} from "lucide-react";

import { TemplateDefinition } from "./types";

export const templates: TemplateDefinition[] = [
  {
    icon: FileText,
    title: "Blank Note",
    description: "Start with a clean slate for any type of content",
    type: "blank",
  },
  {
    icon: ListTodo,
    title: "Task List",
    description: "Organize your to-dos and track progress",
    type: "task",
  },
  {
    icon: BookOpen,
    title: "Meeting Notes",
    description: "Document meetings with agenda and action items",
    type: "meeting",
  },
  {
    icon: Folder,
    title: "Project",
    description: "Plan and organize a project",
    type: "project",
  },
  {
    icon: Lightbulb,
    title: "Brainstorm",
    description: "Capture ideas and creative thoughts freely",
    type: "brainstorm",
  },
  {
    icon: Clock,
    title: "Daily Journal",
    description: "Reflect on your day and track habits",
    type: "journal",
  },
];
