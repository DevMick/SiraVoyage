const db = require('../config/database');

// Gestionnaire d'erreurs global
process.on('unhandledRejection', (error) => {
    console.error('Erreur non gérée:', error);
});

// Création de la table programs si elle n'existe pas
function createProgramsTable(callback) {
    db.run(`
        CREATE TABLE IF NOT EXISTS programs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            formula_id INTEGER,
            date TEXT NOT NULL,
            description TEXT NOT NULL,
            label TEXT NOT NULL,
            duration INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (formula_id) REFERENCES formulas(id)
        )
    `, (err) => {
        if (err) {
            console.error('Erreur lors de la création de la table programs:', err);
            callback(err);
        } else {
            console.log('Table programs créée ou déjà existante');
            callback(null);
        }
    });
}

// Données de la formule principale
const formulaData = {
    trip_type: 'Hajj',
    departure_city: 'Paris',
    arrival_date: '2024-06-10',
    departure_date: '2024-06-25',
    formula_name: 'ITHRAA AL KHAIR 119',
    duration: 15,
    madinah_accommodation: 'Pullman Zamzam Madina',
    makkah_accommodation: 'Hilton Suites Makkah',
    price: 5999,
    month: 'June'
};

// Données des vols avec segments
const flightsData = [
    {
        flight_number: 'SV123',
        airline: 'Saudi Airlines',
        segments: [
            {
                segment_number: 1,
                departure_date: '2024-06-10',
                arrival_date: '2024-06-10',
                departure_airport: 'CDG',
                arrival_airport: 'IST'
            },
            {
                segment_number: 2,
                departure_date: '2024-06-10',
                arrival_date: '2024-06-10',
                departure_airport: 'IST',
                arrival_airport: 'JED'
            }
        ]
    },
    {
        flight_number: 'SV124',
        airline: 'Saudi Airlines',
        segments: [
            {
                segment_number: 1,
                departure_date: '2024-06-25',
                arrival_date: '2024-06-25',
                departure_airport: 'JED',
                arrival_airport: 'IST'
            },
            {
                segment_number: 2,
                departure_date: '2024-06-25',
                arrival_date: '2024-06-25',
                departure_airport: 'IST',
                arrival_airport: 'CDG'
            }
        ]
    }
];

// Données des hébergements
const accommodationsData = [
    {
        city: 'Madinah',
        hotel_id: 1,
        distance_to_holy_sites: 0.5,
        travel_duration: 10,
        check_in_date: '2024-06-10',
        check_out_date: '2024-06-15',
        stay_duration: 5,
        board_type: 'Half Board'
    },
    {
        city: 'Makkah',
        hotel_id: 2,
        distance_to_holy_sites: 0.2,
        travel_duration: 5,
        check_in_date: '2024-06-15',
        check_out_date: '2024-06-25',
        stay_duration: 10,
        board_type: 'Full Board'
    }
];

// Données du programme
const programsData = [
    {
        day_number: 1,
        date: '2024-06-10',
        description: 'Arrivée à Madinah et installation à l\'hôtel',
        label: 'Arrivée',
        duration: 2
    },
    {
        day_number: 2,
        date: '2024-06-11',
        description: 'Visite de la Mosquée du Prophète',
        label: 'Visite',
        duration: 6
    },
    {
        day_number: 3,
        date: '2024-06-12',
        description: 'Visite des sites historiques de Madinah',
        label: 'Visite',
        duration: 4
    },
    {
        day_number: 4,
        date: '2024-06-13',
        description: 'Visite de Quba et des mosquées historiques',
        label: 'Visite',
        duration: 4
    },
    {
        day_number: 5,
        date: '2024-06-14',
        description: 'Dernière visite de la Mosquée du Prophète',
        label: 'Visite',
        duration: 4
    },
    {
        day_number: 6,
        date: '2024-06-15',
        description: 'Transfert vers La Mecque',
        label: 'Transfert',
        duration: 8
    },
    {
        day_number: 7,
        date: '2024-06-16',
        description: 'Arrivée à La Mecque et installation',
        label: 'Arrivée',
        duration: 2
    },
    {
        day_number: 8,
        date: '2024-06-17',
        description: 'Visite de la Grande Mosquée',
        label: 'Visite',
        duration: 4
    },
    {
        day_number: 9,
        date: '2024-06-18',
        description: 'Tawaf et Sa\'i',
        label: 'Rituel',
        duration: 6
    },
    {
        day_number: 10,
        date: '2024-06-19',
        description: 'Visite des sites sacrés',
        label: 'Visite',
        duration: 4
    }
];

// Fonction pour insérer la formule principale
function insertFormula() {
    return new Promise((resolve, reject) => {
        db.run(`
            INSERT INTO formulas (
                trip_type, departure_city, arrival_date, departure_date,
                formula_name, duration, price, month
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            formulaData.trip_type,
            formulaData.departure_city,
            formulaData.arrival_date,
            formulaData.departure_date,
            formulaData.formula_name,
            formulaData.duration,
            formulaData.price,
            formulaData.month
        ], function(err) {
            if (err) reject(err);
            else resolve(this.lastID);
        });
    });
}

// Fonction pour insérer les vols et leurs segments
function insertFlights(formulaId) {
    return new Promise((resolve, reject) => {
        let completed = 0;
        flightsData.forEach(flight => {
            db.run(`
                INSERT INTO flights (formula_id, flight_number, airline)
                VALUES (?, ?, ?)
            `, [formulaId, flight.flight_number, flight.airline], function(err) {
                if (err) {
                    reject(err);
                    return;
                }

                const flightId = this.lastID;
                let segmentsCompleted = 0;

                flight.segments.forEach(segment => {
                    db.run(`
                        INSERT INTO flight_segments (
                            flight_id, segment_number, departure_date,
                            arrival_date, departure_airport, arrival_airport
                        ) VALUES (?, ?, ?, ?, ?, ?)
                    `, [
                        flightId,
                        segment.segment_number,
                        segment.departure_date,
                        segment.arrival_date,
                        segment.departure_airport,
                        segment.arrival_airport
                    ], (err) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        segmentsCompleted++;
                        if (segmentsCompleted === flight.segments.length) {
                            completed++;
                            if (completed === flightsData.length) {
                                resolve();
                            }
                        }
                    });
                });
            });
        });
    });
}

// Fonction pour insérer les hébergements
function insertAccommodations(formulaId) {
    return new Promise((resolve, reject) => {
        let completed = 0;
        accommodationsData.forEach(accommodation => {
            db.run(`
                INSERT INTO accommodations (
                    formula_id, city, hotel_id, distance_to_holy_sites,
                    travel_duration, check_in_date, check_out_date,
                    stay_duration, board_type
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [
                formulaId,
                accommodation.city,
                accommodation.hotel_id,
                accommodation.distance_to_holy_sites,
                accommodation.travel_duration,
                accommodation.check_in_date,
                accommodation.check_out_date,
                accommodation.stay_duration,
                accommodation.board_type
            ], (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                completed++;
                if (completed === accommodationsData.length) {
                    resolve();
                }
            });
        });
    });
}

// Fonction pour insérer le programme
function insertPrograms(formulaId) {
    return new Promise((resolve, reject) => {
        let completed = 0;
        programsData.forEach(program => {
            db.run(`
                INSERT INTO programs (
                    formula_id, day_number, date, description,
                    label, duration
                ) VALUES (?, ?, ?, ?, ?, ?)
            `, [
                formulaId,
                program.day_number,
                program.date,
                program.description,
                program.label,
                program.duration
            ], (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                completed++;
                if (completed === programsData.length) {
                    resolve();
                }
            });
        });
    });
}

// Fonction principale pour insérer toutes les données
async function insertCompleteFormula() {
    try {
        console.log('Insertion de la formule principale...');
        const formulaId = await insertFormula();
        console.log('Formule insérée avec ID:', formulaId);

        console.log('Insertion des vols et segments...');
        await insertFlights(formulaId);
        console.log('Vols et segments insérés');

        console.log('Insertion des hébergements...');
        await insertAccommodations(formulaId);
        console.log('Hébergements insérés');

        console.log('Insertion du programme...');
        await insertPrograms(formulaId);
        console.log('Programme inséré');

        console.log('Toutes les données ont été insérées avec succès');
        process.exit(0);
    } catch (err) {
        console.error('Erreur lors de l\'insertion des données:', err);
        process.exit(1);
    }
}

// Exécution du script
insertCompleteFormula(); 