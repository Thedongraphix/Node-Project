// Handle the SignUp form submission
document.querySelector('#submit-signup').addEventListener('click', async (event) => {
    event.preventDefault();
    
    const signupForm = document.querySelector('#signup-form form'); // Select the signup form

    if (!signupForm) {
        console.error('Signup form not found!');
        return;
    }

    const formData = new FormData(signupForm);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        document.querySelector('#signup-message').textContent = result.message;
    } catch (error) {
        document.querySelector('#signup-message').textContent = 'Error signing up';
        console.error('Error:', error);
    }
});

// Handle the Login form submission
document.querySelector('#submit-login').addEventListener('click', async (event) => {
    event.preventDefault();

    const loginForm = document.querySelector('#login-form form'); // Select the login form

    if (!loginForm) {
        console.error('Login form not found!');
        return;
    }

    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        document.querySelector('#login-message').textContent = result.message;
    } catch (error) {
        document.querySelector('#login-message').textContent = 'Error logging in';
        console.error('Error:', error);
    }
});

// Toggle between Login and Signup forms
document.querySelector('#show-signup').addEventListener('click', () => {
    document.querySelector('#login-form').style.display = 'none';
    document.querySelector('#signup-form').style.display = 'block';
});

document.querySelector('#show-login').addEventListener('click', () => {
    document.querySelector('#signup-form').style.display = 'none';
    document.querySelector('#login-form').style.display = 'block';
});
