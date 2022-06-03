const functions = require('firebase-functions');

module.exports = functions.
    region('asia-northeast1').
    storage.
    bucket('{{bucketName}}').
    object().
    onFinalize((object, context) => {

    });
