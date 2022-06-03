const functions = require('firebase-functions');

module.exports = functions.
    region('asia-northeast1').
    storage.
    object().
    onFinalize((object, context) => {

    });
