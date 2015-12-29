//const fs = require('fs-promise');
const s3fs = require('s3fs');
const fs = new s3fs('stemn-s3fs', { accessKeyId : 'AKIAJ2PTDWOUNXRWTMRA', secretAccessKey : '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', region : 'ap-southeast-2' });

fs.readdir('uploads').then((list) => {
    console.log(list);
}).catch((err) => {
    console.log('got error', err);
});
