import { TemplateContent, TemplateType } from "./types";

export function getTemplateContent(type: TemplateType): TemplateContent {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  switch (type) {
    case "task":
      return {
        title: "Task List",
        content: JSON.stringify([
          {
            type: "heading",
            content: [{ type: "text", text: "Task List" }],
            props: { level: 1 },
          },
          {
            type: "heading",
            content: [{ type: "text", text: "To Do" }],
            props: { level: 2 },
          },
          {
            type: "checkListItem",
            content: [{ type: "text", text: "" }],
            props: { checked: false },
          },
          {
            type: "checkListItem",
            content: [{ type: "text", text: "" }],
            props: { checked: false },
          },
          {
            type: "checkListItem",
            content: [{ type: "text", text: "" }],
            props: { checked: false },
          },
          {
            type: "heading",
            content: [{ type: "text", text: "In Progress" }],
            props: { level: 2 },
          },
          {
            type: "checkListItem",
            content: [{ type: "text", text: "" }],
            props: { checked: false },
          },
          {
            type: "heading",
            content: [{ type: "text", text: "Completed" }],
            props: { level: 2 },
          },
          {
            type: "checkListItem",
            content: [{ type: "text", text: "" }],
            props: { checked: true },
          },
        ]),
        icon: "📋",
      };

    case "meeting":
      return {
        title: "Meeting Notes",
        content: JSON.stringify([
          {
            type: "heading",
            content: [{ type: "text", text: `Meeting Notes - ${today}` }],
            props: { level: 1 },
          },
          {
            type: "heading",
            content: [{ type: "text", text: "Attendees" }],
            props: { level: 2 },
          },
          { type: "bulletListItem", content: [{ type: "text", text: "" }] },
          {
            type: "heading",
            content: [{ type: "text", text: "Agenda" }],
            props: { level: 2 },
          },
          { type: "numberedListItem", content: [{ type: "text", text: "" }] },
          { type: "numberedListItem", content: [{ type: "text", text: "" }] },
          { type: "numberedListItem", content: [{ type: "text", text: "" }] },
          {
            type: "heading",
            content: [{ type: "text", text: "Notes" }],
            props: { level: 2 },
          },
          { type: "paragraph", content: [] },
        ]),
        icon: "📝",
      };

    case "project":
      return {
        title: "New Project",
        content: JSON.stringify([
          {
            type: "heading",
            content: [{ type: "text", text: "Project Name" }],
            props: { level: 1 },
          },
          {
            type: "heading",
            content: [{ type: "text", text: "Overview" }],
            props: { level: 2 },
          },
          { type: "paragraph", content: [] },
        ]),
        icon: "🚀",
      };

    case "brainstorm":
      return {
        title: "Brainstorm",
        content: JSON.stringify([
          {
            type: "heading",
            content: [{ type: "text", text: "Brainstorming Session" }],
            props: { level: 1 },
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: `Date: ${today}` }],
          },
        ]),
        icon: "💡",
      };

    case "journal":
      return {
        title: `Journal - ${today}`,
        content: JSON.stringify([
          {
            type: "heading",
            content: [{ type: "text", text: today }],
            props: { level: 1 },
          },
          {
            type: "heading",
            content: [{ type: "text", text: "Morning Thoughts" }],
            props: { level: 2 },
          },
          { type: "paragraph", content: [] },
        ]),
        icon: "📅",
      };

    default:
      return {
        title: "Untitled",
        content: JSON.stringify([{ type: "paragraph", content: [] }]),
        icon: "📄",
      };
  }
}
