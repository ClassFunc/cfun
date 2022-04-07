export const functionTypes = {
    firestore: {
        document: ['onWrite', 'onUpdate', 'onCreate', 'onDelete'],
    },
    auth: {
        user: ['onCreate', 'onDelete'],
    },
    storage: {
        bucket: {
            object: [
                // 'onChange',
                'onFinalize',
                'onArchive',
                'onDelete',
                'onMetadataUpdate',
            ],
        },
        object: [
            // 'onChange',
            'onFinalize',
            'onArchive',
            'onDelete',
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
