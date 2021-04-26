'use strict';
const router = require('express').Router();
const utils = require('../../../lib/utils');
const apiCodes = require('../../../lib/api-code');
const resCodes = require('../../../lib/response-code');
const exampleService = require('./service');

module.exports = {
    prefix: '/examples',   // api prefix
    router,
}

/**
 * @api {GET} /examples/:id 获取某个样例
 * @apiVersion 1.0.0
 * @apiGroup Example
 * @apiName GetOneExample
 * @apiParam {string} id 样例id
 * @apiSuccess {sumber} code        响应码
 * @apiSuccess {string} msg         响应描述
 * @apiSuccess {object} data        响应数据
 * @apiSuccess {number} data.id     样例id
 * @apiSuccess {string} data.name   样例名称
 * @apiSuccess {number} data.age    样例年龄
 * @apiSuccessExample {json} Success-Response
 *      HTTP/1.1 200 ok
 *      {
 *          code: 0,
 *          msg: 'success',
 *          data: {
 *              id: 1,
 *              name: 'zhangsan',
 *              age: 18
 *          }
 *      }
 * @apiError (Error Code) 1 The <code>id</code> of the User was not found.
 * @apiError (Error Code) 10001 Inner error
 * @apiErrorExample {json} Error-Response
 *      HTTP/1.1 200 ok
 *      {
 *          code: 1,
 *          msg: 'no item now',
 *          data: null
 *      }
 */
router.get('/:id', (req, res) => {
    const api = utils.buildApi(req, apiCodes.GET_ONE_EXAMPLE);
    const id = +req.params.id;
    const example = exampleService.getOneExample(id);
    return res.json(utils.buildResponse(resCodes.SUCCESS, 'success', example, api));
});


/**
 * @api {GET} /examples 获取所有样例
 * @apiVersion 1.0.0
 * @apiGroup Example
 * @apiName GetExamples
 * @apiPermission none
 * @apiSuccess {number} code        响应码
 * @apiSuccess {string} msg         响应描述
 * @apiSuccess {object} data        响应数据
 * @apiSuccess {number} data.total  样例总数
 * @apiSuccess {object[]} data.examples     样例数组
 * @apiSuccess {number} data.examples.id    样例id
 * @apiSuccess {string} data.examples.name  样例名称
 * @apiSuccess {number} data.examples.age   样例年龄
 * @apiSuccessExample {json} Success-Response
 *      HTTP/1.1 200 ok
 *      {
 *          code: 0,
 *          msg: 'success',
 *          data: {
 *              total: 2,
 *              examples: [
 *                  { id: 1, name: 'zhangsan', age:18 },
 *                  { id: 2, name: 'lisi', age:20 },
 *              ]
 *          }
 *      }
 * @apiError (Error code) not_0 获取失败
 */
router.get('/', (req, res) => {
    const api = utils.buildApi(req, apiCodes.GET_EXAMPLES);
    const resp = exampleService.getExamples();
    return res.json(utils.buildResponse(resCodes.SUCCESS, 'success', resp, api));
});

/**
 * @api {PUT} /examples/:id  修改某个样例数
 * @apiVersion 1.0.0
 * @apiGroup Example
 * @apiName PutOneExample
 * @apiParam {string} id 样例id
 * @apiParam {number} name 样例名称
 * @apiParam {number} age 样例年龄
 * @apiSuccess {number} code 响应值
 * @apiSuccess {string} msg 响应描述
 * @apiSuccess {object} data 响应数据
 * @apiSuccess {boolean} data.result 更新结果 true-成功 false-失败
 * @apiSuccessExample {json} Success-Response
 *      HTTP/1.1 200 ok
 *      {
 *          code: 0,
 *          msg: 'success',
 *          data: {
 *              result: true
 *          }
 *      }
 */
router.put('/:id', (req, res) => {
    const api = utils.buildApi(req, apiCodes.PUT_ONE_EXAMPLE);
    const id = +req.params.id;
    const result = exampleService.putOneExample(id, req.body);
    return res.json(utils.buildResponse(resCodes.SUCCESS, 'success', { result }, api));
});

/**
 * @api {POST} /examples 新增样例
 * @apiVersion 1.0.0
 * @apiGroup Example
 * @apiName PostExamples
 * @apiParam {string} name 样例名称
 * @apiParam {number} age 样例年龄
 * @apiParamExample {json} 请求样例
 *      {
 *          name: 'wangwu',
 *          age: 18
 *      }
 * @apiSuccess {number} code 响应值
 * @apiSuccess {string} msg 响应描述
 * @apiSuccess {object} data 响应数据
 * @apiSuccess {number} data.id 新增数据id
 * @apiSuccessExample {json} Success-Response
 *      HTTP/1.1 200 ok
 *      {
 *          code: 0,
 *          msg: 'success',
 *          data: {
 *              id: 1
 *          }
 *      }
 */
router.post('/', (req, res) => {
    const api = utils.buildApi(req, apiCodes.POST_EXAMPLES);
    const id = exampleService.postOneExample(req.body);
    return res.json(utils.buildResponse(resCodes.SUCCESS, 'success', { id }, api));
});

/**
 * @api {DELETE} /examples/:id 删除某个样例
 * @apiVersion 1.0.0
 * @apiGroup Example
 * @apiName DeleteOneExample
 * @apiParam {number} id 样例id
 * @apiSuccess {number} code 响应值
 * @apiSuccess {string} msg 响应描述
 * @apiSuccess {object} data 响应数据
 * @apiSuccess {boolean} data.result true-删除成功 false-删除失败
 * @apiSuccessExample {json} Success-Response
 *      HTTP/1.1 200 ok
 *      {
 *          code: 0,
 *          msg: 'success',
 *          data: {
 *              result: true
 *          }
 *      }
 */
router.delete('/:id', (req, res) => {
    const api = utils.buildApi(req, apiCodes.DELETE_ONE_EXAMPLE);
    const id = +req.params.id;
    const result = exampleService.deleteOneExample(id);
    return res.json(utils.buildResponse(resCodes.SUCCESS, 'success', result, api));
});