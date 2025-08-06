// import React, { useState } from 'react';
// import axios from 'axios';

// const UploadForm = () => {
//   const [file, setFile] = useState(null);
//   const [msg, setMsg] = useState('');

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file || file.type !== 'application/pdf') {
//       setMsg('Only PDF files are allowed');
//       return;
//     }
//     const formData = new FormData();
//     formData.append('file', file);
//     try {
//       await axios.post('http://localhost:5002/documents/upload', formData);
//       setMsg('Upload successful');
//       window.location.reload(); // or use state lifting for cleaner UX
//     } catch {
//       setMsg('Upload failed');
//     }
//   };

//   return (
//     <form onSubmit={handleUpload} className="mb-3">
//       <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} />
//       <button type="submit" className="btn btn-primary ms-2">Upload</button>
//       <div className="mt-2">{msg}</div>
//     </form>
//   );
// };

// export default UploadForm;
import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || file.type !== 'application/pdf') {
      setMsg('Please select a PDF file');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post('http://localhost:5002/documents/upload', formData);
      setMsg('✅ Upload successful');
      setFile(null);
      setTimeout(() => window.location.reload(), 1000);
    } catch {
      setMsg('❌ Upload failed');
    }
  };

  return (
    <form onSubmit={handleUpload} className="d-flex align-items-center gap-3 flex-wrap">
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="form-control w-auto"
      />
      <button type="submit" className="btn btn-primary">
        Upload
      </button>
      <div className="text-muted">{msg}</div>
    </form>
  );
};

export default UploadForm;
