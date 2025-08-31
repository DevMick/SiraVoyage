const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

// Configuration de sécurité avec Helmet
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://unpkg.com", "https://cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"]
        }
    }
}));

// Compression GZIP
app.use(compression());

// CORS configuration
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? ['https://omrahajjabidjan.com', 'https://www.omrahajjabidjan.com']
        : true,
    credentials: true
}));

// Middleware pour parser le JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir les fichiers statiques avec cache optimisé
app.use(express.static('public', {
    maxAge: process.env.NODE_ENV === 'production' ? '1y' : '0',
    etag: true,
    lastModified: true,
    setHeaders: (res, path) => {
        if (path.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache');
        }
    }
}));

// Routes API
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route pour la page de détails des formules
app.get('/formula-details', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'formula-details.html'));
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Gestion des erreurs serveur
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).sendFile(path.join(__dirname, 'public', '500.html'));
});

// Démarrage du serveur
// Configuration du port et démarrage du serveur
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// Gestion gracieuse de l'arrêt du serveur
process.on('SIGTERM', () => {
    console.log('SIGTERM reçu, arrêt gracieux du serveur...');
    server.close(() => {
        console.log('Serveur fermé.');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT reçu, arrêt gracieux du serveur...');
    server.close(() => {
        console.log('Serveur fermé.');
        process.exit(0);
    });
});

const server = app.listen(PORT, HOST, () => {
    console.log(`🚀 Serveur SiraVoyage démarré sur ${HOST}:${PORT}`);
    console.log(`📱 Mode: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 Site: ${process.env.SITE_URL || `http://${HOST}:${PORT}`}`);
});