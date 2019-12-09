let inputPostTitle = document.getElementById("inputPostTitle");
inputPostTitle.required = true;
let postTitleBool = false;
function validationOfSize(documentElement, size)
{
    return documentElement.value.length > size;
}
inputPostTitle.onchange = ((ev) =>
{
    postTitleBool = validationOfSize(inputPostTitle, 0);
    console.log(ev);
});

let inputPostDescription = document.getElementById("inputPostDescription");
inputPostDescription.required = true;
let postDescriptionBool = false;
inputPostDescription.onchange = ((ev) =>
{
    postDescriptionBool = validationOfSize(inputPostDescription, 0);
    console.log(ev);
});

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

let policyButton = document.getElementById("inputTOSPrivacy");
policyButton.required = true;
let policyButtonBool = false;
policyButton.onchange = ((ev) =>
{
    policyButtonBool = policyButton.checked;
    console.log(ev);
});

let subButton = document.getElementById("postButton");
let postInformation = {};
subButton.onclick = ((ev) =>
{
    if (inputPostImageBool && policyButtonBool && postDescriptionBool && postTitleBool)
    {
        postInformation.image = img;
        postInformation.title = inputPostTitle;
        postInformation.description = inputPostDescription;
        let postImageJSON = JSON.stringify(postInformation);
        console.log(postImageJSON);
        alert("Success! Click ok to view your post!");
        window.location.replace("/viewpost")
    }
    else
    {
        console.log(postTitleBool);
        console.log(postDescriptionBool);
        console.log(inputPostImageBool);
        console.log(policyButtonBool);
        alert("Cannot Post Image.")
    }
    console.log(ev);
});