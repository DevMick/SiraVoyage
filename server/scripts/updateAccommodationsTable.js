const db = require('../config/database');

// Suppression de la table existante si elle existe
db.run(`
    DROP TABLE IF EXISTS accommodations
`, [], (err) => {
    if (err) {
        console.error('Erreur lors de la suppression de la table:', err);
        process.exit(1);
    }

    // Création de la nouvelle table avec les bonnes propriétés
    db.run(`
        CREATE TABLE accommodations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            formula_id INTEGER NOT NULL,
            city TEXT NOT NULL CHECK (city IN ('Makkah', 'Madinah')),
            hotel_id INTEGER NOT NULL,
            distance_to_holy_sites DECIMAL(5,2) NOT NULL,
            travel_duration INTEGER NOT NULL,
            check_in_date TEXT NOT NULL,
            check_out_date TEXT NOT NULL,
            stay_duration INTEGER NOT NULL,
            board_type TEXT NOT NULL CHECK (board_type IN ('Half Board', 'Full Board')),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (formula_id) REFERENCES formulas(id),
            FOREIGN KEY (hotel_id) REFERENCES hotels(id)
        )
    `, [], (err) => {
        if (err) {
            console.error('Erreur lors de la création de la table:', err);
            process.exit(1);
        }

        console.log('Table accommodations créée avec succès');

        // Insertion des données de test
        const testData = [
            {
                formula_id: 1,
                city: 'Makkah',
                hotel_id: 1,
                distance_to_holy_sites: 0.2,
                travel_duration: 5,
                check_in_date: '2024-04-05',
                check_out_date: '2024-04-10',
                stay_duration: 5,
                board_type: 'Half Board'
            },
            {
                formula_id: 1,
                city: 'Madinah',
                hotel_id: 2,
                distance_to_holy_sites: 0.5,
                travel_duration: 10,
                check_in_date: '2024-04-10',
                check_out_date: '2024-04-15',
                stay_duration: 5,
                board_type: 'Full Board'
            }
        ];

        // Insertion des données de test
        testData.forEach(data => {
            db.run(`
                INSERT INTO accommodations (
                    formula_id, city, hotel_id, distance_to_holy_sites,
                    travel_duration, check_in_date, check_out_date,
                    stay_duration, board_type
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [
                data.formula_id,
                data.city,
                data.hotel_id,
                data.distance_to_holy_sites,
                data.travel_duration,
                data.check_in_date,
                data.check_out_date,
                data.stay_duration,
                data.board_type
            ], (err) => {
                if (err) {
                    console.error('Erreur lors de l\'insertion des données:', err);
                }
            });
        });

        console.log('Données de test insérées avec succès');
        process.exit(0);
    });
}); 