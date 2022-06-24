const functions = require('firebase-functions');

module.exports = functions.
    region('asia-northeast1').
    pubsub.
    schedule('{{schedule}}').
    onRun((context) => {

    });
