const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Handle login logic
    res.send('Login successful');
});

app.post('/signup', (req, res) => {
    const { username, email, password, cpassword } = req.body;
    // Handle signup logic
    res.send('Signup successful');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
