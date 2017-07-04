import {expect, assert} from 'chai';
import {SearchFilter} from './../../src/lib/search-filter.js';

describe('SearchFilter Tests', function() {
    it('search', function() {
        const collection = [
            {
                id: 1,
                code: "a"
            },
            {
                id: 2,
                code: "b"
            },
            {
                id: 3,
                code: "c"
            },
            {
                id: 4,
                code: "d"
            }
        ];

        const promise = SearchFilter("a", collection, "code");

        promise.then(result => {
            expect(result.length == 1);
            expect(result[0].code == "a");
            expect(result[0].id == 1)
        }).catch(error => {throw new Error(error)});
    });
});