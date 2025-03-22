const express = require('express');
const router = express.Router();

const familyTreeController = require('../controllers/relatives');


router.get('/', familyTreeController.getAll);
router.get('/:id', familyTreeController.getSingle);

router.put('/:id', familyTreeController.updateRelative);
router.post('/', familyTreeController.createRelative);
router.delete('/:id', familyTreeController.deleteRelative);


module.exports = router;