const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Database connection (should be the same as in server.js)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'userdatabase'
});

// Sign up route
router.post('/signup', (req, res) => {
    const { username, email, password, cpassword } = req.body;
    if (password !== cpassword) {
        return res.status(400).send('Passwords do not match');
    }
    
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, password], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Server error');
        }
        res.status(201).send('User registered successfully');
    });
});

module.exports = router;
