'use strict';

const editor = require('../lib/editor');
const Bitmap = require('../lib/bitmap');

describe('Editor Module', () => {
  describe('#readBitmap', () => {
    it('should return a null value if no input is provided', () => {
      expect(editor.readBitmap()).toBeNull();
    });

    it('should return null if readPath or options variables are falsey', () => {
      expect(editor.readBitmap('foo/bar', null, null)).toBe(null);
      expect(editor.readBitmap('foo/bar', 0, null)).toBe(null);
      expect(editor.readBitmap('foo/bar', undefined, null)).toBe(null);
      expect(editor.readBitmap(null, {'foo': 'bar'}, null)).toBe(null);
      expect(editor.readBitmap(undefined, {'foo': 'bar'}, null)).toBe(null);
      expect(editor.readBitmap(0, {'foo': 'bar'}, null)).toBe(null);

    });

    it('should return null if the readPath is not a string', () => {
      expect(editor.readBitmap(100, {'foo': 'bar'}, null)).toBe(null);
      expect(editor.readBitmap({}, {'foo': 'bar'}, null)).toBe(null);
    });

    it('should return null if the options arg is not an object', () => {
      expect(editor.readBitmap('a-string', 'foo', null)).toBe(null);
      expect(editor.readBitmap('a-string', 100, null)).toBe(null);
    });

    it('should return null the file does not exist', (done) => {
      let options = {
        writeFilePath: './fake/path/to/newfile.bmp',
        transform: 'greyscale',
        doBitmap: true,
        doTransform: true,
        doWriteFile: true,
      };
      editor.readBitmap('./fake/path/to/file.bmp', options, (err, data) => {
        expect(err).not.toBeNull();
        expect(data).toBe(undefined);
        done();
      });
    });
  });

  describe('#writeBitmap', () => {
    it('should return null if the writePath arg is falsey', () => {
      expect(editor.writeBitmap(null, null, null)).toBe(null);
    });

    it('should return null if the data object is falsey', () => {
      expect(editor.writeBitmap('/some/path', null)).toBe(null);
    });

    it('should return null if the data object is not of type Bitmap', () => {
      expect(editor.writeBitmap('./fake/file/path.bmp', {}, (err) => {
        if (err) console.error(err);
      })).toBe(null);
    });
  });
});
