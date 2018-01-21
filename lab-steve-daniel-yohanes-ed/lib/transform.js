'use strict';

const transform = module.exports = {};

transform.greyScale = function(bufferObj) {
  //Pixel with RGB values of (30,128,255)
  // The red level R=30, The green level G=128, The blue level B=255
  // R' = G' = B' = (R+G+B) / 3 = (30+128+255) / 3 = 138
  // so the pixel will get RGB values of: (138,138,138)
  for (var i = 0; i < bufferObj.colorTable.length / 4; i += 4) {
    let avgColors = (bufferObj.colorTable[i] + bufferObj.colorTable[i + 1] + bufferObj.colorTable[i + 2]) / 3;
    bufferObj.colorTable[i] = avgColors;
    bufferObj.colorTable[i + 1] = avgColors;
    bufferObj.colorTable[i + 2] = avgColors;
  }
  console.log('new buffer', bufferObj);
  return bufferObj;
};