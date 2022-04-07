import isPlainObject from 'lodash/isPlainObject.js';
import get from 'lodash/get.js';
import isArray from 'lodash/isArray.js';
import replace from 'lodash/replace.js';
import camelCase from 'lodash/camelCase.js';
import trimEnd from 'lodash/trimEnd.js';
import {functionTypes} from './functionTypes.mjs';

export const TEMPLATES_GITHUB = 'https://raw.githubusercontent.com/ClassFunc/cfun/master/templates/';

const questionType = async () => {
    //common
    let type;
    let builder = [];
    let trigger;

    //firestore
    let firestoreCollectionPath = '';
    let firestoreWritePath = [];
    let firestoreDocPath = [];
    let fieldName = '';

    //bucket
    let bucketName = '';

    //https
    let routeName = '';

    //pubsub
    let schedule = '';
    let scheduleName = '';

    const types = Object.keys(functionTypes);
    type = await question(
        `Type of functions [${chalk.cyan(types.join(' , '))}] ? `,
        {choices: types});

    const builderOrTriggers = functionTypes[type];
    if (isPlainObject(builderOrTriggers)) {
        let _b = builderOrTriggers;
        while (isPlainObject(_b)) {
            const bpath = await questionBuilder(Object.keys(_b));
            builder.push(bpath);
            _b = get(functionTypes, [type, ...builder]);
        }
        if (isArray(_b)) {
            trigger = await questionTrigger(_b);
        }
    } else if (isArray(builderOrTriggers)) {
        trigger = await questionTrigger(builderOrTriggers);
    }

    switch (type) {
        case 'firestore':
            firestoreCollectionPath = await question(
                `Any collection or document path ${chalk.cyan(
                    '[nên copy từ console]')} ? `);
            if (firestoreCollectionPath.startsWith('/')) {
                firestoreCollectionPath =
                    replace(firestoreCollectionPath, '/', '');
            }
            let paths = firestoreCollectionPath.split('/');
            if (paths.length % 2 === 1) {
                //append fake document path
                paths.push('fakeDocumentPath');
            }
            paths.map((p, idx) => {
                if (idx % 2 === 1) {
                    //case p is document name;
                    const collName = paths[idx - 1];
                    const docName = collName.endsWith('s') ?
                        trimEnd(collName, 's')
                        : collName;
                    firestoreDocPath.push(`{${camelCase(docName)}Id}`);
                } else {
                    // case p is collection name;
                    firestoreDocPath.push(p);
                    firestoreWritePath.push(p);
                }
            });
            if (trigger === 'onWrite' || trigger === 'onUpdate')
                fieldName = await question(
                    `Watch for field ${chalk.gray('[enter for all]')} ? `);
            break;
        case 'storage':
            if (!builder.includes('bucket'))
                break;
            bucketName = await question(`Bucket name ? `);
            break;
        case 'https':
            routeName = await question(`Route name ? `);
            break;
        case 'pubsub':
            schedule = await question(
                `Schedule ${chalk.gray('ex: every 15 minutes')} ? `);
            scheduleName = await question(
                `Schedule Name ${chalk.gray('ex: backup')} ? `);
            break;
    }

    return {
        //COMMON
        type,
        builder,
        trigger,

        //firestore
        firestoreCollectionPath,
        firestoreWritePath,
        firestoreDocPath,
        fieldName,

        // storage
        bucketName,

        // https
        routeName,

        //pubsub
        schedule,
        scheduleName,
    };
};
const questionBuilder = async (builders) => {

    if (!builders) {
        await questionType();
        return;
    }

    let builder;
    if (builders.length > 1) {
        builder = await question(
            `builder [${chalk.cyan(builders.join(' , '))}] ? `,
            {choices: builders});
    } else {
        builder = builders[0];
    }
    return builder;
};
const questionTrigger = async (triggers) => {
    let trigger;
    if (triggers.length === 1) {
        trigger = triggers[0];
    } else {
        trigger = await question(
            `Trigger [${chalk.cyan(triggers.join(' , '))}] ? `,
            {choices: triggers});
    }

    return trigger;
};

export {
    functionTypes,
    questionType,
    questionBuilder,
    questionTrigger,
};
