const Program = require('../models/Program');

exports.getAllPrograms = async (req, res) => {
    try {
        const programs = await Program.getAll();
        res.json(programs);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des programmes', error: error.message });
    }
};

exports.getProgramById = async (req, res) => {
    try {
        const program = await Program.getById(req.params.id);
        if (!program) {
            return res.status(404).json({ message: 'Programme non trouvé' });
        }
        res.json(program);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du programme', error: error.message });
    }
};

exports.getProgramsByFormulaId = async (req, res) => {
    try {
        const programs = await Program.getByFormulaId(req.params.formulaId);
        if (!programs || programs.length === 0) {
            return res.status(404).json({ message: 'Aucun programme trouvé pour cette formule' });
        }
        res.json(programs);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des programmes', error: error.message });
    }
};

exports.createProgram = async (req, res) => {
    try {
        const programId = await Program.create(req.body);
        res.status(201).json({ id: programId, message: 'Programme créé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du programme', error: error.message });
    }
};

exports.updateProgram = async (req, res) => {
    try {
        const result = await Program.update(req.params.id, req.body);
        if (result === 0) {
            return res.status(404).json({ message: 'Programme non trouvé' });
        }
        res.json({ message: 'Programme mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du programme', error: error.message });
    }
};

exports.deleteProgram = async (req, res) => {
    try {
        const result = await Program.delete(req.params.id);
        if (result === 0) {
            return res.status(404).json({ message: 'Programme non trouvé' });
        }
        res.json({ message: 'Programme supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du programme', error: error.message });
    }
}; 