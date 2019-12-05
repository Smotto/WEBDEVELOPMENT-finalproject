// o require the user to enter a username that is 3 or more alphanumeric characters.
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
// require the user to enter a username that is 3 or more alphanumeric characters.
function userNameInputRegOnChange(userNameInput)
{
    userNameInput.onchange = ((ev) =>
    {
        userNameInputRegBool = validationUserName(userNameInput, 3);
        console.log(ev);
    });
}
userNameInputRegOnChange(userNameInputReg);



// o require the user to enter a password that is 8 or more characters AND contains at least
// 1 upper case letter AND 1 number and 1 of the following special characters ( / * - ! @ # $ ^ & * ).
// o require the user to enter a password that is 8 or more characters.
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
// o require that the password and confirm password inputs are the same.
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

// o require the user to enter an email that is valid.
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
// o require the user to select that they are 13+ years of age.
let thirteenPlusButton = document.getElementById("user13plusInput");
thirteenPlusButton.required = true;
let thirteenPlusButtonBool = false;
thirteenPlusButton.onchange = ((ev) =>
{
    thirteenPlusButtonBool = thirteenPlusButton.checked;
    console.log(ev);
});
// o require the user to select TOS and Privacy rules.
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
        // ▪ Grab all needed input values from the input fields of the form.
        // ▪ Store these values into a JavaScript Object (basically key value pairs).
        regInformation.userName = userNameInputReg.value;
        regInformation.passWord = passWordInputReg.value;
        regInformation.email = emailInput.value;
        // ▪ Convert this JS Object into JSON. ( JSON.stringify() )
        let convertedJSObject = JSON.stringify(regInformation);
        // ▪ Print the JSON using console.log
        console.log(convertedJSObject);
    }
    else
    {
        console.log(userNameInputRegBool);
        console.log(passWordBooleanReg);
        console.log(passWordConfirmationBooleanReg);
        console.log(emailInputBool);
        console.log(thirteenPlusButtonBool);
        console.log(tosPrivacyButtonBool);
    }
    console.log(ev);
});