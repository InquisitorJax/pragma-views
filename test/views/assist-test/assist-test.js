import {expect, assert} from 'chai';
import * as sinon from 'sinon';
import 'aurelia-polyfills';
import {EventAggregatorMock} from './../../mockups/event-aggrigator-mock';
import {AssistTest} from './../../../src/views/assist-test/assist-test';

describe('AssistTest Tests', function() {
    let instance;
    let eventAggregator;

    beforeEach(function() {
        eventAggregator = new EventAggregatorMock();
        instance = new AssistTest(eventAggregator);
    });

    it('constructor', function() {
        expect(instance).to.not.be.null;
    });

    it('not constructor', function() {
        expect(() => AssistTest()).to.throw("Cannot call a class as a function");
    });

    it.skip('attached', function() {
    });

    it.skip('detached', function() {
    });
});
