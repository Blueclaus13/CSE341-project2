const express = require('express');
const router = express.Router();
const {createValidationRules, validation} = require('../utils/validations');
const familyTreeController = require('../controllers/relatives');


router.get('/', familyTreeController.getAll);
router.get('/:id', familyTreeController.getSingle);

router.put('/:id',createValidationRules(), validation, familyTreeController.updateRelative);
router.post('/', createValidationRules(), validation, familyTreeController.createRelative);
router.delete('/:id', familyTreeController.deleteRelative);


module.exports = router;