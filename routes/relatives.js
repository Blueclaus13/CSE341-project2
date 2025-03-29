const express = require('express');
const router = express.Router();
const {createValidationRules, validation} = require('../utils/validations');
const familyTreeController = require('../controllers/relatives');
const {isAuthenticated} = require('../middleware/authenticate');


router.get('/', familyTreeController.getAll);
router.get('/:id', familyTreeController.getSingle);

router.put('/:id', isAuthenticated, createValidationRules(), validation, familyTreeController.updateRelative);
router.post('/', isAuthenticated, createValidationRules(), validation, familyTreeController.createRelative);
router.delete('/:id', isAuthenticated,  familyTreeController.deleteRelative);


module.exports = router;