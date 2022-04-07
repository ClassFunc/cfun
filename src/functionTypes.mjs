export const functionTypes = {
    firestore: {
        document: [
            'onCreate',
            'onUpdate',
            'onDelete',
            'onWrite',
        ],
    },
    auth: {
        user: ['onCreate', 'onDelete'],
    },
    storage: {
        object: [
            // 'onChange',
            'onFinalize',
            'onArchive',
            'onDelete',
            'onMetadataUpdate',
        ],
        bucket: {
            object: [
                // 'onChange',
                'onFinalize',
                'onArchive',
                'onDelete',
                'onMetadataUpdate',
            ],
        },
    },
    pubsub: {
        schedule: ['onRun'],
        topic: ['onPublish'],
    },
    https: ['onRequest', 'onCall'],
    // 'database',
    // 'remote config',
    // 'analytics',
    // 'testlab'
};
