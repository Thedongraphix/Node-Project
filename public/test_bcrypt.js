// test_bcrypt.js
const bcrypt = require('bcrypt');
const saltRounds = 10;
const testPassword = 'testPassword';

bcrypt.hash(testPassword, saltRounds, (err, hashedPassword) => {
    if (err) {
        console.error('Error hashing password:', err);
        return;
    }
    console.log('Hashed Password:', hashedPassword);
});
