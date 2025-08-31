const db = require('../config/database');

// Suppression des tables existantes si elles existent
db.run(`
    DROP TABLE IF EXISTS flight_segments;
    DROP TABLE IF EXISTS flights;
`, [], (err) => {
    if (err) {
        console.error('Erreur lors de la suppression des tables:', err);
        process.exit(1);
    }

    // Création de la table flights
    db.run(`
        CREATE TABLE flights (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            formula_id INTEGER NOT NULL,
            flight_number TEXT NOT NULL,
            airline TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (formula_id) REFERENCES formulas(id)
        )
    `, [], (err) => {
        if (err) {
            console.error('Erreur lors de la création de la table flights:', err);
            process.exit(1);
        }

        // Création de la table flight_segments
        db.run(`
            CREATE TABLE flight_segments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                flight_id INTEGER NOT NULL,
                segment_number INTEGER NOT NULL CHECK (segment_number BETWEEN 1 AND 3),
                departure_date TEXT NOT NULL,
                arrival_date TEXT NOT NULL,
                departure_airport TEXT NOT NULL,
                arrival_airport TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (flight_id) REFERENCES flights(id),
                UNIQUE(flight_id, segment_number)
            )
        `, [], (err) => {
            if (err) {
                console.error('Erreur lors de la création de la table flight_segments:', err);
                process.exit(1);
            }

            console.log('Tables créées avec succès');

            // Insertion des données de test
            const testData = [
                {
                    formula_id: 1,
                    flight_number: 'SV123',
                    airline: 'Saudi Airlines',
                    segments: [
                        {
                            segment_number: 1,
                            departure_date: '2024-04-05',
                            arrival_date: '2024-04-05',
                            departure_airport: 'CDG',
                            arrival_airport: 'IST'
                        },
                        {
                            segment_number: 2,
                            departure_date: '2024-04-05',
                            arrival_date: '2024-04-05',
                            departure_airport: 'IST',
                            arrival_airport: 'JED'
                        }
                    ]
                },
                {
                    formula_id: 1,
                    flight_number: 'SV124',
                    airline: 'Saudi Airlines',
                    segments: [
                        {
                            segment_number: 1,
                            departure_date: '2024-04-15',
                            arrival_date: '2024-04-15',
                            departure_airport: 'JED',
                            arrival_airport: 'IST'
                        },
                        {
                            segment_number: 2,
                            departure_date: '2024-04-15',
                            arrival_date: '2024-04-15',
                            departure_airport: 'IST',
                            arrival_airport: 'CDG'
                        }
                    ]
                }
            ];

            // Insertion des données de test
            testData.forEach(data => {
                db.run(`
                    INSERT INTO flights (formula_id, flight_number, airline)
                    VALUES (?, ?, ?)
                `, [data.formula_id, data.flight_number, data.airline], function(err) {
                    if (err) {
                        console.error('Erreur lors de l\'insertion du vol:', err);
                        return;
                    }

                    const flight_id = this.lastID;

                    // Insertion des segments
                    data.segments.forEach(segment => {
                        db.run(`
                            INSERT INTO flight_segments (
                                flight_id, segment_number, departure_date,
                                arrival_date, departure_airport, arrival_airport
                            ) VALUES (?, ?, ?, ?, ?, ?)
                        `, [
                            flight_id,
                            segment.segment_number,
                            segment.departure_date,
                            segment.arrival_date,
                            segment.departure_airport,
                            segment.arrival_airport
                        ], (err) => {
                            if (err) {
                                console.error('Erreur lors de l\'insertion du segment:', err);
                            }
                        });
                    });
                });
            });

            console.log('Données de test insérées avec succès');
            process.exit(0);
        });
    });
}); 