window.addEventListener('load', () => {
    setupUserStorage();
    setupRedirectButtons();
    setupRegistrationButton();
    setupLoginButton();
});

function setupLoginButton() {
    document.querySelector('#loginBtn').addEventListener('click', (event) => {
        event.preventDefault();
        if(validateLogin()) {
            console.log('Successful Login!');
            handleLogin();
        }
    })
}

function handleLogin() {
    document.querySelector('#formContainer').classList.add('d-none');
    let activeUser = JSON.parse(localStorage.getItem('activeUser'));
    document.querySelector('#welcome').textContent = `Welcome ${activeUser.name}`;
}

function validateLogin() {
    let loginForm = document.querySelector('#loginForm');
    try {
        let username = loginForm.loginUsername.value;
        let password = loginForm.loginPassword.value;
        let userList = JSON.parse(localStorage.getItem('userList'));

        if(userList.some(user => user.username === username)) {
            let user = userList.find(user => user.username === username);
            if(user.password === password) {
                let errorMsgRef = document.querySelector('#loginErrorMsg');
                errorMsgRef.textContent = '';
                errorMsgRef.classList.add('d-none');
                localStorage.setItem('activeUser', JSON.stringify(user));
                return true;
            } else {
                throw new Error('Incorrect password');
            }

        } else {
            throw new Error('User not found');
        }

    } catch(error) {
        let errorMsgRef = document.querySelector('#loginErrorMsg');
        errorMsgRef.textContent = error.message;
        errorMsgRef.classList.remove('d-none');  
        return false;
    }
}

function setupRegistrationButton() {
    document.querySelector('#regBtn').addEventListener('click', (event) => {
        event.preventDefault();
        if(validateRegistration()) {
            toggleFormDisplay();
        }
    })
}

function validateRegistration() {
    let registerForm = document.querySelector('#registrationForm');
    try {
        let name = registerForm.registerName.value;
        let username = registerForm.registerUsername.value;
        let email = registerForm.registerEmail.value;
        let password1 = registerForm.registerPassword1.value;
        let password2 = registerForm.registerPassword2.value;
        let userList = JSON.parse(localStorage.getItem('userList'));

        if(name.length < 2) {
            throw new Error('Name must contain at least 2 characters');
        } else if(username.length < 6) {
            throw new Error('Username must contain at least 6 characters');
        } else if(userList.some(user => user.username === username)) {
            throw new Error('User already exist');
        } else if(!email.includes('@')) {
            throw new Error('Enter a valid email address');
        } else if(password1.length < 8) {
            throw new Error('Password must contain at least 8 characters');
        } else if(password1 !== password2) {
            throw new Error('Password does not match');
        } else {
            let errorMsgRef = document.querySelector('#registerErrorMsg');
            errorMsgRef.textContent = '';
            errorMsgRef.classList.add('d-none');
            let newUser = {
                name : name,
                username : username,
                email : email,
                password : password1
            }
            userList.push(newUser);
            localStorage.setItem('userList', JSON.stringify(userList));
            return true;
        }

    } catch(error) {
        let errorMsgRef = document.querySelector('#registerErrorMsg');
        errorMsgRef.textContent = error.message;
        errorMsgRef.classList.remove('d-none');
        return false;
    }
}

function setupRedirectButtons() {
    let redirectBtnRefs = document.querySelectorAll('.redirect__btn');
    redirectBtnRefs.forEach(btn => btn.addEventListener('click', toggleFormDisplay));
}

function toggleFormDisplay(event) {
    if(event) event.preventDefault();
    document.querySelector('#loginForm').classList.toggle('d-none');
    document.querySelector('#registrationForm').classList.toggle('d-none');
}

function setupUserStorage() {
    let userStorage = JSON.parse(localStorage.getItem('userList')) || [...users];
    localStorage.setItem('userList', JSON.stringify(userStorage));
}



