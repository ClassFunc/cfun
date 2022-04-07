const functions = require('firebase-functions');

module.exports = functions.
    pubsub.
    schedule('{{schedule}}').
    onRun((context) => {

    });
