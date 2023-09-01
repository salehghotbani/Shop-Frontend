const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const port = 3001; // Port for your server

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Define a route for getting the payment token
app.post('/get-payment-token', async (req, res) => {
  try {
    const response = await axios.post('https://sep.shaparak.ir/onlinepg/onlinepg', req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while getting the token.' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
