'use strict';

const fs = require('fs');
const Bitmap = require('./bitmap');
const transform = require('./transform');
const editor = (module.exports = {});

// Read a bitmap file and optionally make a transformation
editor.readBitmap = (readPath, options, callback) => {
  if (!readPath || !options) return null;
  if (typeof readPath !== 'string') return null;
  if (typeof options !== 'object') return null;

  // Read the bmp file
  fs.readFile(readPath, (err, data) => {
    if (err) {
      if (callback) callback(err);
      return;
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

// Write a bitmap image file given the data and destination path
editor.writeBitmap = function(writePath, data, testCB) {
  if (!writePath || !data) return null;
  if (!(data instanceof Bitmap)) {
    console.log(`Error, typeof data is ${typeof data}`);
    return null;
  }
  if (typeof writePath != 'string') return null;

  let newBuffer = Buffer.concat(
    [data.allData.slice(0, 54), data.colorTable, data.pixelArray],
    data.allData.length
  );

  fs.writeFile(writePath, newBuffer, (err, data) => {
    if (err && testCB) testCB(err);
    else if (testCB) testCB(null, data);
  });
};
