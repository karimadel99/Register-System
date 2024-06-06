var signIn = document.querySelector('#signIn');
var loginEmail = document.querySelector('#loginEmail');
var loginPassword = document.querySelector('#loginPassword');
var users = JSON.parse(localStorage.getItem('users'));
signIn.addEventListener('click', function (e) {
    e.preventDefault()
    login();
});

function login() {
    resetErrors();
    for (var i = 0; i < users.length; i++) {
        if (users[i].email.toLocaleLowerCase() === loginEmail.value.toLocaleLowerCase()) {
            if (users[i].password === loginPassword.value) {
                window.location.href = 'home.html';
                document.getElementById('Welcome').textContent = `Welcome ${users[i].userName}`; // Display the username after login
                return; 
            } else {
                document.getElementById('loginPassword-error').textContent = 'Password is incorrect';
                return; 
            }
        }
    }
    document.getElementById('loginEmail-error').textContent = 'User Name is not correct.';
}
function resetErrors() {
    document.getElementById('loginPassword-error').textContent = '';
    document.getElementById('loginEmail-error').textContent = '';
}