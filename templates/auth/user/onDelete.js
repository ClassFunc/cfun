const functions = require('firebase-functions');

exports = module.exports = functions.
    region('asia-northeast1').
    auth.
    user().
    onDelete(async (user, context) => {

    });
