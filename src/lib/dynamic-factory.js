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
        model[`add${fnNameComposite}`] = null;
        model[`remove${fnNameComposite}`] = null;
    }

    __createDataSetFromDefinition(definition) {
        const result = {};

        for(let field of definition.fields) {
            if (field.collection == true) {
                this.__createCollectionField(result, field.dataset);
            }
            else {
                result[field.name] = field.default || null;
            }
        }

        return result;
    }
}