'use strict';
/**
 * 自动加载当前版本下的所有功能模块API
 * 一般不用关注和修改
 */
const fs = require('fs');
const utils = require('../../lib/utils');

/** 当前API版本 */
const version = '/v1';

const versionPath = __dirname;

const versionStat = fs.statSync(versionPath);
if (!versionStat.isDirectory()) throw new Error(`isn't a dir in ${versionPath}`);

const modules = fs.readdirSync(versionPath).filter(fileName => fileName !== 'index.js');
if (utils.isEmpty(modules)) throw new Error(`haven't route_module in ${versionPath}`);

const routers = modules.map(module => {
    const { prefix, router } = require(`./${module}`);
    return { prefix: version + prefix, router: router };
});

module.exports = {
    routers: routers
}