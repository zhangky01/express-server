'use strict';
/**
 * 自动加载当前目录下所有版本模块
 * 一般不用关注和修改
 */
const fs = require('fs');
const apiCodes = require('../lib/api-code');
const resCodes = require('../lib/response-code');
const utils = require('../lib/utils');

function initRouter(app) {
    const routesPath = __dirname;

    const stat = fs.statSync(routesPath);
    if (!stat.isDirectory()) throw new Error(`isn't a dir in ${routesPath}`);
    const versions = fs.readdirSync(routesPath).filter(fileName => fileName !== 'index.js');
    if (utils.isEmpty(versions)) throw new Error(`haven't version in ${routesPath}`);
    
    // api health check
    app.get('/health', (req, res, next) => {
        const api = utils.buildApi(req, apiCodes.HEALTH_CHECK);
        return res.json(utils.buildResponse(resCodes.SUCCESS, 'ok', null, api));
    });

    versions.forEach(version => {
        const { routers } = require(`./${version}`);
        routers.forEach(({ prefix, router }) => {
            app.use(prefix, router);
        });
    });
    
    // api path isn't match
    app.use((req, res, next) => {
        res.status = 404;
        res.json(utils.buildResponse(404, 'Not Found', null, utils.buildApi(req, apiCodes.FOUR_ZERO_FOUR)));
    });
}

exports.initRouter = initRouter;