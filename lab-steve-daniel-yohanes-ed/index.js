'use strict';

const transform = require('./lib/transform');
const editor = require('./lib/editor');

function usage() {
  console.log(
    `
    usage:             transform <input-file-path> <output-file-path> <transform-name>

    description:       Given an input file, output file, and a tranformation
                       name, this program will modify the original image and
                       store the result in the output file.

    transform-names:   greyscale        Apply greyscale modification
                       vflip            Vertically flip
                       hflip            Horizontally flip
                       dflip            Diagonally flip
                       blueify          Change bitmap image to all blue
                       greenify         Change bitmap image to all green
                       redify           Change bitmap image to all red
                       border           Add white border around bitmap image
                       bigfoot          Overlay bigfoot text on bitmap image
    `
  );
}

function executeProgram(options) {
  // Set additional option
  options.doBitmap = true;
  options.doTransform = true;
  options.doWriteFile = true;

  // Execute the program
  editor.readBitmap(options.readFilePath, options, null);
}

// Start Execution
(function() {
  // Validate that the number of arguments provided was correct
  if (process.argv.length !== 5) {
    console.error('Error: 3 Arguments Are Mandatory');
    usage();
    return;
  }

  // Check if the user entered an invalid tranformation type
  if (!(process.argv[4] in transform.types)) {
    console.error(`Error: Invalid transformation ${process.argv[4]}`);
    usage();
    return;
  }

  let options = {
    readFilePath: `${__dirname}/${process.argv[2]}`,
    writeFilePath: `${__dirname}/${process.argv[3]}`,
    transform: process.argv[4],
  };

  // Do it!
  executeProgram(options);
})();
