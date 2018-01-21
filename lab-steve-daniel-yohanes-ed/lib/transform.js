'use strict';

const transform = (module.exports = {});

// All the allowed bmp image transformations
// This is used as a quick check to see if a transformation is supported
transform.types = {
  greyscale: true,
  rotate: true,
  vFlip: true,
  hFlip: true,
  dFlip: true,
};

transform.applyT = function(bufferObj, type) {
  console.log(bufferObj);
  console.log(type);
  // Verify the transformation type exists
  if (!(type in transform.types)) return null;

  // Add additional transformation types here
  // Don't forget to put them in the transform.types object above as well
  if (type === 'greyscale') {
    return transform.greyScale(bufferObj);
  } else if (type === 'rotate') {
    return transform.rotate(bufferObj);
  } else if (type === 'vFlip') {
    return transform.vFlip(bufferObj);
  } else if (type === 'hFlip') {
    return transform.hFlip(bufferObj);
  } else if (type === 'dFlip') {
    return transform.dFlip(bufferObj);
  }
};

transform.greyScale = function(bufferObj) {
  console.log('greyScale!');
  //Pixel with RGB values of (30,128,255)
  // The red level R=30, The green level G=128, The blue level B=255
  // R' = G' = B' = (R+G+B) / 3 = (30+128+255) / 3 = 138
  // so the pixel will get RGB values of: (138,138,138)
  for (var i = 0; i < bufferObj.colorTable.length / 4; i += 4) {
    let avgColors =
      (bufferObj.colorTable[i] +
        bufferObj.colorTable[i + 1] +
        bufferObj.colorTable[i + 2]) /
      3;
    bufferObj.colorTable[i] = avgColors;
    bufferObj.colorTable[i + 1] = avgColors;
    bufferObj.colorTable[i + 2] = avgColors;
  }
  console.log('new buffer', bufferObj);
  return bufferObj;
};

transform.vFlip = function (imgObj) {
  // Verify the argument passed exists and is an object containing buffer data
  if (!imgObj || !imgObj.allData) return null;
  // Declaration of beginning and end points for row slices
  let start = 0, end = imgObj.width, bufferArray = [];
  // Seperation of rows from pixel array buffer into array of row buffers
  for (let i = 0; i < imgObj.height; i++) {
    bufferArray.push(imgObj.pixelArray.slice(start, end))
    start = end;
    end = end + imgObj.width;
  }
  // Reversal of array containing rows
  bufferArray = bufferArray.reverse();
  // Concatination of row buffers in reverse order
  imgObj.pixelArray = Buffer.concat(bufferArray);
  // Pass back the object containing altered data
  return imgObj;
};

transform.hFlip = function (imgObj) {
  // Verify the argument passed exists and is an object containing buffer data
  if (!imgObj || !imgObj.allData) return null;
  // Declaration of beginning and end points for row slices
  let start = 0, end = imgObj.width, bufferArray = [];
  // Seperation of rows from pixel array buffer into array of row buffers
  for (let i = 0; i < imgObj.height; i++) {
    bufferArray.push(imgObj.pixelArray.slice(start, end))
    start = end;
    end = end + imgObj.width;
  }
  // Reversal of rows contained in array
  for (let i in bufferArray) bufferArray[i] = bufferArray[i].reverse();
  // Concatination of row buffers in reverse order
  imgObj.pixelArray = Buffer.concat(bufferArray);
  // Pass back the object containing altered data
  return imgObj;
};

transform.dFlip = function (imgObj) {
  // Verify the argument passed exists and is an object containing buffer data
  if (!imgObj || !imgObj.allData) return null;
  // Reversal of entire pixel array to diagonally flip image
  imgObj.pixelArray = imgObj.pixelArray.reverse();
  // Pass back the object containing altered data
  return imgObj;
};