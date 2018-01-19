'use strict';

const bitmap = require('../lib/bitmap');
const editor = require('../lib/editor');

describe('Bitmap Module', () => {
  describe('#Buff', () => {
    it('should change the buffer data to an object', (done) => {
      editor.readBitmap('../__tests__/assets/editor.readBitmap', bitmap.Buff);
      done();
    });
  });
});
