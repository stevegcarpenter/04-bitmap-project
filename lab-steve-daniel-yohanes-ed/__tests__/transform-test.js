'use strict';

const transform = require('../lib/transform');
require('jest');

describe('Transform Module', function () {
  describe('#vFlip', function () {
    it('Should return null if not provided an image object', function () {
      expect(transform.vFlip()).toBeNull();
    });
    it('Should return null for an input that is missing the data property', function () {
      expect(transform.vFlip({ name: 'joe' })).toBeNull();
    });
    it('Should return an object with a pixel array that has been altered by properly', function () {
      expect(transform.vFlip({
        allData: true,
        height: 5,
        width: 2,
        pixelArray: Buffer.from('ff11002200330044bb55', 'hex'),
      }).pixelArray.toString('hex')).toBe('bb55004400330022ff11');
    });
  });
  describe('#hFlip', function () {
    it('Should return null if not provided an image object', function () {
      expect(transform.hFlip()).toBeNull();
    });
    it('Should return null for an input that is missing the data property', function () {
      expect(transform.hFlip({ name: 'joe' })).toBeNull();
    });
    it('Should return an object with a pixel array that has been altered by properly', function () {
      expect(transform.hFlip({
        allData: true,
        height: 5,
        width: 2,
        pixelArray: Buffer.from('ff11002200330044bb55', 'hex'),
      }).pixelArray.toString('hex')).toBe('11ff22003300440055bb');
    });
  });
  describe('#dFlip', function () {
    it('Should return null if not provided an image object', function () {
      expect(transform.dFlip()).toBeNull();
    });
    it('Should return null for an input that is missing the data property', function () {
      expect(transform.dFlip({ name: 'joe' })).toBeNull();
    });
    it('Should return an object with a pixel array that has been altered by properly', function () {
      expect(transform.dFlip({
        allData: true,
        height: 5,
        width: 2,
        pixelArray: Buffer.from('ff11002200330044bb55', 'hex'),
      }).pixelArray.toString('hex')).toBe('55bb44003300220011ff');
    });
  });
});