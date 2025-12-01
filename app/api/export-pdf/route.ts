// app/api/export-pdf/route.ts

import { convertBlockNoteToHTML } from "@/lib/blocknote-to-html";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: NextRequest) {
  try {
    const { title, content, coverImage, icon } = await req.json();

    // Parse BlockNote JSON content to HTML
    const htmlContent = convertBlockNoteToHTML(JSON.parse(content));

    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
    });

    const page = await browser.newPage();

    // Generate complete HTML with all styling
    const html = generatePDFHTML(title, htmlContent, coverImage, icon);

    await page.setContent(html, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    // Generate PDF
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "0mm",
        bottom: "20mm",
        left: "20mm",
        right: "20mm",
      },
    });

    await browser.close();

    // Return PDF as downloadable file
    return new NextResponse(Buffer.from(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${sanitizeFilename(title)}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}

// // Convert BlockNote JSON to HTML
// function convertBlockNoteToHTML(blocks: any[]): string {
//   return blocks.map((block) => blockToHTML(block)).join("");
// }

function blockToHTML(block: any): string {
  const { type, content, props, children } = block;

  // Handle different block types
  switch (type) {
    case "heading":
      const level = props?.level || 1;
      const headingContent = inlineContentToHTML(content);
      return `<h${level} style="margin-top: 24px; margin-bottom: 12px; font-weight: 600;">${headingContent}</h${level}>`;

    case "paragraph":
      const paraContent = inlineContentToHTML(content);
      return `<p style="margin-bottom: 8px; line-height: 1.6;">${paraContent || "<br>"}</p>`;

    case "bulletListItem":
      const bulletContent = inlineContentToHTML(content);
      const bulletChildren =
        children?.map((c: any) => blockToHTML(c)).join("") || "";
      return `<li style="margin-bottom: 4px;">${bulletContent}${bulletChildren ? `<ul style="margin-left: 20px;">${bulletChildren}</ul>` : ""}</li>`;

    case "numberedListItem":
      const numberedContent = inlineContentToHTML(content);
      const numberedChildren =
        children?.map((c: any) => blockToHTML(c)).join("") || "";
      return `<li style="margin-bottom: 4px;">${numberedContent}${numberedChildren ? `<ol style="margin-left: 20px;">${numberedChildren}</ol>` : ""}</li>`;

    case "checkListItem":
      const checked = props?.checked || false;
      const checkContent = inlineContentToHTML(content);
      const checkmark = checked ? "☑" : "☐";
      return `<div style="margin-bottom: 4px;"><span style="margin-right: 8px;">${checkmark}</span>${checkContent}</div>`;

    case "table":
      const tableContent =
        children
          ?.map((row: any) => {
            const cells =
              row.children
                ?.map((cell: any) => {
                  const cellContent = inlineContentToHTML(cell.content);
                  return `<td style="border: 1px solid #444; padding: 8px;">${cellContent}</td>`;
                })
                .join("") || "";
            return `<tr>${cells}</tr>`;
          })
          .join("") || "";
      return `<table style="border-collapse: collapse; width: 100%; margin: 16px 0;"><tbody>${tableContent}</tbody></table>`;

    case "codeBlock":
      const code = content?.map((c: any) => c.text).join("") || "";
      const language = props?.language || "";
      return `<pre style="background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 4px; overflow-x: auto; margin: 16px 0;"><code>${escapeHTML(code)}</code></pre>`;

    case "image":
      const imageUrl = props?.url || "";
      const caption = props?.caption || "";
      return `<div style="margin: 16px 0; text-align: center;">
        <img src="${imageUrl}" style="max-width: 100%; height: auto; border-radius: 4px;" />
        ${caption ? `<p style="font-size: 14px; color: #888; margin-top: 8px;">${caption}</p>` : ""}
      </div>`;

    default:
      return "";
  }
}

function inlineContentToHTML(content: any[]): string {
  if (!content) return "";

  return content
    .map((item) => {
      let text = escapeHTML(item.text || "");

      if (item.styles) {
        if (item.styles.bold) text = `<strong>${text}</strong>`;
        if (item.styles.italic) text = `<em>${text}</em>`;
        if (item.styles.underline) text = `<u>${text}</u>`;
        if (item.styles.strike) text = `<s>${text}</s>`;
        if (item.styles.code)
          text = `<code style="background: #f0f0f0; padding: 2px 4px; border-radius: 3px; font-family: monospace;">${text}</code>`;
      }

      return text;
    })
    .join("");
}

function escapeHTML(text: string): string {
  const div = { textContent: text } as any;
  return div.textContent
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function generatePDFHTML(
  title: string,
  content: string,
  coverImage?: string,
  icon?: string
): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHTML(title)}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
      line-height: 1.6;
      color: #333;
      background: white;
    }
    
    .cover-image {
  width: 100%;        
  height: auto;       
  max-height: 100vh;  
  object-fit: cover;  
  display: block;     
  margin-bottom: 0;
}

    
    .content-wrapper {
      padding: 40px;
      max-width: 100%;
    }
    
    .header {
      margin-bottom: 32px;
    }
    
    .icon {
      font-size: 48px;
      margin-bottom: 16px;
    }
    
    .title {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 24px;
      color: #1a1a1a;
    }
    
    h1 { font-size: 28px; color: #1a1a1a; }
    h2 { font-size: 24px; color: #1a1a1a; }
    h3 { font-size: 20px; color: #1a1a1a; }
    
    ul, ol {
      margin-left: 24px;
      margin-bottom: 16px;
    }
    
    a {
      color: #0066cc;
      text-decoration: none;
    }
    
    code {
      font-family: 'Courier New', monospace;
      font-size: 14px;
    }
    
    @media print {
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>
  ${coverImage ? `<img src="${coverImage}" class="cover-image" alt="Cover" />` : ""}
  
  <div class="content-wrapper">
    <div class="header">
      ${icon ? `<div class="icon">${icon}</div>` : ""}
      <h1 class="title">${escapeHTML(title)}</h1>
    </div>
    
    <div class="content">
      ${content}
    </div>
  </div>
</body>
</html>
  `.trim();
}

function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-z0-9]/gi, "_")
    .replace(/_+/g, "_")
    .substring(0, 100);
}
