const db = require('../config/database');

db.all(`
    SELECT id, formula_name, trip_type 
    FROM formulas 
    ORDER BY id
`, [], (err, rows) => {
    if (err) {
        console.error('Erreur lors de la récupération des IDs:', err);
        process.exit(1);
    }

    console.log('IDs présents dans la table formulas:');
    console.log('-----------------------------------');
    rows.forEach(row => {
        console.log(`ID: ${row.id} - Nom: ${row.formula_name} - Type: ${row.trip_type}`);
    });
    process.exit(0);
}); 