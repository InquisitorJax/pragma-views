export function SearchFilter(search, collection, field) {
    return new Promise(resolve => {
        if (!collection || collection.length == 0) {
            return resolve([]);
        }

        const keys = Object.keys(collection[0]);

        const result = collection.filter(item => {
            if (field) {
                return item[field].toString().toUpperCase().indexOf(search.toUpperCase()) > -1;
            }

            for (let key of keys) {
                const value = item[key];
                if (value) {
                    if (value.toString().toUpperCase().indexOf(search.toUpperCase()) > -1) {
                        return true;
                    };
                }
            }

            return false;
        });

        resolve(result);
    })
}