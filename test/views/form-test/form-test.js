import {expect, assert} from 'chai';
import * as sinon from 'sinon';
import 'aurelia-polyfills';
import {EventAggregatorMock} from './../../mockups/event-aggrigator-mock';
import {FormTest} from './../../../src/views/form-test/form-test';

describe('FormTest Tests', function() {
    let instance;
    let eventAggregator;

    beforeEach(function() {
        eventAggregator = new EventAggregatorMock();
        instance = new FormTest(eventAggregator);
    });

    it('constructor', function() {
        expect(instance).to.not.be.null;
    });

    it('not constructor', function() {
        expect(() => FormTest()).to.throw("Cannot call a class as a function");
    });

    it.skip('attached', function() {
    });

    it.skip('detached', function() {
    });
});
