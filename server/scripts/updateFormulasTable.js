const db = require('../config/database');

// Suppression de la table existante si elle existe
db.run(`
    DROP TABLE IF EXISTS formulas
`, [], (err) => {
    if (err) {
        console.error('Erreur lors de la suppression de la table:', err);
        process.exit(1);
    }

    // Création de la nouvelle table avec les bonnes propriétés
    db.run(`
        CREATE TABLE formulas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            trip_type TEXT NOT NULL,
            departure_city TEXT NOT NULL,
            arrival_date TEXT NOT NULL,
            departure_date TEXT NOT NULL,
            formula_name TEXT NOT NULL,
            duration INTEGER NOT NULL,
            price DECIMAL(10,2) NOT NULL DEFAULT 0,
            month TEXT NOT NULL
        )
    `, [], (err) => {
        if (err) {
            console.error('Erreur lors de la création de la table:', err);
            process.exit(1);
        }

        console.log('Table formulas créée avec succès');

        // Insertion des données de test
        const testData = {
            trip_type: 'Omra',
            departure_city: 'Paris',
            arrival_date: '2024-04-05',
            departure_date: '2024-04-15',
            formula_name: 'Omra Essentielle',
            duration: 10,
            price: 1990.00,
            month: '04'
        };

        db.run(`
            INSERT INTO formulas (
                trip_type, departure_city, arrival_date, departure_date,
                formula_name, duration, price, month
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            testData.trip_type,
            testData.departure_city,
            testData.arrival_date,
            testData.departure_date,
            testData.formula_name,
            testData.duration,
            testData.price,
            testData.month
        ], (err) => {
            if (err) {
                console.error('Erreur lors de l\'insertion des données:', err);
                process.exit(1);
            }

            console.log('Données de test insérées avec succès');
            process.exit(0);
        });
    });
}); 