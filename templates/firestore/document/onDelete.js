const functions = require('firebase-functions');

module.exports = functions.
    firestore.
    document('{{docPath}}').
    onDelete((change, context) => {
        const deletedData = change.before.data();
    });
