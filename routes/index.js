const router = require('express').Router();

// router.use('/', (req, res)=>{
//     res.send("Welcome to Madrid Ontiveros Family Tree API");
// });
router.use('/', require('./swagger'));
router.use('/relatives', require('./relatives'));

module.exports = router;