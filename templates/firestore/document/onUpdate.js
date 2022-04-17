let functions = require('firebase-functions');
functions = functions.region('asia-northeast1');

const {diffValues} = require('classfunc-helpers/diff');
const {logJSON} = require('classfunc-helpers/json');

module.exports = functions.
    firestore.
    document('{{docPath}}').
    onUpdate((change, context) => {
        const beforeData = change.before.data();
        const afterData = change.after.data();
        const diff = diffValues(beforeData, afterData /*['{{fieldName}}']*/);
        // logJSON(diff)
        if (!diff?.length)
            return null;
    });
