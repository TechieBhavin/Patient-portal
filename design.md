# 🏥 Patient Document Portal – Design Document

---

## 📌 1. Tech Stack Choices

### Q1. What frontend framework did you use and why?
- **Framework:** React with Vite
- **Why:** React provides a modular, reusable component-based architecture. Vite offers blazing-fast development experience and optimized production builds.

### Q2. What backend framework did you choose and why?
- **Framework:** Express.js (Node.js)
- **Why:** Lightweight, fast, and perfect for building REST APIs with file handling using `multer`. Express integrates easily with MongoDB.

### Q3. What database did you choose and why?
- **Database:** MongoDB Atlas (NoSQL)
- **Why:** Schema-flexible, cloud-hosted, easily integrates with Mongoose ODM. Ideal for storing dynamic file metadata like filename, size, and upload time.

### Q4. If you were to support 1,000 users, what changes would you consider?
- Use **cloud storage** like AWS S3 or Firebase instead of local disk
- Add **authentication** (e.g., JWT or OAuth) for user-based document access
- Use **Redis** or CDN caching for popular files
- Implement **pagination and rate-limiting**
- Set up **CI/CD** with auto-scaling deployment (Docker + Render/Vercel)
- Add monitoring/logging using **Prometheus + Grafana**

---

## 🗂️ 2. Architecture Overview

### System Flow (Text Diagram):

[User Browser]
->
[React Frontend (Vite)]
-> API calls
[Express Backend (Node.js)]
-> ->
[MongoDB Atlas] [Local File Storage (/uploads)]


### Flow Summary:
- Frontend handles file upload and viewing
- Backend provides REST APIs to upload, retrieve, and delete documents
- Files are stored on disk, metadata is stored in MongoDB Atlas

---

## 🔗 3. API Specification

| Endpoint                  | Method | Description               |
|---------------------------|--------|---------------------------|
| `/documents/upload`       | POST   | Upload a PDF              |
| `/documents`              | GET    | List all uploaded files   |
| `/documents/:id/view`     | GET    | View PDF in browser tab   |
| `/documents/:id/download` | GET    | Download a PDF            |
| `/documents/:id`          | DELETE | Delete a specific file    |

### 📥 POST `/documents/upload`
- Uploads a PDF using `multipart/form-data`
- **Request:**
  - Form key: `file`
- **Response:**
```json
{
  "message": "✅ File uploaded successfully"
}
````

---

### 📄 GET `/documents`

* Returns all uploaded document metadata
* **Response:**

```json
[
  {
    "_id": "64eb...",
    "filename": "report.pdf",
    "filesize": 123456,
    "createdAt": "2025-08-06T10:00:00.000Z"
  }
]
```

---

### 👁️ GET `/documents/:id/view`

* Opens PDF in a new browser tab

---

### ⬇️ GET `/documents/:id/download`

* Forces file download

---

### ❌ DELETE `/documents/:id`

* Deletes file from both MongoDB and disk
* **Response:**

```json
{ "message": "✅ Document deleted successfully" }
```

---

## 🔄 4. Data Flow Description

### Q5. File Upload

1. User selects and uploads a PDF from frontend.
2. `POST /documents/upload` API is triggered.
3. Backend uses `multer` to store file in `backend/uploads/`
4. Metadata (filename, path, size, timestamp) is stored in MongoDB Atlas.
5. Success message is returned to frontend.

### File View / Download

1. User clicks "View" or "Download" on the document.
2. GET request is made to backend.
3. File is streamed directly from local disk to browser.

### File Delete

1. User clicks "Delete".
2. `DELETE /documents/:id` removes entry from MongoDB and deletes local file.

---

## 📎 5. Assumptions

### Q6. Assumptions Made

* Only **PDF** files are allowed (validated on backend).
* Max file size is **\~5MB** (configurable via multer).
* No user authentication — one user assumed (as per problem).
* No concurrency issues expected due to single-user mode.
* Filenames may repeat; actual saved name uses timestamp prefix.

---

## ✅ Final Notes

* Backend uses `.env` to store sensitive configs (not committed)
* `uploads/` folder is ignored using `.gitignore`
* Fully working locally on `localhost:5002` for backend, `5173` for frontend (Vite)

---

````

---

### 📌 Instructions to Add It to GitHub

1. Open your terminal in project root:
```bash
cd ~/Desktop/Patient-portal
````

2. Create the file:

```bash
touch design.md
```

3. Open in VS Code or any editor, and **paste** the above content.

4. Save and commit it:

```bash
git add design.md
git commit -m "Added design.md documentation"
git push
```

✅ Done!


