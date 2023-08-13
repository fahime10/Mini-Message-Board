const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('form', { title: 'Create a message' });
});

module.exports = router;
