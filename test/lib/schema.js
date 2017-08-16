import {expect, assert} from 'chai';
import {Template, TemplateCollection, FieldsCollection, DataSourceCollection, DataSource, ResourceDataSource, Schema} from './../../src/lib/schema.js';

describe("Template tests", function() {
   it("constructor", function() {
       const template = new Template(1, 'item 1');
       expect(template).to.not.be.null;
       expect(template.id).to.equal(1, "id should be 1");
       expect(template.name).to.equal('item 1', 'name should be "item 1');
   })
});

describe('Templates Tests', function() {
    let instance;

    beforeEach(function() {
        instance = TemplateCollection.createInstance();
    });

    it("add", function() {
        // Arrange
        let length = instance.length;

        // Act
        const result = instance.add();

        // Assert
        expect(instance.length > length);
        expect(result).to.not.be.null;
    });
});

describe('FieldsCollection Tests', function() {
    let instance;

    beforeEach(function() {
        instance = FieldsCollection.createInstance();
    });

    it("add new", function() {
        // Arrange
        let length = instance.length;

        // Act
        const result = instance.add();

        // Assert
        expect(instance.length > length);
        expect(result).to.not.be.null;
    });
});

describe('DataSources Tests', function() {
    let instance;

    beforeEach(function() {
        instance = DataSourceCollection.createInstance();
    });

    it("add new", function() {
        // Arrange
        let length = instance.length;

        // Act
        const result = instance.add();

        // Assert
        expect(instance.length > length);
        expect(result).to.not.be.null;
        expect(result.id).to.equal(length + 1, 'result id should be length + 1');
        assert(result instanceof DataSource);
    });

    it("addResource", function() {
        // Arrange
        let length = instance.length;

        // Act
        const result = instance.addResource();
        const resultItem = result.add();

        // Assert
        expect(instance.length > length);
        expect(result).to.not.be.null;
        expect(result.id).to.equal(length + 1, 'result id should be length + 1');
        assert(result instanceof ResourceDataSource);
        expect(resultItem).to.not.be.null;
        expect(resultItem.id).to.equal(1, 'result item id should be 1');
        expect(resultItem.title).to.equal("Item 1", "title should be 'Item 1'");
    })
});

describe('Schema Tests', function() {
   it('constructor', function() {
       const instance = new Schema();

       expect(instance.templates).to.not.be.null;
       expect(instance.datasources).to.not.be.null;
       expect(instance.fields).to.not.be.null;
       expect(instance.body).to.not.be.null;
   });
});