const functions = require('firebase-functions');

module.exports = functions.
    region('asia-northeast1').
    firestore.
    document('{{docPath}}').
    onCreate((snapshot, context) => {
        const newData = snapshot.data();
    });
