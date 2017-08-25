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

    _getResourceDatasourceItems(datasourceId) {
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
            collection = this._getResourceDatasourceItems(field.default);
        }

        model[field.name] = collection;

        const datasetId = field.dataset;

        if (datasetId != undefined) {
            const definition = this.schema.datasets.find(item => item.id == datasetId);
            const fnNameComposite = definition.name.charAt(0).toUpperCase() + definition.name.slice(1);


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
        const result = {};

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

        return result;
    }
}