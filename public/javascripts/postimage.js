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
                img = document.querySelector('.image');
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

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
async function sendPostRequestPostImage(jsonString)
{
    const url = '/postimage';

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

async function testBlob(img)
{
    const response = await fetch(img);
    const blob = await response.blob();
    document.getElementById(img).src = URL.createObjectURL(blob);
}

function blobTester(img)
{
    console.log("testing blob functionality with json");
    fetch(img.src)
        .then(response =>
        {
            console.log(response);
            return response.blob();
        })
        .then(blob =>
        {
            console.log(blob);
            document.getElementById(img).src = URL.createObjectURL(blob);
        })
}


let subButton = document.getElementById("postButton");
let postInformation = {};
subButton.onclick = ((ev) =>
{
    if (inputPostImageBool && policyButtonBool && postDescriptionBool && postTitleBool)
    {
        postInformation.image = img;
        postInformation.title = inputPostTitle;
        postInformation.description = inputPostDescription;

        let postImageJSONString = JSON.stringify(postInformation);
        console.log(postImageJSONString);

        // TODO: Make the image a blob, it has already had its src assigned.
        // sendPostRequestPostImage(postImageJSONString);
        testBlob(img).then(response =>
        {
            console.log(response);
        });

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