import {expect, assert} from 'chai';
import * as sinon from 'sinon';
import 'aurelia-polyfills';
import {EventAggregatorMock} from './../../mockups/event-aggrigator-mock';
import {TabsheetTest} from './../../../src/views/tabsheet-test/tabsheet-test';

describe('TabsheetTest Tests', function() {
    let instance;
    let eventAggregator;

    beforeEach(function() {
        eventAggregator = new EventAggregatorMock();
        instance = new TabsheetTest(eventAggregator);
    });

    it('constructor', function() {
        expect(instance).to.not.be.null;
    });

    it('not constructor', function() {
        expect(() => TabsheetTest()).to.throw("Cannot call a class as a function");
    });

    it.skip('attached', function() {
    });

    it.skip('detached', function() {
    });
});
