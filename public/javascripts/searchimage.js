let searchBarInput = document.getElementById('search-bar');
searchBarInput.required = false;

async function sendPostRequestForImagePosts(jsonString, url)
{
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

let searchInformation = {};
searchBarInput.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        console.log("Sending Info To Middleware.");
        searchInformation.info = searchBarInput.value;
        sendPostRequestForImagePosts(JSON.stringify(searchInformation), "/search");
    }
});