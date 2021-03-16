const readline = require('readline');
const path = require('path');
const fs = require('fs');
const util = require('util');
const utils = require('./lib/utils');
const readDir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const unlink = util.promisify(fs.unlink);
const stat = util.promisify(fs.stat);
const rmDir = util.promisify(fs.rmdir);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const oldApp = `"name": "express-server"`;
const oldPort = `"port": 8080`;
const oldLog = `filename: 'logs/express-server.log'`;

async function main() {
    /** 获取输入值 */
    const app = await getInput('请输入项目名称(express-server): ', 'express-server');
    const port = await getInput('请输入端口号(8080): ', '8080');
    const deleteExample =  await getInput('是否删除功能示例(/routes/v1/examples/)Y or N?：', 'N');
    rl.close();

    /** 输入值替换config(环境配置)属性 */
    const configDirPath = path.resolve(__dirname, './config');
    const configFileNames = await readDir(configDirPath);
    await Promise.all(configFileNames.map(async configFileName => {
        const configFilePath = configDirPath + '/' + configFileName;
        let configFile = await readFile(configFilePath, { encoding: 'utf8' });
        const newApp = `"name": "${app}"`;
        const newPort = `"port": ${port}`;
        configFile = configFile.replace(oldApp, newApp);
        configFile = configFile.replace(oldPort, newPort);
        return await writeFile(configFilePath, configFile);
    }));

    /** 输入值替换log名称 */
    const logFilePath = path.resolve(__dirname, './lib/logger.js');
    let logFile = await readFile(logFilePath, { encoding: 'utf8' });
    const newLog = `filename: 'logs/${app}.log'`;
    logFile = logFile.replace(oldLog, newLog);
    await writeFile(logFilePath, logFile);

    /** 删除示例 */
    if (deleteExample === 'Y') {
        await removeDir(path.resolve(__dirname, './routes/v1/examples'));
    }

    /** 删除.git目录 */
    await removeDir(path.resolve(__dirname, './.git'));

    /** 删除初始化文件 */
    await unlink(path.resolve(__dirname, './init.js'));
}

/** 获取用户输入的数据 */
function getInput(question, defaultValue) {
    return new Promise((resolve, reject) => {
        rl.question(question, input => {
            resolve(utils.isEmpty(input) ? defaultValue : input);
        });
    });
}

/** 删除指定目录和目录下所有数据 */
async function removeDir(dirPath) {
    let filePaths = [], dirPaths = [];

    await _find(dirPath);
    dirPaths.push(dirPath);

    await Promise.all(filePaths.map(async filePath => {
        return await unlink(filePath);
    }));

    for (let dirPath of dirPaths) {
        await rmDir(dirPath);
    }

    async function _find(dirPath) {
        const fileNames = await readDir(dirPath);
        return Promise.all(fileNames.map(async fileName => {
            const filePath = dirPath + '/' + fileName;
            const fileStat = await stat(filePath);
            if (fileStat.isDirectory()) {
                await _find(filePath);
                dirPaths.push(filePath);
            } else {
                filePaths.push(filePath);
            }
        }));
    }
}

main().then(() => {
    console.log('初始化 成功！');
}).catch(err => {
    console.log('失败: ' + JSON.stringify(err.stack || err));
});