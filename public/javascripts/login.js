let userNameInput = document.getElementById('userNameInput');
userNameInput.required = true;
let userBoolean = false;

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
function userNameInputOnChange(userNameInput, userBoolean)
{
    userNameInput.onchange = ((ev) =>
    {
        userBoolean = validationUserName(userNameInput, 3);
        console.log(ev);
    });
}
userNameInputOnChange(userNameInput, userBoolean);


let passWordInput = document.getElementById("passWordInput");
passWordInput.required = true;
let passwordBoolean = false;
function validationPassword(passWordInput, size)
{
    if (passWordInput.value.length < size)
    {
        alert("Password size not greater than or equal to 8");
        return false;
    }
    else
    {
        return true;
    }
}
// o require the user to enter a password that is 8 or more characters.
passWordInput.onchange = ((ev) =>
{
    passwordBoolean = validationPassword(passWordInput, 8);
    console.log(ev);
});

// o Add an action to your form, when the form is submitted you can do the following:
let subButton = document.getElementById('loginEnter');
let loginInformation = {};
subButton.onclick = ((ev) =>
{
    if (userBoolean && passwordBoolean)
    {
        // ▪ Grab all needed input values from the input fields of the form.
        // ▪ Store these values into a JavaScript Object (basically key value pairs).
        loginInformation.userName = userNameInput.value;
        loginInformation.passWord = passWordInput.value;
        // ▪ Convert this JS Object into JSON. ( JSON.stringify() )
        let convertedJSObject = JSON.stringify(loginInformation);
        // ▪ Print the JSON using console.log
        console.log(convertedJSObject);
    }
    else
    {
        alert("Username or Password incorrect.")
    }
    console.log(ev);
});

