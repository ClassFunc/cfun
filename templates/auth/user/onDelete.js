const functions = require('firebase-functions');

exports = module.exports = functions.
    auth.
    user().
    onDelete(async (user, context) => {

    });
