document.addEventListener('DOMContentLoaded', function() {
    var userName = document.querySelector('#userName');
    var email = document.querySelector('#email');
    var password = document.querySelector('#password');
    var repassword = document.querySelector('#repassword');
    var welcomeElement = document.getElementById('Welcome');
    var users = [];

    var CurrentUsername = localStorage.getItem('CurrentUsername');
    if (CurrentUsername && welcomeElement) {
        welcomeElement.innerHTML = "Welcome " + CurrentUsername;
    }

    if (localStorage.getItem('users')) {
        users = JSON.parse(localStorage.getItem('users'));
    }

    function register() {
        resetErrors();
        if (validateUserName() && validateEmail() && validatePassword()) {
            var user = {
                userName: userName.value,
                email: email.value,
                password: password.value,
            };
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            console.log(users);
            window.location.href = 'login.html';
            clearForm(); 
        }
    }

    function resetErrors() {
        var userNameError = document.getElementById('userName-error');
        var emailError = document.getElementById('email-error');
        var repasswordError = document.getElementById('repassword-error');
        if (userNameError) userNameError.textContent = '';
        if (emailError) emailError.textContent = '';
        if (repasswordError) repasswordError.textContent = '';
    }

    function clearForm() {
        if (userName) userName.value = '';
        if (email) email.value = '';
        if (password) password.value = '';
        if (repassword) repassword.value = ''; 
    }

    function validateUserName() {
        var userNameValue = userName ? userName.value : '';
        if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,}$/.test(userNameValue)) {
            var userNameError = document.getElementById('userName-error');
            if (userNameError) userNameError.textContent = 'Username must be at least 5 characters long, and contain both letters and numbers.';
            return false;
        }
        return true;
    }

    function validateEmail() {
        var emailValue = email ? email.value : '';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
            var emailError = document.getElementById('email-error');
            if (emailError) emailError.textContent = 'Invalid email format.';
            return false;
        }
        for (var i = 0; i < users.length; i++) {
            if (users[i].email.toLowerCase() === emailValue.toLowerCase()) {
                var emailError = document.getElementById('email-error');
                if (emailError) emailError.textContent = 'This email is already registered. Please use another email.';
                return false;
            }
        }
        return true;
    }

    function validatePassword() {
        var passwordValue = password ? password.value : '';
        var repasswordValue = repassword ? repassword.value : '';
        
        var repasswordError = document.getElementById('repassword-error');
        
        if (passwordValue !== repasswordValue) {
            if (repasswordError) repasswordError.textContent = 'Passwords do not match.';
            return false;
        }
        if (passwordValue.length === 0) {
            if (repasswordError) repasswordError.textContent = 'Passwords cannot be empty';
            return false;
        }
        return true;
    }

    function login(e) {
        e.preventDefault();
        resetloginErrors();
        var loginEmail = document.querySelector('#loginEmail');
        var loginPassword = document.querySelector('#loginPassword');

        for (var i = 0; i < users.length; i++) {
            if (users[i].email.toLowerCase() === loginEmail.value.toLowerCase()) {
                if (users[i].password === loginPassword.value) {
                    window.location.href = 'home.html';
                    localStorage.setItem('CurrentUsername', users[i].userName);
                    return;
                } else {
                    var loginPasswordError = document.getElementById('loginPassword-error');
                    if (loginPasswordError) loginPasswordError.textContent = 'Password is incorrect';
                    return; 
                }
            }
        }
        var loginEmailError = document.getElementById('loginEmail-error');
        if (loginEmailError) loginEmailError.textContent = 'Email is not correct.';
    }

    function resetloginErrors() {
        var loginPasswordError = document.getElementById('loginPassword-error');
        var loginEmailError = document.getElementById('loginEmail-error');
        
        if (loginPasswordError) loginPasswordError.textContent = '';
        if (loginEmailError) loginEmailError.textContent = '';
    }
    function logOut(){
        window.location.href = 'login.html';
        localStorage.removeItem('CurrentUsername')
    }

    var registerButton = document.querySelector('#Register');
    var loginButton = document.querySelector('#signIn');
    var logOutButton = document.querySelector('#logOut');


    if (registerButton) {
        registerButton.addEventListener('click', register);
    }
    
    if (loginButton) {
        loginButton.addEventListener('click', login);
    }

    if (logOutButton) {
        logOutButton.addEventListener('click', logOut);
    }
});
