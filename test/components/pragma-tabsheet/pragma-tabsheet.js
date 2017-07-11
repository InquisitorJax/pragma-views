import {expect, assert} from 'chai';
import 'aurelia-polyfills';
import {ElementMockup} from './../../mockups/element-mockup';
import {PragmaTabsheet} from './../../../src/components/pragma-tabsheet/pragma-tabsheet';

describe('PragmaTabsheet Tests', function() {
    let instance;
    let element;

    beforeEach(function() {
        element = new ElementMockup();
        instance = new PragmaTabsheet(element);
    });

    it('constructor', function() {
        expect(instance).to.not.be.null;
    });

    it('not constructor', function() {
        expect(() => PragmaTabsheet()).to.throw("Cannot call a class as a function");
    });
});