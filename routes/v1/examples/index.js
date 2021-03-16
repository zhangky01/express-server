'use strict';
const router = require('express').Router();
const utils = require('../../../lib/utils');
const apiCodes = require('../../../lib/api-code');
const resCodes = require('../../../lib/response-code');
const exampleService = require('./service');

const prefix = '/examples';
/**
 * example
 * GET /examples
 */
router.get('/', (req, res) => {
    const api = utils.buildApi(req, apiCodes.HEALTH_CHECK);
    const examples = exampleService.getExamples();
    return res.json(utils.buildResponse(resCodes.SUCCESS, 'success', examples, api));
});

module.exports = {
    prefix,
    router,
}