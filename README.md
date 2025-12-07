# BrainFolder 🧠📁

![BrainFolder Logo](public/logo.png)

**BrainFolder** is a modern, minimal, and powerful **knowledge-organizing workspace** built with Next.js and Convex.  
It acts as your **second brain**, allowing you to create structured notes, nested pages, embed media, search instantly, and export your content with ease.

🌐 **Live Demo:** https://brainfolder.vercel.app/

---

## 🚀 Features

- 📝 **Rich Text & Markdown Editor** powered by BlockNote.
- 🗂️ **Nested page hierarchy** to organize knowledge like a real second brain.
- 📎 **Media uploads** (images, files, links) stored securely using EdgeStore.
- 🔍 **Global search** built with CMDK for ultra-fast access.
- 🎨 **Light & Dark theme** with full customization.
- 🔄 **Real-time sync** via Convex backend.
- 🧩 **Emoji picker**, drag-and-drop uploads, autosaving.
- 📄 **Export notes as PDF, Markdown, or HTML** using Puppeteer.
- 🔐 **Authentication** with Clerk.

---

## 🎯 Vision

BrainFolder aims to be a **clean and distraction-free knowledge engine** —  
a digital space where ideas, research, notes, documents, and tasks stay organized and evolve naturally.

---

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 16 (App Router)**
- **React 19**
- **Tailwind CSS 4**
- **BlockNote Editor** (`@blocknote/core`, `@blocknote/react`, `@blocknote/mantine`)
- **CMDK** (for Command Palette / search)
- **Lucide Icons**
- **Radix UI** components (Dialog, Dropdown, Popover, Avatar, etc.)
- **Clerk Auth**
- **Next Themes**
- **Zustand** (state management)
- **Zod** (schema validation)
- **Sonner Toasts**

### **Backend**
- **Convex** (database + functions + realtime)
- **EdgeStore** (file storage)
- **Puppeteer** (PDF and export rendering)

### **Other Utilities**
- `react-dropzone` (file uploads)
- `react-textarea-autosize`  
- `usehooks-ts`
- `clsx`, `tailwind-merge`, `class-variance-authority`  
- TypeScript

---

## 📌 Roadmap

- [x] Rich text editor with Markdown support  
- [x] Nested pages & workspace structure  
- [x] Media uploads (images/files)  
- [x] PDF export  
- [x] Global CMDK search  
- [x] Dark mode  
- [x] Templates for notes & documentation  
- [ ] AI-powered note suggestions  
- [ ] Real-time collaboration  
- [ ] Offline mode (local-first sync)  

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to submit issues, improve features, or propose new enhancements.

---

## 📜 License

This project is licensed under the **MIT License**.
