const functions = require('firebase-functions');

module.exports = functions.
    firestore.
    document('{{docPath}}').
    onCreate((snapshot, context) => {
        const newData = snapshot.data();
    });
