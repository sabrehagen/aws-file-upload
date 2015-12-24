const formidable = require('formidable');
const path = require('path');
const express = require('express');
const uuid = require('uuid');
const app = express();
const util = require('util');

const fs = require('fs-promise');
const s3fs = require('s3fs');
//const fs = new s3fs('stemn-s3fs');

app.post('/uploads', (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err)
            return res.status(500).json(err.message);

        const source = files.file.path;
        const fileName = uuid.v4();
        const fileExt = files.file.type.split('/').pop();
        const destination = path.join('uploads', fileName + '.' + fileExt);

        return fs.readFile(source).then((fileData) => {
            return fs.writeFile(destination, fileData).then(() => {
                fs.unlink(source);
                res.json({ success: true, url: '/uploads/' + fileName + '.' + fileExt });
            });
        });
    });
});

app.get('/uploads/:filename', (req, res) => {
    return fs.readFile(path.join('uploads', req.params.filename)).then((file) => {
        res.send(file);
    });
});

app.listen(3000);
