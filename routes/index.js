const express = require('express');
const router = express.Router();

const postRoutes = require('./post')

router.use('/posts', postRoutes);
router.use('/', require('./auth'));

module.exports = router;