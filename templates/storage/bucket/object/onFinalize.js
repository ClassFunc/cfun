let functions = require('firebase-functions');
functions = functions.region('asia-northeast1');


module.exports = functions.
    storage.
    bucket('{{bucketName}}').
    object().
    onFinalize((object, context) => {

    });
