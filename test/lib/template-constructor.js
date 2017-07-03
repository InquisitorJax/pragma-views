import {expect, assert} from 'chai';
import {TemplateConstructor} from './../../src/lib/template-constructor.js';

describe('TemplateConstructor Tests', function() {
    let instance;

    beforeEach(function() {
        instance = new TemplateConstructor();
    });

    it('constructor', function() {
        // Assert
        expect(instance).to.not.be.null;
    });

    it('not constructor', function() {
        // Assert
        expect(() => TemplateConstructor()).to.throw("Cannot call a class as a function");
    });

    it('dispose', function() {
        // Act
        instance.dispose();

        // Assert
        // .. put your code here
    });
});