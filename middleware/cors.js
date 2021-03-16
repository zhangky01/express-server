'use strcit';
const utils = require('../lib/utils');
/**
 * 跨域中间接
 * @param {object} option - 配置文件
 * @param {array} option.hostnames - [必填]允许跨域访问的hostname
 * @returns {(req, res, next)}
 */
function cors(option = {}) {
    if (!utils.exist(option.hostnames)) {
        option.hostnames = [];
    }
    const { hostnames } = option;

    return (req, res, next) => {
        const reqOrigin = req.headers.origin;
        if (hostnames.some(hostname => reqOrigin.indexOf(hostname) !== -1)) {
            res.header('Access-Control-Allow-Origin', reqOrigin);
            res.header('Access-Control-Allow-Credentials', true);
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,PATCH,OPTIONS');
        }
        return next();
    };
}
module.exports = cors;