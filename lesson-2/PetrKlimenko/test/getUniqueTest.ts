/// <reference path="./../typings/mocha/mocha.d.ts" />
/// <reference path="./../typings/chai/chai.d.ts" />

import { expect } from 'chai';

import getUnique from '../src/getUnique';

describe('getUnique', () => {
    it('should accept several string arguments ', () => {
        expect(
            getUnique(["a", "b", "c", "a", "b"])
        ).to.deep.equal(["a", "b", "c"])
    });

    it('should accept several different arguments ', () => {
        expect(
            getUnique(["a", 1, "c", "a", 1, "b", true])
        ).to.deep.equal(["a", 1, "c", "b", true])
    });

    it('should accept several different arguments ', () => {
        expect(
            getUnique(["a", 1, "c", NaN, "a", 1, "b", true])
        ).to.deep.equal(["a", 1, "c", NaN, "b", true])
    });
});
