# Dope Security FE Task

Frontend assignment implementation using **React (Vite)**, **TypeScript**, **React Query**, **Zustand**, **Shadcn UI**, and **JSON Server**.

---

## 🚀 Features

- **Data Source**: Mock API served by JSON Server with **1200+ character records**.
- **Table View**:
  - Columns: **Select**, **Name**, **Location**, **Health**, **Power**.
  - **Search** (by name or location).
  - **Health filter** (multi-select dropdown in column header).
  - **Sort by Power** (toggle ASC/DESC).
  - **Select all / per row checkboxes**.
  - **Viewed State**:
    - Mark selected rows as *viewed*.
    - Viewed rows styled subtly (`bg-gray-50 text-gray-400 italic`).
  - **Power Visual**: Gradient progress bar reflecting power value.
  - **Health Badges**:
    - Healthy → Green
    - Injured → Yellow
    - Critical → Red
  - **Sticky Header** with scrollable body (viewport max height).
  - **Row & cell borders** with light theme styling.
- **State Management**:
  - React Query for server state.
  - Zustand for UI state (selectedIds, viewedIds, filters, search, sorting).
- **UI Components**: Built with [shadcn/ui](https://ui.shadcn.com/).
- **Error & Loading states** handled gracefully.
- **Testing**:
  - Jest + React Testing Library.
  - Tests for rendering, search, filter, select/mark viewed.

---

## 📦 Tech Stack

- [React 18 + Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Query](https://tanstack.com/query)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JSON Server](https://github.com/typicode/json-server)
- [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)

---

## ⚙️ Setup

### 1. Clone & Install
```bash
git clone <repo-url>
cd dope-security-FE-task
npm install


2. Generate Mock Data
node generate-db.js


This creates db.json with 1200+ characters.

3. Run Dev Environment

Start JSON Server and Vite dev server together:

npm run dev:all


JSON Server → http://localhost:3001/characters

React App → http://localhost:5173/


## 📖 Summary

This project is a frontend assignment built with **React, TypeScript, React Query, Zustand, Tailwind CSS, and Shadcn UI**, powered by a **JSON Server mock API**.  

It implements a **Character Management Table** that allows users to:  
- View 1200+ mock characters with attributes (`name`, `location`, `health`, `power`).  
- **Search** by name or location.  
- **Filter** characters by health status (Healthy, Injured, Critical).  
- **Sort** by power (ascending/descending).  
- **Select rows** individually or via "Select All".  
- **Mark selected rows as viewed**, with subtle styling for viewed entries.  
- See **power represented visually** using a gradient progress bar.  
- Enjoy a responsive, scrollable table with sticky headers and light-theme styling.  

The project also includes **Jest + React Testing Library** tests to verify rendering, search, filtering, and row selection functionality.  
