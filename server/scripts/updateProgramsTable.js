const db = require('../config/database');

// Suppression de la table existante si elle existe
db.run(`
    DROP TABLE IF EXISTS programs
`, [], (err) => {
    if (err) {
        console.error('Erreur lors de la suppression de la table:', err);
        process.exit(1);
    }

    // Création de la nouvelle table avec les bonnes propriétés
    db.run(`
        CREATE TABLE programs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            formula_id INTEGER NOT NULL,
            day_number INTEGER NOT NULL,
            date TEXT NOT NULL,
            description TEXT NOT NULL,
            label TEXT NOT NULL,
            duration INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (formula_id) REFERENCES formulas(id)
        )
    `, [], (err) => {
        if (err) {
            console.error('Erreur lors de la création de la table:', err);
            process.exit(1);
        }

        console.log('Table programs créée avec succès');

        // Insertion des données de test
        const testData = [
            {
                formula_id: 1,
                day_number: 1,
                date: '2024-04-05',
                description: 'Arrivée à Madinah et installation à l\'hôtel',
                label: 'Arrivée',
                duration: 2
            },
            {
                formula_id: 1,
                day_number: 2,
                date: '2024-04-06',
                description: 'Visite de la Mosquée du Prophète et des sites historiques',
                label: 'Visite',
                duration: 6
            },
            {
                formula_id: 1,
                day_number: 3,
                date: '2024-04-07',
                description: 'Départ pour La Mecque et Omra',
                label: 'Transfert',
                duration: 8
            },
            {
                formula_id: 1,
                day_number: 4,
                date: '2024-04-08',
                description: 'Visite de la Grande Mosquée et Tawaf',
                label: 'Rituel',
                duration: 4
            },
            {
                formula_id: 1,
                day_number: 5,
                date: '2024-04-09',
                description: 'Sa\'i entre Safa et Marwa',
                label: 'Rituel',
                duration: 3
            }
        ];

        // Insertion des données de test
        testData.forEach(data => {
            db.run(`
                INSERT INTO programs (
                    formula_id, day_number, date, description,
                    label, duration
                ) VALUES (?, ?, ?, ?, ?, ?)
            `, [
                data.formula_id,
                data.day_number,
                data.date,
                data.description,
                data.label,
                data.duration
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