const express = require('express');

const authRouter = require('./auth');

const router = new express.Router();


router.use('/auth', authRouter);
