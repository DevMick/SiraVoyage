// Endpoint pour récupérer les détails d'une formule spécifique
app.get('/api/formulas/:id', async (req, res) => {
    try {
        const formulaId = req.params.id;
        
        // Récupérer la formule depuis la base de données
        const formula = await Formula.findById(formulaId);
        
        if (!formula) {
            return res.status(404).json({ error: 'Formule non trouvée' });
        }

        // Formater les données pour la réponse
        const formattedFormula = {
            id: formula._id,
            tripType: formula.tripType,
            departureCity: formula.departureCity,
            departureDate: formula.departureDate,
            returnDate: formula.returnDate,
            duration: formula.duration,
            medinaNights: formula.medinaNights,
            makkahNights: formula.makkahNights,
            medinaHotel: formula.medinaHotel,
            makkahHotel: formula.makkahHotel,
            airlineLogo: formula.airlineLogo,
            images: formula.images,
            rates: {
                individual: formula.rates.individual,
                double: formula.rates.double,
                triple: formula.rates.triple,
                quadruple: formula.rates.quadruple,
                baby: formula.rates.baby,
                childDiscount: formula.rates.childDiscount
            }
        };

        res.json(formattedFormula);
    } catch (error) {
        console.error('Erreur lors de la récupération des détails de la formule:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Endpoint pour récupérer les vols d'une formule
app.get('/api/formulas/:id/flights', async (req, res) => {
    try {
        const formulaId = req.params.id;
        
        // Récupérer les vols associés à la formule
        const flights = await Flight.find({ formulaId }).sort({ segment: 1 });
        
        if (!flights || flights.length === 0) {
            return res.status(404).json({ error: 'Aucun vol trouvé pour cette formule' });
        }

        res.json(flights);
    } catch (error) {
        console.error('Erreur lors de la récupération des vols:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}); 