const functions = require('firebase-functions');

const {diffValues} = require('classfunc-helpers/diff');
const {logJSON} = require('classfunc-helpers/json');

module.exports = functions.
    region('asia-northeast1').
    firestore.
    document('{{docPath}}').
    onWrite((change, context) => {
        const beforeData = change.before.data();
        const afterData = change.after.data();
        const diff = diffValues(beforeData, afterData /*, ['{{fieldName}}']*/);
        // logJSON(diff)
    });
