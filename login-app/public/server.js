const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'loginapp',
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database!');
});

// Routes
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword],
            (err, results) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    return res.status(500).send('Error registering user');
                }
                res.status(201).send('User registered');
            }
        );
    } catch (err) {
        console.error('Error in /register route:', err);
        res.status(500).send('Internal server error');
    }
});

app.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;

        db.query(
            'SELECT * FROM users WHERE email = ?',
            [email],
            async (err, results) => {
                if (err) {
                    console.error('Error querying user:', err);
                    return res.status(500).send('Error logging in');
                }
                if (results.length === 0) return res.status(400).send('User not found');

                const user = results[0];
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) return res.status(400).send('Invalid password');

                res.status(200).send('Login successful');
            }
        );
    } catch (err) {
        console.error('Error in /login route:', err);
        res.status(500).send('Internal server error');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
