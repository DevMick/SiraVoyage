const db = require('../config/database');

db.get("SELECT sql FROM sqlite_master WHERE type='table' AND name='programs'", [], (err, row) => {
    if (err) {
        console.error('Erreur lors de la récupération du schéma:', err);
        process.exit(1);
    }
    console.log('Structure de la table programs:');
    console.log(row.sql);
    process.exit(0);
}); 