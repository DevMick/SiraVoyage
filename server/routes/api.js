// Route pour récupérer les détails d'une formule spécifique
router.get('/formulas/:id', async (req, res) => {
    try {
        const formulaId = req.params.id;
        const formula = await Formula.findByPk(formulaId);
        
        if (!formula) {
            return res.status(404).json({ error: 'Formule non trouvée' });
        }

        res.json(formula);
    } catch (error) {
        console.error('Erreur lors de la récupération des détails de la formule:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}); 