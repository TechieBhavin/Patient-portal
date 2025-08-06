const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Document = require('./models/Document');

require('dotenv').config();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Atlas connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// File storage configuration using Multer
const storage = multer.diskStorage({
  destination: 'backend/uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// API: Upload PDF
app.post('/documents/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file || path.extname(file.originalname) !== '.pdf') {
      return res.status(400).json({ error: 'Only PDF files are allowed' });
    }

    const document = new Document({
      filename: file.originalname,
      filepath: file.path,
      filesize: file.size,
    });

    await document.save();
    res.status(201).json({ message: '✅ File uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '❌ Upload failed' });
  }
});

// API: Get all documents
app.get('/documents', async (req, res) => {
  try {
    const documents = await Document.find().sort({ createdAt: -1 });
    res.json(documents);
  } catch (err) {
    res.status(500).json({ error: '❌ Unable to fetch documents' });
  }
});

// View (open in browser tab)
app.get('/documents/:id/view', async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Document not found' });

    res.setHeader('Content-Type', 'application/pdf');
    res.sendFile(path.resolve(doc.filepath));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to view document' });
  }
});

// API: Download document
// app.get('/documents/:id', async (req, res) => {
//   try {
//     const doc = await Document.findById(req.params.id);
//     if (!doc) return res.status(404).json({ error: '❌ Document not found' });

//     res.download(path.resolve(doc.filepath));
//   } catch (err) {
//     res.status(500).json({ error: '❌ Unable to download document' });
//   }
// });
app.get('/documents/:id/download', async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Document not found' });

    res.download(path.resolve(doc.filepath));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to download document' });
  }
});

// API: Delete document
app.delete('/documents/:id', async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: '❌ Document not found' });

    fs.unlinkSync(doc.filepath); // delete file from filesystem
    await Document.deleteOne({ _id: req.params.id }); // delete record from DB
    res.json({ message: '✅ Document deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: '❌ Failed to delete document' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
