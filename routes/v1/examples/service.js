'use strict';

let data = [
    {id: 1, name: 'zhangsan', age: 18},
    {id: 2, name: 'lisi', age: 20},
];

/**
 * example
 * @returns {object[]}
 */
function getExamples() {
    return {
        total: data.length,
        examples: data,
    };
}

/**
 * 
 * @param {number} id - 样例id
 * @returns {object}
 */
function getOneExample(id) {
    return data.find(o => o.id === id);
}

/**
 * 
 * @param {number} id - 样例id
 * @param {object} reqData - 更新数据 
 * @returns {boolean}
 */
function putOneExample(id, reqData) {
    const index = data.findIndex(example => example.id === id);
    if (index === -1) return false;
    data[index] = Object.assign(data[index], reqData);
    return true;
}

/**
 * 
 * @param {object} reqData 请求数据
 */
function postOneExample(reqData) {
    data = data.sort((a, b) => a.id - b.id);
    const id = data[data.length - 1].id + 1;
    reqData.id = id;
    data.push(reqData);
    return id;
}

/**
 * 
 * @param {number} id
 */
function deleteOneExample(id) {
    const example = getOneExample(id);
    if (!example) return false;
    data = data.filter(example => example.id !== id);
    return true;
}

module.exports = {
    getExamples: getExamples,
    getOneExample: getOneExample,
    putOneExample: putOneExample,
    postOneExample: postOneExample,
    deleteOneExample: deleteOneExample,
}