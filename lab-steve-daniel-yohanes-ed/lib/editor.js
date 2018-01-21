'use strict';

const fs = require('fs');
const editor = (module.exports = {});

editor.readBitmap = (readPath, options) => {
  if (!readPath) return null;

  fs.readFile(readPath, (err, data) => {
    if (err) {
      if (options.testCB) options.testCB(err);
      return console.error(new Error(err));
    }

    let bufferObj;
    let newData;
    console.log('options')
console.log(options)
    // if a bitmap function was provided, run it
    if (options.bitMapFunc) {
      console.log('in bitmapfunc')
      bufferObj = options.bitMapFunc(data);
      console.log(bufferObj)

      // transform the data
      if (options.transformFunc) {
        console.log('in transformmapfunc')
        newData = options.transformFunc(bufferObj);
      }
    }

    // if writeBitmap was specified, do it.
    if (options.writeBitmap) {
      writeBitmap(process.argv[3], newData, options.testCB);
    }

    return;
  });
};

function writeBitmap(writePath, data, testCB) {
  console.log('writepath' + writePath);
  if (!writePath || !data) return null;
  let newBuffer = Buffer.concat(
    [data.allData.slice(0, 54), data.colorTable, data.pixelArray],
    data.allData.length()
  );
  fs.writeFile(writePath, newBuffer, err => {
    if (err) testCB(err);
  });
}
