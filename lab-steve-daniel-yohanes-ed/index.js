'use strict';

function usage() {
  console.log(      
    `
    usage:       transform <input-file-path> <output-file-path> <transform-name>

    description: given an input file, output file, and a tranformation
                 type, this program will modify the original image and 
                 store the result in the output file.
    `);
} 

// Start Execution
(function () {
  if (process.argv.length !== 5) {
    console.error('Error: 3 Arguments Are Mandatory');
    usage();
    return;
  }

  console.log('Do Something');
})();


//input file name .bmp image file
//transform command
//output file 'new image name'