import isPlainObject from 'lodash/isPlainObject.js';
import get from 'lodash/get.js';
import isArray from 'lodash/isArray.js';
import replace from 'lodash/replace.js';
import camelCase from 'lodash/camelCase.js';
import {functionTypes} from './functionTypes.mjs';

export const TEMPLATES_GITHUB = 'https://raw.githubusercontent.com/ClassFunc/cfun/master/templates/';

const questionType = async () => {
    let type;
    let builder = [];
    let trigger;
    let firestoreCollectionPath = '';

    let firestoreWritePath = [];
    let firestoreDocPath = [];
    let fieldName = '';

    const types = Object.keys(functionTypes);
    type = await question(
        `Type of functions [${chalk.cyan(types.join(', '))}] ? `,
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
            const paths = firestoreCollectionPath.split('/');

            paths.map((p, idx) => {
                if (idx % 2 === 1) {
                    firestoreDocPath.push(`{${camelCase(paths[idx - 1])}Id}`);
                } else {
                    // p is collection name;
                    firestoreDocPath.push(p);
                    firestoreWritePath.push(p);
                }
            });
            if (trigger === 'onWrite' || trigger === 'onUpdate')
                fieldName = await question(
                    `Watch for field ${chalk.blue('[enter for all]')} ? `);
            break;
    }

    return {
        type,
        builder,
        trigger,
        firestoreCollectionPath,
        firestoreWritePath,
        firestoreDocPath,
        fieldName,
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
            `builder [${chalk.cyan(builders.join(', '))}] ? `,
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
            `trigger [${chalk.cyan(triggers.join(', '))}] ? `,
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
