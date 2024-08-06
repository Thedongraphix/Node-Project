document.getElementById('submit-login').addEventListener('click', async (event) => {
    event.preventDefault();
    
    const email = document.querySelector('#login-form input[type="text"]').value;
    const password = document.querySelector('#login-form input[type="password"]').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const result = await response.text();
    alert(result);
});

document.getElementById('submit-signup').addEventListener('click', async (event) => {
    event.preventDefault();

    const username = document.querySelector('#signup-form input[placeholder="Username"]').value;
    const password = document.querySelector('#signup-form input[placeholder="Password"]').value;
    const email = document.querySelector('#signup-form input[placeholder="Email"]').value;

    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    });

    const result = await response.text();
    alert(result);
});

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
