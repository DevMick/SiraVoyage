const Flight = require('../models/Flight');

exports.getAllFlights = async (req, res) => {
    try {
        const flights = await Flight.getAll();
        res.json(flights);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des vols', error: error.message });
    }
};

exports.getFlightById = async (req, res) => {
    try {
        const flight = await Flight.getById(req.params.id);
        if (!flight) {
            return res.status(404).json({ message: 'Vol non trouvé' });
        }
        res.json(flight);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du vol', error: error.message });
    }
};

exports.getFlightsByFormulaId = async (req, res) => {
    try {
        const flights = await Flight.getByFormulaId(req.params.formulaId);
        res.json(flights);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des vols', error: error.message });
    }
};

exports.createFlight = async (req, res) => {
    try {
        const flightId = await Flight.create(req.body);
        res.status(201).json({ id: flightId, message: 'Vol créé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du vol', error: error.message });
    }
};

exports.updateFlight = async (req, res) => {
    try {
        const result = await Flight.update(req.params.id, req.body);
        if (result === 0) {
            return res.status(404).json({ message: 'Vol non trouvé' });
        }
        res.json({ message: 'Vol mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du vol', error: error.message });
    }
};

exports.deleteFlight = async (req, res) => {
    try {
        const result = await Flight.delete(req.params.id);
        if (result === 0) {
            return res.status(404).json({ message: 'Vol non trouvé' });
        }
        res.json({ message: 'Vol supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du vol', error: error.message });
    }
}; 