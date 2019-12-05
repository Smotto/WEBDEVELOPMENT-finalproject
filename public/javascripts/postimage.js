// o require user to enter text for Post Title.
let inputPostTitle = document.getElementById("inputPostTitle");
inputPostTitle.required = true;
let postTitleBool = false;
function validationOfSize(documentElement)
{
    return documentElement.required;
}
inputPostTitle.onchange = ((ev) =>
{
    postTitleBool = validationOfSize(inputPostTitle);
    console.log(ev);
});


// o require user to enter text for post description.
let inputPostDescription = document.getElementById("inputPostDescription");
inputPostDescription.required = true;
let postDescriptionBool = false;
inputPostDescription.onchange = ((ev) =>
{
    postDescriptionBool = validationOfSize(inputPostDescription);
    console.log(ev);
});


// o Require the user to only upload images that are either jpg, png, bmp, gif
let inputPostImage = document.getElementById('inputPostImage');
inputPostImage.required = true;
let inputPostImageBool = false;
let img;
function imageHandling()
{
    window.addEventListener('load', function()
    {
        document.querySelector('input[type="file"]').addEventListener('change', function()
        {
            if(this.files && this.files[0] && isFileAnImage(this.files[0]))
            {
                img = document.querySelector('img');
                img.src = URL.createObjectURL(this.files[0]);
                inputPostImageBool = true;
            }
            else
            {
                alert("This is not a jpg, png, gif, or bmp");
                inputPostImageBool = false;
            }
        });
    });
}
imageHandling();

function isFileAnImage(file) {
    const imageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/bmp'];

    return file && imageTypes.includes(file['type'])
}


// o require the user to accept Acceptable Use Policy for uploading images
let policyButton = document.getElementById("inputTOSPrivacy");
policyButton.required = true;
let policyButtonBool = false;
policyButton.onchange = ((ev) =>
{
    policyButtonBool = policyButton.checked;
    console.log(ev);
});

// o Add an action to your form that way, when the form is submitted you can do...
let subButton = document.getElementById("postButton");
let postInformation = {};
subButton.onclick = ((ev) =>
{
    if (inputPostImageBool && policyButtonBool && postDescriptionBool && postTitleBool)
    {
        // ▪ Grab all needed input values from the input fields of the form.
        // • Note for the file, the path to the file is OK.

        // ▪ Store these values into a JavaScript Object (basically key value pairs).
        postInformation.image = img;
        postInformation.title = inputPostTitle;
        postInformation.description = inputPostDescription;
        // ▪ Convert this JS Object into JSON. (JSON.stringify() )
        let postImageJSON = JSON.stringify(postInformation);
        // ▪ Print the JSON using console.log
        console.log(postImageJSON);
    }
    else
    {
        console.log(inputPostImageBool);
        console.log(postTitleBool);
        console.log(postDescriptionBool);
        console.log(policyButtonBool);
    }
    console.log(ev);
});