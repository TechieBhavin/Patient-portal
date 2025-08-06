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



```

Patient-portal/
├── backend/
│   ├── models/              # Mongoose schema
│   ├── uploads/             # Local file storage
│   ├── server.js            # Express backend
│   ├── package.json
│   └── .env                 # MongoDB connection string (not committed)
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── UploadForm.js
│   │   └── DocumentList.js
│   ├── public/
│   └── vite.config.js
├── design.md                # Architecture + Design explanation
├── .gitignore
└── README.md                # You are here!

````

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
````

---

### 🔹 2. Backend Setup

```bash
cd backend
npm install
```

> Create `.env` file inside `backend/`:

```env
PORT=5002
MONGO_URI=mongodb+srv://<your-credentials>@cluster.mongodb.net/patient-portal
```

Then start backend:

```bash
npm start
```

Backend will run at: `http://localhost:5002`

---

### 🔹 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend will run at: `http://localhost:5173`

---

## 🧪 Sample Usage

### Upload PDF (Postman)

* **Endpoint:** `POST /documents/upload`
* **Body:** Form-data → key: `file`, value: (select a PDF)

---

### Get All Files

```http
GET http://localhost:5002/documents
```

---

### View File in Browser

```http
GET http://localhost:5002/documents/<id>/view
```

---

### Download File

```http
GET http://localhost:5002/documents/<id>/download
```

---

### Delete File

```http
DELETE http://localhost:5002/documents/<id>
```

---

## ✅ Assessment Requirements Checklist

* [x] Upload PDF form
* [x] View, download, delete files
* [x] Local file storage
* [x] MongoDB metadata storage
* [x] REST API with proper routes
* [x] `design.md` with architecture
* [x] `README.md` with setup instructions

---

## 📸 UI Preview (Optional)

> Add screenshots of your working UI here
> You can drag and drop images into your GitHub README

---

## 👨‍💻 Author

**Bhavin Patel**
GitHub: [@TechieBhavin](https://github.com/TechieBhavin)
LinkedIn: [linkedin.com/in/techiebhavin](https://linkedin.com/in/techiebhavin)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

````

---

## ✅ Final Step

1. Create the file in terminal:

```bash
touch README.md
````

2. Paste the full content above
3. Then commit it:

```bash
git add README.md
git commit -m "Added README.md"
git push
```

Let me know if you want a `README.md` with images or GIF previews too!
