const functions = require('firebase-functions');

module.exports = functions.
    storage.
    bucket('{{bucketName}}').
    object().
    onArchive((object, context) => {

    });
