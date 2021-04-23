'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const cors = require('./middleware/cors');
const app = express();
const logger = require('./lib/logger');
const FULL_LOG = process.env.FULL_LOG === 'on';

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use((req, res, next) => {
    if (FULL_LOG) {
        req.seq = Math.random() * 1000 | 0;
        logger.info(`[${req.seq}]${req.method} ${req.url} from ${req.ip} with query ${JSON.stringify(req.query)} and body ${JSON.stringify(req.body)}`);
    }
    res.header('X-Powered-By', '4.16.1');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

router.initRouter(app);

module.exports = app;