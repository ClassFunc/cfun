## CFUN

Create cloud functions like a boss

### Install:

```sh
npm i -g cfun
```

### Usage:

In root project terminal, typing:

```sh
cfun
```

![cfun](https://firebasestorage.googleapis.com/v0/b/classfunc-com.appspot.com/o/npm%2Fcfun%2F2022-04-17%2021.03.30.jpg?alt=media&token=f44bee5f-cceb-4e38-84cf-495a00c8b685)

### Function types and actions:

```js
    firestore: {
    document: [
        'onCreate',
        'onUpdate',
        'onDelete',
        'onWrite',
    ],
}
,
auth: {
    user: ['onCreate', 'onDelete'],
}
,
storage: {
    object: [
        // 'onChange',
        'onFinalize',
        'onArchive',
        'onDelete',
        'onMetadataUpdate',
    ],
        bucket
:
    {
        object: [
            // 'onChange',
            'onFinalize',
            'onArchive',
            'onDelete',
            'onMetadataUpdate',
        ],
    }
,
}
,
pubsub: {
    schedule: ['onRun'],
    // topic: ['onPublish'],
}
,
https: ['onRequest', 'onCall'],
```

### License:

MIT
