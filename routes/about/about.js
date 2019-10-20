const express = require('express');
const router = express.Router();

// const db = require('../../api/db-config');

router.get('/', (req, res) => {
    res.json({ test: ["The","app","works"]})
});

module.exports = router;