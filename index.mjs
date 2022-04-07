#!/usr/bin/env node

import 'zx/globals';
import isPlainObject from 'lodash/isPlainObject.js';
import isArray from 'lodash/isArray.js';
import get from 'lodash/get.js';
import camelCase from 'lodash/camelCase.js';
import upperFirst from 'lodash/upperFirst.js';
import _ from 'lodash';
// import {echo} from 'zx/experimental'
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

const functionTypes = {
    firestore: {
        document: ['onWrite', 'onUpdate', 'onCreate', 'onDelete'],
    },
    auth: {
        user: ['onCreate', 'onDelete'],
    },
    storage: {
        bucket: {
            object: [
                'onChange',
                'onArchive',
                'onDelete',
                'onFinalize',
                'onMetadataUpdate',
            ],
        },
        object: [
            'onChange',
            'onArchive',
            'onDelete',
            'onFinalize',
            'onMetadataUpdate',
        ],
    },
    pubsub: {
        topic: ['onPublish'],
        schedule: ['onRun'],
    },
    https: ['onRequest', 'onCall'],
    // 'database',
    // 'remote config',
    // 'analytics',
    // 'testlab'
};

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
                `any collection or document path ${chalk.cyan(
                    '[nên copy từ console]')} ? `);
            if (firestoreCollectionPath.startsWith('/')) {
                firestoreCollectionPath =
                    _.replace(firestoreCollectionPath, '/', '');
            }
            const paths = firestoreCollectionPath.split('/');

            paths.map((p, idx) => {
                if (idx % 2 === 1) {
                    firestoreDocPath.push(`{${_.camelCase(paths[idx - 1])}Id}`);
                } else {
                    // p is collection name;
                    firestoreDocPath.push(p);
                    firestoreWritePath.push(p);
                }
            });
            if (trigger === 'onWrite' || trigger === 'onUpdate')
                fieldName = await question(
                    `watch for field ${chalk.blue('[enter for all]')} ? `);
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

const info = await questionType();

console.log(info);

const {
    type,
    builder,
    trigger,
    fieldName,
    firestoreWritePath,
    firestoreDocPath,
} = info;

try {
    const {PWD} = process.env;
    const rootDir = PWD.split('functions')?.[0];
    const templateDir = path.join(rootDir, 'templates');
    const functionsDir = path.join(rootDir, 'functions');
    const basePath = path.join(type, path.join(...builder), trigger);

    let content = fs.readFileSync(
        path.join(templateDir, basePath + '.js'),
        'utf-8',
    );

    let writeFilePath;
    switch (type) {
        case 'firestore':
            writeFilePath = path.join(
                functionsDir,
                type,
                ...firestoreWritePath,
                funcFileName(fieldName, trigger),
            );
            content = _.template(content)({
                docPath: firestoreDocPath.join('/'),
                fieldName,
            });
            break;
        default:
            writeFilePath = path.join(
                functionsDir,
                funcFileName(basePath),
            );
            break;
    }

    console.log({rootDir, templateDir, functionsDir, basePath, writeFilePath});

    if (!fs.existsSync(writeFilePath)) {
        fs.createFileSync(writeFilePath);
        fs.writeFileSync(
            writeFilePath,
            content,
        );
        console.log(chalk.green('created', writeFilePath));
    } else {
        console.log(chalk.red(writeFilePath, 'exists!!!'));
    }

} catch (e) {
    console.log(e);
}

//helpers
function camelUpper(fieldName) {return upperFirst(camelCase(fieldName));}

function funcFileName(fieldName, trigger) {
    return `${fieldName}${trigger ? '_' + trigger : ''}.f.js`;
}
