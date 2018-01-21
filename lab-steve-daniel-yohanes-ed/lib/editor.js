'use strict';

const fs = require('fs');
const Bitmap = require('./bitmap');
const transform = require('./transform');
const editor = (module.exports = {});

editor.readBitmap = (readPath, options, callback) => {
  if (!readPath || !options) return null;

  // Read the bmp file
  fs.readFile(readPath, (err, data) => {
    if (err) {
      if (callback) callback(err);
      return console.error(new Error(err));
    }

    var bufferObj;
    var newData;
    var tranType = options.transform;

    if (options.doBitmap) {
      // Take the buffer data and make it an object
      bufferObj = new Bitmap(data);

      // transform the data
      if (options.doTransform) {
        // Pass in the Buffer array and a transform string indicating
        // which transformation to make (e.g. 'greyscale', 'rotate', etc)
        newData = transform.applyT(bufferObj, tranType);
      }
    }

    // if writeBitmap was specified, do it.
    if (options.doWriteFile) {
      editor.writeBitmap(options.writeFilePath, newData, callback);
    }

    return;
  });
};

editor.writeBitmap = function(writePath, data, testCB) {
  console.log('writepath' + writePath);
  if (!writePath || !data) return null;
  let newBuffer = Buffer.concat(
    [data.allData.slice(0, 54), data.colorTable, data.pixelArray],
    data.allData.length
  );

  fs.writeFile(writePath, newBuffer, err => {
    if (err) testCB(err);
  });
};
