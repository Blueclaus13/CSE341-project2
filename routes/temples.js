const express = require('express');
const router = express.Router();
const {createValidationRules, validation} = require('../utils/templeValidations.js');
const templeController = require('../controllers/temples');


router.get('/', templeController.getAll);
router.get('/:id', templeController.getSingle);

router.put('/:id',createValidationRules(), validation, templeController.updateTemple);
router.post('/', createValidationRules(), validation, templeController.createTemple);
router.delete('/:id', templeController.deleteTemple);


module.exports = router;