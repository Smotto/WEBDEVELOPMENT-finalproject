function makeRequest(location) {
    return new Promise((resolve, reject) => {
        console.log(`Making Request to ${location}`);
        if (location === 'Google') {
            resolve('Google says hi');
        }
        else {
            reject('We can only talk to Google')
        }
    })
}

function processRequest(response) {
    return new Promise((resolve, reject) => {
        console.log('Processing response');
        resolve(`Extra Information + ${response}`)
    })
}

function doWork()
{
    makeRequest('Google').then(response => {
        console.log('Response Received');
        // Return the promise to proceed to the chained .then
        return processRequest(response);
    }).then(processResponse => {
        console.log(processResponse)
    }).catch(err => {
        console.log(err);
    });
}

async function doLessWork()
{
    try{
        // Returns the resolve section of the promise
        const response = await makeRequest('Google');
        console.log('Response Received');
        const processedResponse = await processRequest(response);
        console.log(processedResponse);
    } catch (err) {
        console.log(err);
    }
}
doWork();
doLessWork();