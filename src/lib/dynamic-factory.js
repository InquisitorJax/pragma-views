export class DynamicFactory {
    constructor(schema) {
        this.schema = schema;
    }

    dispose() {
        this.schema = null;
    }

    createDataSet(datasetId) {
        const definition = this.schema.datasets.find(item => item.id == datasetId);
        const result = this.__createDataSetFromDefinition(definition);

        return result;
    }

    __createCollectionField(model, datasetId) {
        const definition = this.schema.datasets.find(item => item.id == datasetId);
        const fnNameComposite = definition.name.charAt(0).toUpperCase() + definition.name.slice(1);
        model[definition.name] = [];

        const context = {
            createDataSet: this.__createDataSetFromDefinition,
            definition: definition,
            collection: model[definition.name]
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

    __createDataSetFromDefinition(definition) {
        const result = {};

        for(let field of definition.fields) {
            if (field.collection == true) {
                this.__createCollectionField(result, field.dataset);
            }
            else if (field.dataset != undefined) {
                result[field.name] = this.createDataSet(field.dataset);
            }
            else {
                result[field.name] = field.default || null;
            }
        }

        return result;
    }
}