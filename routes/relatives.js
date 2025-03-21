const express = require('express');
const router = express.Router();

const familyTreeController = require('../controllers/relatives');


router.get('/', familyTreeController.getAll);
router.get('/:id', familyTreeController.getSingle);


module.exports = router;