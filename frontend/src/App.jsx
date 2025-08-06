import React from 'react';
import UploadForm from './UploadForm';
import DocumentList from './DocumentList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFileMedical } from 'react-icons/fa';
import './App.css';

function App() {
  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="text-center mb-4">
          <h2 className="fw-bold">
            <FaFileMedical className="me-2" />
            Patient Document Portal
          </h2>
          <p className="text-muted">Upload, view, and manage your medical documents securely.</p>
        </div>

        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <UploadForm />
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <DocumentList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
