'use strict';

const bitmap = module.exports = {};

bitmap.Buff = function(err, buffer) {
  if (err) return console.error(err);
  this.allData = buffer;
  this.type = buffer.toString('utf-8', 0, 2);
  this.fileSize = buffer.readUInt32LE(2);
  this.offset = buffer.readUInt32LE(10);
  this.width = buffer.readUInt32LE(18);
  this.height = buffer.readUInt32LE(22);
  this.pixelArray = buffer.slice(54, this.offset);
  this.compression = buffer.readUInt32(30);
  this.bitsPerPixel = buffer.readUInt16(28);
  console.log(this);
};