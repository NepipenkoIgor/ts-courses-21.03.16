/// <reference path="./../typings/mocha/mocha.d.ts" />
/// <reference path="./../typings/chai/chai.d.ts" />

import { expect } from 'chai';

import isInArray from '../src/isInArray';

describe('isInArray', () => {
    it('should accept several string arguments ', () => {
        expect(
            isInArray(["a", "b", "c"], "a", "c")
        ).to.equal(true)
    });

    it('should accept several string arguments ', () => {
        expect(
            isInArray(["a", "b", "c"], "a", "d", "c")
        ).to.equal(false)
    });
    
    it('should accept several number arguments ', () => {
        expect(
            isInArray([10, 20, 30], 10, 20)
        ).to.equal(true)
    });

    it('should accept several number arguments ', () => {
        expect(
            isInArray([10, 20, 30], 5, 20)
        ).to.equal(false)
    });

    it('should accept several boolean arguments ', () => {
        expect(
            isInArray([true, false], true, true)
        ).to.equal(true)
    });

    it('should accept several boolean arguments', () => {
        expect(
            isInArray([true, true], true, false)
        ).to.equal(false)
    });

    it('should accept several different arguments', () => {
        expect(
            isInArray(["12312", 23, true, 1], true, "12312")
        ).to.equal(true)
    });

    it('should accept several different arguments', () => {
        expect(
            isInArray(["12312", 23, true, 1], true, 2, "12312")
        ).to.equal(false)
    });
});
