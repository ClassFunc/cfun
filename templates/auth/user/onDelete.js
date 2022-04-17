let functions = require('firebase-functions');
functions = functions.region('asia-northeast1');

exports = module.exports = functions.
    auth.
    user().
    onDelete(async (user, context) => {

    });
