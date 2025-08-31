const db = require('../config/database');

const formulaData = {
    trip_type: 'Hajj',
    departure_city: 'Paris',
    arrival_date: '2024-06-10',
    departure_date: '2024-06-25',
    formula_name: 'Hajj Premium 2024',
    duration: 15,
    madinah_accommodation: 'Pullman Zamzam Madina',
    makkah_accommodation: 'Hilton Suites Makkah'
};

db.run(
    `INSERT INTO formulas (
        trip_type, departure_city, arrival_date, departure_date,
        formula_name, duration, madinah_accommodation, makkah_accommodation
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
        formulaData.trip_type,
        formulaData.departure_city,
        formulaData.arrival_date,
        formulaData.departure_date,
        formulaData.formula_name,
        formulaData.duration,
        formulaData.madinah_accommodation,
        formulaData.makkah_accommodation
    ],
    function(err) {
        if (err) {
            console.error('Erreur lors de l\'insertion:', err);
        } else {
            console.log('Nouvelle formule insérée avec l\'ID:', this.lastID);
        }
    }
); 