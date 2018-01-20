'use strict';

const fs = require('fs');
const bitmap = require('./bitmap');
const transform = require('./transform');
const editor = module.exports = {};

editor.readBitmap = (readPath, testCB) => {
  if (!readPath) return null;
  fs.readFile(`${__dirname}/${readPath}`, (err, data) => {
    if (err) {
      testCB(err);
      return console.error(new Error(err));
    }
    let bufferObj = bitmap.Buff(data);
    let newData = transform[process.argv[4]](bufferObj);
    writeBitmap(process.argv[3], newData);
    testCB(null, data);
    return;
  });
};

function writeBitmap (writePath, data, testCB) {
  if (!writePath || !data) return null;
  let newBuffer = Buffer.concat([data.allData.slice(0, 54), data.colorTable, data.pixelArray], data.allData.length());
  fs.writeFile(writePath, newBuffer, (err) => {
    if (err) testCB(err);
  });
}
