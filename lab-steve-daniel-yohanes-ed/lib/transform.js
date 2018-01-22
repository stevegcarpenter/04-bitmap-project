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
  bigfoot: true,
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
  } else if (type === 'bigfoot') {
    return transform.writeBigfoot(bufferObj);
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
      (bufferObj.colorTable[i] + bufferObj.colorTable[i + 1] + bufferObj.colorTable[i + 2]) / 3;
    bufferObj.colorTable[i] = avgColors;
    bufferObj.colorTable[i + 1] = avgColors;
    bufferObj.colorTable[i + 2] = avgColors;
  }

  return bufferObj;
};

transform.rgbify = function(bufferObj, rgb) {
  if (!bufferObj || !bufferObj.allData || rgb === undefined) return null;
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
  // Separation of rows from pixel array buffer into array of row buffers
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
  // Separation of rows from pixel array buffer into array of row buffers
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
  let colorWhite = 0x15; //offset to white
  // Bottom border
  for (let i = 0; i < 300; i++) {
    bufferObj.pixelArray[i] = colorWhite;
    bufferObj.pixelArray[i + 1] = colorWhite;
    bufferObj.pixelArray[i + 2] = colorWhite;
  }
  //Top border
  for (let j = 9700; j < 10000; j++) {
    bufferObj.pixelArray[j] = colorWhite;
    bufferObj.pixelArray[j + 1] = colorWhite;
    bufferObj.pixelArray[j + 2] = colorWhite;
  }
  // Left border
  for (let k = 0; k < 10000; k +=100) {
    bufferObj.pixelArray[k] = colorWhite;
    bufferObj.pixelArray[k + 1] = colorWhite;
    bufferObj.pixelArray[k + 2] = colorWhite;
  }
  // Right border
  for (let l = 0; l < 10000; l +=100) {
    bufferObj.pixelArray[l + 97] = colorWhite;
    bufferObj.pixelArray[l + 98] = colorWhite;
    bufferObj.pixelArray[l + 99] = colorWhite;
  }
  return bufferObj;
};

transform.writeBigfoot = function(bufferObj) {
  if (!bufferObj || !bufferObj.allData) return null;

  let colorYellow = 0x08; //offset to yellow
  for (let k = 6000; k < 9000; k +=100) {
    //vertical long
    //b
    bufferObj.pixelArray[k + 3] = colorYellow;
    bufferObj.pixelArray[k + 4] = colorYellow;
    bufferObj.pixelArray[k + 5] = colorYellow;
    //f
    bufferObj.pixelArray[k + 43] = colorYellow;
    bufferObj.pixelArray[k + 44] = colorYellow;
    bufferObj.pixelArray[k + 45] = colorYellow;
    //t
    bufferObj.pixelArray[k + 89] = colorYellow;
    bufferObj.pixelArray[k + 90] = colorYellow;
    bufferObj.pixelArray[k + 91] = colorYellow;
  }

  for (let k = 6000; k < 8000; k +=100) {
    //vertical long i
    //i
    bufferObj.pixelArray[k + 19] = colorYellow;
    bufferObj.pixelArray[k + 20] = colorYellow;
    bufferObj.pixelArray[k + 21] = colorYellow;
  }

  for (let k = 8500; k < 9000; k +=100) {
    //i dot
    bufferObj.pixelArray[k + 19] = colorYellow;
    bufferObj.pixelArray[k + 20] = colorYellow;
    bufferObj.pixelArray[k + 21] = colorYellow;
  }

  for (let k = 6000; k < 7300; k +=100) {
    //vertical short
    //b
    bufferObj.pixelArray[k + 13] = colorYellow;
    bufferObj.pixelArray[k + 14] = colorYellow;
    bufferObj.pixelArray[k + 15] = colorYellow;
    //g
    bufferObj.pixelArray[k + 25] = colorYellow;
    bufferObj.pixelArray[k + 26] = colorYellow;
    bufferObj.pixelArray[k + 27] = colorYellow;
    //o
    bufferObj.pixelArray[k + 55] = colorYellow;
    bufferObj.pixelArray[k + 56] = colorYellow;
    bufferObj.pixelArray[k + 57] = colorYellow;
    bufferObj.pixelArray[k + 66] = colorYellow;
    bufferObj.pixelArray[k + 67] = colorYellow;
    bufferObj.pixelArray[k + 68] = colorYellow;
    bufferObj.pixelArray[k + 73] = colorYellow;
    bufferObj.pixelArray[k + 74] = colorYellow;
    bufferObj.pixelArray[k + 75] = colorYellow;
    bufferObj.pixelArray[k + 83] = colorYellow;
    bufferObj.pixelArray[k + 84] = colorYellow;
    bufferObj.pixelArray[k + 85] = colorYellow;
  }

  for (let i = 6; i < 15; i++) {
    //horizontal short
    //b
    bufferObj.pixelArray[i + 6000] = colorYellow;
    bufferObj.pixelArray[i + 6100] = colorYellow;
    bufferObj.pixelArray[i + 6200] = colorYellow;
    bufferObj.pixelArray[i + 7000] = colorYellow;
    bufferObj.pixelArray[i + 7100] = colorYellow;
    bufferObj.pixelArray[i + 7200] = colorYellow;
    //g
    bufferObj.pixelArray[i + 6022] = colorYellow;
    bufferObj.pixelArray[i + 6122] = colorYellow;
    bufferObj.pixelArray[i + 6222] = colorYellow;
    bufferObj.pixelArray[i + 7022] = colorYellow;
    bufferObj.pixelArray[i + 7122] = colorYellow;
    bufferObj.pixelArray[i + 7222] = colorYellow;
    //f
    bufferObj.pixelArray[i + 7940] = colorYellow;
    bufferObj.pixelArray[i + 8040] = colorYellow;
    bufferObj.pixelArray[i + 8140] = colorYellow;
    bufferObj.pixelArray[i + 8740] = colorYellow;
    bufferObj.pixelArray[i + 8840] = colorYellow;
    bufferObj.pixelArray[i + 8940] = colorYellow;
    //o
    bufferObj.pixelArray[i + 6051] = colorYellow;
    bufferObj.pixelArray[i + 6151] = colorYellow;
    bufferObj.pixelArray[i + 6251] = colorYellow;
    bufferObj.pixelArray[i + 7051] = colorYellow;
    bufferObj.pixelArray[i + 7151] = colorYellow;
    bufferObj.pixelArray[i + 7251] = colorYellow;
    bufferObj.pixelArray[i + 6068] = colorYellow;
    bufferObj.pixelArray[i + 6168] = colorYellow;
    bufferObj.pixelArray[i + 6268] = colorYellow;
    bufferObj.pixelArray[i + 7068] = colorYellow;
    bufferObj.pixelArray[i + 7168] = colorYellow;
    bufferObj.pixelArray[i + 7268] = colorYellow;
    //g
    bufferObj.pixelArray[i + 5023] = colorYellow;
    bufferObj.pixelArray[i + 5123] = colorYellow;
    bufferObj.pixelArray[i + 5223] = colorYellow;
  }

  for (let i = 4; i < 17; i++) {
    //horizontal short
    //t
    bufferObj.pixelArray[i + 8180] = colorYellow;
    bufferObj.pixelArray[i + 8280] = colorYellow;
    bufferObj.pixelArray[i + 8380] = colorYellow;
    bufferObj.pixelArray[i + 8480] = colorYellow;
  }

  for (let k = 5000; k < 7300; k +=100) {
    //g
    bufferObj.pixelArray[k + 37] = colorYellow;
    bufferObj.pixelArray[k + 38] = colorYellow;
    bufferObj.pixelArray[k + 39] = colorYellow;
  }
  return bufferObj;
};

