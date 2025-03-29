const passport = require('passport');

const router = require('express').Router();

// router.use('/', (req, res)=>{
//     res.send("Welcome to Madrid Ontiveros Family Tree API");
// });
router.use('/', require('./swagger'));
router.use('/relatives', require('./relatives'));
router.use('/temples', require('./temples') );

router.get('/login', passport.authenticate('github'), (req, res)=>{});
router.get('/logout', function(req, res, next){
    req.logout(function(err){
        if(err){return next(err);}
        res.redirect('/');
    });
});

module.exports = router;