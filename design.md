✅ design.md – Patient Document Portal
1. Tech Stack Choices
Q1. What frontend framework did you use and why?
Chosen: React with Vite
Reason:

React provides component-based architecture and reusability.

Vite offers faster development experience due to lightning-fast HMR and build speed.

React has a large ecosystem and good community support.

Bootstrap was used for styling to achieve responsive and clean UI quickly.

Q2. What backend framework did you choose and why?
Chosen: Express.js with Node.js
Reason:

Lightweight and minimal web framework for Node.js.

Middleware support and routing are easy to use.

Integrates well with MongoDB via Mongoose.

Easily supports file handling and REST API creation.

Q3. What database did you choose and why?
Chosen: MongoDB Atlas (Cloud-hosted NoSQL)
Reason:

Schemaless flexibility, ideal for storing dynamic document metadata.

Scalable and cloud-hosted with MongoDB Atlas.

Seamless integration with Mongoose in Node.js backend.

Suitable for JSON-style document structures.

Q4. If you were to support 1,000 users, what changes would you consider?
Use AWS S3 or Firebase Storage for file hosting instead of local storage.

Use Redis or memory cache for frequently accessed documents.

Implement pagination and lazy loading in document listing.

Add authentication and rate limiting (e.g., JWT, OAuth).

Use horizontal scaling with Docker and Nginx for load balancing.

Add database indexing and monitoring tools (e.g., Prometheus, Grafana).

2. Architecture Overview
Flow Diagram (Simple Text-based)
less
Copy
Edit
[User (Browser)]
      |
      v
[Frontend: React + Vite]
      |
      v
[Backend: Express.js API]
      |
      |--- POST /documents/upload --> [MongoDB Atlas + Local Storage]
      |--- GET /documents           --> [MongoDB Atlas]
      |--- GET /documents/:id       --> [Local Storage File Fetch]
      |--- DELETE /documents/:id    --> [MongoDB + File System]
Frontend ↔ Backend ↔ Database ↔ File System
Frontend sends file via form-data.

Backend stores file on local disk (/uploads) and metadata in MongoDB.

On view/download, backend serves file path from disk.

On delete, backend removes both file and database entry.

3. API Specification
Endpoint	Method	Description
/documents/upload	POST	Upload a PDF
/documents	GET	List all documents
/documents/:id	GET	Download a file
/documents/:id	DELETE	Delete a file

📌 POST /documents/upload
Request:

http
Copy
Edit
POST /documents/upload
Content-Type: multipart/form-data
Form-data:
  file: sample.pdf
Response:

json
Copy
Edit
{
  "message": "File uploaded successfully",
  "document": {
    "_id": "64f7cbbf234567890abc1234",
    "filename": "sample.pdf",
    "size": 34578,
    "uploadDate": "2025-08-06T08:33:00Z"
  }
}
📌 GET /documents
Request:

http
Copy
Edit
GET /documents
Response:

json
Copy
Edit
[
  {
    "_id": "64f7cbbf234567890abc1234",
    "filename": "sample.pdf",
    "size": 34578,
    "uploadDate": "2025-08-06T08:33:00Z"
  }
]
📌 GET /documents/:id
Request:

http
Copy
Edit
GET /documents/64f7cbbf234567890abc1234
Response:
Returns the PDF file for download or preview (based on frontend implementation).

📌 DELETE /documents/:id
Request:

http
Copy
Edit
DELETE /documents/64f7cbbf234567890abc1234
Response:

json
Copy
Edit
{
  "message": "File deleted successfully"
}
4. Data Flow Description
Q5. What happens when a file is uploaded?
User selects a file and submits the form.

Frontend sends multipart/form-data to /documents/upload.

Backend uses multer to save file in /uploads.

Metadata (filename, size, date) is stored in MongoDB Atlas.

API responds with success message and document details.

Frontend updates the list via GET /documents.

What happens when a file is downloaded/viewed?
User clicks “View” or “Download” on frontend.

Frontend triggers a GET request to /documents/:id.

Backend fetches file path and streams it as a response.

File opens in new tab (for View) or downloads (for Download).

5. Assumptions
Q6. Assumptions made
File type is limited to PDF.

File size is capped at 5MB using multer limits.

No user authentication (open system for test/demo).

Only basic concurrency handling using Node’s async I/O.

File names can repeat — stored uniquely on disk by multer.
