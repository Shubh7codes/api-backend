const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3005;
app.use(cors());

//app.use(express.json()); // Middleware to parse JSON requests

// Sample user details
const user_id = "Shubhransu Boral";
const email = "sk7994@srmist.edu.in";
const roll_number = "RA2111003020157";

// POST endpoint to process input data
app.post('/bfhl',express.json(), (req, res) => {
  const {data} = req.body;
  console.log(data);

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ is_success: false, error: 'Invalid input' });
  }

  const numbers = data.filter(item => !isNaN(item)); // Filter numbers
  const alphabets = data.filter(item => isNaN(item) && /^[a-zA-Z]$/.test(item)); // Filter alphabets
  const highest_alphabet = alphabets.length ? [alphabets.sort()[alphabets.length-1]] : [];

  // Send response
  const responseData = {
    is_success: true,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highest_alphabet
  };

  res.json(responseData); // Send the response
});

// GET endpoint
app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));