import {expect, assert} from 'chai';
import * as sinon from 'sinon';
import 'aurelia-polyfills';
import {EventAggregatorMock} from './../../mockups/event-aggrigator-mock';
import {MasterListContainer} from './../../../src/views/master-list-container/master-list-container';

describe('MasterListContainer Tests', function() {
    let instance;
    let eventAggregator;

    beforeEach(function() {
        eventAggregator = new EventAggregatorMock();
        instance = new MasterListContainer(eventAggregator);
    });

    it('constructor', function() {
        expect(instance).to.not.be.null;
    });

    it('not constructor', function() {
        expect(() => MasterListContainer()).to.throw("Cannot call a class as a function");
    });

    it.skip('attached', function() {
    });

    it.skip('detached', function() {
    });
});
