# Bitmap Project

In each file created a constant module named after the file name. This way we can render the data in each file across different files in the entire application.

Every function description should include it's airty (expected number of paramiters),

transform.js:
in this file we passed the bufferObj and type as the parameter in our transform.apply function. The first argument is meant to pass in our image, classified in bufferObj and the "type" argument passes in the type of transformation we intend on for our bufferObj
In the following functions we passed in our imgObj which represents where the offset ends and the image pixel array begins to alter the the buffered data using for loops to return modified versions of the original image. 

Our bitmap.js file passes "buffer" as the argument to return any non-buffered data to return null. If our buffer data is returned as expected, we followed through with arguments, declaring the offset data and pixel array info to alter the buffered file in our transform.js file. This file is a constructor of arguments to pass throughout our application files.                                                                                                          Everything in our editor.js file is created to make sure all data in our transformer and itmap file isn't returning as null, utilizing the "error first" method" 

# Changelog
```
2018-01-21 Fixed more bugs and and added the changelog to the README.md
2018-01-21 Updated the bigfoot test to work.
2018-01-21 Add tests for greyscale and bigfoot
2018-01-21 Fixed some typographical errors.
2018-01-21 Added some tests for the rgbify transformation.
2018-01-21 Finished tests for bitmap constructor, verified non false positives
2018-01-21 Built tests for 3 flip transforms and working on bitmap constructor tests
2018-01-21 Add bigfoot transformation for images to add bigfoot text
2018-01-21 Added room for Ed's Bigfoot bitmap transformation.
2018-01-21 Don't run the callback unless it was provided.
2018-01-21 Fixed the check since typeof just returns an object
2018-01-21 Removed error logging to avoid errors while running jest tests
2018-01-21 Updated the usage message to remove colons after transformation types
2018-01-21 Added a bunch of unit tests for the editor and beefed up error checking
2018-01-21 Add border transform
2018-01-21 Removed -h option since npm was capturing it earlier then index.js
2018-01-21 Removed the unimplemented rotation transformation.
2018-01-21 Updated the usage message and added the -h option
2018-01-21 Command line args are all lowercase
2018-01-21 Added some comments and removed some unnecessary logs
2018-01-21 Built vertical, horizontal, and diagonal flip transformations and verified functionality
2018-01-21 Removed accidentally committed bitmap file
2018-01-21 Added a few more simple transformations: redify, blueify, greenify
2018-01-21 Fixed another bug
2018-01-21 Finally found the bug.
2018-01-21 Modified the starting script.
2018-01-20 Add transform
2018-01-20 Added a executeProgram function to start the program
2018-01-20 Added a useage function
2018-01-20 Pair programmed write and finished building read functions for bmp file, also built tests for read function and verified working as intended
2018-01-20 Added new script in package.json called transform for running the program
2018-01-20 Added code to index.js tha requires 3 command line argujents from the user
2018-01-18 Add transform module
2018-01-18 Added minor test using fs.readFile in the editor module
2018-01-18 Removed the billion accidentally committed node_modules files
2018-01-18 Moved package.json and package-lock.json to the correct dir
2018-01-18 Added more empty files.
2018-01-18 Added eslint command to package.json file
2018-01-18 Added the fs and eslint modules
2018-01-18 Scaffolded the repo and initialized package.json
```
