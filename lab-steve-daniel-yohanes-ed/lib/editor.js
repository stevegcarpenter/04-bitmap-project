'use strict';

const fs = require('fs');
const editor = module.exports = {};

editor.readBitmap = (readPath, callback) => {
  fs.readFile(`${__dirname}/${readPath}`, (err, data) => {
    if (err) {
      return callback(err);
    }

    callback(null, data)
  });
};

editor.writeBitmap = (writePath, data) => {

};
