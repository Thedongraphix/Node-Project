document.getElementById('menu-toggle').addEventListener('click', function() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    const hamburger = document.querySelector('.hamburger');
    const closeIcon = document.querySelector('.close');

    if (dropdownMenu.style.right === '0%') {
        dropdownMenu.style.right = '-100%';
        hamburger.style.display = 'block';
        closeIcon.style.display = 'none';
    } else {
        dropdownMenu.style.right = '0%';
        hamburger.style.display = 'none';
        closeIcon.style.display = 'block';
    }
});

document.getElementById('show-signup').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
});
