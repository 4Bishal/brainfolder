export function convertBlockNoteToHTML(blocks: any[]): string {
  // Wrap list items properly
  let html = "";
  let inList = "";

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const blockHTML = blockToHTML(block);

    // Handle list grouping
    if (block.type === "bulletListItem") {
      if (inList !== "ul") {
        if (inList) html += `</${inList}>`;
        html += '<ul style="margin-left: 24px; margin-bottom: 16px;">';
        inList = "ul";
      }
      html += blockHTML;
    } else if (block.type === "numberedListItem") {
      if (inList !== "ol") {
        if (inList) html += `</${inList}>`;
        html += '<ol style="margin-left: 24px; margin-bottom: 16px;">';
        inList = "ol";
      }
      html += blockHTML;
    } else {
      if (inList) {
        html += `</${inList}>`;
        inList = "";
      }
      html += blockHTML;
    }
  }

  if (inList) html += `</${inList}>`;

  return html;
}

function blockToHTML(block: any): string {
  const { type, content, props, children } = block;

  switch (type) {
    case "heading":
      return renderHeading(content, props);

    case "paragraph":
      return renderParagraph(content);

    case "bulletListItem":
    case "numberedListItem":
      return renderListItem(content, children);

    case "checkListItem":
      return renderCheckListItem(content, props, children);

    case "table":
      return renderTable(children, props);

    case "codeBlock":
      return renderCodeBlock(content, props);

    case "image":
      return renderImage(props);

    case "video":
      return renderVideo(props);

    case "audio":
      return renderAudio(props);

    case "file":
      return renderFile(props);

    default:
      return renderParagraph(content);
  }
}

function renderHeading(content: any[], props: any): string {
  const level = props?.level || 1;
  const textAlign = props?.textAlignment || "left";
  const textColor = props?.textColor || "default";
  const backgroundColor = props?.backgroundColor || "default";

  const styles = [
    `text-align: ${textAlign}`,
    `margin-top: ${level === 1 ? "32px" : "24px"}`,
    `margin-bottom: 12px`,
    `font-weight: ${level <= 2 ? "700" : "600"}`,
    textColor !== "default" ? `color: ${textColor}` : "",
    backgroundColor !== "default"
      ? `background-color: ${backgroundColor}; padding: 4px 8px; border-radius: 3px;`
      : "",
  ]
    .filter(Boolean)
    .join("; ");

  const htmlContent = inlineContentToHTML(content);
  return `<h${level} style="${styles}">${htmlContent}</h${level}>`;
}

function renderParagraph(content: any[]): string {
  const htmlContent = inlineContentToHTML(content);
  return `<p style="margin-bottom: 8px; line-height: 1.75;">${htmlContent || "<br>"}</p>`;
}

function renderListItem(content: any[], children: any[]): string {
  const htmlContent = inlineContentToHTML(content);
  const childrenHTML = children?.map((c) => blockToHTML(c)).join("") || "";

  return `<li style="margin-bottom: 6px; line-height: 1.6;">
    ${htmlContent}
    ${childrenHTML}
  </li>`;
}

function renderCheckListItem(
  content: any[],
  props: any,
  children: any[]
): string {
  const checked = props?.checked || false;
  const htmlContent = inlineContentToHTML(content);
  const childrenHTML = children?.map((c) => blockToHTML(c)).join("") || "";
  const checkmark = checked ? "✓" : "○";

  return `<div style="display: flex; align-items: flex-start; margin-bottom: 6px;">
    <span style="margin-right: 8px; font-weight: bold; color: ${checked ? "#22c55e" : "#9ca3af"};">${checkmark}</span>
    <div style="flex: 1; ${checked ? "text-decoration: line-through; opacity: 0.6;" : ""}">
      ${htmlContent}
      ${childrenHTML}
    </div>
  </div>`;
}

function renderTable(children: any[], props: any): string {
  if (!children || children.length === 0) return "";

  const tableRows = children
    .map((row, rowIndex) => {
      const cells =
        row.content?.tableRow?.cells
          ?.map((cell: any, cellIndex: any) => {
            const cellContent = inlineContentToHTML(cell.content);
            const bgColor = cell.props?.backgroundColor || "transparent";
            const textColor = cell.props?.textColor || "#333";

            const cellStyle = [
              "border: 1px solid #d1d5db",
              "padding: 10px",
              `background-color: ${bgColor}`,
              `color: ${textColor}`,
              rowIndex === 0 && props?.hasHeaderRow
                ? "font-weight: 600; background-color: #f3f4f6;"
                : "",
            ]
              .filter(Boolean)
              .join("; ");

            return `<td style="${cellStyle}">${cellContent || "&nbsp;"}</td>`;
          })
          .join("") || "";

      return `<tr>${cells}</tr>`;
    })
    .join("");

  return `<table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
    <tbody>${tableRows}</tbody>
  </table>`;
}

function renderCodeBlock(content: any[], props: any): string {
  const code = content?.map((c) => c.text).join("") || "";
  const language = props?.language || "";

  return `<pre style="background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 6px; overflow-x: auto; margin: 20px 0; font-family: 'Courier New', monospace; font-size: 14px; line-height: 1.5;"><code>${escapeHTML(code)}</code></pre>`;
}

function renderImage(props: any): string {
  const url = props?.url || "";
  const caption = props?.caption || "";
  const name = props?.name || "Image";
  const width = props?.previewWidth || "100%";

  if (!url) return "";

  return `<figure style="margin: 24px 0; text-align: center;">
    <img src="${url}" alt="${escapeHTML(name)}" style="max-width: ${width}; height: auto; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />
    ${caption ? `<figcaption style="font-size: 14px; color: #6b7280; margin-top: 8px; font-style: italic;">${escapeHTML(caption)}</figcaption>` : ""}
  </figure>`;
}

function renderVideo(props: any): string {
  const url = props?.url || "";
  const caption = props?.caption || "";

  if (!url) return "";

  return `<div style="margin: 24px 0; text-align: center;">
    <div style="max-width: 640px; margin: 0 auto;">
      <p style="padding: 16px; background: #f3f4f6; border-radius: 6px; color: #6b7280;">
        📹 Video: <a href="${url}" target="_blank" style="color: #2563eb; text-decoration: underline;">${escapeHTML(caption || url)}</a>
      </p>
    </div>
  </div>`;
}

function renderAudio(props: any): string {
  const url = props?.url || "";
  const name = props?.name || "Audio";

  if (!url) return "";

  return `<div style="margin: 24px 0;">
    <div style="padding: 16px; background: #f3f4f6; border-radius: 6px; border-left: 4px solid #2563eb;">
      <p style="color: #374151;">🎵 <strong>${escapeHTML(name)}</strong></p>
      <p style="font-size: 14px; color: #6b7280; margin-top: 4px;">
        <a href="${url}" target="_blank" style="color: #2563eb; text-decoration: underline;">Play Audio</a>
      </p>
    </div>
  </div>`;
}

function renderFile(props: any): string {
  const url = props?.url || "";
  const name = props?.name || "File";

  if (!url) return "";

  return `<div style="margin: 16px 0;">
    <div style="display: inline-flex; align-items: center; padding: 12px 16px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px;">
      <span style="margin-right: 8px;">📎</span>
      <a href="${url}" target="_blank" style="color: #2563eb; text-decoration: none; font-weight: 500;">${escapeHTML(name)}</a>
    </div>
  </div>`;
}

function inlineContentToHTML(content: any[]): string {
  if (!content || content.length === 0) return "";

  return content
    .map((item) => {
      let text = escapeHTML(item.text || "");

      if (item.styles) {
        if (item.styles.bold) text = `<strong>${text}</strong>`;
        if (item.styles.italic) text = `<em>${text}</em>`;
        if (item.styles.underline) text = `<u>${text}</u>`;
        if (item.styles.strike) text = `<s>${text}</s>`;
        if (item.styles.code) {
          text = `<code style="background: #f1f5f9; color: #dc2626; padding: 2px 6px; border-radius: 3px; font-family: 'Courier New', monospace; font-size: 0.9em;">${text}</code>`;
        }
        if (item.styles.textColor) {
          text = `<span style="color: ${item.styles.textColor};">${text}</span>`;
        }
        if (item.styles.backgroundColor) {
          text = `<span style="background-color: ${item.styles.backgroundColor}; padding: 2px 4px; border-radius: 3px;">${text}</span>`;
        }
      }

      if (item.type === "link") {
        text = `<a href="${item.href}" style="color: #2563eb; text-decoration: underline;" target="_blank">${text}</a>`;
      }

      return text;
    })
    .join("");
}

function escapeHTML(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
