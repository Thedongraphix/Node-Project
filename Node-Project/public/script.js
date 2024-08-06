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
