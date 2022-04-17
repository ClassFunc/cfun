let functions = require('firebase-functions');
functions = functions.region('asia-northeast1');

module.exports = functions.
    firestore.
    document('{{docPath}}').
    onCreate((snapshot, context) => {
        const newData = snapshot.data();
    });
