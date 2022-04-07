const functions = require('firebase-functions');

module.exports = functions.
    firestore.
    document('{{docPath}}').
    onDelete((snapshot, context) => {
        const deletedData = snapshot.data();
    });
