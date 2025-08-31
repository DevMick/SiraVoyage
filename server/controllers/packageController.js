const Package = require('../models/Package');

exports.getAllPackages = async (req, res) => {
    try {
        const packages = await Package.getAll();
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des forfaits', error: error.message });
    }
};

exports.getPackageById = async (req, res) => {
    try {
        const package = await Package.getById(req.params.id);
        if (!package) {
            return res.status(404).json({ message: 'Forfait non trouvé' });
        }
        res.json(package);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du forfait', error: error.message });
    }
};

exports.createPackage = async (req, res) => {
    try {
        const packageId = await Package.create(req.body);
        res.status(201).json({ id: packageId, message: 'Forfait créé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du forfait', error: error.message });
    }
};

exports.updatePackage = async (req, res) => {
    try {
        const result = await Package.update(req.params.id, req.body);
        if (result === 0) {
            return res.status(404).json({ message: 'Forfait non trouvé' });
        }
        res.json({ message: 'Forfait mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du forfait', error: error.message });
    }
};

exports.deletePackage = async (req, res) => {
    try {
        const result = await Package.delete(req.params.id);
        if (result === 0) {
            return res.status(404).json({ message: 'Forfait non trouvé' });
        }
        res.json({ message: 'Forfait supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du forfait', error: error.message });
    }
}; 