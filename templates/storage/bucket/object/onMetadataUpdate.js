const functions = require('firebase-functions');

module.exports = functions.
    storage.
    bucket('{{bucketName}}').
    object().
    onMetadataUpdate((object, context) => {

    });
