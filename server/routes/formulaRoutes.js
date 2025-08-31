const express = require('express');
const router = express.Router();
const formulaController = require('../controllers/formulaController');

// Routes pour les formules
router.get('/', formulaController.getAllFormulas);
router.get('/:id', formulaController.getFormulaById);
router.get('/trip-type/:tripType', formulaController.getFormulasByTripType);
router.post('/', formulaController.createFormula);
router.put('/:id', formulaController.updateFormula);
router.delete('/:id', formulaController.deleteFormula);

module.exports = router; 