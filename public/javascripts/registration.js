let userNameInputReg = document.getElementById('userNameInput');
userNameInputReg.required = true;
let userNameInputRegBool = false;

function validationUserName(userNameInput, size)
{
    if (!userNameInput.value.match(/^[a-z0-9]+$/i) && userNameInput.value.length < size)
    {
        alert("Must have alphanumeric characters.\nUser Name size not greater than or equal to 3")
    }
    else if (userNameInput.value.length < size)
    {
        alert("User Name size not greater than or equal to 3");
        return false;
    }
    else if(!userNameInput.value.match(/^[a-z0-9]+$/i))
    {
        alert("Must have alphanumeric characters.");
        return false;
    }
    else
    {
        return true;
    }
}

function userNameInputRegOnChange(userNameInput)
{
    userNameInput.onchange = ((ev) =>
    {
        userNameInputRegBool = validationUserName(userNameInput, 3);
        console.log(ev);
    });
}
userNameInputRegOnChange(userNameInputReg);

let passWordInputReg = document.getElementById("passWordInput");
passWordInputReg.required = true;
let passWordBooleanReg = false;
let passWordFilter = /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,32}$/;
function validationPassword(passWordInput, size)
{
    console.log(passWordInput.value.match(passWordFilter));
    if (passWordInput.value.length < size || !passWordInput.value.match(passWordFilter))
    {
        alert("Password size not greater than or equal to 8\n Must contain 1 upper case letter \n" +
            "Must contain 1 number\n" +
            "Must contain 1 of the following special characters ( / * - ! @ # $ ^ & * )");
        return false;
    }
    else
    {
        return true;
    }
}
passWordInputReg.onchange = ((ev) =>
{
    passWordBooleanReg = validationPassword(passWordInputReg, 8);
    console.log(ev);
});

let passWordConfirmationInputReg = document.getElementById("passWordConfirmationInput");
passWordConfirmationInputReg.required = true;
let passWordConfirmationBooleanReg = false;
passWordConfirmationInputReg.onchange = ((ev) =>
{
    passWordConfirmationBooleanReg = validationPassword(passWordConfirmationInputReg, 8);
    if (passWordConfirmationInputReg.value === passWordInputReg.value)
    {
        passWordsMatch = true;
    }
    else
    {
        alert("Passwords do not match!");
    }
    console.log(ev);
});
let passWordsMatch = false;

let emailInput = document.getElementById("emailInput");
emailInput.setAttribute("type", "email");
emailInput.required = true;
let emailInputBool = false;

// https://www.w3resource.com/javascript/form/email-validation.php
function checkEmail(emailInputTemp)
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInputTemp.value))
    {
        emailInputBool = true;
    }
    else
    {
        alert("You have entered an invalid email address!");
        emailInputBool = false;
    }
}

emailInput.onchange = ((ev) =>
{
    checkEmail(emailInput);
    console.log(ev);
});

let thirteenPlusButton = document.getElementById("user13plusInput");
thirteenPlusButton.required = true;
let thirteenPlusButtonBool = false;
thirteenPlusButton.onchange = ((ev) =>
{
    thirteenPlusButtonBool = thirteenPlusButton.checked;
    console.log(ev);
});

async function sendPostRequest(jsonString)
{
    const url = '/registration';

    try {
        const response = await fetch(url, {
            method: 'POST', // or 'PUT'
            body: jsonString, // data can be `string` or {object}!
            headers: {'Content-Type': 'application/json'}
        });

        const json = await response.json();
        console.log('Success:', JSON.stringify(json));
    } catch (error) {
        console.error('Error:', error);
    }
}

function postRequestXHR(jsonString)
{
    let xhr = new XMLHttpRequest();
    xhr.open("POST", '/registration', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === 4 && xhr.status === 200)
        {
            console.log("State and Status: 4 and 200");
        }
    };
    xhr.send(jsonString);
}

let tosPrivacyButton = document.getElementById("TOSPrivacyInput");
tosPrivacyButton.required = true;
let tosPrivacyButtonBool = false;
tosPrivacyButton.onchange = ((ev) =>
{
    tosPrivacyButtonBool = tosPrivacyButton.checked;
    console.log(ev);
});

let subButton = document.getElementById("registerEnter");
let regInformation = {};
subButton.onclick = ((ev) =>
{
    if (userNameInputRegBool && emailInputBool && passWordConfirmationBooleanReg && passWordBooleanReg
        && thirteenPlusButtonBool && tosPrivacyButtonBool)
    {
        regInformation.userName = userNameInputReg.value;
        regInformation.passWord = passWordInputReg.value;
        regInformation.email = emailInput.value;
        let convertedJSObjectREGISTRATION = JSON.stringify(regInformation);
        console.log(convertedJSObjectREGISTRATION);

        // postRequestXHR(convertedJSObjectREGISTRATION);
        sendPostRequest(convertedJSObjectREGISTRATION);

        // alert("Success!");
        // window.location.replace("/index")
    }
    else
    {
        console.log(userNameInputRegBool);
        console.log(passWordBooleanReg);
        console.log(passWordConfirmationBooleanReg);
        console.log(emailInputBool);
        console.log(thirteenPlusButtonBool);
        console.log(tosPrivacyButtonBool);
        alert("Unable to register.")
    }
    console.log(ev);
});