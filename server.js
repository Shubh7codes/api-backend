const express = require('express');
const cors = require('cors');
const app = express();
const base64ToFile = require('base64topdf');
const PORT = 3005;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// Sample user details
const user_id = "Shubhransu Boral";
const email = "sk7994@srmist.edu.in";
const roll_number = "RA2111003020157";

// Helper function to process the Base64 file
const processFile = (file_b64) => {
  if (!file_b64) return { file_valid: false, file_mime_type: null, file_size_kb: 0 };

  try {
    const buffer = base64ToFile.base64Decode(file_b64, 'file'); // Decode the Base64 string into a file
    const fileSizeKb = Buffer.byteLength(buffer) / 1024; // Convert bytes to KB
    const fileMimeType = "application/pdf"; // Assuming PDF for now, you can add MIME type validation later
    return { file_valid: true, file_mime_type: fileMimeType, file_size_kb: fileSizeKb.toFixed(2) };
  } catch (error) {
    return { file_valid: false, file_mime_type: null, file_size_kb: 0 };
  }
};

// POST endpoint to process input data
app.post('/bfhl', (req, res) => {
  const { data, file_b64 } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ is_success: false, error: 'Invalid input' });
  }

  const numbers = data.filter(item => !isNaN(item)); // Filter numbers
  const alphabets = data.filter(item => isNaN(item) && /^[a-zA-Z]$/.test(item)); // Filter alphabets
  const highest_alphabet = alphabets.length ? [alphabets.sort()[alphabets.length-1]] : [];

  // Process the file (if provided)
  const { file_valid, file_mime_type, file_size_kb } = processFile(file_b64);

  // Send response
  const responseData = {
    is_success: true,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highest_alphabet,
    file_valid,
    file_mime_type,
    file_size_kb
  };

  res.json(responseData); // Send the response
});

// GET endpoint
app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
