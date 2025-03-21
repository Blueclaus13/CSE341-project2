const router = require('express').Router();

router.use('/relatives', require('./relatives'));

module.exports = router;