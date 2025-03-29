const express = require('express');
const router = express.Router();
const {createValidationRules, validation} = require('../utils/templeValidations.js');
const templeController = require('../controllers/temples');
const {isAuthenticated} = require('../middleware/authenticate');


router.get('/', templeController.getAll);
router.get('/:id', templeController.getSingle);

router.put('/:id', isAuthenticated,createValidationRules(), validation, templeController.updateTemple);
router.post('/', isAuthenticated, createValidationRules(), validation, templeController.createTemple);
router.delete('/:id', isAuthenticated, templeController.deleteTemple);


module.exports = router;