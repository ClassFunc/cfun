const functions = require('firebase-functions');

module.exports = functions.
    region('asia-northeast1').
    firestore.
    document('{{docPath}}').
    onDelete((snapshot, context) => {
        const deletedData = snapshot.data();
    });
