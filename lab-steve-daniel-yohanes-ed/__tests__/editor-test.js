'use strict';

const editor = require('../lib/editor');

describe('Editor Module', () => {
  describe('#readBitmap', () => {
    it('should return a null value if no input is provided', function () {
      expect(editor.readBitmap()).toBeNull();
    });
    it('should return an error if the file cannot be read for some reason', (done) => {
      editor.readBitmap(13, (err, data) => {
        expect(err).not.toBeNull();
        expect(data).toBe(undefined);
        done();
      });
    });
    it('should read the bitmap', (done) => {
      editor.readBitmap('../__tests__/assets/bitmap.bmp', (err, data) => {
        if (err) console.error('Error!', err);
        expect(data).not.toBeNull();
        done();
      });
    });
  });
});
