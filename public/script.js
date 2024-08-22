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

// Handle login form submission
document.querySelector('#login-form form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission
    const formData = new FormData(this);

    fetch('/login', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('login-message').textContent = data.message;
        document.getElementById('login-message').style.color = data.success ? 'green' : 'red';
    })
    .catch(error => console.error('Error:', error));
});

// Handle signup form submission
document.querySelector('#signup-form form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission
    const formData = new FormData(this);

    fetch('/signup', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('signup-message').textContent = data.message;
        document.getElementById('signup-message').style.color = data.success ? 'green' : 'red';

        if (data.success) {
            document.getElementById('signup-form').style.display = 'none';
            document.getElementById('login-form').style.display = 'block';
        }
    })
    .catch(error => console.error('Error:', error));
});
const testPassword = 'testPassword';
bcrypt.hash(testPassword, saltRounds, (err, hashedPassword) => {
    if (err) {
        console.error('Error hashing password:', err);
    } else {
        console.log('Hashed Password:', hashedPassword);
    }
});
