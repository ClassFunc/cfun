let functions = require('firebase-functions');
functions = functions.region('asia-northeast1');


module.exports = functions.
    firestore.
    document('{{docPath}}').
    onDelete((snapshot, context) => {
        const deletedData = snapshot.data();
    });
