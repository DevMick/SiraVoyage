const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes API
const packageRoutes = require('./routes/packageRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const formulaRoutes = require('./routes/formulaRoutes');
const flightRoutes = require('./routes/flightRoutes');
const programRoutes = require('./routes/programRoutes');

app.use('/api/packages', packageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/formulas', formulaRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/programs', programRoutes);

// Servir les fichiers statiques du frontend
app.use(express.static(path.join(__dirname, '../public')));

// Route de base (doit être la dernière route)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Une erreur est survenue sur le serveur',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Mode: ${process.env.NODE_ENV || 'development'}`);
}); 