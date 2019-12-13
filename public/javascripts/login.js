let userNameInput = document.getElementById('userNameInput');
userNameInput.required = true;
let userBoolean = false;

function validationUserName(userNameInput, size) {
    if (!userNameInput.value.match(/^[a-z0-9]+$/i) && userNameInput.value.length < size) {
        alert("Must have alphanumeric characters.\nUser Name size not greater than or equal to 3")
    }
    else if (userNameInput.value.length < size) {
        alert("User Name size not greater than or equal to 3");
        return false;
    }
    else if(!userNameInput.value.match(/^[a-z0-9]+$/i)) {
        alert("Must have alphanumeric characters.");
        return false;
    }
    else {
        return true;
    }
}

function userNameInputOnChange(userNameInput) {
    userNameInput.onchange = ((ev) => {
        userBoolean = validationUserName(userNameInput, 3);
        console.log(ev);
    });
}
userNameInputOnChange(userNameInput);

let passWordInput = document.getElementById("passWordInput");
passWordInput.required = true;
let passwordBoolean = false;
function validationPassword(passWordInput, size) {
    if (passWordInput.value.length < size) {
        alert("Password size not greater than or equal to 8");
        return false;
    }
    else {
        return true;
    }
}

passWordInput.onchange = ((ev) => {
    passwordBoolean = validationPassword(passWordInput, 8);
    console.log(ev);
});

async function sendPostRequest(jsonString, url) {
    try {
        const response = await fetch(url, { // wait for promise to return before proceeding.
            method: 'POST', // or 'PUT'
            body: jsonString, // data can be `string` or {object}!
            headers: {'Content-Type': 'application/json'}
        });

        const json = await response.json();
        console.log('Success:', JSON.stringify(json));
    } catch (error) {   // Handles Errors!
        console.error('Error: ', error);
    }
}

let subButton = document.getElementById('loginEnter');
let loginInformation = {};
subButton.onclick = ((ev) => {
    if (userBoolean && passwordBoolean) {
        loginInformation.username = userNameInput.value;
        loginInformation.password = passWordInput.value;
        let convertedJSObject = JSON.stringify(loginInformation);
        console.log(convertedJSObject);

        sendPostRequest(convertedJSObject, '/login');

        //alert("Success!");
        //window.location.replace("/index")
    }
    else {
        console.log(userBoolean);
        console.log(passwordBoolean);
        alert("Username or Password incorrect.")
    }
    console.log(ev);
});

