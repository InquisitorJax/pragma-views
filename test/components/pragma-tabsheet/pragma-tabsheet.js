import {expect, assert} from 'chai';
import 'aurelia-polyfills';
import {ElementMockup} from './../../mockups/element-mockup';
import {PragmaTabSheet} from './../../../src/components/pragma-tabsheet/pragma-tabsheet';

describe('PragmaTabSheet Tests', function() {
    let instance;
    let element;

    beforeEach(function() {
        element = new ElementMockup();
        instance = new PragmaTabSheet(element);
    });

    it('constructor', function() {
        expect(instance).to.not.be.null;
    });

    it('not constructor', function() {
        expect(() => PragmaTabSheet()).to.throw("Cannot call a class as a function");
    });
});