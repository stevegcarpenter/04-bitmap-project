'use strict';

const transform = (module.exports = {});

// All the allowed bmp image transformations
// This is used as a quick check to see if a transformation is supported
transform.types = {
  greyscale: true,
  blueify: true,
  greenify: true,
  redify: true,
};

transform.applyT = function(bufferObj, type) {
  console.log(bufferObj);
  console.log(type);
  // Verify the transformation type exists
  if (!(type in transform.types)) return null;

  // Add additional transformation types here
  // Don't forget to put them in the transform.types object above as well
  if (type === 'greyscale') {
    return greyScale(bufferObj);
  } else if (type === 'blueify') {
    return rgbify(bufferObj, 0);
  } else if (type === 'greenify') {
    return rgbify(bufferObj, 1);
  } else if (type === 'redify') {
    return rgbify(bufferObj, 2);
  }
};

let greyScale = function(bufferObj) {
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

let rgbify = function(bufferObj, rgb) {
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
