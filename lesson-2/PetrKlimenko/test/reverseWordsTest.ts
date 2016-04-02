/// <reference path="./../typings/mocha/mocha.d.ts" />
/// <reference path="./../typings/chai/chai.d.ts" />

import { expect } from 'chai';

import reverseWords from '../src/reverseWords';

describe('reverseWords', () => {
    it('should reverse words', () => {
        expect(
            reverseWords("s1tar3t 2 hellow")
        ).to.equal("t1rat3s 2 wolleh")
    });

    it('should reverse words', () => {
        expect(
            reverseWords("s1ta$%r3t 2 hel^low")
        ).to.equal("t1ra$%t3s 2 wol^leh")
    });

    it('should reverse words', () => {
        expect(
            reverseWords("s1tar3t 2 low5")
        ).to.equal("t1rat3s 2 wol5")
    });
});
