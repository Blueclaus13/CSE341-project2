const router = require('express').Router();

// router.use('/', (req, res)=>{
//     res.send("Welcome to Madrid Ontiveros Family Tree API");
// });
router.use('/relatives', require('./relatives'));

module.exports = router;