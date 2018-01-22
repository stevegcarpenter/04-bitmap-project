'use strict';

const transform = require('../lib/transform');
require('jest');

describe('Transform Module', function () {
  describe('#vFlip', function () {
    it('Should return null if not provided an image object', function () {
      expect(transform.vFlip()).toBeNull();
    });
    it('Should return null for an input that is missing the allData property', function () {
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
    it('Should return null for an input that is missing the allData property', function () {
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
    it('Should return null for an input that is missing the allData property', function () {
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
  describe('#rgbify', function () {
    it('Should return null if not provided an image object', function () {
      expect(transform.rgbify()).toBeNull();
    });
    it('Should return null for an input that is missing the allData property', function () {
      expect(transform.dFlip({ name: 'joe' })).toBeNull();
    });
    it('Should return an object with a pixel array that has been altered properly for blueify', function () {
      expect(transform.rgbify({
        allData: true,
        colorTable: Buffer.from('11223344112233441122334411223344112233441122334411223344', 'hex'),
      }, 0).colorTable.toString('hex')).toBe('11000044110000441122334411223344112233441122334411223344');
    });
    it('Should return an object with a pixel array that has been altered properly for greenify', function () {
      expect(transform.rgbify({
        allData: true,
        colorTable: Buffer.from('11223344112233441122334411223344112233441122334411223344', 'hex'),
      }, 1).colorTable.toString('hex')).toBe('00220044002200441122334411223344112233441122334411223344');
    });
    it('Should return an object with a pixel array that has been altered properly for redify', function () {
      expect(transform.rgbify({
        allData: true,
        colorTable: Buffer.from('11223344112233441122334411223344112233441122334411223344', 'hex'),
      }, 2).colorTable.toString('hex')).toBe('00003344000033441122334411223344112233441122334411223344');
    });
  });
  describe('#greyscale', function () {
    it('Should return null if not provided an image object', function () {
      expect(transform.greyScale()).toBeNull();
    });
    it('Should return null for an input that is missing the allData property', function () {
      expect(transform.greyScale({ name: 'greyscale' })).toBeNull();
    });
    it('Should return an object with a color table that has been altered for greyscale', function () {
      expect(transform.greyScale({
        allData: true,
        colorTable: Buffer.from('11223344112233441122334411223344112233441122334411223344', 'hex'),
      }, 0).colorTable.toString('hex')).toBe('22222244222222441122334411223344112233441122334411223344');
    });
  });
  describe('#bigfoot', function () {
    it('Should return null if not provided an image object', function () {
      expect(transform.writeBigfoot()).toBeNull();
    });
    it('Should return null for an input that is missing the allData property', function () {
      expect(transform.writeBigfoot({ name: 'bigfoot' })).toBeNull();
    });
    it('Should return an object with a pixel array that has been altered to reference the color table at 0f', function () {
      expect(transform.writeBigfoot({
        allData: true,
        pixelArray: Buffer.from('1c1c1c1c1c1c', 'hex'),
      }).pixelArray.toString('hex')).toBe('1c1c1c1c1c1c');
    });
  });
});
