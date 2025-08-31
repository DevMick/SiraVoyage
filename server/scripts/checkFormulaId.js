const db = require('../config/database');

db.all(`
    SELECT id, formula_name, trip_type, departure_city, arrival_date, departure_date, price, month
    FROM formulas
    ORDER BY id DESC
`, [], (err, rows) => {
    if (err) {
        console.error('Erreur lors de la recherche:', err);
        process.exit(1);
    }

    if (rows && rows.length > 0) {
        console.log('Formules trouvées:');
        rows.forEach(row => {
            console.log('\nID:', row.id);
            console.log('Nom:', row.formula_name);
            console.log('Type:', row.trip_type);
            console.log('Ville de départ:', row.departure_city);
            console.log('Date d\'arrivée:', row.arrival_date);
            console.log('Date de départ:', row.departure_date);
            console.log('Prix:', row.price);
            console.log('Mois:', row.month);
            console.log('------------------------');
        });
    } else {
        console.log('Aucune formule trouvée dans la table');
    }
    process.exit(0);
}); 