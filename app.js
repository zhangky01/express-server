'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const cors = require('./middleware/cors');
const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use((req, res, next) => {
    res.header('X-Powered-By', '4.16.1');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

router.initRouter(app);

module.exports = app;