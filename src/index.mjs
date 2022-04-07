#!/usr/bin/env node

import 'zx/globals';
import camelCase from 'lodash/camelCase.js';
import upperFirst from 'lodash/upperFirst.js';
import template from 'lodash/template.js';
import templateSettings from 'lodash/templateSettings.js';
import {questionType, TEMPLATES_GITHUB} from './questions.mjs';

templateSettings.interpolate = /{{([\s\S]+?)}}/g;

try {
    const answer = await questionType();

    console.log(answer);

    const {
        type,
        builder,
        trigger,
        fieldName,
        firestoreWritePath,
        firestoreDocPath,
    } = answer;

    const rootDir = process.cwd().split('/functions')?.[0];
    const templateDir = path.join(rootDir, 'templates');
    const functionsDir = path.join(rootDir, 'functions');
    const basePath = path.join(type, path.join(...builder), trigger);

    let content = await (await fetch(
        TEMPLATES_GITHUB + basePath + '.js')).text();

    let writeFilePath;
    switch (type) {
        case 'firestore':
            writeFilePath = path.join(
                functionsDir,
                type,
                ...firestoreWritePath,
                funcFileName(fieldName, trigger),
            );
            content = template(content)({
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
