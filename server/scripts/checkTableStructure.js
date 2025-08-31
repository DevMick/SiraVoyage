const db = require('../config/database');

db.all(`
    SELECT sql FROM sqlite_master WHERE type='table' AND name='formulas'
`, [], (err, rows) => {
    if (err) {
        console.error('Erreur lors de la recherche:', err);
        process.exit(1);
    }

    if (rows && rows.length > 0) {
        console.log('Structure de la table formulas:');
        console.log(rows[0].sql);
    } else {
        console.log('La table formulas n\'existe pas');
    }
    process.exit(0);
}); 