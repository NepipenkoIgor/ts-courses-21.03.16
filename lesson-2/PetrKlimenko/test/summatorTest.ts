/// <reference path="./../typings/mocha/mocha.d.ts" />
/// <reference path="./../typings/chai/chai.d.ts" />

import { expect } from 'chai';

import summator from '../src/summator';

describe('summator', () => {
    it('should accept several number arguments ', () => {
        expect(
            summator(1,2,3)
        ).to.equal(6)
    });

    it('should accept several string and number arguments ', () => {
        expect(
            summator(1,2,"3")
        ).to.equal(6)
    });

    it('should accept several string and number arguments [isNaN case]', () => {
        expect(
            summator(1,2,"3", "z2")
        ).to.equal(6)
    });
});
