# 🏥 Patient Document Portal

A full-stack application built as part of the **Full Stack Developer Intern Assessment**, allowing users to upload, view, download, and delete medical PDF documents.

---

## 📌 Problem Statement

A healthcare platform needs a **Patient Portal** where users can:
- Upload and manage medical documents (PDFs)
- View all uploaded files
- Download or delete any document

---

## 🛠 Tech Stack

| Layer     | Technology              |
|-----------|--------------------------|
| Frontend  | React (Vite), Bootstrap  |
| Backend   | Node.js, Express         |
| Database  | MongoDB Atlas (Cloud)    |
| File Store| Local File System (`/uploads`) |

---

## ✨ Features

- 📤 Upload PDF files
- 📄 View uploaded files in a clean UI
- 👁️ View PDF in browser tab
- ⬇️ Download files
- 🗑️ Delete files
- ✅ Clean and centered UI layout using Bootstrap
- ☁️ MongoDB Atlas for document metadata storage

---

## 📂 Folder Structure

Patient-portal/
├── backend/
│ ├── models/ # Mongoose schema
│ ├── uploads/ # Local file storage
│ ├── server.js # Express backend
│ ├── package.json
│ └── .env # MongoDB connection string (not committed)
├── frontend/
│ ├── src/
│ │ ├── App.jsx
│ │ ├── App.css
│ │ ├── UploadForm.js
│ │ └── DocumentList.js
│ ├── public/
│ └── vite.config.js
├── design.md # Architecture + Design explanation
├── .gitignore
└── README.md # You are here!


---

## 🔗 API Endpoints

| Endpoint                     | Method | Description               |
|------------------------------|--------|---------------------------|
| `/documents/upload`          | POST   | Upload a PDF              |
| `/documents`                 | GET    | List all documents        |
| `/documents/:id/view`        | GET    | View PDF in browser       |
| `/documents/:id/download`    | GET    | Download PDF              |
| `/documents/:id`             | DELETE | Delete document           |

---

## 📦 How to Run Locally

### 🔹 1. Clone the Repo

```bash
git clone https://github.com/TechieBhavin/Patient-portal.git
cd Patient-portal

