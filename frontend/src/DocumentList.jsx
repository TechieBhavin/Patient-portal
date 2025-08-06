import React, { useEffect, useState } from "react";
import axios from "axios";

const DocumentList = () => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5002/documents")
      .then((res) => setDocs(res.data));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5002/documents/${id}`);
      setDocs(docs.filter((doc) => doc._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Filename</th>
          <th>Size (bytes)</th>
          <th>Uploaded At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {docs.map((doc) => (
          <tr key={doc.id}>
            <td>{doc.filename}</td>
            <td>{doc.filesize}</td>
            <td>
              {doc.createdAt ? new Date(doc.createdAt).toLocaleString() : "N/A"}
            </td>
            <td>
              <a
                href={`http://localhost:5002/documents/${doc._id}/view`}
                className="btn btn-outline-primary btn-sm me-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
              <a
                href={`http://localhost:5002/documents/${doc._id}/download`}
                className="btn btn-outline-success btn-sm me-2"
              >
                Download
              </a>
              <button
                onClick={() => handleDelete(doc._id)}
                className="btn btn-outline-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DocumentList;
