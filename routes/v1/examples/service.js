'use strict';

/**
 * example
 * @returns {object[]}
 */
function getExamples() {
    return {
        total: 2,
        examples: [{name: 'zhangsan', age: 18}, {name: 'lisi', age: 20}]
    };
}

module.exports = {
    getExamples: getExamples,
}