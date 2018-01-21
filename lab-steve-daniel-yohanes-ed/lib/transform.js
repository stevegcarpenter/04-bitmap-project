'use strict';

const transform = (module.exports = {});

// All the allowed bmp image transformations
// This is used as a quick check to see if a transformation is supported
transform.types = {
  greyscale: true,
  vflip: true,
  hflip: true,
  dflip: true,
  blueify: true,
  greenify: true,
  redify: true,
  border: true,
};

// Apply a transformation given the 'type' string
transform.applyT = function(bufferObj, type) {
  // Verify the transformation type exists
  if (!(type in transform.types)) return null;

  // Add additional transformation types here
  // Don't forget to put them in the transform.types object above as well
  if (type === 'greyscale') {
    return transform.greyScale(bufferObj);
  } else if (type === 'blueify') {
    return transform.rgbify(bufferObj, 0);
  } else if (type === 'greenify') {
    return transform.rgbify(bufferObj, 1);
  } else if (type === 'redify') {
    return transform.rgbify(bufferObj, 2);
  } else if (type === 'vflip') {
    return transform.vFlip(bufferObj);
  } else if (type === 'hflip') {
    return transform.hFlip(bufferObj);
  } else if (type === 'dflip') {
    return transform.dFlip(bufferObj);
  } else if (type === 'border') {
    return transform.addBorder(bufferObj);
  }
};

transform.greyScale = function(bufferObj) {
  if (!bufferObj || !bufferObj.allData) return null;

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

  return bufferObj;
};

transform.rgbify = function(bufferObj, rgb) {
  if (!bufferObj || !bufferObj.allData) return null;
  if (rgb < 0 || rgb > 2) return null;

  // Colors are formatted as follows:
  // bufferObj.colorTable[i + 0] = blue
  // bufferObj.colorTable[i + 1] = green
  // bufferObj.colorTable[i + 2] = red
  switch (rgb) {
  case 0:
    // if rgb == 0, blueify
    for (let i = 0; i < bufferObj.colorTable.length / 4; i += 4) {
      bufferObj.colorTable[i + 1] = 0;
      bufferObj.colorTable[i + 2] = 0;
    }
    break;
  case 1:
    // if rgb == 1, greenify
    for (let i = 0; i < bufferObj.colorTable.length / 4; i += 4) {
      bufferObj.colorTable[i] = 0;
      bufferObj.colorTable[i + 2] = 0;
    }
    break;
  case 2:
    // if rgb == 2, redify
    for (let i = 0; i < bufferObj.colorTable.length / 4; i += 4) {
      bufferObj.colorTable[i] = 0;
      bufferObj.colorTable[i + 1] = 0;
    }
    break;
  default:
    console.error(`Invalid rgb selection: ${rgb}`);
    return null;
  }

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

transform.addBorder = function(bufferObj) {
  if (!bufferObj || !bufferObj.allData) return null;
  // Bottom border
  for (let i = 0; i < 300; i++) {
    bufferObj.pixelArray[i] = 0x15;
    bufferObj.pixelArray[i + 1] = 0x15;
    bufferObj.pixelArray[i + 2] = 0x15;
  }
  //Top border
  for (let j = 9700; j < 10000; j++) {
    bufferObj.pixelArray[j] = 0x15;
    bufferObj.pixelArray[j + 1] = 0x15;
    bufferObj.pixelArray[j + 2] = 0x15;
  }
  // Left border
  for (let k = 0; k < 10000; k +=100) {
    bufferObj.pixelArray[k] = 0x15;
    bufferObj.pixelArray[k + 1] = 0x15;
    bufferObj.pixelArray[k + 2] = 0x15;
  }
  // Right border
  for (let l = 0; l < 10000; l +=100) {
    bufferObj.pixelArray[l + 97] = 0x15;
    bufferObj.pixelArray[l + 98] = 0x15;
    bufferObj.pixelArray[l + 99] = 0x15;
  }
  return bufferObj;
};

