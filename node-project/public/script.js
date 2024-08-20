// Toggle between login and sign-up forms
document.getElementById('show-signup').addEventListener('click', () => {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', () => {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
});

// Navbar toggle for mobile view
const menuToggle = document.getElementById('menu-toggle');
const dropdownMenu = document.getElementById('dropdown-menu');
menuToggle.addEventListener('click', () => {
    dropdownMenu.style.right = dropdownMenu.style.right === '0px' ? '-100%' : '0';
    menuToggle.querySelector('.hamburger').style.display = dropdownMenu.style.right === '0px' ? 'none' : 'block';
    menuToggle.querySelector('.close').style.display = dropdownMenu.style.right === '0px' ? 'block' : 'none';
});

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.send('Login successful');
        } else {
            res.send('Invalid credentials');
        }
    });
});

// Signup route
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], (error, results) => {
        if (error) throw error;
        res.send('Signup successful');
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
