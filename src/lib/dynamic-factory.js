import {Container} from 'aurelia-dependency-injection';
import {ObserverLocator} from 'aurelia-framework';

export class DynamicFactory {
    constructor(schema, callback) {
        this.schema = schema;
        this.callback = callback;
    }

    dispose() {
        this.schema = null;
        this.callback = null;
    }

    createDataSet(datasetId) {
        const definition = this.schema.datasets.find(item => item.id == datasetId);
        const result = this.__createDataSetFromDefinition(definition);

        result["__definition"] = definition;
        result.observer = Container.instance.get(ObserverLocator);
        result.subscriptions = [];

        this.__addDisposeFunction(result);
        this.__addListenFunction(result);

        if (this.callback) {
            this.callback(result);
        }

        return result;
    }

    __addDisposeFunction(model) {
        model["dispose"] = function() {
            const keys = Object.keys(this);

            while(this.subscriptions.length) {
                this.subscriptions.pop();
            }

            for(let key of keys) {
                if (this[key] == null || this[key] == undefined) {
                    continue;
                }

                if (this[key].dispose != undefined) {
                    this[key].dispose();
                }

                this[key] = null;
            }
        };
    }

    __addListenFunction(model) {
        model["listenFor"] = function(property, callback) {
            if (callback) {
                model.subscriptions.push(model.observer.getObserver(model, property).subscribe(() => callback(model, property)));
            }
            else {
                const propertyCallback = model[`${property}Changed`];
                if (propertyCallback) {
                    model.subscriptions.push(model.observer.getObserver(model, property).subscribe(() => propertyCallback(model[property])));
                }
            }

        }
    }

    __getResourceDatasourceItems(datasourceId) {
        const datasource = this.schema.datasources.find(item => item.id == datasourceId);
        if (!datasource) {
            console.error(`datasource with id: ${datasourceId} not found`);
            return [];
        }

        if (!datasource.resources) {
            console.error(`datasource ${datasourceId} should have a resource id`);
            return[];
        }

        return datasource.resources.slice(0);
    }

    __createCollectionField(model, field) {
        let collection = [];

        if (field.default) {
            collection = this.__getResourceDatasourceItems(field.default);
        }

        model[field.name] = collection;

        const datasetId = field.dataset;

        if (datasetId != undefined) {
            const definition = this.schema.datasets.find(item => item.id == datasetId);
            const fnNameComposite = field.name.charAt(0).toUpperCase() + field.name.slice(1);


            const context = {
                createDataSet: this.__createDataSetFromDefinition,
                definition: definition,
                collection: collection
            };

            model[`add${fnNameComposite}`] = function() {
                const newModel = this.createDataSet(this.definition);
                this.collection.push(newModel);
                return newModel;
            }.bind(context);

            model[`remove${fnNameComposite}`] = function(id) {
                const model = this.find(item => item.id == id);
                const index = this.indexOf(model);

                if (index > -1) {
                    this.slice(index, 1);
                }
            }.bind(model[definition.name]);
        }
    }

    __createDataSetFromDefinition(definition) {
        const result = new DataSet();

        for(let field of definition.fields) {
            if (field.collection == true) {
                this.__createCollectionField(result, field);
            }
            else if (field.dataset != undefined) {
                result[field.name] = this.createDataSet(field.dataset);
            }
            else {
                result[field.name] = field.default || null;
            }
        }

        result["__definition"] = definition;

        return result;
    }
}

export class Rules {
    static required(model, field) {
        const result = {
            isValid: true,
            message: ""
        };

        const fieldValue = model[field] == null || model[field] == undefined ? "" : String(model[field]);
        if (fieldValue.trim().length == 0) {
            result.isValid = false;
            result.message = `${field} is required`;
        }

        return result;
    }

    static maxLength(model, field, length) {
        const result = {
            isValid: true,
            message: ""
        };

        const fieldValue = model[field] == null || model[field] == undefined ? "" : String(model[field]);
        if (fieldValue.trim().length > length) {
            result.isValid = false;
            result.message = `The length of ${field} may not exceed ${length}`;
        }

        return result;
    }

    static minLength(model, field, length) {
        const result = {
            isValid: true,
            message: ""
        };

        const fieldValue = model[field] == null || model[field] == undefined ? "" : String(model[field]);
        if (fieldValue.trim().length < length) {
            result.isValid = false;
            result.message = `The length of ${field} may not be less than ${length}`;
        }

        return result;
    }

    static max(model, field, value) {
        const result = {
            isValid: true,
            message: ""
        };

        const fieldValue = model[field] == null || model[field] == undefined ? 0 : model[field];
        if (fieldValue > value) {
            result.isValid = false;
            result.message = `The value of ${field} must be less or equal to ${value}`;
        }

        return result;
    }

    static min(model, field, value) {
        const result = {
            isValid: true,
            message: ""
        };

        const fieldValue = model[field] == null || model[field] == undefined ? 0 : model[field];
        if (fieldValue < value) {
            result.isValid = false;
            result.message = `The value of ${field} must be greater or equal to ${value}`;
        }

        return result;
    }
}

class DataSet {
    validate() {
        const fields = this["__definition"].fields;
    }

    updateUI() {
        console.log(this);
        const fields = this["__definition"].fields;

        for(let field of fields) {
            if (field.collection != undefined) {
                for (let item of this[field.name]) {
                    if (typeof item.updateUI != "undefined") {
                        item.updateUI();
                    }
                }
            }
            else if (field.dataset != undefined) {
                if (typeof this[field.name].updateUI != "undefined") {
                    this[field.name].updateUI();
                }
            }
            else if (field.validations != undefined) {
                const observer = this["__observers__"][field.name];
                console.log(observer);
            }
        }
    }
}