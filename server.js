const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const saltRounds = 10; // Number of salt rounds for hashing

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); // For parsing JSON bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'userdatabase'
});

connection.connect(error => {
    if (error) {
        console.error('Error connecting to MySQL Database:', error);
        process.exit(1); // Exit the process if database connection fails
    }
    console.log('Connected to MySQL Database...');
});

// Serve index.html on root request
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Signup route
app.post('/signup', (req, res) => {
    const { username, email, password, cpassword } = req.body;

    // Check if passwords match
    if (password !== cpassword) {
        return res.json({ success: false, message: 'Passwords do not match' });
    }

    // Hash the password
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.json({ success: false, message: 'Error signing up' });
        }

        // Insert into the database
        connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (error, results) => {
            if (error) {
                console.error('Error inserting user:', error);
                return res.json({ success: false, message: 'Error signing up' });
            }
            res.json({ success: true, message: 'Signup successful' });
        });
    });
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find user in the database
    connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
        if (error) {
            console.error('Error querying user:', error);
            return res.json({ success: false, message: 'Error logging in' });
        }
        if (results.length === 0) {
            return res.json({ success: false, message: 'User not found' });
        }

        const user = results[0];

        // Compare passwords
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.json({ success: false, message: 'Error logging in' });
            }
            if (result) {
                res.json({ success: true, message: 'Login successful' });
            } else {
                res.json({ success: false, message: 'Invalid credentials' });
            }
        });
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {``
    console.log(`Server is running on port ${PORT}`);
});
