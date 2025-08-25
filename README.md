# ⚡ Dope Security FE Task

Frontend assignment implementation using **React (Vite)**, **TypeScript**, **React Query**, **Zustand**, **Shadcn UI**, and **JSON Server**.  

<img width="3102" height="1216" alt="image" src="https://github.com/user-attachments/assets/5eab679b-325b-46de-ae0a-04babd79e983" />


---

## 🚀 Features

- **Mock Data Source**: JSON Server serving **1200+ characters**.
- **Interactive Data Table**:
  - Columns: **Select**, **Name**, **Location**, **Health**, **Power**
  - 🔍 **Search**: Filter by name or location
  - 🩺 **Health Filter**: Multi-select filter in header (Healthy / Injured / Critical)
  - 🔽 **Sort by Power**: Toggle ASC / DESC
  - ✅ **Selection**: Select all or individual rows
  - 👁 **Viewed State**:
    - Mark selected rows as *viewed*
    - Viewed rows styled subtly (`bg-gray-50 text-gray-400 italic`)
  - ⚡ **Power Visualization**: Gradient bar proportional to power
  - 🏷 **Health Badges**:
    - Healthy → Green
    - Injured → Yellow
    - Critical → Red
  - 📌 **Sticky Header** with scrollable body (viewport max height)
  - 🎨 Light borders for rows and cells
- **State Management**:
  - React Query → server state (API data, caching, fetching)
  - Zustand → UI state (selectedIds, viewedIds, filters, search, sorting)
- **UI Components**: Built with [shadcn/ui](https://ui.shadcn.com/) and Tailwind CSS
- **Error & Loading states** handled gracefully
- **Testing**:
  - Jest + React Testing Library
  - Covers rendering, search, filter, and row selection

---

## 📦 Tech Stack

- ⚛ [React 18 + Vite](https://vitejs.dev/)
- 🟦 [TypeScript](https://www.typescriptlang.org/)
- 🔍 [React Query](https://tanstack.com/query)
- 🐻 [Zustand](https://zustand-demo.pmnd.rs/)
- 🎨 [Shadcn UI](https://ui.shadcn.com/) + [Tailwind CSS](https://tailwindcss.com/)
- 📡 [JSON Server](https://github.com/typicode/json-server)
- 🧪 [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)

---

## ⚙️ Setup

### 1. Clone & Install
```bash
git clone https://github.com/nishant679/dope_security_FE_task.git
cd dope-security-FE-task
npm install
2. Generate Mock Data
bash
Copy
Edit
node generate-db.js
This creates db.json with 1200+ mock characters.

3. Run Dev Environment
Start both JSON Server and Vite Dev Server:

bash
Copy
Edit
npm run dev:all
JSON Server → http://localhost:3001/characters

React App → http://localhost:5173/

📖 Summary
This project is a frontend assignment built with React, TypeScript, React Query, Zustand, Tailwind CSS, and Shadcn UI, powered by a JSON Server mock API.

It implements a Character Management Table that allows users to:

Browse 1200+ mock characters (name, location, health, power)

Search by name or location

Filter by health status

Sort by power (asc/desc)

Select rows (individually or all)

Mark rows as viewed with subtle UI styling

Visualize power with a gradient bar

Use a clean, responsive, scrollable table with sticky headers

The project also includes unit tests (Jest + RTL) to verify core interactions.
