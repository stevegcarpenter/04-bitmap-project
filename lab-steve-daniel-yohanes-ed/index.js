'use strict';

const bitmap = require('./lib/bitmap');
const transform = require('./lib/transform');
const editor = require('./lib/editor');

function usage() {
  console.log(
    `
    usage:       transform <input-file-path> <output-file-path> <transform-name>

    description: given an input file, output file, and a tranformation
                 type, this program will modify the original image and
                 store the result in the output file.
    `
  );
}

function executeProgram(options) {
  console.log('transform')
  console.log(transform)
  let transformFuncs = {
    greyscale: transform.greyScale,
    rotate: transform.rotate,
  };

  // Check if the user entered an invalid tranformation type
  if (!(options.transformType in transformFuncs)) {
    console.error(`Error: Invalid transformation ${options.transformType}`);
    usage();
    return;
  }

  options.transformFunc = transformFuncs[options.transformFunc];
  options.bitMapFunc = bitmap.Buff;
  options.writeBitMapFunc = editor.writeBitmap;
  options.testCB = null;

  editor.readBitmap(options.inFilePath, options);
}

// Start Execution
(function() {
  if (process.argv.length !== 5) {
    console.error('Error: 3 Arguments Are Mandatory');
    usage();
    return;
  }

  let options = {
    inFilePath: `${__dirname}/${process.argv[2]}`,
    outFilePath: `${__dirname}/${process.argv[3]}`,
    transformType: process.argv[4],
  };

  // Do it!
  executeProgram(options);
})();
