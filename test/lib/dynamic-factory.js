import {expect, assert} from 'chai';
import 'aurelia-polyfills';
import {DynamicFactory, Rules} from './../../src/lib/dynamic-factory.js';

const schema = {
    "datasets": [
        {
            "id": 0,
            "name": "model",
            "fields": [
                {
                    "name": "selection",
                    "dataaset": 2
                },
                {
                    "name": "header",
                    "dataset": 3
                }
            ]
        },
        {
            "id": 1,
            "name": "contact",
            "fields": [
                {
                    "name": "phone"
                },
                {
                    "name": "email",
                    "default": "mail@somehere.com"
                }
            ]
        },
        {
            "id": 2,
            "name": "selection",
            "fields": [
                {
                    "name": "field1",
                    "default": ""
                },
                {
                    "name": "field2",
                    "default": ""
                },
                {
                    "name": "field3",
                    "default": ""
                },
                {
                    "name": "field4",
                    "default": ""
                },
                {
                    "name": "field5",
                    "default": ""
                }
            ]
        },
        {
            "id": 3,
            "name": "header",
            "fields": [
                {
                    "name": "firstName",
                    "default": ""
                },
                {
                    "name": "lastName",
                    "default": ""
                },
                {
                    "name": "age",
                    "default": 21
                },
                {
                    "name": "contacts",
                    "collection": true,
                    "dataset": 1
                }
            ]
        }
    ]
};

describe('DynamicFactory Tests', function() {
    let instance;

    beforeEach(function() {
        instance = new DynamicFactory(schema);
    });

    it('constructor', function() {
        // Assert
        expect(instance).to.not.be.null;
    });

    it('not constructor', function() {
        // Assert
        expect(() => DynamicFactory()).to.throw("Cannot call a class as a function");
    });

    it('dispose', function() {
        // Act
        instance.dispose();

        // Assert
        // .. put your code here
    });

    it("create model", function() {

    });

    // it("create contacts model", function() {
    //     // Act
    //     global.Container = null;
    //     const contact = instance.createDataSet(1);
    //
    //     const keys = Object.keys(contact);
    //
    //     // Assert
    //     expect(contact).to.not.be.null;
    //     assert(keys.includes("phone"), "contacts should have property phone");
    //     assert(keys.includes("email"), "contacts should have property email");
    //     expect(contact.email).to.equal("mail@somehere.com");
    // });
    //
    // it("create dataset with collection field", function() {
    //     // Arrange
    //     global.Container = null;
    //     const model = instance.createDataSet(3);
    //     const keys = Object.keys(model);
    //
    //     // Assert
    //     assert(keys.includes("firstName"), "firstName should be part of model");
    //     assert(keys.includes("lastName"), "lastName should be part of model");
    //     assert(keys.includes("age"), "age should be part of model");
    //     assert(keys.includes("addContacts"), "addContacts should part of the model");
    //     assert(keys.includes("removeContacts", "removeContacts should be part of the model"));
    // });

});

describe('Rules', function() {
    it("required, null", function() {
        const model = {
            code: null
        };

        const result = Rules.required(model, "code");

        expect(result.isValid).to.be.false;
        expect(result.message).to.equal("code is required")
    });

    it("required, undefined", function() {
        const model = {
            code: undefined
        };

        const result = Rules.required(model, "code");

        expect(result.isValid).to.be.false;
        expect(result.message).to.equal("code is required")
    });

    it("required, empty", function() {
        const model = {
            code: ""
        };

        const result = Rules.required(model, "code");

        expect(result.isValid).to.be.false;
        expect(result.message).to.equal("code is required")
    });

    it("required, spaced", function() {
        const model = {
            code: "   "
        };

        const result = Rules.required(model, "code");

        expect(result.isValid).to.be.false;
        expect(result.message).to.equal("code is required")
    });

    it("required, valid", function() {
        const model = {
            code: "My Code"
        };

        const result = Rules.required(model, "code");

        expect(result.isValid).to.be.true;
        expect(result.message).to.equal("")
    });

    it("maxLength, null", function() {
        const model = {
            code: null
        };

        const result = Rules.maxLength(model, "code", 5);

        expect(result.isValid).to.be.true;
        expect(result.message).to.equal("");
    });

    it("maxLength, undefined", function() {
        const model = {
            code: undefined
        };

        const result = Rules.maxLength(model, "code", 5);

        expect(result.isValid).to.be.true;
        expect(result.message).to.equal("");
    });

    it("maxLength, empty", function() {
        const model = {
            code: ""
        };

        const result = Rules.maxLength(model, "code", 5);

        expect(result.isValid).to.be.true;
        expect(result.message).to.equal("");
    });

    it("maxLength, too long", function() {
        const model = {
            code: "Hello World"
        };

        const result = Rules.maxLength(model, "code", 5);

        expect(result.isValid).to.be.false;
        expect(result.message).to.equal("The length of code may not exceed 5");
    });

    it("minLength, null", function() {
        const model = {
            code: null
        };

        const result = Rules.minLength(model, "code", 5);

        expect(result.isValid).to.be.false;
        expect(result.message).to.equal("The length of code may not be less than 5");
    });

    it("minLength, undefined", function() {
        const model = {
            code: undefined
        };

        const result = Rules.minLength(model, "code", 5);

        expect(result.isValid).to.be.false;
        expect(result.message).to.equal("The length of code may not be less than 5");
    });

    it("minLength, empty", function() {
        const model = {
            code: ""
        };

        const result = Rules.minLength(model, "code", 5);

        expect(result.isValid).to.be.false;
        expect(result.message).to.equal("The length of code may not be less than 5");
    });

    it("minLength, too long", function() {
        const model = {
            code: "Hello World"
        };

        const result = Rules.minLength(model, "code", 5);

        expect(result.isValid).to.be.true;
        expect(result.message).to.equal("");
    });
});