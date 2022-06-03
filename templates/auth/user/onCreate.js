const functions = require('firebase-functions');

exports = module.exports = functions.
    region('asia-northeast1').
    auth.
    user().
    onCreate(async (user, context) => {

    });
