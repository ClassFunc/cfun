const functions = require('firebase-functions');

module.exports = functions.
    firestore.
    document('{{docPath}}').
    onCreate((change, context) => {
        const newData = change.after.data();
    });
