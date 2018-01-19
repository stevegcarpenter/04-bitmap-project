'use strict';

const editor = require('../lib/editor');

describe('Editor Module', () => {
  describe('#readBitmap', () => {
    it('should read the bitmap', (done) => {
      editor.readBitmap('../__tests__/assets/bitmap.bmp', (err, data) => {
        if (err) console.error('Error!', err);
        else console.log('Data:', data);
        expect(data).not.toBeNull();
        done();
      });
    });
  });
});
