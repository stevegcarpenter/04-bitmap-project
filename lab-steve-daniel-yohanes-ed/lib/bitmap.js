'use strict';

module.exports = function(buffer) {
  if(!buffer || !Buffer.isBuffer(buffer)) return null;
  this.allData = buffer;
  this.type = buffer.toString('utf-8', 0, 2);
  this.fileSize = buffer.readUInt32LE(2);
  this.offset = buffer.readUInt32LE(10);
  this.width = buffer.readUInt32LE(18);
  this.height = buffer.readUInt32LE(22);
  this.colorTable = buffer.slice(54, this.offset);
  this.pixelArray = buffer.slice(this.offset);
  this.compression = buffer.readUInt32LE(30);
  this.bitsPerPixel = buffer.readUInt16LE(28);
  return this;
};