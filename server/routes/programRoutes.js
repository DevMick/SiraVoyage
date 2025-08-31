const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');

// Routes pour les programmes
router.get('/', programController.getAllPrograms);
router.get('/:id', programController.getProgramById);
router.get('/formula/:formulaId', programController.getProgramsByFormulaId);
router.post('/', programController.createProgram);
router.put('/:id', programController.updateProgram);
router.delete('/:id', programController.deleteProgram);

module.exports = router; 