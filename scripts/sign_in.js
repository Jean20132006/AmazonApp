////////////////////////////////////SIGN IN AND SIGN UP CODE //////////////////////////////////////
/**
 * @brief Toggle to sign Up mode
 * @param event is an object. It contains info about (the event type
 *        -clicked element,
 *        -mouse position,
 *        -keyboard keys.
 *        -etc.)
 * @code {JavaScript} event.preventDefault: stopped the page reload
 * 
 */

const createAccountContainer =
    document.querySelector('.create-account');

const enterUsername =
    document.querySelector('.enter-username');

const usernameInput =
    document.querySelector('.username-input');

const signInButton =
    document.querySelector('.sign-in-button');

const title =
    document.querySelector(
        '.sign-in-or-create-account span'
    );

const form =
    document.querySelector('.signup-form');

const message =
    document.querySelector('.message');

const emailInput =
    document.querySelector('.email-input');

const passwordInput =
    document.querySelector('.password-input');

const crossIcon = document.querySelector('.cross-icon');


// DEFAULT MODE = SIGN IN
let isSignupMode = false;

// RENDER UI
function renderAuthMode() {

    form.reset();                               // Clear message

    // SIGN UP MODE
    if (isSignupMode) {

        title.textContent = 'Create account';

        signInButton.textContent = 'Create account';

        enterUsername.classList.remove('hidden');

        usernameInput.classList.remove('hidden');

        createAccountContainer.innerHTML = `
            <span>
                Already have an account?
            </span>

            <a href="#" class="js-switch-signin">
                Sign in
            </a>
        `;

        const signInLink =
            document.querySelector('.js-switch-signin');

        signInLink.addEventListener('click', (event) => {

            event.preventDefault();

            isSignupMode = false;

            renderAuthMode();
        });
    }

    // SIGN IN MODE
    else {

        title.textContent = 'Sign in';

        signInButton.textContent = 'Sign in';

        enterUsername.classList.add('hidden');

        usernameInput.classList.add('hidden');

        createAccountContainer.innerHTML = `
            <span>
                Don't have an account?
            </span>

            <a href="#" class="js-switch-signup">
                Create account
            </a>
        `;

        const signupLink =
            document.querySelector('.js-switch-signup');

        signupLink.addEventListener('click', (event) => {

            event.preventDefault();

            isSignupMode = true;

            renderAuthMode();
        });
    }
}

// INITIAL RENDER
renderAuthMode();

//////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////// TOGGLE PASSWORD VISIBILTY ///////////////////////////////////

const toggleButton = document.querySelector('.eye-icon');

toggleButton.addEventListener('click', (event) => {

    event.preventDefault();                        

    event.stopPropagation();                       //stops event from bubbling upward to form/container listeners

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        toggleButton.innerHTML = `<i class="bi bi-eye-fill"></i>`;

    } else {

        passwordInput.type = "password";

        toggleButton.innerHTML = `<i class="bi bi-eye-slash-fill"></i>`;
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////// HANDLE FORM SUBMISSION ///////////////////////////////////////

form.addEventListener('submit', async (event) => {

    

    event.preventDefault();

    // Get form values
    const username =  usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    message.innerHTML = "";                               // Clear message

    try {

        let response;

        // Sign Up
        if(isSignupMode){

            response = await fetch('http://localhost:4000/api/v1/users/register',
                {
                    method: 'POST',

                    headers: {
                        'content-type': 'application/json',
                    },

                    body: JSON.stringify({
                        username,
                        email,
                        password

                    })    
                }
            );
        }
        else{                             // Login
            response = await fetch('http://localhost:4000/api/v1/users/login',

                {
                    method: 'POST',

                    headers: {
                        'content-type': 'application/json'
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );
        }

        
        const data = await response.json();  // read the body, parse the JSON

        console.log(data);

        // SUCCESS
        if (response.ok) {

                    
            localStorage.setItem("token", data.token);              // save token if backend sends one

            localStorage.setItem( "userId", data.user.id);          // save user ID

            localStorage.setItem("email", data.user.email);         // save user email

            localStorage.setItem("username", data.user.username);   // save user username

            message.classList.remove('hidden');
            message.classList.add('green-gradient');

            message.innerHTML = `
                <span style="color: green;">
                    ${data.message}
                </span>
            `;
            window.location.href = "amazon.html";
            
            // Clear form
            //form.reset();
            
        }

        // ERROR
        else {

            message.classList.remove('hidden');
            crossIcon.classList.remove('hidden');
            message.classList.add('red-gradient');

            message.innerHTML = `
                <span style="color: red;">
                    ${data.message}
                </span>
            `;
        }
        
    } catch (error) {

        console.log(error);

        message.classList.remove('hidden');
        message.classList.add('red-gradient');

        message.innerHTML = `
            <span style="color: red;">
                ${error.message}
            </span>
        `;
        
    }
    
});

