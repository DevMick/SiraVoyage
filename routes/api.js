const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// Chemin vers le fichier de données
const formulasPath = path.join(__dirname, '../data/formulas.json');

// Route pour obtenir toutes les formules
router.get('/formulas', async (req, res) => {
    try {
        const data = await fs.readFile(formulasPath, 'utf8');
        const { formulas } = JSON.parse(data);
        res.json(formulas);
    } catch (error) {
        console.error('Erreur lors de la lecture des formules:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Route pour obtenir une formule spécifique par ID
router.get('/formulas/:id', async (req, res) => {
    try {
        const data = await fs.readFile(formulasPath, 'utf8');
        const { formulas } = JSON.parse(data);
        const formula = formulas.find(f => f.id === req.params.id);

        if (!formula) {
            return res.status(404).json({ error: 'Formule non trouvée' });
        }

        res.json(formula);
    } catch (error) {
        console.error('Erreur lors de la lecture de la formule:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Route pour obtenir les formules par type de voyage
router.get('/formulas/type/:type', async (req, res) => {
    try {
        const data = await fs.readFile(formulasPath, 'utf8');
        const { formulas } = JSON.parse(data);
        const filteredFormulas = formulas.filter(f => f.tripType.toLowerCase() === req.params.type.toLowerCase());

        res.json(filteredFormulas);
    } catch (error) {
        console.error('Erreur lors du filtrage des formules:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Route pour obtenir les formules par ville de départ
router.get('/formulas/departure/:city', async (req, res) => {
    try {
        const data = await fs.readFile(formulasPath, 'utf8');
        const { formulas } = JSON.parse(data);
        const filteredFormulas = formulas.filter(f => 
            f.departureCity.toLowerCase() === req.params.city.toLowerCase()
        );

        res.json(filteredFormulas);
    } catch (error) {
        console.error('Erreur lors du filtrage des formules:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Route pour obtenir les formules par date de départ
router.get('/formulas/departure-date/:date', async (req, res) => {
    try {
        const data = await fs.readFile(formulasPath, 'utf8');
        const { formulas } = JSON.parse(data);
        const filteredFormulas = formulas.filter(f => f.departureDate === req.params.date);

        res.json(filteredFormulas);
    } catch (error) {
        console.error('Erreur lors du filtrage des formules:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Route pour obtenir les formules par fourchette de prix
router.get('/formulas/price-range', async (req, res) => {
    try {
        const { min, max } = req.query;
        const data = await fs.readFile(formulasPath, 'utf8');
        const { formulas } = JSON.parse(data);
        const filteredFormulas = formulas.filter(f => 
            f.price >= parseInt(min) && f.price <= parseInt(max)
        );

        res.json(filteredFormulas);
    } catch (error) {
        console.error('Erreur lors du filtrage des formules:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router; 