const express = require('express');
const router = express.Router();


router.get('/', (req, res)=>{
   res.send( "Hello relatives");
});


module.exports = router;