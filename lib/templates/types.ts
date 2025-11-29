export type TemplateType =
  | "blank"
  | "task"
  | "meeting"
  | "project"
  | "brainstorm"
  | "journal";

export interface TemplateContent {
  title: string;
  content: string;
  icon: string;
}

export interface TemplateDefinition {
  icon: any;
  title: string;
  description: string;
  type: TemplateType;
}

export interface TipDefinition {
  title: string;
  description: string;
  shortcut?: string[];
}
