const Formula = require('../models/Formula');

exports.getAllFormulas = async (req, res) => {
    try {
        const formulas = await Formula.getAll();
        res.json(formulas);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des formules', error: error.message });
    }
};

exports.getFormulaById = async (req, res) => {
    try {
        const formula = await Formula.getById(req.params.id);
        if (!formula) {
            return res.status(404).json({ message: 'Formule non trouvée' });
        }
        res.json(formula);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la formule', error: error.message });
    }
};

exports.getFormulasByTripType = async (req, res) => {
    try {
        const formulas = await Formula.getByTripType(req.params.tripType);
        res.json(formulas);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des formules', error: error.message });
    }
};

exports.createFormula = async (req, res) => {
    try {
        const formulaId = await Formula.create(req.body);
        res.status(201).json({ id: formulaId, message: 'Formule créée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la formule', error: error.message });
    }
};

exports.updateFormula = async (req, res) => {
    try {
        const result = await Formula.update(req.params.id, req.body);
        if (result === 0) {
            return res.status(404).json({ message: 'Formule non trouvée' });
        }
        res.json({ message: 'Formule mise à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la formule', error: error.message });
    }
};

exports.deleteFormula = async (req, res) => {
    try {
        const result = await Formula.delete(req.params.id);
        if (result === 0) {
            return res.status(404).json({ message: 'Formule non trouvée' });
        }
        res.json({ message: 'Formule supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la formule', error: error.message });
    }
}; 